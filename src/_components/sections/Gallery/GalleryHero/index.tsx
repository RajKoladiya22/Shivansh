export default function GalleryHero() {
  return (
    <>
      <div className="">
        {/* Badge */}
        <div className="my-5 flex justify-center">
          <div className="relative inline-block">
            <p className="text-center text-base font-medium tracking-wide text-[var(--primery-color)] sm:text-lg lg:text-xl">
              Our Journey Together
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
        <div className="mb-16 text-center">
          <h1 className="text-4xl leading-tight font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Fun Activities &{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-(--primery-color)">
                Achievements
              </span>
              <span className="absolute bottom-0 left-0 z-0 h-3 w-full -rotate-1 transform bg-(--pink) opacity-80"></span>
            </span>
          </h1>
          <p className="mx-auto max-w-3xl py-3 text-lg leading-relaxed text-gray-700 md:text-xl">
            {`Celebrating our team spirit, milestones, and memorable moments
                   that make our journey special`}
          </p>
        </div>
      </div>
    </>
  );
}
