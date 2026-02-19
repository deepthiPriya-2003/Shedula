"use client";
import Image from 'next/image'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("loggedIn");
    if (loggedIn) {
      router.push("/");
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      setError("No account found. Please sign up.");
      return;
    }

    const user = JSON.parse(storedUser);

    if (user.email === email && user.password === password) {
      if (remember) {
        localStorage.setItem("loggedIn", "true");
      } else {
        sessionStorage.setItem("loggedIn", "true");
      }
      router.push("/");
    } else {
      setError("No account found. Please sign up.");
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen 
       bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600 
       flex items-center justify-center p-4">
      <div className="bg-white w-[350px] p-6 rounded-3xl shadow-xl">

       <div className="flex justify-center">
                 <div >
                   <Image src="https://res.cloudinary.com/dpj5lzzyz/image/upload/v1771491863/shedula_logo_image_akfwux.png" 
                   alt="logo" width={200}
                   height={200}/>
                 </div>
               </div>

        <h2 className="text-xl font-bold mb-4">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
          />

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
              />
              Remember Me
            </label>

            <span className="text-pink-500 cursor-pointer">
              Forgot Password
            </span>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

         <button
            type="submit"
            className="w-full py-2 rounded-xl text-white font-semibold bg-gradient-to-r from-teal-400 to-cyan-500 hover:opacity-90 transition"
          >
            Login
          </button>
        </form>

       <div className="flex items-center my-4">
          <div className="flex-1 border-t"></div>
          <span className="px-2 text-sm text-gray-400">Or login with</span>
          <div className="flex-1 border-t"></div>
        </div>

        <button
          className="w-full flex items-center justify-center gap-2 border py-2 rounded-xl hover:bg-gray-50 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <span onClick={() => router.push("/signup")}
            className="text-teal-500 cursor-pointer font-medium"
          >
            Signup
          </span>
        </p>

      </div>
    </div>
  );
}
