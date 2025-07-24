"use client";
import React, { useState } from 'react';
import { X, Upload, Users, Calendar, MapPin, Briefcase } from 'lucide-react';

type InputChangeEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>
  | React.ChangeEvent<HTMLSelectElement>;

interface JobOpening {
  id: number;
  title: string;
  experience: string;
  openings: number;
  type: string;
}

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
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    experience: '',
    location: '',
    qualification: '',
    linkedin: '',
    message: '',
    cv: null
  });

  const jobOpenings: JobOpening[] = [
    {
      id: 1,
      title: 'HR Intern',
      experience: '0-6 Months',
      openings: 1,
      type: 'Internship'
    },
    {
      id: 2,
      title: 'Web Designer',
      experience: '1-2 Years',
      openings: 1,
      type: 'Full-time'
    },
    {
      id: 3,
      title: '.NET Developer with Angular',
      experience: '2-4 Years',
      openings: 2,
      type: 'Full-time'
    },
    {
      id: 4,
      title: 'Business Analyst',
      experience: '2-4 Years',
      openings: 2,
      type: 'Full-time'
    },
    {
      id: 5,
      title: 'Frontend Developer',
      experience: '1-3 Years',
      openings: 1,
      type: 'Full-time'
    },
    {
      id: 6,
      title: 'UI/UX Designer',
      experience: '2-5 Years',
      openings: 1,
      type: 'Full-time'
    }
  ];

  const handleInputChange = (e:InputChangeEvent) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file && file.size <= 2 * 1024 * 1024) { // 2MB limit
      setFormData(prev => ({
        ...prev,
        cv: file
      }))
    } else {
      alert('File size should be less than 2MB');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setSelectedJob(null);
      setShowSuccess(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        experience: '',
        location: '',
        qualification: '',
        linkedin: '',
        message: '',
        cv: null
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
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Scrollable Job List */}
          <div className="flex-1 lg:max-h-screen lg:overflow-y-auto lg:pr-4">
            <div className="space-y-6">
              {jobOpenings.map((job) => (
                <div
                  key={job.id}
                  className="bg-white border border-[#C502021A] rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:border-[#C50202]"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-[#000000] mb-3">
                        {job.title}
                      </h3>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#C50202]" />
                          <span>Experience: {job.experience}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-[#C50202]" />
                          <span>No. of Openings: {job.openings}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-[#C50202]" />
                          <span>{job.type}</span>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="bg-[#C50202] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#C5020280] transition-colors duration-200 whitespace-nowrap"
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
              <div className="bg-[#FCF2F2] rounded-2xl p-8 text-center border border-[#C502021A] shadow-lg">
                <div className="w-16 h-16 bg-[#FFCCD6] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Briefcase className="w-8 h-8 text-[#C50202]" />
                </div>
                
                <h2 className="text-2xl font-bold text-[#000000] mb-4">
                  Join Our Team
                </h2>
                
                <p className="text-gray-600 mb-6">
                  Discover exciting career opportunities and grow with us. We're always looking for talented individuals to join our dynamic team.
                </p>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#C50202] mb-2">
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-[#000000]">
                  Apply for - {selectedJob.title}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              {/* CV Upload */}
              <div className="mb-6">
                <div className="border-2 border-dashed border-[#C502021A] rounded-lg p-8 text-center bg-[#FCF2F2]">
                  <Upload className="w-12 h-12 text-[#C50202] mx-auto mb-4" />
                  <h3 className="font-semibold text-[#000000] mb-2">Upload Your CV*</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    File size up to 2MB. Only in PDF, jpg, jpeg, png, docx Format
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
                    className="bg-[#C50202] text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-[#C5020280] transition-colors inline-block"
                  >
                    Choose File
                  </label>
                  {formData.cv && (
                    <p className="text-sm text-[#C50202] mt-2">
                      Selected: {formData.cv.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#C50202]"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#C50202]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#C50202]"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#C50202]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  name="experience"
                  placeholder="Enter your experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#C50202]"
                  required
                />
                <input
                  type="text"
                  name="location"
                  placeholder="Current location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#C50202]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <select
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#C50202]"
                  required
                >
                  <option value="">Select your highest qualification</option>
                  <option value="bachelor">Bachelor's Degree</option>
                  <option value="master">Master's Degree</option>
                  <option value="phd">PhD</option>
                  <option value="diploma">Diploma</option>
                  <option value="certificate">Certificate</option>
                </select>
                <input
                  type="url"
                  name="linkedin"
                  placeholder="Your linkedin profile"
                  value={formData.linkedin}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#C50202]"
                />
              </div>

              <textarea
                name="message"
                placeholder="Leave us a message..."
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#C50202] mb-6 resize-none"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-[#C50202] text-white py-3 rounded-lg font-semibold hover:bg-[#C5020280] transition-colors duration-200"
              >
                Submit Form
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <span>Application submitted successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
};

