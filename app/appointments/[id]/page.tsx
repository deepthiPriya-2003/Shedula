"use client";

import { useEffect, useState } from "react";

type Appointment = {
  id: string;
  doctorName: string;
  speciality: string;
  date: string;
  time: string;
};

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = () => {
    const stored = localStorage.getItem("appointments");
    if (stored) {
      setAppointments(JSON.parse(stored));
    }
  };

  const cancelAppointment = (id: string) => {
    const updated = appointments.filter((appt) => appt.id !== id);

    localStorage.setItem("appointments", JSON.stringify(updated));
    setAppointments(updated);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-[#003366] mb-6">
        Upcoming Appointments
      </h1>

      {appointments.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">
          No upcoming appointments
        </p>
      ) : (
        <div className="space-y-4">
          {appointments.map((appt) => (
            <div
              key={appt.id}
              className="bg-white p-5 rounded-xl shadow-sm border flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold text-[#003366]">
                  {appt.doctorName}
                </h2>
                <p className="text-gray-600">{appt.speciality}</p>
                <p className="text-sm text-gray-500">
                  {appt.date} | {appt.time}
                </p>
              </div>

              <button
                onClick={() => cancelAppointment(appt.id)}
                className="border border-teal-600 text-teal-600 px-4 py-2 rounded-lg 
                hover:bg-teal-600 hover:text-white transition duration-300"
              >
                Cancel
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}