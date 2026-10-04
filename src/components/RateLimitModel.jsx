export default function RateLimitModel(props) {
  function handleClick() {
    props.setRateModel(false);
  }
  return props.rateModel ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-[fadeIn_0.3s_ease-in-out]">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="rateLimitTitle"
        className="w-full max-w-sm rounded-2xl border border-[#D97757] bg-[#181b22] p-6 shadow-2xl"
      >
        <h2 id="rateLimitTitle" className="text-lg font-semibold text-white">
          Too Many Requests
        </h2>

        <p className="mt-2 text-sm leading-relaxed text-gray-400">
          Your recipe is cooking, please wait for a moment.
        </p>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleClick}
            className="cursor-pointer rounded-lg bg-[#D97757] px-4 py-2 text-sm font-medium text-white hover:bg-[#67493f] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-400 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  ) : null;
}
