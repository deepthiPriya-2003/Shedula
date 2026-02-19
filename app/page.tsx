"use client";
import Image from 'next/image'

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("loggedIn");

    if (!loggedIn) {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("loggedIn");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div>
      <Image src="https://res.cloudinary.com/dpj5lzzyz/image/upload/v1771491863/shedula_logo_image_akfwux.png" 
        alt="logo" width={200}
        height={200}/>
        </div>
      <h1 className="text-3xl text-center font-bold mb-6">
        Welcome to Shedula
      </h1>

      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-300"
      >
        Logout
      </button>

    </div>
  );
}
