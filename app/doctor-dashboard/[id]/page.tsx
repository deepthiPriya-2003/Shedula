"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link"

interface Booking {
  date: string;
  slot: string;
}

interface Doctor {
  id: string;
  name: string;
  speciality: string;
  image: string;
  bookings?: Booking[];
}

export default function DoctorDashboard() {

  const params = useParams();
  const id = params?.id as string;

  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const fetchDoctor = async () => {
      const response = await fetch(
        `https://6985c42d6964f10bf25465bc.mockapi.io/doctors/${id}`
      );

      const data = await response.json();
      setDoctor(data);
    };

    fetchDoctor();

  }, [id]);

  // CANCEL APPOINTMENT
  const cancelAppointment = async (bookingIndex: number) => {

    if (!doctor) return;

    setLoading(true);

    const updatedBookings =
      doctor.bookings?.filter((_, index) => index !== bookingIndex) || [];

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
        setDoctor({
          ...doctor,
          bookings: updatedBookings,
        });
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
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-2xl font-bold text-[#003366] mb-6">
        Welcome {doctor.name}
      </h1>

      <h2 className="text-xl font-semibold mb-6">
        Your Appointments
      </h2>

      {doctor.bookings?.map((booking, index) => (

  <div
    key={index}
    className="bg-white p-4 mb-2 rounded-xl shadow flex justify-between items-center"
  >

    <div>
      <p className="font-semibold">Date: {booking.date}</p>
      <p>Time: {booking.slot}</p>
    </div>

    <div className="flex gap-3">

      <Link
        href={`/prescriptions/${id}?date=${booking.date}&slot=${booking.slot}`}
      >
        <button
          className="border-2 border-teal-500 text-teal-500 px-4 py-2 rounded-xl hover:bg-teal-500 hover:text-white transition"
        >
          Suggest Prescription
        </button>
      </Link>

      <button
        onClick={() => cancelAppointment(index)}
        className="border-2 border-red-500 text-red-500 px-4 py-2 rounded-xl hover:bg-red-500 hover:text-white transition"
      >
        Cancel
      </button>

    </div>

  </div>
))} 
      

    </div>
  );
}