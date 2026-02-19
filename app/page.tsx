"use client";
import Image from "next/image";
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
    <div
      className="min-h-screen w-full 
      bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600 
      text-white"
    >
      <div className="px-6 py-4">

        <div className="hidden md:flex justify-between items-center">
          <Image
            src="https://res.cloudinary.com/dpj5lzzyz/image/upload/v1771491863/shedula_logo_image_akfwux.png"
            alt="logo"
            width={120}
            height={120}
          />

          <h1 className="text-3xl font-bold">
            Welcome to Shedula
          </h1>

          <button
            onClick={handleLogout}
            className="bg-red-600 px-6 py-2 rounded-xl 
            hover:bg-red-700 transition shadow-lg"
          >
            Logout
          </button>
        </div>

        <div className="flex md:hidden flex-col gap-4">

          <div className="flex justify-between items-center">
            <Image
              src="https://res.cloudinary.com/dpj5lzzyz/image/upload/v1771491863/shedula_logo_image_akfwux.png"
              alt="logo"
              width={90}
              height={90}
            />

            <button
              onClick={handleLogout}
              className="bg-red-600 px-4 py-2 rounded-xl 
              hover:bg-red-700 transition shadow-lg"
            >
              Logout
            </button>
          </div>

          <h1 className="text-2xl font-bold text-center">
            Welcome to Shedula
          </h1>

        </div>

      </div>
    </div>
  );
}
