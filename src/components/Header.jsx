import claudeLogo from "../assets/claude-logo.svg";
export default function Header() {
  return (
    <header className="flex justify-center items-center h-20 gap-x-2 shadow-md shadow-[#D97757]  rounded-b-2xl animate-[fadeIn_1s_ease-in-out]">
      <img className="h-10 w-10" src={claudeLogo} alt="claude logo" />
      <h2 className="text-4xl  sm:text-[40px] text-[#D97757]">Chef Claude</h2>
    </header>
  );
}
