import Image from "next/image";
import Link from "next/link";

export default function HeroContent() {
  return (
    <>
      {/* Text Content */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-red-600">
          Quick Response – Quick Support
        </h2>
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
          Empowering Businesses with
          <span className="block text-red-600">Trusted Tally Solutions</span>
        </h1>
        <p className="mt-4 max-w-md text-gray-700">
          Tally Certified 3-Star Partner · 3000+ Customers Served in all Over
          India
        </p>
        <Link
          href="https://youtube.com"
          className="mt-6 inline-block rounded-full bg-red-600 px-6 py-3 font-medium text-white hover:bg-red-700"
        >
          Watch on YouTube
        </Link>
      </div>
    </>
  );
}
