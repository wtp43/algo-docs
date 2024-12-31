#!/usr/bin/env python3

import os
import re
import shutil

import mdit_py_plugins
import regex
from markdown_it import MarkdownIt
from mdformat.renderer import MDRenderer
from mdit_py_plugins.front_matter import front_matter_plugin


def change_callout(match):
    callout_content = match.captures(3)
    callout_title = match.groups(2)[0]
    callout_type = match.groups(1)[0].lstrip(" [!").rstrip("]").replace(" ", "-")
    callout = f'<CustomCallout type={{"{callout_type}"}} title={{"{callout_title}"}}>'
    for line in callout_content:
        callout += line.lstrip("\n> ")

    callout += "</CustomCallout>"

    return callout


def format_md(file_path):

    with open(file_path, "r") as file:
        mdx_content = file.read()

    md = MarkdownIt("commonmark").use(front_matter_plugin)

    tokens = md.parse(mdx_content)

    # Access frontmatter token
    frontmatter_token = tokens[0]  # Frontmatter is usually the first token

    # Reconstruct the frontmatter as a markdown string
    frontmatter_content = "---\n"
    for line in frontmatter_token.content.splitlines():
        frontmatter_content += line + "\n"
    frontmatter_content += "---\n"

    tokens = tokens[1:]
    for i in range(len(tokens)):
        if tokens[i].type != "fence":
            tokens[i].content = re.sub(r"<=", "\\<=", tokens[i].content)
    renderer = MDRenderer("commonmark")
    options = {}
    env = {}

    output_markdown = frontmatter_content + renderer.render(tokens, options, env)
    # output_markdown = frontmatter_content + "".join([t.content for t in tokens])
    with open(file_path, "w") as file:
        file.write(output_markdown)


def process_file(file_path, docs_dir, attachments_dir):
    with open(file_path, "r") as file:

        # TODO: file names with ' and callouts including attachments
        lines = file.readlines()
        for i in range(len(lines)):
            backlink = re.search(r"\[\[(.*?)\]\]", lines[i])
            if backlink:
                pattern = backlink.group(1)
                print(pattern)
                pattern = re.sub(r"[ ']", "-", pattern)
                path = next(
                    (
                        os.path.join(root, name)
                        for root, dirs, files in os.walk(docs_dir)
                        for name in files
                        if pattern in name
                    ),
                    None,
                )

                # Backlink is a reference to a static asset
                if path:
                    ref_name = os.path.basename(path).rstrip(".mdx")
                    parts = path.split(os.sep)  # Split the path into components
                    path = os.sep.join(parts[1:]).rstrip(".md")

                    path = re.sub(r"[ ']", "-", path)
                    lines[i] = f"[{ref_name}](/{path})\n"

            attachment = re.search(r"!\[\[(.*?)\]\]", lines[i])
            if attachment:
                pattern = attachment.group(1)
                path = next(
                    (
                        os.path.join(root, name)
                        for root, dirs, files in os.walk(attachments_dir)
                        for name in files
                        if pattern in name
                    ),
                    None,
                )
                if path:
                    path = "/mdx_attachments/" + os.path.basename(path).replace(
                        " ", "-"
                    )
                    lines[i] = f"![{pattern}]({path})"

    with open(file_path, "w") as file:
        file.writelines(lines)

    # Change obsidian callouts to react components
    format_md(file_path)
    with open(file_path, "r") as file:
        # pattern = re.compile(r">(\[!\D+?\])(\n>.+)*")
        reg0 = regex.compile(r"> ?\[!(.+?)\]\+?(.*)(\n>.+)*", regex.MULTILINE)
        # reg0 = regex.compile(r"> (\[!\D+?\]).*", regex.MULTILINE)
        modified_callouts = reg0.sub(lambda m: change_callout(m), file.read())

    with open(file_path, "w") as file:
        file.writelines(modified_callouts)


def copy_vault(src, docs_dir, attachments_dir):
    try:
        # Copy all markdown files
        shutil.copytree(src, docs_dir, ignore=shutil.ignore_patterns("attachments"))

        # Copy all attachments
        shutil.copytree(attachments_dir, "public/mdx_attachments/")

    except PermissionError:
        print("Error: Permission denied while copying directory '{}'.".format(src))
    except Exception as e:
        print("An error occurred:", e)


def copy_file(src, dest):
    try:
        shutil.copy(src, dest)
    except PermissionError:
        print("Error: Permission denied while copying file '{}'.".format(src))
    except Exception as e:
        print("An error occurred:", e)


def process_vault(vault_dir, docs_dir, attachments_dir, valid_folders):

    # Copy all md from valid_folders
    ignore_func = shutil.ignore_patterns(".DS_Store", "*.txt")
    for x in valid_folders:
        shutil.copytree(vault_dir + x, docs_dir + x, ignore=ignore_func)
        os.rename(docs_dir + x, docs_dir + x.replace(" ", "-"))
        for root, dirs, files in os.walk(docs_dir + x.replace(" ", "-")):
            for f in files:
                os.rename(
                    root + "/" + f,
                    root + "/" + re.sub(r"[ ']", "-", f) + "x",
                )

    #  Copy all attachments
    shutil.rmtree("public/mdx_attachments")
    shutil.copytree(attachments_dir, "public/mdx_attachments")

    # Rename attachments
    for root, dirs, files in os.walk("public/mdx_attachments"):
        for f in files:
            os.rename(
                root + "/" + f,
                root + "/" + re.sub(r"[ ']", "-", f),
            )

    for x in valid_folders:
        x = x.replace(" ", "-")
        for root, dirs, files in os.walk(docs_dir + x):
            for f in files:
                process_file(root + "/" + f, docs_dir, attachments_dir)


def get_directories(path):
    directories = []
    for root, dirs, files in os.walk(path):
        for dir in dirs:
            directories.append(dir)
    return directories


def main():

    # remove all existing pages

    docs_dir = "pages/"
    directories_to_delete = get_directories(docs_dir)
    for dir in directories_to_delete:
        dir = docs_dir + dir
        if os.path.isdir(dir):
            shutil.rmtree(dir)

    # copy/process obsidian markdown to mdx

    vault_dir = "../my-vault/Algorithms/"
    attachments_dir = "../my-vault/attachments"
    valid_folders = get_directories(vault_dir)
    print(valid_folders)
    process_vault(vault_dir, docs_dir, attachments_dir, valid_folders)


if __name__ == "__main__":
    main()
