"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IoPersonCircleSharp } from "react-icons/io5";
import { FaCalendarAlt, FaUser, FaSignOutAlt, FaBars } from "react-icons/fa";

interface NavbarProps  {
  searchInput: string;
  setSearchInput: (value: string) => void;
  filteredSuggestions: string[];
  doctors: any[];
  setFilteredDoctors: (docs: any[]) => void;
  setShowSuggestions: (value: boolean) => void;
  showSuggestions: boolean;
}

export default function Navbar({
  searchInput,
  setSearchInput,
  filteredSuggestions,
  doctors,
  setFilteredDoctors,
  setShowSuggestions,
  showSuggestions,
}: NavbarProps) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
  sessionStorage.removeItem("loggedIn");
    router.push("/login");
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setShowSuggestions(true);
  };

  return (
     
    <nav className="bg-[#cfe8f7] px-6 md:px-12 py-4 shadow-sm relative">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div className="flex items-center justify-between md:justify-start gap-3 w-full md:w-auto">
          <div className="flex items-center gap-3">
            <IoPersonCircleSharp size={40} className="text-[#003366]" />
            <h1 className="font-semibold text-lg text-[#003366]">
              Hello
            </h1>
          </div>

          <button
            className="md:hidden text-[#003366]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaBars size={22} />
          </button>
        </div>

        <div className="relative w-full md:max-w-md">
          <input
            type="search"
            placeholder="Search doctors or specialization..."
            value={searchInput}
            onChange={onChangeInput}
            onFocus={() => setShowSuggestions(true)}
            onClick={(e) => e.stopPropagation()}
            className="w-full p-3 rounded-full 
            bg-white text-[#003366]
            outline-none shadow-sm
            focus:ring-2 focus:ring-teal-400"
          />

          {showSuggestions &&
            searchInput &&
            filteredSuggestions.length > 0 && (
              <div className="absolute top-14 left-0 w-full bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                {filteredSuggestions.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setSearchInput(item);
                      const filteredDoc = doctors.filter(
                        (doctor) =>
                          doctor.name
                            .toLowerCase()
                            .includes(item.toLowerCase()) ||
                          doctor.speciality
                            .toLowerCase()
                            .includes(item.toLowerCase())
                      );
                      setFilteredDoctors(filteredDoc);
                      setShowSuggestions(false);
                    }}
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-[#003366]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
        </div>

        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/appointments/page.tsx"
            className="text-[#003366] font-medium hover:text-teal-600 transition"
          >
            Appointments
          </Link>

          <Link
            href="/profile"
            className="text-[#003366] font-medium hover:text-teal-600 transition"
          >
            Profile
          </Link>

          <button
            onClick={handleLogout}
            className="border-2 border-[#003366]
            text-[#003366]
            px-5 py-2 
            rounded-xl 
            font-semibold 
            transition-all duration-300
            hover:bg-teal-500
            hover:text-white"
          >
            Logout
          </button>
        </div>
      </div>

      {/* MOBILE view */}
      {menuOpen && (
        <div className="md:hidden mt-4 bg-white rounded-xl shadow-lg p-4 flex flex-col gap-4">

          <Link
            href="/appointments/page.tsx"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 text-[#003366] font-medium"
          >
            <FaCalendarAlt />
            Appointments
          </Link>

          <Link
            href="/profile"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 text-[#003366] font-medium"
          >
            <FaUser />
            Profile
          </Link>

          <button
            onClick={() => {
              setMenuOpen(false);
              handleLogout();
            }}
            className="flex items-center gap-3 text-red-500 font-medium"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      )}
    </nav>
   
  );
}