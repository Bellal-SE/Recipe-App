export default function Spinner({ label }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 animate-[fadeIn_1s_ease-in-out] mb-5">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-[#D97757] animate-ping opacity-40" />
        <div className="absolute inset-0 rounded-full border-4 border-slate-200 border-t-[#D97757] animate-spin" />
      </div>
      <span className="text-sm text-slate-500 font-medium">{label}</span>
    </div>
  );
}
