"use client";
import React, { useState } from "react";
import {
  Linkedin,
  Twitter,
  Mail,
  Users,
  Award,
  Target,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  X,
  Quote,
  Star,
  MapPin,
  Calendar,
  Phone,
} from "lucide-react";

interface Testimonial {
  id: number;
  clientName: string;
  clientCompany: string;
  clientPosition: string;
  testimonial: string;
  rating: number;
  projectType: string;
  date: string;
}

interface TeamMember {
  id: number;
  name: string;
  position: string;
  department: string;
  bio: string;
  detailedBio: string;
  image: string;
  experience: string;
  specialties: string[];
  social: {
    linkedin?: string;
    twitter?: string;
    email?: string;
    phone?: string;
  };
  achievements: string[];
  education: string[];
  certifications: string[];
  location: string;
  joinDate: string;
  testimonials: Testimonial[];
}

export const TeamSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Rajesh Kumar",
      position: "Chief Executive Officer",
      department: "Leadership",
      bio: "Visionary leader with 20+ years in fintech and enterprise solutions. Rajesh has pioneered digital transformation initiatives across Fortune 500 companies.",
      detailedBio:
        "Rajesh Kumar is a visionary leader with over two decades of experience in financial technology and enterprise solutions. He founded our company with the mission to democratize financial management for Indian businesses. Under his leadership, we've grown from a small startup to serving 600+ companies nationwide. Rajesh is passionate about leveraging technology to solve complex business challenges and has been instrumental in developing our innovative accounting platform that serves enterprises of all sizes.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      experience: "20+ Years",
      specialties: [
        "Strategic Planning",
        "Digital Transformation",
        "Business Development",
        "Fintech Innovation",
      ],
      social: {
        linkedin: "#",
        twitter: "#",
        email: "rajesh@company.com",
        phone: "+91 98765 43210",
      },
      achievements: [
        "Forbes 40 Under 40",
        "Fintech Innovation Award",
        "Business Leader of the Year",
      ],
      education: ["MBA - IIM Ahmedabad", "B.Tech Computer Science - IIT Delhi"],
      certifications: [
        "Certified Financial Planner",
        "Digital Transformation Leader",
        "Agile Project Management",
      ],
      location: "Mumbai, India",
      joinDate: "2009",
      testimonials: [
        {
          id: 1,
          clientName: "Arjun Mehta",
          clientCompany: "TechCorp Solutions",
          clientPosition: "CFO",
          testimonial:
            "Rajesh's strategic vision transformed our entire financial workflow. His deep understanding of both technology and finance helped us reduce our accounting costs by 40% while improving accuracy. His leadership style is inspiring and results-driven.",
          rating: 5,
          projectType: "Digital Transformation",
          date: "2024",
        },
        {
          id: 2,
          clientName: "Priya Agarwal",
          clientCompany: "Global Manufacturing Ltd",
          clientPosition: "CEO",
          testimonial:
            "Working with Rajesh has been a game-changer for our organization. His ability to understand complex business requirements and translate them into actionable solutions is remarkable. The platform he developed has streamlined our operations across 15 locations.",
          rating: 5,
          projectType: "Enterprise Solution",
          date: "2023",
        },
      ],
    },
    {
      id: 2,
      name: "Priya Sharma",
      position: "Chief Technology Officer",
      department: "Technology",
      bio: "Technology innovator specializing in scalable financial systems and AI-driven solutions. Priya leads our technical vision and product development.",
      detailedBio:
        "Priya Sharma is our Chief Technology Officer and the architectural brain behind our cutting-edge financial platform. With 15+ years of experience in building scalable systems, she has led the development of AI-driven solutions that process millions of transactions daily. Priya's expertise in cloud computing and machine learning has been instrumental in creating our intelligent accounting automation features that save businesses countless hours.",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      experience: "15+ Years",
      specialties: [
        "System Architecture",
        "AI & Machine Learning",
        "Cloud Computing",
        "Product Development",
      ],
      social: {
        linkedin: "#",
        email: "priya@company.com",
        phone: "+91 98765 43211",
      },
      achievements: [
        "Tech Innovator Award",
        "Women in Tech Leadership",
        "Cloud Excellence Recognition",
      ],
      education: [
        "M.Tech Computer Science - IIT Bombay",
        "B.E. Software Engineering - BITS Pilani",
      ],
      certifications: [
        "AWS Solutions Architect",
        "Google Cloud Professional",
        "Machine Learning Engineer",
      ],
      location: "Bangalore, India",
      joinDate: "2011",
      testimonials: [
        {
          id: 1,
          clientName: "Vikram Singh",
          clientCompany: "RetailMax India",
          clientPosition: "IT Director",
          testimonial:
            "Priya's technical expertise is unmatched. She designed a system that handles our complex inventory and accounting needs across 200+ stores. The AI features she implemented have reduced our manual work by 60%. Her team's support is exceptional.",
          rating: 5,
          projectType: "AI Implementation",
          date: "2024",
        },
        {
          id: 2,
          clientName: "Neha Kapoor",
          clientCompany: "StartupHub Ventures",
          clientPosition: "Operations Head",
          testimonial:
            "Priya understood our unique challenges as a growing startup. The scalable architecture she built has grown with us from 10 to 500 employees without any performance issues. Her foresight in system design is incredible.",
          rating: 5,
          projectType: "Scalable Platform",
          date: "2023",
        },
      ],
    },
    {
      id: 3,
      name: "Amit Patel",
      position: "Chief Financial Officer",
      department: "Finance",
      bio: "Financial strategist with deep expertise in accounting standards and regulatory compliance. Amit ensures financial excellence and risk management.",
      detailedBio:
        "Amit Patel brings 18+ years of financial expertise to our leadership team. As our CFO, he ensures that every financial solution we develop meets the highest standards of compliance and accuracy. His deep knowledge of Indian accounting standards, GST regulations, and international financial reporting has been crucial in building trust with our enterprise clients.",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      experience: "18+ Years",
      specialties: [
        "Financial Strategy",
        "Risk Management",
        "Regulatory Compliance",
        "Audit & Assurance",
      ],
      social: {
        linkedin: "#",
        email: "amit@company.com",
        phone: "+91 98765 43212",
      },
      achievements: [
        "CA Excellence Award",
        "Financial Leadership Recognition",
        "Risk Management Expert",
      ],
      education: [
        "CA - Institute of Chartered Accountants of India",
        "B.Com - Delhi University",
      ],
      certifications: [
        "Certified Risk Manager",
        "GST Expert",
        "International Financial Reporting Standards",
      ],
      location: "Delhi, India",
      joinDate: "2010",
      testimonials: [
        {
          id: 1,
          clientName: "Rohit Agrawal",
          clientCompany: "Manufacturing Plus",
          clientPosition: "Finance Director",
          testimonial:
            "Amit's guidance during our GST implementation was invaluable. His deep understanding of compliance requirements saved us from potential issues and penalties. The financial controls he recommended have strengthened our entire operation.",
          rating: 5,
          projectType: "Compliance Management",
          date: "2024",
        },
        {
          id: 2,
          clientName: "Sunita Rao",
          clientCompany: "Export Excellence Ltd",
          clientPosition: "Managing Director",
          testimonial:
            "Working with Amit has given us complete confidence in our financial processes. His expertise in international accounting standards helped us secure major overseas contracts. His attention to detail is phenomenal.",
          rating: 5,
          projectType: "Financial Strategy",
          date: "2023",
        },
      ],
    },
    {
      id: 4,
      name: "Sneha Gupta",
      position: "Head of Operations",
      department: "Operations",
      bio: "Operations excellence leader focused on process optimization and client success. Sneha drives operational efficiency and service quality.",
      detailedBio:
        "Sneha Gupta leads our operations with a focus on delivering exceptional client experiences. With 12+ years in operations management, she has built our client success framework that ensures 99% client satisfaction. Sneha's process optimization initiatives have improved our service delivery efficiency by 300% while maintaining the highest quality standards.",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      experience: "12+ Years",
      specialties: [
        "Process Optimization",
        "Client Success",
        "Quality Management",
        "Team Leadership",
      ],
      social: {
        linkedin: "#",
        twitter: "#",
        email: "sneha@company.com",
        phone: "+91 98765 43213",
      },
      achievements: [
        "Operations Excellence",
        "Client Success Champion",
        "Quality Leadership Award",
      ],
      education: [
        "MBA Operations - XLRI Jamshedpur",
        "B.Tech Industrial Engineering - NIT Trichy",
      ],
      certifications: [
        "Six Sigma Black Belt",
        "Project Management Professional",
        "Customer Success Manager",
      ],
      location: "Pune, India",
      joinDate: "2012",
      testimonials: [
        {
          id: 1,
          clientName: "Karan Malhotra",
          clientCompany: "ServiceFirst Group",
          clientPosition: "COO",
          testimonial:
            "Sneha's operational expertise transformed our implementation process. What typically takes 6 months was completed in 2 months with zero issues. Her team's proactive support and attention to detail is outstanding.",
          rating: 5,
          projectType: "Process Optimization",
          date: "2024",
        },
        {
          id: 2,
          clientName: "Meera Joshi",
          clientCompany: "GrowthTech Solutions",
          clientPosition: "Founder",
          testimonial:
            "Sneha's client-centric approach is refreshing. She personally ensured our team was comfortable with the new system and provided ongoing support that exceeded our expectations. Her leadership makes all the difference.",
          rating: 5,
          projectType: "Client Success",
          date: "2023",
        },
      ],
    },
  ];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % teamMembers.length);
  };

  const prevSlide = () => {
    setActiveSlide(
      (prev) => (prev - 1 + teamMembers.length) % teamMembers.length,
    );
  };

  const openModal = (member: TeamMember) => {
    setSelectedMember(member);
    setActiveTestimonial(0);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedMember(null);
    setActiveTestimonial(0);
    document.body.style.overflow = "unset";
  };

  const nextTestimonial = () => {
    if (selectedMember) {
      setActiveTestimonial(
        (prev) => (prev + 1) % selectedMember.testimonials.length,
      );
    }
  };

  const prevTestimonial = () => {
    if (selectedMember) {
      setActiveTestimonial(
        (prev) =>
          (prev - 1 + selectedMember.testimonials.length) %
          selectedMember.testimonials.length,
      );
    }
  };

  return (
    <section className="bg-white py-16 pt-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="relative my-5 ml-[25%] inline-block sm:ml-[30%] md:ml-[35%] lg:ml-[40%]">
          <p className="z-10 text-center text-base font-[400] tracking-[3px] text-(--primery-color) sm:text-lg lg:text-xl">
            Meet Our Amazing Team
          </p>
          <div
            className={`absolute top-0 h-[50%] rounded-lg bg-(--pink) sm:h-full`}
            style={{
              width: "calc(40% + 20px)",
              right: "0",
              transform: "translate(10%, -40%)",
              zIndex: 1,
            }}
          />
        </div>

        {/* Main Heading */}
        <div className="mb-16 text-center">
          {/* <div className="mb-6 flex justify-center">
            <div className="rounded-2xl bg-gradient-to-r from-red-600 to-red-800 p-4 shadow-lg">
              <Users className="h-10 w-10 text-white" />
            </div>
          </div> */}

          <h1 className="text-4xl leading-tight font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Meet Our{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-(--primery-color)">
                Leadership Team
              </span>
              <span className="absolute bottom-0 left-0 z-0 h-3 w-full -rotate-1 transform bg-(--pink) opacity-80"></span>
            </span>
          </h1>
          <p className="mx-auto max-w-3xl py-3 text-lg leading-relaxed text-gray-700 md:text-xl">
            Our experienced leadership team combines decades of expertise in
            finance, technology, and business strategy to drive innovation and
            excellence.
          </p>
        </div>

        {/* Team Stats */}
        <div className="mb-16 grid grid-cols-2 gap-6 md:grid-cols-4">
          {[
            {
              icon: <Users className="h-6 w-6" />,
              number: "50+",
              label: "Team Members",
              color: "from-blue-500 to-blue-600",
            },
            {
              icon: <Award className="h-6 w-6" />,
              number: "15+",
              label: "Years Experience",
              color: "from-green-500 to-green-600",
            },
            {
              icon: <Target className="h-6 w-6" />,
              number: "600+",
              label: "Projects Delivered",
              color: "from-purple-500 to-purple-600",
            },
            {
              icon: <Lightbulb className="h-6 w-6" />,
              number: "25+",
              label: "Innovation Awards",
              color: "from-orange-500 to-orange-600",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="rounded-xl border border-red-300 bg-white p-6 text-center shadow-lg transition-shadow duration-300 hover:shadow-xl"
            >
              <div
                className={`inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r ${stat.color} mb-4 text-white`}
              >
                {stat.icon}
              </div>
              <h3 className="mb-1 text-2xl font-bold text-gray-900 md:text-3xl">
                {stat.number}
              </h3>
              <p className="font-medium text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Desktop Team Grid */}
        <div className="hidden gap-8 lg:grid lg:grid-cols-2 xl:grid-cols-4">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="group cursor-pointer"
              onClick={() => openModal(member)}
            >
              <div className="transform overflow-hidden rounded-2xl border border-red-300 bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                  {/* Social Links - Appear on hover */}
                  <div className="absolute right-4 bottom-4 left-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="flex justify-center space-x-3">
                      {member.social.linkedin && (
                        <a
                          href={member.social.linkedin}
                          className="rounded-lg bg-white/20 p-2 backdrop-blur-sm transition-colors hover:bg-white/30"
                        >
                          <Linkedin className="h-5 w-5 text-white" />
                        </a>
                      )}
                      {member.social.twitter && (
                        <a
                          href={member.social.twitter}
                          className="rounded-lg bg-white/20 p-2 backdrop-blur-sm transition-colors hover:bg-white/30"
                        >
                          <Twitter className="h-5 w-5 text-white" />
                        </a>
                      )}
                      {member.social.email && (
                        <a
                          href={`mailto:${member.social.email}`}
                          className="rounded-lg bg-white/20 p-2 backdrop-blur-sm transition-colors hover:bg-white/30"
                        >
                          <Mail className="h-5 w-5 text-white" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="mb-1 text-xl font-bold text-gray-900">
                      {member.name}
                    </h3>
                    <p className="mb-1 font-semibold text-red-600">
                      {member.position}
                    </p>
                    <p className="text-sm text-gray-500">
                      {member.department} • {member.experience}
                    </p>
                  </div>

                  <p className="mb-4 line-clamp-3 text-sm text-gray-600">
                    {member.bio}
                  </p>

                  {/* Specialties */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {member.specialties
                        .slice(0, 2)
                        .map((specialty, index) => (
                          <span
                            key={index}
                            className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-700"
                          >
                            {specialty}
                          </span>
                        ))}
                      {member.specialties.length > 2 && (
                        <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
                          +{member.specialties.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Top Achievement */}
                  <div className="flex items-center text-xs text-gray-500">
                    <Award className="mr-1 h-3 w-3 text-yellow-500" />
                    {member.achievements[0]}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile/Tablet Carousel */}
        <div className="lg:hidden">
          <div className="relative">
            {/* Carousel Container */}
            <div className="overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              >
                {teamMembers.map((member) => (
                  <div key={member.id} className="w-full flex-shrink-0 cursor-pointer"
              onClick={() => openModal(member)} >
                    <div className="mx-2 rounded-2xl bg-white shadow-lg">
                      <div className="md:flex">
                        {/* Image */}
                        <div className="md:w-1/3">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="h-64 w-full rounded-t-2xl object-cover md:h-full md:rounded-t-none md:rounded-l-2xl"
                          />
                        </div>

                        {/* Content */}
                        <div className="p-6 md:w-2/3">
                          <div className="mb-4">
                            <h3 className="mb-2 text-2xl font-bold text-gray-900">
                              {member.name}
                            </h3>
                            <p className="mb-1 font-semibold text-blue-600">
                              {member.position}
                            </p>
                            <p className="text-gray-500">
                              {member.department} • {member.experience}
                            </p>
                          </div>

                          <p className="mb-6 text-gray-600">{member.bio}</p>

                          {/* Specialties */}
                          <div className="mb-6">
                            <h4 className="mb-2 font-semibold text-gray-900">
                              Specialties
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {member.specialties.map((specialty, index) => (
                                <span
                                  key={index}
                                  className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700"
                                >
                                  {specialty}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Achievements */}
                          <div className="mb-6">
                            <h4 className="mb-2 font-semibold text-gray-900">
                              Key Achievements
                            </h4>
                            <ul className="space-y-1">
                              {member.achievements
                                .slice(0, 2)
                                .map((achievement, index) => (
                                  <li
                                    key={index}
                                    className="flex items-center text-sm text-gray-600"
                                  >
                                    <Award className="mr-2 h-4 w-4 text-yellow-500" />
                                    {achievement}
                                  </li>
                                ))}
                            </ul>
                          </div>

                          {/* Social Links */}
                          <div className="flex space-x-4">
                            {member.social.linkedin && (
                              <a
                                href={member.social.linkedin}
                                className="rounded-lg bg-blue-100 p-2 transition-colors hover:bg-blue-200"
                              >
                                <Linkedin className="h-5 w-5 text-blue-600" />
                              </a>
                            )}
                            {member.social.twitter && (
                              <a
                                href={member.social.twitter}
                                className="rounded-lg bg-blue-100 p-2 transition-colors hover:bg-blue-200"
                              >
                                <Twitter className="h-5 w-5 text-blue-600" />
                              </a>
                            )}
                            {member.social.email && (
                              <a
                                href={`mailto:${member.social.email}`}
                                className="rounded-lg bg-blue-100 p-2 transition-colors hover:bg-blue-200"
                              >
                                <Mail className="h-5 w-5 text-blue-600" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute top-1/2 left-0 -translate-x-4 -translate-y-1/2 transform rounded-full bg-white p-3 shadow-lg transition-shadow duration-300 hover:shadow-xl"
              aria-label="Previous team member"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-0 translate-x-4 -translate-y-1/2 transform rounded-full bg-white p-3 shadow-lg transition-shadow duration-300 hover:shadow-xl"
              aria-label="Next team member"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>

            {/* Indicators */}
            <div className="mt-6 flex justify-center space-x-2">
              {teamMembers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`h-3 w-3 rounded-full transition-colors duration-300 ${
                    index === activeSlide ? "bg-blue-600" : "bg-gray-300"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="rounded-2xl bg-gradient-to-r from-gray-900 to-black p-8 text-white md:p-12">
            <h3 className="mb-4 text-3xl font-bold md:text-4xl">
              Want to Join Our Team?
            </h3>
            <p className="mb-8 text-xl opacity-90">
              {`We're always looking for talented individuals who share our
              passion for innovation and excellence.`}
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button className="rounded-xl bg-white px-8 py-3 font-semibold text-gray-900 transition-all transition-colors duration-300 hover:-translate-y-1 hover:bg-gray-100">
                View Open Positions
              </button>
              <button className="rounded-xl border-2 border-white px-8 py-3 font-semibold text-white transition-all transition-colors duration-300 hover:-translate-y-1 hover:bg-white/10">
                Learn About Our Culture
              </button>
            </div>
          </div>
        </div>
      </div>

      {selectedMember && (
        <>
          <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Overlay */}
            <div
              className="fixed inset-0 transition-opacity"
              style={{ backgroundColor: "#000" }}
              onClick={closeModal}
            />

            {/* Modal Content */}
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="relative max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-6 right-6 z-10 rounded-full bg-white p-2 shadow-lg transition-shadow duration-300 hover:shadow-xl"
                  style={{ backgroundColor: "#FCF2F2", color: "#C50202" }}
                >
                  <X className="h-6 w-6" />
                </button>

                {/* Header Section */}
                <div className="relative">
                  <div
                    className="h-64 md:h-80"
                    style={{ backgroundColor: "#FCF2F2" }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <img
                          src={selectedMember.image}
                          alt={selectedMember.name}
                          className="mx-auto mb-6 h-32 w-32 rounded-full border-4 border-white object-cover shadow-2xl md:h-40 md:w-40"
                        />
                        <h2
                          className="mb-2 text-3xl font-bold md:text-4xl"
                          style={{ color: "#000000" }}
                        >
                          {selectedMember.name}
                        </h2>
                        <p
                          className="mb-2 text-xl font-semibold md:text-2xl"
                          style={{ color: "#C50202" }}
                        >
                          {selectedMember.position}
                        </p>
                        <div className="flex items-center justify-center space-x-4 text-gray-600">
                          <div className="flex items-center">
                            <MapPin className="mr-1 h-4 w-4" />
                            {selectedMember.location}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="mr-1 h-4 w-4" />
                            Since {selectedMember.joinDate}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="p-8">
                  <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Left Column - Details */}
                    <div className="space-y-8 lg:col-span-2">
                      {/* About */}
                      <div>
                        <h3
                          className="mb-4 text-2xl font-bold"
                          style={{ color: "#000000" }}
                        >
                          About {selectedMember.name}
                        </h3>
                        <p className="leading-relaxed text-gray-700">
                          {selectedMember.detailedBio}
                        </p>
                      </div>

                      {/* Specialties */}
                      <div>
                        <h3
                          className="mb-4 text-xl font-bold"
                          style={{ color: "#000000" }}
                        >
                          Areas of Expertise
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          {selectedMember.specialties.map(
                            (specialty, index) => (
                              <span
                                key={index}
                                className="rounded-full px-4 py-2 font-medium"
                                style={{
                                  backgroundColor: "#FFCCD6",
                                  color: "#C50202",
                                }}
                              >
                                {specialty}
                              </span>
                            ),
                          )}
                        </div>
                      </div>

                      {/* Education */}
                      <div>
                        <h3
                          className="mb-4 text-xl font-bold"
                          style={{ color: "#000000" }}
                        >
                          Education
                        </h3>
                        <ul className="space-y-2">
                          {selectedMember.education.map((edu, index) => (
                            <li
                              key={index}
                              className="flex items-center text-gray-700"
                            >
                              <div
                                className="mr-3 h-2 w-2 rounded-full"
                                style={{ backgroundColor: "#C50202" }}
                              ></div>
                              {edu}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Certifications */}
                      <div>
                        <h3
                          className="mb-4 text-xl font-bold"
                          style={{ color: "#000000" }}
                        >
                          Certifications
                        </h3>
                        <ul className="space-y-2">
                          {selectedMember.certifications.map((cert, index) => (
                            <li
                              key={index}
                              className="flex items-center text-gray-700"
                            >
                              <Award
                                className="mr-3 h-4 w-4"
                                style={{ color: "#C50202" }}
                              />
                              {cert}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Right Column - Contact & Stats */}
                    <div className="space-y-6">
                      {/* Contact Card */}
                      <div
                        className="rounded-xl border-2 p-6"
                        style={{
                          backgroundColor: "#FCF2F2",
                          borderColor: "#FFCCD6",
                        }}
                      >
                        <h3
                          className="mb-4 text-lg font-bold"
                          style={{ color: "#000000" }}
                        >
                          Contact Information
                        </h3>
                        <div className="space-y-3">
                          {selectedMember.social.email && (
                            <a
                              href={`mailto:${selectedMember.social.email}`}
                              className="flex items-center text-gray-700 transition-colors hover:text-red-600"
                            >
                              <Mail className="mr-3 h-5 w-5" />
                              {selectedMember.social.email}
                            </a>
                          )}
                          {selectedMember.social.phone && (
                            <a
                              href={`tel:${selectedMember.social.phone}`}
                              className="flex items-center text-gray-700 transition-colors hover:text-red-600"
                            >
                              <Phone className="mr-3 h-5 w-5" />
                              {selectedMember.social.phone}
                            </a>
                          )}
                          <div className="flex space-x-3 pt-2">
                            {selectedMember.social.linkedin && (
                              <a
                                href={selectedMember.social.linkedin}
                                className="rounded-lg p-2 transition-colors"
                                style={{
                                  backgroundColor: "#FFCCD6",
                                  color: "#C50202",
                                }}
                              >
                                <Linkedin className="h-5 w-5" />
                              </a>
                            )}
                            {selectedMember.social.twitter && (
                              <a
                                href={selectedMember.social.twitter}
                                className="rounded-lg p-2 transition-colors"
                                style={{
                                  backgroundColor: "#FFCCD6",
                                  color: "#C50202",
                                }}
                              >
                                <Twitter className="h-5 w-5" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Achievements */}
                      <div
                        className="rounded-xl p-6"
                        style={{ backgroundColor: "#EEF6FF" }}
                      >
                        <h3
                          className="mb-4 text-lg font-bold"
                          style={{ color: "#000000" }}
                        >
                          Key Achievements
                        </h3>
                        <ul className="space-y-2">
                          {selectedMember.achievements.map(
                            (achievement, index) => (
                              <li
                                key={index}
                                className="flex items-start text-gray-700"
                              >
                                <Star
                                  className="mt-1 mr-2 h-4 w-4 flex-shrink-0"
                                  style={{ color: "#C50202" }}
                                />
                                <span className="text-sm">{achievement}</span>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* { */}
                  <div className="mt-12">
                    <div className="mb-8 text-center">
                      <h3
                        className="mb-4 text-2xl font-bold md:text-3xl"
                        style={{ color: "#000000" }}
                      >
                        What Clients Say About {selectedMember.name}
                      </h3>
                      <p className="text-gray-600">
                        Real feedback from clients who worked directly with{" "}
                        {selectedMember.name}
                      </p>
                    </div>

                    {selectedMember.testimonials.length > 0 && (
                      <>
                        <div className="relative">
                          <div
                            className="relative overflow-hidden rounded-2xl p-8 text-center md:p-12"
                            style={{ backgroundColor: "#FCF2F2" }}
                          >
                            {/* Quote decoration */}
                            <Quote
                              className="absolute top-4 left-4 h-12 w-12 opacity-10"
                              style={{
                                color: "#C50202",
                                transform: "scaleX(-1)",
                              }}
                            />
                            <Quote
                              className="absolute right-4 bottom-4 h-12 w-12 opacity-10"
                              style={{ color: "#C50202" }}
                            />

                            {/* Testimonial content */}
                            <div className="relative z-10 mx-auto max-w-4xl">
                              <div className="mb-6 flex justify-center">
                                <div className="flex">
                                  {typeof selectedMember?.testimonials?.[
                                    activeTestimonial
                                  ]?.rating === "number" &&
                                    Array.from(
                                      {
                                        length:
                                          selectedMember.testimonials[
                                            activeTestimonial
                                          ].rating,
                                      },
                                      (_, i) => (
                                        <Star
                                          key={i}
                                          className="h-6 w-6 fill-current"
                                          style={{ color: "#C50202" }}
                                        />
                                      ),
                                    )}
                                </div>
                              </div>

                              <blockquote className="mb-8 text-xl font-medium text-black italic md:text-2xl">
                                "
                                {selectedMember?.testimonials?.[
                                  activeTestimonial
                                ]?.testimonial ?? ""}
                                "
                              </blockquote>

                              <div className="flex flex-col items-center">
                                <div
                                  className="mb-4 h-1 w-16 rounded-full"
                                  style={{ backgroundColor: "#C50202" }}
                                />

                                <p
                                  className="text-lg font-bold"
                                  style={{ color: "#000000" }}
                                >
                                  {selectedMember?.testimonials?.[
                                    activeTestimonial
                                  ]?.clientName ?? ""}
                                </p>

                                <p className="text-gray-600">
                                  {[
                                    selectedMember?.testimonials?.[
                                      activeTestimonial
                                    ]?.clientPosition,
                                    selectedMember?.testimonials?.[
                                      activeTestimonial
                                    ]?.clientCompany,
                                  ]
                                    .filter(Boolean)
                                    .join(", ") ?? ""}
                                </p>

                                <div
                                  className="mt-4 rounded-full px-4 py-2 text-sm font-medium"
                                  style={{
                                    backgroundColor: "#FFCCD6",
                                    color: "#C50202",
                                  }}
                                >
                                  {[
                                    selectedMember?.testimonials?.[
                                      activeTestimonial
                                    ]?.projectType,
                                    selectedMember?.testimonials?.[
                                      activeTestimonial
                                    ]?.date,
                                  ]
                                    .filter(Boolean)
                                    .join(" • ") ?? ""}
                                </div>
                              </div>
                            </div>

                            {/* Navigation Arrows */}
                            <button
                              onClick={prevTestimonial}
                              className="absolute top-1/2 left-4 -translate-y-1/2 transform rounded-full p-3 shadow-md transition-all"
                              style={{
                                backgroundColor: "#FFCCD6",
                                color: "#C50202",
                              }}
                              aria-label="Previous testimonial"
                            >
                              <ChevronLeft className="h-6 w-6" />
                            </button>
                            <button
                              onClick={nextTestimonial}
                              className="absolute top-1/2 right-4 -translate-y-1/2 transform rounded-full p-3 shadow-md transition-all"
                              style={{
                                backgroundColor: "#FFCCD6",
                                color: "#C50202",
                              }}
                              aria-label="Next testimonial"
                            >
                              <ChevronRight className="h-6 w-6" />
                            </button>
                          </div>
                        </div>

                        {/* Testimonial Indicators */}
                        <div className="mt-6 flex justify-center space-x-2">
                          {selectedMember.testimonials.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setActiveTestimonial(index)}
                              className={`h-3 w-3 rounded-full transition-colors duration-300`}
                              style={{
                                backgroundColor:
                                  index === activeTestimonial
                                    ? "#C50202"
                                    : "#C5020233",
                              }}
                              aria-label={`View testimonial ${index + 1}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

// export default TeamSection;
