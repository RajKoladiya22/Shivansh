import { Button } from "../../../molecules";

export default function HeroContent() {
  return (
    <>
      {/* Text Content */}
      <section
        aria-labelledby="hero-heading"
        className="space-y-4 md:space-y-6 lg:space-y-8"
      >
        <div className="relative inline-block">
          <p className="z-10 text-base font-[400] tracking-[3px] text-(--primery-color) sm:text-lg lg:text-xl">
            Quick Response – Quick Support
          </p>
          <div
            className={`absolute top-0 h-full rounded-lg bg-(--pink)`}
            style={{
              width: "calc(40% + 20px)",
              right: "0",
              transform: "translate(10%, -40%)",
              zIndex: 1,
            }}
          />
        </div>

        <h1
          id="hero-heading"
          className="text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl"
        >
          Empowering Businesses with{" "}
          <span className="text-(--primery-color)">
            Trusted Tally Solutions
          </span>
        </h1>
        <p className="mt-2 text-gray-700 sm:mt-4 sm:text-lg md:text-xl lg:text-2xl">
          Tally Certified 3-Star Partner · 3000+ Customers Served in all Over
          India
        </p>
        <Button
          href="https://bitly.cx/rNEH4"
          className="tracking-[3px]"
          external
        >
          Watch on YouTube
        </Button>
      </section>
    </>
  );
}
