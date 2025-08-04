import { hero_content_font, hero_heading_font, hero_headline_font } from "src/config/constants";

export default function GalleryHero() {
  return (
    <>
      <div className="">
        {/* Badge */}
        <div className="my-5 flex justify-center">
          <div className="relative inline-block">
            <p className={`text-center ${hero_heading_font} `}>
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
        <div className="mb-1 sm:mb-16 text-center">
          <h1 className={`${hero_headline_font}`}>
            Fun Activities &{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-(--primery-color)">
                Achievements
              </span>
              <span className="absolute bottom-0 left-0 z-0 h-3 w-full -rotate-1 transform bg-(--pink) opacity-80"></span>
            </span>
          </h1>
          <p className={`mx-auto max-w-3xl py-3 ${hero_content_font}`}>
            {`Celebrating our team spirit, milestones, and memorable moments
                   that make our journey special`}
          </p>
        </div>
      </div>
    </>
  );
}
