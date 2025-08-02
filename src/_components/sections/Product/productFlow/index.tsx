"use client";
import React, { useState, useEffect } from "react";
import {
  X,
  MessageSquare,
  Monitor,
  CreditCard,
  CheckCircle,
  Clock,
  Shield,
  Award,
  Zap,
  Users,
  Play,
  ChevronRight,
  Star,
  Download,
  Heart,
  Sparkles,
  Phone,
  ArrowRight,
  Pause,
} from "lucide-react";
import Link from "next/link";

import type { ComponentType, SVGProps } from "react";

/**
 * A card/listing model describing a "service offering"
 */
export interface StepItem {
  id: number;
  title: string;
  shortTitle: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  color: string;
  borderColor: string;
  bgColor: string;
  duration: string;
  status: string;
  details: string[];
}
export interface FlowGroup {
  id: number;
  steps: StepItem[];
}

interface PurchaseFlowPopupProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
  stepId: number | null;
}

const flowGroups: FlowGroup[] = [
  {
    id: 1,
    steps: [
      {
        id: 1,
        title: "Free Consultation",
        shortTitle: "Consult",
        description:
          "Tell us your needs and we'll create a perfect solution plan",
        icon: MessageSquare,
        color: "from-blue-500 to-blue-600",
        borderColor: "border-blue-200",
        bgColor: "bg-blue-50",
        duration: "30 min",
        status: "Free",
        details: [
          "No-obligation consultation call",
          "Business requirement analysis",
          "Custom solution recommendations",
          "Technology stack discussion",
        ],
      },
      {
        id: 2,
        title: "Live Product Demo",
        shortTitle: "Demo",
        description:
          "See the product working live on your system before you buy",
        icon: Monitor,
        color: "from-emerald-500 to-emerald-600",
        borderColor: "border-emerald-200",
        bgColor: "bg-emerald-50",
        duration: "45-60 min",
        status: "Interactive",
        details: [
          "Real-time demo on your system",
          "Test all features thoroughly",
          "Customization possibilities",
          "Performance evaluation",
        ],
      },
      {
        id: 3,
        title: "Secure Payment",
        shortTitle: "Payment",
        description:
          "Multiple secure payment options with instant confirmation",
        icon: CreditCard,
        color: "from-purple-500 to-purple-600",
        borderColor: "border-purple-200",
        bgColor: "bg-purple-50",
        duration: "5 min",
        status: "Secure",
        details: [
          "Multiple payment gateways",
          "Bank-grade security",
          "Instant confirmation",
          "Digital receipt & invoice",
        ],
      },
      {
        id: 4,
        title: "Instant Delivery",
        shortTitle: "Delivery",
        description: "Get complete source code and documentation immediately",
        icon: Download,
        color: "from-orange-500 to-orange-600",
        borderColor: "border-orange-200",
        bgColor: "bg-orange-50",
        duration: "Instant",
        status: "Complete",
        details: [
          "Full source code package",
          "Detailed documentation",
          "Installation guidelines",
          "Database & setup files",
        ],
      },
      {
        id: 5,
        title: "30-Day Support",
        shortTitle: "Support",
        description: "Free technical support and assistance for one month",
        icon: Heart,
        color: "from-rose-500 to-rose-600",
        borderColor: "border-rose-200",
        bgColor: "bg-rose-50",
        duration: "30 days",
        status: "Included",
        details: [
          "Technical troubleshooting",
          "Installation assistance",
          "Bug fixes & patches",
          "Training & guidance",
        ],
      },
      {
        id: 6,
        title: "Lifetime Updates",
        shortTitle: "Updates",
        description: "Get all future updates and new features forever",
        icon: Sparkles,
        color: "from-indigo-500 to-indigo-600",
        borderColor: "border-indigo-200",
        bgColor: "bg-indigo-50",
        duration: "Forever",
        status: "Free",
        details: [
          "New feature releases",
          "Security improvements",
          "Performance optimizations",
          "Technology upgrades",
        ],
      },
    ],
  },
];

