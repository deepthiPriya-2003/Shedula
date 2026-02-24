"use client";

import { useParams, useRouter } from "next/navigation";
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

export default function BookAppointment() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const dates = [
    { day: "Mon", date: "18" },
    { day: "Tue", date: "19" },
    { day: "Wed", date: "20" },
    { day: "Thu", date: "21" },
    { day: "Fri", date: "22" },
    { day: "Mon", date: "23" },
    { day: "Tue", date: "24" },
    { day: "Wed", date: "25" },
    { day: "Thu", date: "26" },
    { day: "Fri", date: "27" },
  ];

  const timeSlots = [
    "09:00 AM - 09:30 AM",
    "10:00 AM - 10:30 AM",
    "11:00 AM - 11:30 AM",
    "02:00 PM - 02:30 PM",
    "04:00 PM - 04:30 PM",
    "06:00 PM - 06:30 PM",
  ];

  useEffect(() => {
    if (!id) return;

    const fetchDoctor = async () => {
      const response = await fetch(
        `https://6985c42d6964f10bf25465bc.mockapi.io/doctors/${id}`
      );
      const data = await response.json();
      setDoctor(data);
    };

    fetchDoctor();
  }, [id]);

  useEffect(() => {
    if (!doctor || !selectedDate) {
      setBookedSlots([]);
      return;
    }

    const filtered =
      doctor.bookings
        ?.filter((b) => b.date === selectedDate)
        .map((b) => b.slot) || [];

    setBookedSlots(filtered);
  }, [selectedDate, doctor]);

  const handleBooking = async () => {
  if (!selectedDate || !selectedSlot || !doctor) return;

  setLoading(true);

  const newBooking: Booking = {
    date: selectedDate,
    slot: selectedSlot,
  };

  const updatedBookings = doctor.bookings
    ? [...doctor.bookings, newBooking]
    : [newBooking];

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
      
      const newAppointment = {
        id: Date.now().toString(),
        doctorId: doctor.id,
        doctorName: doctor.name,
        speciality: doctor.speciality,
        date: selectedDate,
        time: selectedSlot,
      };

      const existingAppointments =
        JSON.parse(localStorage.getItem("appointments") || "[]");

      localStorage.setItem(
        "appointments",
        JSON.stringify([...existingAppointments, newAppointment])
      );

      

      router.push(
        `/appointment-scheduled/${id}?date=${selectedDate}&time=${selectedSlot}`
      );
    }
  } catch (error) {
    console.error("Booking failed", error);
  } finally {
    setLoading(false);
  }
};

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-600 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-600 flex justify-center py-10 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6">
        <h1 className="text-xl font-bold text-[#003366] mb-4">
          Book Appointment
        </h1>

        <div className="bg-gray-50 rounded-2xl p-4 flex justify-between items-center shadow">
          <div>
            <h2 className="font-bold text-[#003366]">
              {doctor.name}
            </h2>
            <p className="text-gray-500 text-sm">
              {doctor.speciality}
            </p>
            <p className="text-teal-600 text-sm font-semibold">
              {doctor.experience} Experience
            </p>
          </div>

          <img
            src={doctor.image}
            className="w-16 h-16 rounded-xl object-cover"
            alt={doctor.name}
          />
        </div>

        <h3 className="mt-6 font-semibold text-[#003366]">
          Select Date
        </h3>

        <div className="flex gap-3 mt-3 overflow-x-auto">
          {dates.map((d) => (
            <button
              key={d.date}
              onClick={() => {
                setSelectedDate(d.date);
                setSelectedSlot(null);
              }}
              className={`min-w-[70px] py-3 rounded-xl transition ${
                selectedDate === d.date
                  ? "bg-teal-500 text-white"
                  : "bg-gray-100 text-[#003366]"
              }`}
            >
              <p className="font-bold">{d.date}</p>
              <p className="text-xs">{d.day}</p>
            </button>
          ))}
        </div>

        <h3 className="mt-6 font-semibold text-[#003366]">
          Select Time Slot
        </h3>

        <div className="grid grid-cols-2 gap-3 mt-3">
          {timeSlots.map((slot) => {
            const isBooked = bookedSlots.includes(slot);

            return (
              <button
                key={slot}
                disabled={isBooked}
                onClick={() => setSelectedSlot(slot)}
                className={`py-3 rounded-xl text-sm transition ${
                  isBooked
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : selectedSlot === slot
                    ? "bg-teal-500 text-white"
                    : "bg-gray-100 text-[#003366]"
                }`}
              >
                {slot}
              </button>
            );
          })}
        </div>

        <button
          onClick={handleBooking}
          disabled={!selectedDate || !selectedSlot || loading}
          className={`w-full mt-8 py-4 rounded-2xl text-lg font-semibold transition ${
            selectedDate && selectedSlot
              ? "bg-teal-500 hover:bg-teal-600 text-white"
              : "bg-gray-300 text-gray-500"
          }`}
        >
          {loading ? "Booking..." : "Confirm Appointment"}
        </button>

        <Link href="/">
          <p className="text-center text-sm text-gray-500 mt-4 cursor-pointer">
            ← Back to Home
          </p>
        </Link>
      </div>
    </div>
  );
}