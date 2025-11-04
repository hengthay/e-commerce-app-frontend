// components/ErrorMessage.jsx
const ErrorMessage = ({ message, isError }) => {
  return (
    <div className="flex items-center gap-2 p-4 rounded-md bg-red-50 border border-red-300 text-red-700 animate-fade-in w-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-red-500 shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p className="text-sm font-medium">{message || isError}</p>
    </div>
  );
};

export default ErrorMessage;
