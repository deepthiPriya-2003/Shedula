"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { IoPersonCircleSharp } from "react-icons/io5";

interface Doctor {
  id: string;
  name: string;
  speciality: string;
  availability: string;
  experience: string;
  status: string;
  image: string;
}


export default function Home() {
  const router = useRouter();

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const defaultSuggestions = [
  "Dermatologist",
  "Cardiologist",
  "Neurologist",
  "Orthopedic",
  "Pediatrician",
  "Gynecologist",
  ];
  useEffect(() => {
  const loggedIn =
    localStorage.getItem("loggedIn") ||
    sessionStorage.getItem("loggedIn");

  if (loggedIn !== "true") {
    router.push("/login");
  } else {
    fetchDoctors();
  }
}, [router]);


useEffect(() => {
  const handleClickOutside = () => {
    setShowSuggestions(false);
  };

  window.addEventListener("click", handleClickOutside);
  return () => window.removeEventListener("click", handleClickOutside);
}, []);

  const fetchDoctors = async () => {
    try {
      const response = await fetch(
        "https://6985c42d6964f10bf25465bc.mockapi.io/doctors"
      );
      const data: Doctor[] = await response.json();
      setDoctors(data);
      setFilteredDoctors(data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };
   

  

  const handleLogout = () => {
  localStorage.removeItem("loggedIn");
  sessionStorage.removeItem("loggedIn");
  router.push("/login");
};

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchInput(value);

    const filtered = doctors.filter(
      (doc) =>
        doc.name.toLowerCase().includes(value) ||
        doc.speciality.toLowerCase().includes(value)
    );

    setFilteredDoctors(filtered);
  }; 
  
  const filteredSuggestions = defaultSuggestions.filter((item) =>
  item.toLowerCase().includes(searchInput.toLowerCase())
);
  

return (
   <div className="min-h-screen w-full bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600 text-white">
     <div className="bg-[#90c8ec] shadow-sm px-6 md:px-12 py-4">
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
    
    
    <div className="flex items-center justify-between md:justify-start gap-3">
      <div className="flex items-center gap-3">
        <IoPersonCircleSharp size={40} />
        <h1 className="font-semibold text-lg text-white">Hello</h1>
      </div>
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

      {showSuggestions && searchInput && filteredSuggestions.length > 0 && (
        <div className="absolute top-14 left-0 w-full bg-white rounded-xl shadow-lg border border-gray-200 z-50">
          {filteredSuggestions.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setSearchInput(item);
                const filteredDoc = doctors.filter((doctor) =>
                  doctor.name.toLowerCase().includes(item.toLowerCase()) ||
                  doctor.speciality.toLowerCase().includes(item.toLowerCase())
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

    
    <div className="flex justify-end">
      <button
        onClick={handleLogout}
        className="border-2 border-[#FFFFFF]
        text-[#FFFFFF]
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
</div>

     <div className="flex justify-center px-6 py-10">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">

    {filteredDoctors.map((each) => (
      <div
        key={each.id}
        className="w-full
        backdrop-blur-md bg-white
        border border-gray-600
        rounded-xl shadow-xl
        p-6 flex flex-col md:flex-row gap-6
        text-[#003366] transition hover:scale-[1.02]"
      >
        <div className="text-center">
              <img
                src={each.image}
                alt="doctor"
                className="w-48 h-48 object-cover rounded-xl mx-auto"
              />
              <h2 className="font-bold mt-2">{each.name}</h2>
            </div>

            <div className="flex-1">
              <h3 className="text-xl font-semibold mt-4">
                {each.speciality}
              </h3>

              <p>Availability: {each.availability}</p>
              <p>Experience: {each.experience}</p>

              <p className="flex items-center gap-2">
                Status:
                <span
                  className={`w-3 h-3 rounded-full ${
                    each.status === "Available Today"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                ></span>
                <span className="font-bold">
                  {each.status}
                </span>
              </p>

              <div className="mt-4 flex gap-2 flex-wrap">
                <Link href={`/doctorsProfile/${each.id}`}>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700">
                    More Details
                  </button>
                </Link>

                {each.status === "Available Today" ? (
                  <Link href={`/book-appointment/${each.id}`}>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700">
                      Book Appointment
                    </button>
                  </Link>
                ) : (
                  <button
                    disabled
                    className="bg-gray-400 text-white px-4 py-2 rounded-xl"
                  >
                    Book Appointment
                  </button>
                )}
              </div>
            </div>
      </div>
    ))}

  </div>
</div>
    </div>
    
  );
} 



