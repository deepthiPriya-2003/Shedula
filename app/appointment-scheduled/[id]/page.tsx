"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Booking {
  date: string;
  slot: string;
}

interface Doctor {
  id: string;
  name: string;
  speciality: string;
  experience: string;
  image: string;
  bookings?: Booking[];
}

export default function AppointmentScheduled() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const id = params.id as string;
  const selectedDate = searchParams.get("date");
  const selectedTime = searchParams.get("time");

  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDoctor = async () => {
      const res = await fetch(
        `https://6985c42d6964f10bf25465bc.mockapi.io/doctors/${id}`
      );
      const data = await res.json();
      setDoctor(data);
    };

    if (id) fetchDoctor();
  }, [id]);

  const handleCancel = async () => {
    if (!doctor || !selectedDate || !selectedTime) return;

    setLoading(true);

    const updatedBookings =
      doctor.bookings?.filter(
        (b) => !(b.date === selectedDate && b.slot === selectedTime)
      ) || [];

    try {
      const response = await fetch(
        `https://6985c42d6964f10bf25465bc.mockapi.io/doctors/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...doctor,
            bookings: updatedBookings,
          }),
        }
      );

      if (response.ok) {
        alert("Appointment Cancelled Successfully");
        router.push("/");
      }
    } catch (error) {
      console.error("Cancel failed", error);
    } finally {
      setLoading(false);
    }
  };

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 to-blue-100 flex justify-center py-10 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6">

        <h1 className="text-xl font-bold text-green-600 mb-6">
          Appointment Scheduled
        </h1>

        <div className="bg-gray-50 rounded-2xl p-4 flex gap-4 items-center shadow-sm">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-20 h-20 rounded-xl object-cover"
          />
          <div>
            <h2 className="font-bold text-[#003366] text-lg">
              {doctor.name}
            </h2>
            <p className="text-gray-500 text-sm">
              {doctor.speciality}
            </p>
            <p className="text-gray-400 text-sm">
              {doctor.experience} Experience
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-4 mt-6 shadow-sm">
          <p className="text-gray-500 text-sm">Status</p>
          <p className="text-green-600 font-semibold mb-3">
            Active
          </p>

          <p className="text-gray-500 text-sm">Reporting Time</p>
          <p className="text-[#003366] font-semibold">
            {selectedDate} | {selectedTime}
          </p>
        </div>

        <div className="flex justify-center mt-6">
  <button
    onClick={() => router.push("/appointments/page.tsx")}
    className="px-8 py-3 rounded-xl border-2 bg-teal-500 text-white
    hover:bg-teal-800 hover:text-white transition duration-300"
  >
    View Appointments
  </button>
</div>
       <div className="flex justify-center mt-6">
        <button
          onClick={handleCancel}
          disabled={loading}
          className="px-8 py-3 rounded-xl bg-red-500 text-white py-3 rounded-2xl font-semibold hover:bg-red-600 transition"
        >
          {loading ? "Cancelling..." : "Cancel My Appointment"}
        </button> 
        </div>
        
         <div className="flex justify-center mt-6">
        <Link href="/">
          <p className="text-center text-sm text-gray-500 mt-4 cursor-pointer">
            ← Back to Home
          </p>
        </Link>
        </div>
      </div>
      
    </div>
  );
}