"use client";
import React, { useState } from "react";
import { X, Upload, Users, Calendar, Briefcase } from "lucide-react";
import type { JobOpening } from "src/_components/sections/types/career.type";
import type { InputChangeEvent } from "src/_components/sections/types/contact.type";
import { jobOpenings } from "public/data/Career";

export const CareerComponent = () => {
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    experience: string;
    location: string;
    qualification: string;
    linkedin: string;
    message: string;
    cv: File | null;
  }>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    experience: "",
    location: "",
    qualification: "",
    linkedin: "",
    message: "",
    cv: null,
  });

  const handleInputChange = (e: InputChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file && file.size <= 2 * 1024 * 1024) {
      // 2MB limit
      setFormData((prev) => ({
        ...prev,
        cv: file,
      }));
    } else {
      alert("File size should be less than 2MB");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setSelectedJob(null);
      setShowSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        experience: "",
        location: "",
        qualification: "",
        linkedin: "",
        message: "",
        cv: null,
      });

      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }, 1000);
  };

  const closeModal = () => {
    setSelectedJob(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-red-50 to-white">
      {/* Hero Section */}
      {/* <div className="bg-gradient-to-r from-[#EEF6FF] to-[#FCF2F2] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-[#C50202] text-sm font-medium tracking-wider uppercase mb-4">
              OPENING IN OUR COMPANY
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#000000] leading-tight">
              Job openings<br />
              and career<br />
              opportunities
            </h1>
          </div>
        </div>
      </div> */}

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Left Side - Scrollable Job List */}
          <div className="flex-1 lg:max-h-screen lg:overflow-y-auto lg:pr-4">
            <div className="space-y-6">
              {jobOpenings.map((job) => (
                <div
                  key={job.id}
                  className="rounded-2xl border border-[#C502021A] bg-white p-6 transition-all duration-300 hover:border-[#C50202] hover:shadow-lg"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1">
                      <h3 className="mb-3 text-xl font-semibold text-[#000000]">
                        {job.title}
                      </h3>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-[#C50202]" />
                          <span>Experience: {job.experience}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-[#C50202]" />
                          <span>No. of Openings: {job.openings}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-[#C50202]" />
                          <span>{job.type}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedJob(job)}
                      className="rounded-lg bg-[#C50202] px-6 py-2 font-medium whitespace-nowrap text-white transition-colors duration-200 hover:bg-[#C5020280]"
                    >
                      Apply Job
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Sticky Heading */}
          <div className="lg:w-80">
            <div className="lg:sticky lg:top-25">
              <div className="rounded-2xl border border-[#C502021A] bg-[#FCF2F2] p-8 text-center shadow-lg">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFCCD6]">
                  <Briefcase className="h-8 w-8 text-[#C50202]" />
                </div>

                <h2 className="mb-4 text-2xl font-bold text-[#000000]">
                  Join Our Team
                </h2>

                <p className="mb-6 text-gray-600">
                  {`Discover exciting career opportunities and grow with us. We're always looking for talented individuals to join our dynamic team.`}
                </p>

                <div className="text-center">
                  <div className="mb-2 text-3xl font-bold text-[#C50202]">
                    {jobOpenings.reduce((sum, job) => sum + job.openings, 0)}
                  </div>
                  <div className="text-sm text-gray-600">
                    Total Openings Available
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {selectedJob && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white">
            <div className="border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-[#000000]">
                  Apply for - {selectedJob.title}
                </h2>
                <button
                  onClick={closeModal}
                  className="rounded-full p-2 transition-colors hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              {/* CV Upload */}
              <div className="mb-6">
                <div className="rounded-lg border-2 border-dashed border-[#C502021A] bg-[#FCF2F2] p-8 text-center">
                  <Upload className="mx-auto mb-4 h-12 w-12 text-[#C50202]" />
                  <h3 className="mb-2 font-semibold text-[#000000]">
                    Upload Your CV*
                  </h3>
                  <p className="mb-4 text-sm text-gray-600">
                    File size up to 2MB. Only in PDF, jpg, jpeg, png, docx
                    Format
                  </p>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                    id="cv-upload"
                    required
                  />
                  <label
                    htmlFor="cv-upload"
                    className="inline-block cursor-pointer rounded-lg bg-[#C50202] px-6 py-2 text-white transition-colors hover:bg-[#C5020280]"
                  >
                    Choose File
                  </label>
                  {formData.cv && (
                    <p className="mt-2 text-sm text-[#C50202]">
                      Selected: {formData.cv.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Form Fields */}
              <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 p-3 focus:border-[#C50202] focus:outline-none"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 p-3 focus:border-[#C50202] focus:outline-none"
                  required
                />
              </div>

              <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 p-3 focus:border-[#C50202] focus:outline-none"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 p-3 focus:border-[#C50202] focus:outline-none"
                  required
                />
              </div>

              <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <input
                  type="text"
                  name="experience"
                  placeholder="Enter your experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 p-3 focus:border-[#C50202] focus:outline-none"
                  required
                />
                <input
                  type="text"
                  name="location"
                  placeholder="Current location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 p-3 focus:border-[#C50202] focus:outline-none"
                  required
                />
              </div>

              <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <select
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 p-3 focus:border-[#C50202] focus:outline-none"
                  required
                >
                  <option value="">Select your highest qualification</option>
                  <option value="bachelor">{`Bachelor's Degree`}</option>
                  <option value="master">{`Master's Degree`}</option>
                  <option value="diploma">Diploma</option>
                  <option value="phd">PhD</option>
                  <option value="certificate">Certificate</option>
                </select>
                <input
                  type="url"
                  name="linkedin"
                  placeholder="Your linkedin profile"
                  value={formData.linkedin}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 p-3 focus:border-[#C50202] focus:outline-none"
                />
              </div>

              <textarea
                name="message"
                placeholder="Leave us a message..."
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="mb-6 w-full resize-none rounded-lg border border-gray-300 p-3 focus:border-[#C50202] focus:outline-none"
              ></textarea>

              <button
                type="submit"
                className="w-full rounded-lg bg-[#C50202] py-3 font-semibold text-white transition-colors duration-200 hover:bg-[#C5020280]"
              >
                Submit Form
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 animate-pulse rounded-lg bg-green-500 px-6 py-3 text-white shadow-lg">
          <div className="flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
            </div>
            <span>Application submitted successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
};
