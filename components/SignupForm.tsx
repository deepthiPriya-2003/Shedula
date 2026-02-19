"use client";
import Image from 'next/image'


import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) return;

    localStorage.setItem("user", JSON.stringify({ email, password }));
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-[350px] p-6 rounded-3xl shadow-xl">

        <div className="flex justify-center">
          <div >
            <Image src="https://res.cloudinary.com/dpj5lzzyz/image/upload/v1771491863/shedula_logo_image_akfwux.png" 
            alt="logo" width={200}
            height={200}/>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-4">Signup</h2>

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full py-2 rounded-xl text-white font-semibold bg-gradient-to-r from-teal-400 to-cyan-500"
          >
            Signup
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-teal-500 cursor-pointer font-medium"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}
