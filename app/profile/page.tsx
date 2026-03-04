"use client";

import { useState } from "react";

interface User {
  name: string;
  age: string;
  bloodGroup: string;
  phone: string;
  email: string;
  address: string;
}

export default function ProfilePage() {
  const [formData, setFormData] = useState<User>({
    name: "",
    age: "",
    bloodGroup: "",
    phone: "",
    email: "",
    address: "",
  });

  const [submittedData, setSubmittedData] = useState<User | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    setSubmittedData(formData);
    setFormData({
      name: "",
      age: "",
      bloodGroup: "",
      phone: "",
      email: "",
      address: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-600 flex justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6">

        <h1 className="text-xl font-bold text-[#003366] mb-6">
          Patient Profile
        </h1>

        {/* Input Form */}
        <div className="space-y-4">

          <InputField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <InputField
            label="Age"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />

          <InputField
            label="Blood Group"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
          />

          <InputField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <InputField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <InputField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />

          <button
            onClick={handleSubmit}
            className="w-full py-3 rounded-xl border-2 border-teal-500 text-teal-500 
            hover:bg-teal-500 hover:text-white transition duration-300"
          >
            Submit
          </button>
        </div>

        {/* Display Section */}
        {submittedData && (
          <div className="mt-8 bg-gray-50 p-4 rounded-2xl shadow">
            <h2 className="font-bold text-[#003366] mb-4">
              Patient Details
            </h2>

            <Detail label="Name" value={submittedData.name} />
            <Detail label="Age" value={submittedData.age} />
            <Detail label="Blood Group" value={submittedData.bloodGroup} />
            <Detail label="Phone" value={submittedData.phone} />
            <Detail label="Email" value={submittedData.email} />
            <Detail label="Address" value={submittedData.address} />
          </div>
        )}
      </div>
    </div>
  );
}

/* Reusable Input */
function InputField({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label className="block text-sm text-gray-500 mb-1">
        {label}
      </label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 rounded-xl border border-gray-300 
        focus:outline-none focus:border-teal-500"
        placeholder={`Enter ${label}`}
      />
    </div>
  );
}

/* Reusable Detail */
function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-2 text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-semibold text-[#003366]">{value}</span>
    </div>
  );
}