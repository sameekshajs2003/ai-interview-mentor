
const SpinnerLoader = () => {
  return (
    <div role="status" className="flex items-center justify-center">
      <svg
        aria-hidden="true"
        className="w-6 h-6 animate-spin text-gray-300 fill-blue-600"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default SpinnerLoader;

