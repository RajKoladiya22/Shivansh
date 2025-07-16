"use client";

import Image from "next/image";

// TeamCard Component matching the exact design
export type TeamCardProps = {
  name: string;
  role: string;
  rating: number;
  reviews: number;
  description: string;
  imgSrc: string;
  imagePosition?: "left" | "right";
  compact?: boolean;
  style?: React.CSSProperties;
};

const TeamCard: React.FC<TeamCardProps> = ({
  name,
  role,
  rating,
  reviews,
  description,
  imgSrc,
  imagePosition = "right",
  style = {},
}) => {
  const stars = Array.from({ length: 5 }).map((_, i) => (
    <span
      key={i}
      className={i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}
      style={{ fontSize: "14px" }}
    >
      ★
    </span>
  ));

  return (
    <div
      className="absolute"
      style={{
        width: "320px",
        height: "150px",
        ...style,
      }}
    >
      {/* Main Card Content */}
      <div className="relative h-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
        {/* Content */}
        <div
          className="flex h-full flex-col justify-center p-4"
          style={{
            paddingLeft: imagePosition === "left" ? "90px" : "16px",
            paddingRight: imagePosition === "left" ? "16px" : "90px",
          }}
        >
          <h3 className="mb-1 text-lg leading-tight font-bold text-gray-900">
            {name}
          </h3>
          <p className="mb-2 text-xs font-semibold tracking-wide text-gray-500 uppercase">
            {role}-
          </p>

          <div className="mb-2 flex items-center">
            <div className="mr-2 flex">{stars}</div>
            <span className="mr-1 text-sm font-bold">{rating}</span>
            <span className="text-xs text-gray-500">[ {reviews} Reviews ]</span>
          </div>

          <p className=" text-xs leading-relaxed text-gray-600 line-clamp-3">
            {description}
          </p>
        </div>
      </div>

      {/* Profile Image - Positioned outside the card */}
      <div
        className={`absolute top-0 ${imagePosition === "left" ? "left-0" : "right-0"} h-full`}
        style={{
          width: "120px",
          transform:
            imagePosition === "left" ? "translateX(-25px)" : "translateX(25px)",
          zIndex: 10,
        }}
      >
        <Image
          src={imgSrc}
          alt={name}
          width={200}
          height={200}
          className="h-full w-full object-contain"
          style={{
            objectFit: "contain",
            objectPosition: "center",
          }}
        />
      </div>
    </div>
  );
};

export default TeamCard;
