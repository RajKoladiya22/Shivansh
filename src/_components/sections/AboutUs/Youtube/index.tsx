"use client";
import React, { useState } from "react";
import { Play, Users, Eye, Video, Calendar, TrendingUp, Star, ThumbsUp, Award } from "lucide-react";

interface StatCardProps {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; // Icon accepts SVG props like className
    number: number | string;
    label: string;
    color: string;
    delay: number;
}

interface CommentCardProps {
    author: string;
    comment: string;
    likes: number | string;
    highlight?: boolean; // Optional, could be undefined
}

interface FeatureBadgeProps {
    text: string;
}


const StatCard: React.FC<StatCardProps> = ({ icon: Icon, number, label, color, delay }) => (
    <div
        className={`group transform rounded-2xl border border-red-100 bg-white p-6 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${delay}`}
        style={{ animationDelay: `${delay}ms` }}
    >
        <div className="flex items-center space-x-4">
            <div className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl ${color} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                <Icon className="h-7 w-7 text-white" />
            </div>
            <div>
                <h3 className="text-3xl font-bold text-gray-900 md:text-4xl">{number}</h3>
                <p className="text-sm font-medium text-gray-600 md:text-base">{label}</p>
            </div>
        </div>
    </div>
);


const CommentCard: React.FC<CommentCardProps> = ({ author, comment, likes, highlight }) => (
    <div className={`group relative rounded-xl border-2 bg-white p-5 shadow-md transition-all duration-300 hover:shadow-xl ${highlight ? 'border-yellow-300 bg-gradient-to-br from-yellow-50 to-white' : 'border-gray-200'}`}>
        {highlight && (
            <div className="absolute -top-3 -right-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-lg">
                <Star className="h-5 w-5 fill-white text-white" />
            </div>
        )}
        <div className="mb-3 flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-red-600 text-sm font-bold text-white">
                {author.charAt(0).toUpperCase()}
            </div>
            <div>
                <h4 className="font-semibold text-gray-900">{author}</h4>
                <p className="text-xs text-gray-500">YouTube Viewer</p>
            </div>
        </div>
        <p className="mb-3 text-sm leading-relaxed text-gray-700 md:text-base">{comment}</p>
        <div className="flex items-center space-x-2 text-gray-500">
            <ThumbsUp className="h-4 w-4" />
            <span className="text-sm font-medium">{likes}</span>
        </div>
    </div>
);

const FeatureBadge: React.FC<FeatureBadgeProps> = ({ text }) => (
    <span className="inline-flex items-center rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition-all duration-200 hover:bg-red-100 hover:shadow-sm">
        {text}
    </span>
);

