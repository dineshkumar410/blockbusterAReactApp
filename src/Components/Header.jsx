import { Link } from "react-router-dom";

// Header Component
function Header() {
  return (
    <header className=" p-[1.5rem] bg-[#0d3fa9]">
      <h1 className="text-5xl text-center text-[#FFBF01] font-bebas tracking-wide">
        <Link to={"/"}>BLOCKBUSTER</Link>
      </h1>
    </header>
  );
}

export default Header;
