"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function PrescriptionPage() {

  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const id = params?.id as string;

  const date = searchParams.get("date");
  const slot = searchParams.get("slot");

  const [medicine, setMedicine] = useState("");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async () => {

    const prescription = {
      date,
      slot,
      medicine,
      duration,
      notes
    };

    try {

      await fetch(
        `https://6985c42d6964f10bf25465bc.mockapi.io/prescriptions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(prescription),
        }
      );

      router.push(`/doctor-dashboard/${id}`);

    } catch (error) {
      console.error("Error saving prescription", error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

        <h1 className="text-xl font-bold text-[#003366] mb-6">
          Suggest Prescription
        </h1>

        <p className="text-sm text-gray-500 mb-4">
          Appointment: {date} | {slot}
        </p>

        <input
          type="text"
          placeholder="Medicine Name"
          value={medicine}
          onChange={(e) => setMedicine(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4"
        />

        <input
          type="text"
          placeholder="Course Duration (Ex: 5 days)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4"
        />

        <textarea
          placeholder="Notes (Optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-teal-500 text-white py-3 rounded-xl hover:bg-teal-600"
        >
          Submit Prescription
        </button>

      </div>

    </div>
  );
}