export const PurchaseFlowPopup: React.FC<PurchaseFlowPopupProps> = ({
  isOpen,
  onClose,
  productName = "TDL Product",
  stepId = 1,
}) => {
  const [activeStep, setActiveStep] = useState(1);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [currentSteps, setCurrentSteps] = useState<StepItem[]>([]);

  useEffect(() => {
    const group = flowGroups.find((grp) => grp.id === stepId);
    console.log(group);

    setCurrentSteps(group?.steps ?? []);
  }, [stepId]);

  // Handle escape key and body scroll
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Auto-advance steps
  useEffect(() => {
    if (!isOpen || !isAutoPlay || currentSteps.length === 0) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev >= currentSteps.length ? 1 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [isOpen, isAutoPlay, currentSteps.length]);

  if (!isOpen) return null;

  if (!isOpen) return null;

  const currentStep = currentSteps.find((step) => step.id === activeStep);

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-slate-50 to-white">
      {/* Header */}
      <div className="sticky top-0 z-10 border-gray-200/50 bg-white/80 shadow-md backdrop-blur-md">
        <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <Link href={'tel:+91 81417 03007'} className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-600">
                <Play className="hidden sm:block h-5 w-5 text-white" />
                <Phone className="block sm:hidden h-5 w-5 text-white" />
              </Link>
              <div>
                <h1 className="text-[10px] font-bold text-gray-900 sm:text-xl">
                  How to Buy {productName}
                </h1>
                <p className="text-xs text-gray-600 sm:text-sm">
                  Simple 6-step process • No hidden fees • Call now
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors sm:block ${
                isAutoPlay
                  ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                  : "bg-red-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {isAutoPlay ? <Pause className="h-4 sm:h-6"/> : <Play className="h-4 sm:h-6"/>}
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center xl:flex">
              <div className="flex items-center space-x-4 border-l border-gray-200 pl-6">
                <div className="flex flex-col">
                  <span className="flex items-center text-xs font-medium tracking-wide text-(--primery-color) uppercase">
                    <Phone size={14} className="mr-1" aria-hidden="true" />
                    Call Us
                    <ArrowRight
                      size={16}
                      strokeWidth={1.5}
                      className="ml-1 rotate-315 transform transition-all duration-200 ease-in-out"
                      aria-hidden="true"
                    />
                  </span>
                  <a
                    href="tel:+918141703007"
                    className="text-lg font-bold text-gray-800 transition-colors duration-200 hover:text-red-600"
                    aria-label="Call us at +91 81417 03007"
                  >
                    +91 81417 03007
                  </a>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="h-[calc(100vh-81px)] overflow-y-auto">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {/* Progress Timeline - Mobile Horizontal Scroll */}
          <div className="mb-8 pb-4">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
              {currentSteps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div
                    className={`group flex cursor-pointer flex-col items-center transition-all duration-300 ${
                      activeStep === step.id ? "scale-110" : "hover:scale-105"
                    }`}
                    onClick={() => {
                      setActiveStep(step.id);
                      setIsAutoPlay(false);
                    }}
                  >
                    <div
                      className={`relative flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-500 sm:h-14 sm:w-14 ${
                        activeStep >= step.id
                          ? `bg-gradient-to-r ${step.color} shadow-lg`
                          : "border-2 border-gray-200 bg-white group-hover:border-gray-300"
                      }`}
                    >
                      <step.icon
                        className={`h-5 w-5 transition-colors duration-300 sm:h-6 sm:w-6 ${
                          activeStep >= step.id
                            ? "text-white"
                            : "text-gray-400 group-hover:text-gray-600"
                        }`}
                      />
                      {activeStep >= step.id && (
                        <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-500">
                          <CheckCircle className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="mt-2 text-center">
                      <p
                        className={`text-xs font-medium transition-colors duration-300 sm:text-sm ${
                          activeStep === step.id
                            ? "text-gray-900"
                            : "text-gray-500"
                        }`}
                      >
                        {step.shortTitle}
                      </p>
                    </div>
                  </div>

                  {index < currentSteps.length - 1 && (
                    <div className="flex items-center px-2 sm:px-4">
                      <ChevronRight
                        className={`h-4 w-4 transition-colors duration-300 ${
                          activeStep > step.id
                            ? "text-green-500"
                            : "text-gray-300"
                        }`}
                      />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Current Step Highlight */}
          {currentStep && (
            <div
              className={`mb-8 rounded-3xl border-2 ${currentStep.borderColor} ${currentStep.bgColor} p-6 sm:p-8`}
            >
              <div className="flex flex-col items-center text-center lg:flex-row lg:text-left">
                <div
                  className={`mb-4 flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r ${currentStep.color} shadow-xl lg:mr-6 lg:mb-0`}
                >
                  <currentStep.icon className="h-10 w-10 text-white" />
                </div>

                <div className="flex-1">
                  <div className="mb-2 flex flex-col items-center gap-2 sm:flex-row lg:justify-start">
                    <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                      Step {currentStep.id}: {currentStep.title}
                    </h2>
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full bg-gradient-to-r px-3 py-1 text-xs font-medium ${currentStep.color} text-white`}
                      >
                        {currentStep.status}
                      </span>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>{currentStep.duration}</span>
                      </div>
                    </div>
                  </div>

                  <p className="mb-4 text-lg text-gray-700">
                    {currentStep.description}
                  </p>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {currentStep.details.map((detail, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-500" />
                        <span className="text-gray-700">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* All Steps Grid */}
          <div className="mb-12 grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
            {currentSteps.map((step) => {
              const isActive = activeStep === step.id;
              const isCompleted = activeStep > step.id;

              return (
                <div
                  key={step.id}
                  className={`group relative cursor-pointer overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
                    isActive
                      ? `${step.borderColor} ${step.bgColor} scale-105 shadow-lg`
                      : isCompleted
                        ? "border-green-200 bg-green-50"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                  }`}
                  onClick={() => {
                    setActiveStep(step.id);
                    setIsAutoPlay(false);
                  }}
                >
                  {isCompleted && (
                    <div className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full bg-green-500">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                  )}

                  <div className="p-6">
                    <div className="mb-4 flex items-center gap-4">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${step.color} transition-transform duration-300 group-hover:scale-110`}
                      >
                        <step.icon className="h-6 w-6 text-white" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-500">
                            Step {step.id}
                          </span>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Clock className="h-3 w-3" />
                            <span>{step.duration}</span>
                          </div>
                        </div>
                        <h3 className="font-bold text-gray-900">
                          {step.title}
                        </h3>
                      </div>
                    </div>

                    <p className="mb-4 text-sm text-gray-600">
                      {step.description}
                    </p>

                    <div className="space-y-2">
                      {step.details.slice(0, 2).map((detail, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-xs text-gray-600"
                        >
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Benefits & Trust Signals */}
          <div className="mb-8 rounded-3xl bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 p-8 text-white">
            <div className="text-center">
              <h3 className="mb-2 text-2xl font-bold sm:text-3xl">
                Why 10,000+ Customers Trust Us
              </h3>
              <p className="mb-8 text-blue-100">
                Experience the difference with our proven process
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: Shield,
                  title: "100% Secure",
                  desc: "Bank-grade security",
                  color: "from-blue-400 to-blue-500",
                },
                {
                  icon: Zap,
                  title: "Instant Delivery",
                  desc: "No waiting time",
                  color: "from-yellow-400 to-orange-500",
                },
                {
                  icon: Award,
                  title: "Quality Guaranteed",
                  desc: "Tested & reliable",
                  color: "from-purple-400 to-purple-500",
                },
                {
                  icon: Users,
                  title: "Expert Team",
                  desc: "10+ years experience",
                  color: "from-green-400 to-emerald-500",
                },
              ].map((benefit, index) => (
                <div key={index} className="text-center">
                  <div
                    className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${benefit.color} shadow-lg`}
                  >
                    <benefit.icon className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="mb-2 font-bold">{benefit.title}</h4>
                  <p className="text-sm text-gray-300">{benefit.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-yellow-400 text-yellow-400"
                />
              ))}
              <span className="ml-2 text-sm">4.9/5 from 2,847+ reviews</span>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mx-auto my-15 mb-35 max-w-7xl sm:mb-0">
            <div className="rounded-xl bg-gradient-to-r from-gray-900 to-black p-6 text-center text-white sm:rounded-2xl sm:p-8 md:p-12">
              <h3 className="mb-3 text-xl font-bold sm:mb-4 sm:text-2xl md:text-3xl lg:text-4xl">
                Ready to Start? Let's Talk!
              </h3>
              <p className="mx-auto mb-6 max-w-2xl text-base opacity-90 sm:mb-8 sm:text-lg md:text-xl">
                {`Get your free consultation call today and see how we can help your business grow`}
              </p>
              <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
                <Link
                  href="tel:+918141703007"
                  className="rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-gray-900 transition-all duration-300 hover:-translate-y-1 hover:bg-gray-100 sm:rounded-xl sm:px-8 sm:py-3 sm:text-base"
                >
                  Call Now: +91 8141703007
                </Link>
                <Link
                  href="/gallery"
                  className="rounded-lg border-2 border-white px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 sm:rounded-xl sm:px-8 sm:py-3 sm:text-base"
                >
                  Email Us
                </Link>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                No commitment • Free consultation • Expert guidance
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
