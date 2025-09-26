"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
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
import Image from "next/image";
import Link from "next/link";
import type { TeamMember } from "src/_components/sections/types/team.type";
import { teamMembers } from "public/data/Team";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import {
  hero_content_font,
  hero_heading_font,
  hero_headline_font,
} from "src/config/constants";
// import { ProfileCard } from "src/_components/molecules";

export const TeamSection = () => {
  // const [activeSlide, setActiveSlide] = useState(0);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // const nextSlide = () => {
  //   setActiveSlide((prev) => (prev + 1) % teamMembers.length);
  // };

  // const prevSlide = () => {
  //   setActiveSlide(
  //     (prev) => (prev - 1 + teamMembers.length) % teamMembers.length,
  //   );
  // };

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

  const nextTestimonial = useCallback(() => {
    if (selectedMember) {
      setActiveTestimonial(
        (prev) => (prev + 1) % selectedMember.testimonials.length,
      );
    }
  }, [selectedMember]);

  const prevTestimonial = useCallback(() => {
    if (selectedMember) {
      setActiveTestimonial(
        (prev) =>
          (prev - 1 + selectedMember.testimonials.length) %
          selectedMember.testimonials.length,
      );
    }
  }, [selectedMember]);

  // Now you can safely reference them in an effect:
  useEffect(() => {
    const intervalId = setInterval(nextTestimonial, 2000);
    return () => clearInterval(intervalId);
  }, [nextTestimonial]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedMember) {
        if (event.key === "Escape") {
          closeModal();
        } else if (event.key === "ArrowLeft") {
          prevTestimonial();
        } else if (event.key === "ArrowRight") {
          nextTestimonial();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedMember, nextTestimonial, prevTestimonial]);

  return (
    <section className="bg-white py-19 sm:py-12 md:py-16 lg:py-20 xl:py-24">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Badge */}
        <div className="my-3 flex justify-center sm:my-5">
          <div className="relative inline-block">
            <p
              className={`${hero_heading_font} text-center font-medium sm:text-base`}
            >
              Meet Our Amazing Team
            </p>
            <div
              className="absolute top-0 h-[50%] rounded-lg bg-[var(--pink)] sm:h-full"
              style={{
                width: "calc(40% + 20px)",
                right: "0",
                transform: "translate(10%, -40%)",
                zIndex: 1,
              }}
            />
          </div>
        </div>

        {/* Main Heading */}
        <div className="mb-8 text-center sm:mb-12 md:mb-16">
          <h1 className={`${hero_headline_font}`}>
            Meet Our{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-(--primery-color)">
                Leadership Team
              </span>
              <span className="absolute bottom-0 left-0 z-0 h-2 w-full -rotate-1 transform bg-(--pink) opacity-80 sm:h-3"></span>
            </span>
          </h1>
          <p
            className={`mx-auto max-w-3xl px-4 py-2 sm:px-0 sm:py-3 ${hero_content_font}`}
          >
            Our experienced leadership team combines decades of expertise in
            finance, technology, and business strategy to drive innovation and
            excellence.
          </p>
        </div>

        {/* Team Stats */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:mb-12 sm:gap-4 md:mb-16 md:gap-6 lg:grid-cols-4">
          {[
            {
              icon: <Users className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />,
              number: "50+",
              label: "Team Members",
              color: "from-blue-500 to-blue-600",
            },
            {
              icon: <Award className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />,
              number: "15+",
              label: "Years Experience",
              color: "from-green-500 to-green-600",
            },
            {
              icon: <Target className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />,
              number: "600+",
              label: "Projects Delivered",
              color: "from-purple-500 to-purple-600",
            },
            {
              icon: (
                <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
              ),
              number: "25+",
              label: "Innovation Awards",
              color: "from-orange-500 to-orange-600",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="rounded-lg border border-red-300 bg-white p-3 text-center shadow-lg transition-shadow duration-300 hover:shadow-xl sm:rounded-xl sm:p-4 md:p-6"
            >
              <div
                className={`inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r sm:h-10 sm:w-10 md:h-12 md:w-12 ${stat.color} mb-2 text-white sm:mb-3 md:mb-4`}
              >
                {stat.icon}
              </div>
              <h3 className="mb-1 text-lg font-bold text-gray-900 sm:text-xl md:text-2xl lg:text-3xl">
                {stat.number}
              </h3>
              <p className="text-xs font-medium text-gray-600 sm:text-sm md:text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Desktop Team Grid */}
        <div className="hidden gap-6 lg:gap-8 xl:grid xl:grid-cols-2 2xl:grid-cols-4">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="group cursor-pointer"
              onClick={() => openModal(member)}
            >
              {/* <ProfileCard
                name={member.name}
                title={member.position}
                handle={member.name}
                status="Online"
                contactText="Contact Me"
                avatarUrl={member.image}
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => openModal(member)}
              /> */}
              <div className="transform overflow-hidden rounded-2xl border border-red-300 bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                <div className="relative h-56 overflow-hidden lg:h-64">
                  <Image
                    width={200}
                    height={200}
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 "
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                  <div className="absolute right-4 bottom-4 left-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="flex justify-center space-x-3">
                      {member.social.linkedin && (
                        <a
                          href={member.social.linkedin}
                          className="rounded-lg bg-white/20 p-2 backdrop-blur-sm transition-colors hover:bg-white/30"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FaLinkedin className="h-5 w-5 text-white" />
                        </a>
                      )}
                      {member.social.twitter && (
                        <a
                          href={member.social.twitter}
                          className="rounded-lg bg-white/20 p-2 backdrop-blur-sm transition-colors hover:bg-white/30"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FaTwitter className="h-5 w-5 text-white" />
                        </a>
                      )}
                      {member.social.email && (
                        <a
                          href={`mailto:${member.social.email}`}
                          className="rounded-lg bg-white/20 p-2 backdrop-blur-sm transition-colors hover:bg-white/30"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Mail className="h-5 w-5 text-white" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-4 lg:p-6">
                  <div className="mb-4">
                    <h3 className="mb-1 text-lg font-bold text-gray-900 lg:text-xl">
                      {member.name}
                    </h3>
                    <p className="mb-1 text-sm font-semibold text-red-600 lg:text-base">
                      {member.position}
                    </p>
                    <p className="text-xs text-gray-500 lg:text-sm">
                      {member.department} • {member.experience}
                    </p>
                  </div>

                  <p className="mb-4 line-clamp-3 text-xs text-gray-600 lg:text-sm">
                    {member.bio}
                  </p>

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

                  <div className="flex items-center text-xs text-gray-500">
                    <Award className="mr-1 h-3 w-3 flex-shrink-0 text-yellow-500" />
                    <span className="line-clamp-2">
                      {member.achievements[0]}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile/Tablet Grid and Carousel */}
        <div className="xl:hidden">
          {/* Tablet Grid (md and lg screens) */}
          <div className="hidden gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="group cursor-pointer"
                onClick={() => openModal(member)}
              >
                {/* <ProfileCard
                  name={member.name}
                  title={member.position}
                  handle={member.name}
                  status="Online"
                  contactText="Contact Me"
                  avatarUrl={member.image}
                  showUserInfo={true}
                  enableTilt={true}
                  enableMobileTilt={false}
                  // onContactClick={() => openModal(member)}
                /> */}
                <div className="transform overflow-hidden rounded-xl border border-red-300 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl lg:rounded-2xl">
                  <div className="relative h-48 overflow-hidden lg:h-56">
                    <Image
                      width={200}
                      height={200}
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-4 lg:p-5">
                    <div className="mb-3">
                      <h3 className="mb-1 line-clamp-1 text-lg font-bold text-gray-900">
                        {member.name}
                      </h3>
                      <p className="mb-1 line-clamp-1 text-sm font-semibold text-red-600">
                        {member.position}
                      </p>
                      <p className="text-xs text-gray-500">
                        {member.department}
                      </p>
                    </div>

                    <p className="mb-3 line-clamp-2 text-sm text-gray-600">
                      {member.bio}
                    </p>

                    <div className="mb-3">
                      <div className="flex flex-wrap gap-1">
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
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      {member.social.linkedin && (
                        <a
                          href={member.social.linkedin}
                          className="rounded-lg bg-red-100 p-2 transition-colors hover:bg-red-200"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FaLinkedin className="h-4 w-4 text-red-600" />
                        </a>
                      )}
                      {member.social.twitter && (
                        <a
                          href={member.social.twitter}
                          className="rounded-lg bg-red-100 p-2 transition-colors hover:bg-red-200"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FaTwitter className="h-4 w-4 text-red-600" />
                        </a>
                      )}
                      {member.social.email && (
                        <a
                          href={`mailto:${member.social.email}`}
                          className="rounded-lg bg-red-100 p-2 transition-colors hover:bg-red-200"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Mail className="h-4 w-4 text-red-600" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden">
            <div className="relative">
              {/* Carousel Container */}
              <div className="overflow-hidden rounded-xl">
                <div className="grid-row-2 grid transition-transform duration-300 ease-in-out">
                  {/* {teamMembers.map((member) => (
                    <div
                      key={member.id}
                      className="my-2 w-full flex-shrink-0 cursor-pointer px-1"
                      onClick={() => openModal(member)}
                    >
                      <ProfileCard
                        name={member.name}
                        title={member.position}
                        handle={member.name}
                        status="Online"
                        contactText="Contact Me"
                        avatarUrl={member.image}
                        showUserInfo={true}
                        enableTilt={true}
                        enableMobileTilt={false}
                        onContactClick={() => openModal(member)}
                      />
                    </div>
                  ))} */}

                  {teamMembers.map((member) => (
                    <div
                      key={member.id}
                      className="my-2 w-full flex-shrink-0 cursor-pointer px-1"
                      onClick={() => openModal(member)}
                    >
                      <div className="rounded-xl border border-red-200 bg-white shadow-lg">
                        <div className="relative h-48 overflow-hidden rounded-t-xl sm:h-56">
                          <Image
                            width={200}
                            height={200}
                            src={member.image}
                            alt={member.name}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div className="p-4 sm:p-5">
                          <div className="mb-3">
                            <h3 className="mb-1 text-lg font-bold text-gray-900 sm:text-xl">
                              {member.name}
                            </h3>
                            <p className="mb-1 text-sm font-semibold text-red-600 sm:text-base">
                              {member.position}
                            </p>
                            <p className="text-xs text-gray-500 sm:text-sm">
                              {member.department} • {member.experience}
                            </p>
                          </div>

                          <p className="mb-4 line-clamp-3 text-sm text-gray-600">
                            {member.bio}
                          </p>

                          <div className="mb-4">
                            <div className="flex flex-wrap gap-2">
                              {member.specialties
                                .slice(0, 3)
                                .map((specialty, index) => (
                                  <span
                                    key={index}
                                    className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-700"
                                  >
                                    {specialty}
                                  </span>
                                ))}
                              {member.specialties.length > 3 && (
                                <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
                                  +{member.specialties.length - 3}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="mb-4 flex items-start text-xs text-gray-500">
                            <Award className="mt-0.5 mr-2 h-3 w-3 flex-shrink-0 text-yellow-500" />
                            <span className="line-clamp-2">
                              {member.achievements[0]}
                            </span>
                          </div>

                          <div className="flex space-x-3">
                            {member.social.linkedin && (
                              <a
                                href={member.social.linkedin}
                                className="rounded-lg bg-red-100 p-2 transition-colors hover:bg-red-200"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <FaLinkedin className="h-4 w-4 text-red-600" />
                              </a>
                            )}
                            {member.social.twitter && (
                              <a
                                href={member.social.twitter}
                                className="rounded-lg bg-red-100 p-2 transition-colors hover:bg-red-200"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <FaTwitter className="h-4 w-4 text-red-600" />
                              </a>
                            )}
                            {member.social.email && (
                              <a
                                href={`mailto:${member.social.email}`}
                                className="rounded-lg bg-red-100 p-2 transition-colors hover:bg-red-200"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Mail className="h-4 w-4 text-red-600" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              {/* <button  
                onClick={prevSlide}
                className="absolute top-1/2 -left-2 sm:-left-4 -translate-y-1/2 transform rounded-full bg-white p-2 sm:p-3 shadow-lg transition-shadow duration-300 hover:shadow-xl z-10"
                aria-label="Previous team member"
              >
                <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6 text-gray-600" />
              </button>
              <button  
                onClick={nextSlide}
                className="absolute top-1/2 -right-2 sm:-right-4 -translate-y-1/2 transform rounded-full bg-white p-2 sm:p-3 shadow-lg transition-shadow duration-300 hover:shadow-xl z-10"
                aria-label="Next team member"
              >
                <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6 text-gray-600" />
              </button> */}

              {/* Indicators */}
              {/* <div className="mt-4 sm:mt-6 flex justify-center space-x-2">
                {teamMembers.map((_, index) => (
                  <button  
                    key={index}
                    onClick={() => setActiveSlide(index)}
                    className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full transition-colors duration-300 ${
                      index === activeSlide ? "bg-red-600" : "bg-gray-300"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div> */}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 text-center sm:mt-12 md:mt-16">
          <div className="rounded-xl bg-gradient-to-r from-gray-900 to-black p-6 text-white sm:rounded-2xl sm:p-8 md:p-12">
            <h3 className="mb-3 text-xl font-bold sm:mb-4 sm:text-2xl md:text-3xl lg:text-4xl">
              Want to Join Our Team?
            </h3>
            <p className="mx-auto mb-6 max-w-2xl text-base opacity-90 sm:mb-8 sm:text-lg md:text-xl">
              {`We're always looking for talented individuals who share our
              passion for innovation and excellence.`}
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
              <Link
                href="/career"
                className="rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-gray-900 transition-all duration-300 hover:-translate-y-1 hover:bg-gray-100 sm:rounded-xl sm:px-8 sm:py-3 sm:text-base"
              >
                View Open Positions
              </Link>
              <Link
                href="/gallery"
                className="rounded-lg border-2 border-white px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 sm:rounded-xl sm:px-8 sm:py-3 sm:text-base"
              >
                Learn About Our Culture
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedMember && (
        <>
          <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black/74 transition-opacity"
              onClick={closeModal}
            />

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="fixed top-2 right-2 z-[60] flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-black/80 text-white backdrop-blur-sm transition-all duration-200 hover:bg-black sm:top-4 sm:right-4 sm:h-10 sm:w-10"
              aria-label="Close preview"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

            {/* Modal Content */}
            <div className="flex min-h-full items-start justify-center p-2 pt-12 sm:items-center sm:p-4 sm:pt-4">
              <div className="relative max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-xl bg-white shadow-2xl sm:rounded-2xl">
                {/* Header Section */}
                <div className="relative">
                  <div
                    className="h-48 sm:h-64 md:h-80"
                    style={{ backgroundColor: "#FCF2F2" }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center px-4">
                      <div className="text-center">
                        <Image
                          width={160}
                          height={160}
                          src={selectedMember.image}
                          alt={selectedMember.name}
                          className="mx-auto mb-3 h-20 w-20 rounded-full border-2 border-white object-cover shadow-2xl sm:mb-4 sm:h-28 sm:w-28 sm:border-4 md:mb-6 md:h-32 md:w-32 lg:h-40 lg:w-40"
                        />
                        <h2
                          className="mb-1 text-xl font-bold sm:mb-2 sm:text-2xl md:text-3xl lg:text-4xl"
                          style={{ color: "#000000" }}
                        >
                          {selectedMember.name}
                        </h2>
                        <p
                          className="mb-1 text-base font-semibold sm:mb-2 sm:text-lg md:text-xl lg:text-2xl"
                          style={{ color: "#C50202" }}
                        >
                          {selectedMember.position}
                        </p>
                        <div className="flex flex-col items-center justify-center space-y-1 text-xs text-gray-600 sm:flex-row sm:space-y-0 sm:space-x-4 sm:text-sm">
                          <div className="flex items-center">
                            <MapPin className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                            {selectedMember.location}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                            Since {selectedMember.joinDate}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="p-4 sm:p-6 md:p-8">
                  <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3">
                    {/* Left Column - Details */}
                    <div className="space-y-6 sm:space-y-8 lg:col-span-2">
                      {/* About */}
                      <div>
                        <h3
                          className="mb-3 text-lg font-bold sm:mb-4 sm:text-xl md:text-2xl"
                          style={{ color: "#000000" }}
                        >
                          About {selectedMember.name}
                        </h3>
                        <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
                          {selectedMember.detailedBio}
                        </p>
                      </div>

                      {/* Specialties */}
                      <div>
                        <h3
                          className="mb-3 text-lg font-bold sm:mb-4 sm:text-xl"
                          style={{ color: "#000000" }}
                        >
                          Areas of Expertise
                        </h3>
                        <div className="flex flex-wrap gap-2 sm:gap-3">
                          {selectedMember.specialties.map(
                            (specialty, index) => (
                              <span
                                key={index}
                                className="rounded-full px-3 py-1.5 text-xs font-medium sm:px-4 sm:py-2 sm:text-sm"
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
                          className="mb-3 text-lg font-bold sm:mb-4 sm:text-xl"
                          style={{ color: "#000000" }}
                        >
                          Education
                        </h3>
                        <ul className="space-y-2">
                          {selectedMember.education.map((edu, index) => (
                            <li
                              key={index}
                              className="flex items-start text-sm text-gray-700 sm:text-base"
                            >
                              <div
                                className="mt-2 mr-2 h-2 w-2 flex-shrink-0 rounded-full sm:mr-3"
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
                          className="mb-3 text-lg font-bold sm:mb-4 sm:text-xl"
                          style={{ color: "#000000" }}
                        >
                          Certifications
                        </h3>
                        <ul className="space-y-2">
                          {selectedMember.certifications.map((cert, index) => (
                            <li
                              key={index}
                              className="flex items-start text-sm text-gray-700 sm:text-base"
                            >
                              <Award
                                className="mt-0.5 mr-2 h-4 w-4 flex-shrink-0 sm:mr-3"
                                style={{ color: "#C50202" }}
                              />
                              {cert}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Right Column - Contact & Stats */}
                    <div className="space-y-4 sm:space-y-6">
                      {/* Contact Card */}
                      <div
                        className="rounded-lg border-2 p-4 sm:rounded-xl sm:p-6"
                        style={{
                          backgroundColor: "#FCF2F2",
                          borderColor: "#FFCCD6",
                        }}
                      >
                        <h3
                          className="mb-3 text-base font-bold sm:mb-4 sm:text-lg"
                          style={{ color: "#000000" }}
                        >
                          Contact Information
                        </h3>
                        <div className="space-y-2 sm:space-y-3">
                          {selectedMember.social.email && (
                            <a
                              href={`mailto:${selectedMember.social.email}`}
                              className="flex items-center text-sm text-gray-700 transition-colors hover:text-red-600 sm:text-base"
                            >
                              <Mail className="mr-2 h-4 w-4 flex-shrink-0 sm:mr-3 sm:h-5 sm:w-5" />
                              <span className="break-all">
                                {selectedMember.social.email}
                              </span>
                            </a>
                          )}
                          {selectedMember.social.phone && (
                            <a
                              href={`tel:${selectedMember.social.phone}`}
                              className="flex items-center text-sm text-gray-700 transition-colors hover:text-red-600 sm:text-base"
                            >
                              <Phone className="mr-2 h-4 w-4 flex-shrink-0 sm:mr-3 sm:h-5 sm:w-5" />
                              {selectedMember.social.phone}
                            </a>
                          )}
                          <div className="flex space-x-2 pt-2 sm:space-x-3">
                            {selectedMember.social.linkedin && (
                              <a
                                href={selectedMember.social.linkedin}
                                className="rounded-lg p-2 transition-colors"
                                style={{
                                  backgroundColor: "#FFCCD6",
                                  color: "#C50202",
                                }}
                              >
                                <FaLinkedin className="h-4 w-4 sm:h-5 sm:w-5" />
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
                                <FaTwitter className="h-4 w-4 sm:h-5 sm:w-5" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Achievements */}
                      <div
                        className="rounded-lg p-4 sm:rounded-xl sm:p-6"
                        style={{ backgroundColor: "#EEF6FF" }}
                      >
                        <h3
                          className="mb-3 text-base font-bold sm:mb-4 sm:text-lg"
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
                                  className="mt-1 mr-2 h-3 w-3 flex-shrink-0 sm:h-4 sm:w-4"
                                  style={{ color: "#C50202" }}
                                />
                                <span className="text-xs sm:text-sm">
                                  {achievement}
                                </span>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Testimonials Section */}
                  <div className="mt-8 sm:mt-12">
                    <div className="mb-6 text-center sm:mb-8">
                      <h3
                        className="mb-2 text-xl font-bold sm:mb-4 sm:text-2xl md:text-3xl"
                        style={{ color: "#000000" }}
                      >
                        What Clients Say About {selectedMember.name}
                      </h3>
                      <p className="text-sm text-gray-600 sm:text-base">
                        Real feedback from clients who worked directly with{" "}
                        {selectedMember.name}
                      </p>
                    </div>

                    {selectedMember.testimonials.length > 0 && (
                      <>
                        <div className="relative">
                          <div
                            className="relative overflow-hidden rounded-xl p-6 text-center sm:rounded-2xl sm:p-8 md:p-12"
                            style={{ backgroundColor: "#FCF2F2" }}
                          >
                            {/* Quote decoration */}
                            <Quote
                              className="absolute top-2 left-2 h-8 w-8 opacity-10 sm:top-4 sm:left-4 sm:h-12 sm:w-12"
                              style={{
                                color: "#C50202",
                                transform: "scaleX(-1)",
                              }}
                            />
                            <Quote
                              className="absolute right-2 bottom-2 h-8 w-8 opacity-10 sm:right-4 sm:bottom-4 sm:h-12 sm:w-12"
                              style={{ color: "#C50202" }}
                            />

                            {/* Testimonial content */}
                            <div className="relative z-10 mx-auto max-w-4xl">
                              <div className="mb-4 flex justify-center sm:mb-6">
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
                                          className="h-4 w-4 fill-current sm:h-6 sm:w-6"
                                          style={{ color: "#C50202" }}
                                        />
                                      ),
                                    )}
                                </div>
                              </div>

                              <blockquote className="mb-6 text-base font-medium text-black italic sm:mb-8 sm:text-lg md:text-xl lg:text-2xl">
                                {` "
                                ${
                                  selectedMember?.testimonials?.[
                                    activeTestimonial
                                  ]?.testimonial ?? ""
                                }
                                "`}
                              </blockquote>

                              <div className="flex flex-col items-center">
                                <div
                                  className="mb-3 h-1 w-12 rounded-full sm:mb-4 sm:w-16"
                                  style={{ backgroundColor: "#C50202" }}
                                />

                                <p
                                  className="text-base font-bold sm:text-lg"
                                  style={{ color: "#000000" }}
                                >
                                  {selectedMember?.testimonials?.[
                                    activeTestimonial
                                  ]?.clientName ?? ""}
                                </p>

                                <p className="text-center text-sm text-gray-600 sm:text-base">
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
                                  className="mt-3 rounded-full px-3 py-1.5 text-xs font-medium sm:mt-4 sm:px-4 sm:py-2 sm:text-sm"
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
                            {selectedMember.testimonials.length > 1 && (
                              <>
                                <button
                                  onClick={prevTestimonial}
                                  className="absolute top-1/2 left-2 -translate-y-1/2 transform rounded-full p-2 shadow-md transition-all sm:left-4 sm:p-3"
                                  style={{
                                    backgroundColor: "#FFCCD6",
                                    color: "#C50202",
                                  }}
                                  aria-label="Previous testimonial"
                                >
                                  <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
                                </button>
                                <button
                                  onClick={nextTestimonial}
                                  className="absolute top-1/2 right-2 -translate-y-1/2 transform rounded-full p-2 shadow-md transition-all sm:right-4 sm:p-3"
                                  style={{
                                    backgroundColor: "#FFCCD6",
                                    color: "#C50202",
                                  }}
                                  aria-label="Next testimonial"
                                >
                                  <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
                                </button>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Testimonial Indicators */}
                        {selectedMember.testimonials.length > 1 && (
                          <div className="mt-4 flex justify-center space-x-2 sm:mt-6">
                            {selectedMember.testimonials.map((_, index) => (
                              <button
                                key={index}
                                onClick={() => setActiveTestimonial(index)}
                                className={`h-2 w-2 rounded-full transition-colors duration-300 sm:h-3 sm:w-3`}
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
                        )}
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
