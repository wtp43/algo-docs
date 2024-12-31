const calloutStyles = {
  success: {
    bgColor: "bg-green-100",
    borderColor: "border-green-500",
    textColor: "text-green-900",
    iconColor: "text-green-500",
    icon: (
      <svg
        className="fill-current h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M10 15a1 1 0 0 1-.7-.3l-5-5a1 1 0 1 1 1.4-1.4l4.3 4.3 7.3-7.3a1 1 0 1 1 1.4 1.4l-8 8a1 1 0 0 1-.7.3z" />
      </svg>
    ),
  },
  warning: {
    bgColor: "bg-yellow-100",
    borderColor: "border-yellow-500",
    textColor: "text-yellow-900",
    iconColor: "text-yellow-500",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="icon icon-tabler icons-tabler-filled icon-tabler-alert-triangle"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 1.67c.955 0 1.845 .467 2.39 1.247l.105 .16l8.114 13.548a2.914 2.914 0 0 1 -2.307 4.363l-.195 .008h-16.225a2.914 2.914 0 0 1 -2.582 -4.2l.099 -.185l8.11 -13.538a2.914 2.914 0 0 1 2.491 -1.403zm.01 13.33l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007zm-.01 -7a1 1 0 0 0 -.993 .883l-.007 .117v4l.007 .117a1 1 0 0 0 1.986 0l.007 -.117v-4l-.007 -.117a1 1 0 0 0 -.993 -.883z" />
      </svg>
    ),
  },
  error: {
    bgColor: "bg-red-100",
    borderColor: "border-red-500",
    textColor: "text-red-900",
    iconColor: "text-red-500",
    icon: (
      <svg
        className="fill-current h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M8.257 3.099c.765-1.36 2.721-1.36 3.486 0l6.518 11.613c.76 1.353-.191 3.044-1.743 3.044H3.482c-1.552 0-2.502-1.691-1.743-3.044L8.257 3.1zm1.743 7a1 1 0 1 0-2 0v4a1 1 0 1 0 2 0v-4zm-1 7a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
      </svg>
    ),
  },
  info: {
    bgColor: "bg-teal-100",
    borderColor: "border-teal-500",
    textColor: "text-teal-900",
    iconColor: "text-teal-500",
    icon: (
      <svg
        className="fill-current h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
      </svg>
    ),
  },
  note: {
    bgColor: "bg-teal-100",
    borderColor: "border-teal-500",
    textColor: "text-teal-900",
    iconColor: "text-teal-500",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6 text-teal-500" // You can control the size and color here
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M5 3m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z" />
        <path d="M9 7l6 0" />
        <path d="M9 11l6 0" />
        <path d="M9 15l4 0" />
      </svg>
    ),
  },
};

const CustomCallout = ({ type = "info", title = "Note", children }) => {
  const { bgColor, borderColor, textColor, iconColor, icon } =
    calloutStyles[type] || calloutStyles.info;

  return (
    <div
      className={`${bgColor} border-t-4 ${borderColor} rounded-b ${textColor} px-4 py-3 shadow-md`}
      role="alert"
    >
      <div className="flex">
        <div className="py-1">
          <div className={`fill-current h-6 w-6 ${iconColor} mr-4`}>{icon}</div>
        </div>
        <div>
          <p className="font-bold">{title}</p>
          <p className="text-sm">{children}</p>
        </div>
      </div>
    </div>
  );
};

export default CustomCallout;
