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
  <div className="min-h-screen bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-600 flex justify-center py-10 px-4">

    <div className="w-full max-w-4xl">

      <div className="bg-white rounded-2xl shadow-xl p-6 flex items-center justify-between">
        
        <div>
          <h1 className="text-2xl font-bold text-[#003366]">
            {doctorDetails.name}
          </h1>
          <p className="text-gray-600">{doctorDetails.speciality}</p>
          <p className="text-teal-600 font-semibold mt-1">
            {doctorDetails.experience} Experience
          </p>
        </div>

        <img
          src={doctorDetails.image}
          alt={doctorDetails.name}
          className="w-24 h-24 rounded-xl object-cover"
        />
      </div>

      <div className="bg-white rounded-2xl shadow-md mt-6 p-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        
        <div>
          <img src="https://res.cloudinary.com/dpj5lzzyz/image/upload/v1771745544/Auto_Layout_Horizontal_bwiczy.png" className="w-10 mx-auto mb-2" />
          <p className="font-bold text-[#003366]">5,000+</p>
          <p className="text-gray-500 text-sm">Patients</p>
        </div>

        <div>
          <img src="https://res.cloudinary.com/dpj5lzzyz/image/upload/v1771745510/Auto_Layout_Horizontal_2_actfkd.svg" className="w-10 mx-auto mb-2" />
          <p className="font-bold text-[#003366]">
            {doctorDetails.experience}
          </p>
          <p className="text-gray-500 text-sm">Years Exp.</p>
        </div>

        <div>
          <img src="https://res.cloudinary.com/dpj5lzzyz/image/upload/v1771745463/Auto_Layout_Horizontal_c2htoq.svg" className="w-10 mx-auto mb-2" />
          <p className="font-bold text-[#003366]">4.8</p>
          <p className="text-gray-500 text-sm">Rating</p>
        </div>

        <div>
          <img src="https://res.cloudinary.com/dpj5lzzyz/image/upload/v1771745488/Auto_Layout_Horizontal_1_hf11bx.svg" className="w-10 mx-auto mb-2" />
          <p className="font-bold text-[#003366]">4,942</p>
          <p className="text-gray-500 text-sm">Reviews</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md mt-6 p-6">
        <h2 className="text-lg font-bold text-[#003366] mb-3">
          About Doctor
        </h2>
        <p className="text-gray-600">
          {doctorDetails.description}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-md mt-6 p-6">
        <h2 className="text-lg font-bold text-[#003366] mb-3">
          Service & Specialization
        </h2>
        <p><strong>Specialization:</strong> {doctorDetails.speciality}</p>
        <p><strong>Consultation Fee:</strong> {doctorDetails.fee}</p>
      </div>

      <div className="bg-white rounded-2xl shadow-md mt-6 p-6">
        <h2 className="text-lg font-bold text-[#003366] mb-3">
          Availability For Consulting
        </h2>
        <p>{doctorDetails.availability}</p>
      </div>

      <div className="mt-8">
        {doctorDetails.status === "Available Today" ? (
          <Link href="/BookAppointment">
            <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-4 rounded-2xl text-lg font-semibold shadow-lg transition duration-300">
              Book Appointment
            </button>
          </Link>
        ) : (
          <button
            disabled
            className="w-full bg-gray-400 text-white py-4 rounded-2xl text-lg"
          >
            Not Available
          </button>
        )}
      </div>

    </div>
  </div>
);
}