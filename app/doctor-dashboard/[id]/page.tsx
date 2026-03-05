"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

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
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600 p-6">
      <h1 className="flex justify-center text-2xl font-bold text-[#FFFFFF] mb-6"> Welcome {doctor.name} </h1>
      <div className="max-w-4xl mx-auto">
       

        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-6">
          
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-24 h-24 md:w-28 md:h-28 rounded-xl object-cover"
          />

          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold text-[#003366]">
              {doctor.name}
            </h1>

            <p className="text-gray-600">
              {doctor.speciality}
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Doctor Dashboard
            </p>
          </div>
        </div>

        <div className="mt-8">

          <h2 className="text-xl font-semibold text-white mb-4">
            Your Appointments
          </h2>

          {!doctor.bookings || doctor.bookings.length === 0 ? (
            <div className="bg-white rounded-xl p-6 text-center text-gray-500">
              No appointments yet
            </div>
          ) : (
            doctor.bookings.map((booking, index) => (
              <div
                key={index}
                className="bg-white p-5 mb-4 rounded-xl shadow-md flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >

                <div>
                  <p className="font-semibold text-[#003366]">
                    Date: {booking.date}
                  </p>

                  <p className="text-gray-600">
                    Time: {booking.slot}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">

                  <Link
                    href={`/prescriptions/${id}?date=${booking.date}&slot=${booking.slot}`}
                  >
                    <button className="border-2 border-teal-500 text-teal-500 px-4 py-2 rounded-xl hover:bg-teal-500 hover:text-white transition">
                      Suggest Prescription
                    </button>
                  </Link>

                  <button
                    disabled={loading}
                    onClick={() => cancelAppointment(index)}
                    className="border-2 border-red-500 text-red-500 px-4 py-2 rounded-xl hover:bg-red-500 hover:text-white transition"
                  >
                    Cancel
                  </button>

                </div>
              </div>
            ))
          )}
        </div>

      </div>

    </div>
  );
}