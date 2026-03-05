"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DoctorLogin() {
  const router = useRouter();

  const [doctorId, setDoctorId] = useState("");

  const handleLogin = () => {
    if (!doctorId) return;

    localStorage.setItem("doctorLoggedIn", "true");
    localStorage.setItem("doctorId", doctorId);

    router.push(`/doctor-dashboard/${doctorId}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-80">

        <h1 className="text-xl font-bold text-center text-[#003366] mb-6">
          Doctor Login
        </h1>

        <input
          type="text"
          placeholder="Enter Doctor ID"
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
          className="w-full p-3 border rounded-xl mb-4"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-teal-500 text-white py-3 rounded-xl hover:bg-teal-600"
        >
          Login
        </button>

      </div>

    </div>
  );
}