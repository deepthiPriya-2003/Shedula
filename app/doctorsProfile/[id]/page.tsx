"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface Doctor {
  id: string;
  name: string;
  speciality: string;
  availability: string;
  experience: string;
  status: string;
  image: string;
  fee: string;
  description: string;
}

export default function DoctorProfile() {   

  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [doctorDetails, setDoctorDetails] = useState<Doctor | null>(null);

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("loggedIn");
    if (!loggedIn) {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    const getDoctorData = async () => {
      const response = await fetch(
        `https://6985c42d6964f10bf25465bc.mockapi.io/doctors/${id}`
      );
      const data = await response.json();
      setDoctorDetails(data);
    };

    if (id) getDoctorData();
  }, [id]);

  if (!doctorDetails) {
    return <div>Loading...</div>;
  }

  return (
  <div className="min-h-screen w-full bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600 text-white flex justify-center items-center px-6 py-10">
    
    <div className="w-full max-w-6xl backdrop-blur-md bg-white border border-white/30 rounded-2xl shadow-2xl p-8 text-[#003366]">
      
      <div className="flex flex-col md:flex-row gap-10 items-center">
        
         <div className="text-center md:w-1/2">
          <img
            src={doctorDetails.image}
            alt={doctorDetails.name}
            className="w-80 h-80 object-cover rounded-2xl shadow-lg mx-auto"
          />
          <h2 className="font-bold text-xl mt-4">
            {doctorDetails.name}
          </h2>
        </div>

        <div className="md:w-1/2 space-y-3">
          <h1 className="text-3xl font-bold mb-4">
            {doctorDetails.speciality}
          </h1>

          <p><strong>Availability:</strong> {doctorDetails.availability}</p>
          <p><strong>Experience:</strong> {doctorDetails.experience}</p>

          <p className="flex items-center gap-2">
            <strong>Status:</strong>
            <span
              className={`w-3 h-3 rounded-full ${
                doctorDetails.status === "Available Today"
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            ></span>
            <span className="font-semibold">
              {doctorDetails.status}
            </span>
          </p>

          <p><strong>Consultation Fee:</strong> {doctorDetails.fee}</p>

          <div className="mt-6">
            {doctorDetails.status === "Available Today" ? (
              <Link href="/BookAppointment">
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow-md transition duration-300">
                  Book Appointment
                </button>
              </Link>
            ) : (
              <button
                disabled
                className="bg-gray-400 text-white px-6 py-3 rounded-xl"
              >
                Not Available
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-white/30 pt-6">
        <p className="font-medium leading-relaxed">
          {doctorDetails.description}
        </p>

        <div className="mt-6">
          <button
            onClick={() => router.back()}
            className="text-dark underline hover:text-gray-200 transition"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  </div>
)
}