export function YouTubeJourneySection() {
    const [isHovered, setIsHovered] = useState(false);

    const stats = [
        { icon: Calendar, number: "2017", label: "Channel Started", color: "bg-gradient-to-r from-blue-500 to-blue-600", delay: 0 },
        { icon: Video, number: "1500+", label: "Videos Published", color: "bg-gradient-to-r from-purple-500 to-purple-600", delay: 100 },
        { icon: Users, number: "66K+", label: "Subscribers", color: "bg-gradient-to-r from-red-500 to-red-600", delay: 200 },
        { icon: Eye, number: "1.28Cr+", label: "Total Views", color: "bg-gradient-to-r from-green-500 to-green-600", delay: 300 },
    ];

    const features = [
        "Latest Tally Updates",
        "Feature Tutorials",
        "TDL Demonstrations",
        "Software Education",
        "Expert Tips & Tricks",
        "Real-world Solutions"
    ];

    const comments = [
        {
            author: "Rajesh Kumar",
            comment: "Best Tally channel on YouTube! The way you explain complex features is simply outstanding. Your TDL tutorials saved me countless hours.",
            likes: "245",
            highlight: true
        },
        {
            author: "Priya Sharma",
            comment: "I've been following since 2018. Your regular updates keep me ahead in my accounting career. Thank you for the dedication!",
            likes: "189",
            highlight: false
        },
        {
            author: "Amit Patel",
            comment: "Crystal clear explanations! Your videos are my go-to resource for every Tally update. Keep up the excellent work!",
            likes: "167",
            highlight: false
        }
    ];

    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-white via-red-50 to-white py-16 md:py-24">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='27' cy='7' r='1'/%3E%3Ccircle cx='47' cy='7' r='1'/%3E%3Ccircle cx='7' cy='27' r='1'/%3E%3Ccircle cx='27' cy='27' r='1'/%3E%3Ccircle cx='47' cy='27' r='1'/%3E%3Ccircle cx='7' cy='47' r='1'/%3E%3Ccircle cx='27' cy='47' r='1'/%3E%3Ccircle cx='47' cy='47' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                />
            </div>

            {/* Floating Decorative Elements */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 h-20 w-20 animate-pulse rounded-full bg-red-100 opacity-50" />
                <div className="absolute top-40 right-20 h-16 w-16 animate-bounce rounded-full bg-blue-100 opacity-40" style={{ animationDelay: "1s" }} />
                <div className="absolute bottom-32 left-1/4 h-12 w-12 animate-pulse rounded-full bg-purple-100 opacity-30" style={{ animationDelay: "2s" }} />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12 text-center md:mb-16">
                    <div className="relative inline-block mb-4">
                        <p className="relative z-10 text-sm font-bold uppercase tracking-wide text-gray-600 md:text-base">
                            Our YouTube Presence
                        </p>
                        <div className="absolute top-0 right-0 h-full w-[calc(100%+20px)] rounded-lg bg-red-200 opacity-30" style={{ transform: "translate(10px, -40%)", zIndex: 1 }} />
                    </div>

                    <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
                        Welcome to{" "}
                        <span className="relative inline-block">
                            <span className="relative z-10 bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                                Hetansh Academy
                            </span>
                            <span className="absolute bottom-0 left-0 z-0 h-3 w-full -rotate-1 transform bg-red-200 opacity-80"></span>
                        </span>
                    </h2>

                    <p className="mx-auto max-w-3xl text-base leading-relaxed text-gray-700 md:text-lg">
                        {`Since 2017, we've been creating comprehensive video tutorials on Tally software,
                        delivering regular updates on the latest features, TDL demonstrations, and expert
                        education to help businesses master their financial management.`}
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, index) => (
                        <StatCard key={index} {...stat} />
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
                    {/* Left: Channel Info & Features */}
                    <div className="space-y-8">
                        {/* Channel Highlight Card */}
                        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-600 to-red-700 p-8 text-white shadow-2xl transition-all duration-500 hover:shadow-3xl md:p-10">
                            {/* Background Decorations */}
                            <div className="absolute inset-0 opacity-10">
                                <div className="absolute top-8 right-8 h-32 w-32 rounded-full bg-white"></div>
                                <div className="absolute bottom-12 left-8 h-24 w-24 rotate-45 rounded-2xl bg-white"></div>
                                <div className="absolute top-1/2 left-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white"></div>
                            </div>

                            <div className="relative z-10">
                                <div className="mb-6 flex items-center space-x-4">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                                        <Play className="h-8 w-8 fill-white text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold md:text-3xl">Hetansh Academy</h3>
                                        <p className="text-sm opacity-90 md:text-base">Your Tally Learning Partner</p>
                                    </div>
                                </div>

                                <p className="mb-6 text-base leading-relaxed opacity-95 md:text-lg">
                                    {`Join thousands of professionals who trust us for accurate, timely, and
                                    practical Tally education. From beginners to experts, we've got you covered.`}
                                </p>

                                <a
                                    href="https://www.youtube.com/@HetanshAcademy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                    className="inline-flex items-center space-x-2 rounded-lg bg-white px-6 py-3 font-semibold text-red-600 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                                >
                                    <Play className={`h-5 w-5 transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`} />
                                    <span>Visit Channel</span>
                                    <TrendingUp className={`h-5 w-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                                </a>
                            </div>
                        </div>

                        {/* What We Offer */}
                        <div className="rounded-2xl border border-red-100 bg-white p-6 shadow-lg md:p-8">
                            <div className="mb-6 flex items-center space-x-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-red-100 bg-red-50">
                                    <Award className="h-6 w-6 text-red-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 md:text-2xl">What We Offer</h3>
                                    <div className="mt-1 h-0.5 w-12 bg-red-600"></div>
                                </div>
                            </div>

                            <p className="mb-6 text-gray-700">
                                Our channel specializes in creating regular, high-quality video content covering:
                            </p>

                            <div className="flex flex-wrap gap-3">
                                {features.map((feature, index) => (
                                    <FeatureBadge key={index} text={feature} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Comments Showcase */}
                    <div className="space-y-6">
                        <div className="mb-6 text-center lg:text-left">
                            <h3 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">
                                What Our Viewers Say
                            </h3>
                            <p className="text-gray-600">
                                Real feedback from our amazing YouTube community
                            </p>
                        </div>

                        <div className="space-y-4">
                            {comments.map((comment, index) => (
                                <CommentCard key={index} {...comment} />
                            ))}
                        </div>

                        {/* Community Stats */}
                        <div className="rounded-xl border-2 border-red-200 bg-gradient-to-r from-red-50 to-white p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-red-600">
                                        <Users className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-gray-900">66K+</p>
                                        <p className="text-sm text-gray-600">Active Community</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-semibold text-red-600">Growing Daily</p>
                                    <p className="text-xs text-gray-500">Join our family</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mx-auto max-w-8xl">
                    <div className="rounded-2xl bg-gradient-to-r from-gray-900 to-black p-8 text-center text-white shadow-2xl md:p-12">
                        <h3 className="mb-4 text-2xl font-bold md:text-3xl lg:text-4xl">
                            Start Learning Today!
                        </h3>
                        <p className="mx-auto mb-8 max-w-2xl text-base opacity-90 md:text-lg">
                            Subscribe to Hetansh Academy and stay updated with the latest Tally tips,
                            tutorials, and expert guidance. Transform your Tally skills with us!
                        </p>
                        <div className="flex flex-col justify-center gap-4 sm:flex-row">
                            <a
                                href="https://www.youtube.com/@HetanshAcademy?sub_confirmation=1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center space-x-2 rounded-xl bg-red-600 px-8 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-red-700 hover:shadow-xl"
                            >
                                <Play className="h-5 w-5 fill-white" />
                                <span>Subscribe Now</span>
                            </a>
                            <a
                                href="tel:+918141703007"
                                className="inline-flex items-center justify-center rounded-xl border-2 border-white px-8 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
                            >
                                Contact Us: +91 8141703007
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}