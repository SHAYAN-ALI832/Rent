import { useState } from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { Label: "Home", to: "/" },
    { Label: "Experience", to: "/experience" },
    { Label: "Services", to: "/services" },
    // { Label: "About", to: "/about" },
    // { Label: "Contact", to: "/contact" },
  ];

  // Reusable active style
  const linkClasses = ({ isActive }: any) =>
    `cursor-pointer no-underline ${
      isActive ? "text-black font-semibold" : "text-gray-700"
    } hover:opacity-70`;

  return (
    <header className="w-full bg-[#f3efe9] shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <span className="text-lg font-semibold">✺ Rent</span>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center space-x-8 text-md">
          {navLinks.map((item) => (
            <li key={item.Label}>
              <NavLink to={item.to} className={linkClasses}>
                {item.Label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop right side */}
        <div className="hidden md:flex items-center space-x-6">
          <span className="text-sm cursor-pointer">USD</span>
          <span className="text-sm cursor-pointer">English</span>
          <button className="px-5 py-2 bg-black text-white rounded-full text-sm">
            LOG IN
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button className="md:hidden" onClick={() => setOpen(true)}>
          <HiMenuAlt2 size={28} />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-5 flex justify-between items-center border-b">
          <span className="text-lg font-semibold">Menu</span>
          <button onClick={() => setOpen(false)}>✕</button>
        </div>

        <ul className="flex flex-col space-y-6 p-6 text-gray-700 text-sm">
          {navLinks.map((item) => (
            <li key={item.Label}>
              <NavLink
                to={item.to}
                className={linkClasses}
                onClick={() => setOpen(false)}
              >
                {item.Label}
              </NavLink>
            </li>
          ))}

          <hr className="my-4" />

          <li className="cursor-pointer">USD</li>
          <li className="cursor-pointer">English</li>

          <button className="mt-4 px-5 py-2 bg-black text-white rounded-full text-sm w-fit">
            LOG IN
          </button>
        </ul>
      </div>

      {/* Blurred Background (Mobile) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 backdrop-blur-sm bg-black/30 z-40 md:hidden"
        />
      )}
    </header>
  );
}
