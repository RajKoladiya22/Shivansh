// // team.tsx
// "use client";

// import React from "react";
// import Image from "next/image";

// export type TeamCardProps = {
//   name: string;
//   role: string;
//   rating: number;
//   reviews: number;
//   description: string;
//   imgSrc: string;
//   imagePosition?: "left" | "right";
//   compact?: boolean;
// };

// const TeamCard: React.FC<TeamCardProps> = ({
//   name,
//   role,
//   rating,
//   reviews,
//   description,
//   imgSrc,
//   imagePosition = "right",
//   compact = false,
// }) => {
//   const stars = Array.from({ length: 5 }).map((_, i) => (
//     <span
//       key={i}
//       className={i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}
//     >
//       ★
//     </span>
//   ));
//   function truncate(str: string, max = 63) {
//     return str.length > max ? str.slice(0, max) + "…" : str;
//   }

//   return (
//     <div className={`relative mx-auto w-full max-w-2xl ${imagePosition}`}>
//       <div
//         className={`card ${imagePosition} overflow-visible rounded-2xl border border-gray-200 bg-white p-4 shadow-lg sm:p-6`}
//       >
//         <div
//           className={`flex flex-col md:flex-row ${imagePosition === "left" ? "md:flex-row-reverse" : "md:flex-row"}`}
//         >
//           {/* Text Content */}
//           <div className="flex-1 pr-0 md:pr-8">
//             <h3 className="mb-1 text-xl font-bold text-gray-900 sm:text-2xl">
//               {name}
//             </h3>
//             <p className="mb-2 text-xs font-semibold text-gray-500 uppercase sm:text-sm">
//               {role}
//             </p>
//             <div className="rating mb-3 flex items-center">
//               <div className="stars mr-2 text-base sm:text-lg">{stars}</div>
//               <span className="score mr-1 text-sm font-medium sm:text-base">
//                 {rating.toFixed(1)}
//               </span>
//               <span className="reviews text-xs text-gray-500 sm:text-sm">
//                 [{reviews} Reviews]
//               </span>
//             </div>
//             <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
//               {" "}
//               {truncate(description)}
//             </p>
//           </div>

//           {/* Avatar positioning container */}
//           <div className="relative mt-6 md:mt-0">
//             <div
//               className={`avatar-container absolute top-0 ${
//                 imagePosition === "right"
//                   ? "right-0 md:right-[-40px]"
//                   : "left-0 md:left-[-40px]"
//               }`}
//             >
//               <div className="avatar h-32 w-32 overflow-hidden sm:h-40 sm:w-40 md:h-48 md:w-48">
//                 <Image
//                   src={imgSrc}
//                   alt={name}
//                   width={200}
//                   height={200}
//                   style={{ objectFit: "contain" }}
//                   className="h-full w-full object-contain"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <style jsx>{`
//         .card {
//           border: 1px solid #e5e5e5;
//           border-radius: 16px;

//           background: white;
//           box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
//           position: relative;
//           z-index: 10;
//         }
//         .card.left {
//           padding-left: 85px !important;
//           padding-right: 0;
//         }
//         .card.right {
//           padding-left: 0;
//           padding-right: 50px;
//           padding-left: 24px;
//           // text-align: right;
//         }
//         .avatar-container {
//           z-index: 20;
//         }
//         .card.right .avatar-container {
//           // bottom: 52%;
//           // right: -30%;
//           transform: translateX(32%) translateY(-6%);
//         }
//         .card.left .avatar-container {
//           // bottom: 52%;
//           // left: -14%;
//           transform: translateX(-75%) translateY(-6%);
//         }

//         @media (max-width: 768px) {
//           .avatar-container {
//             position: relative;
//             top: auto;
//             right: auto !important;
//             left: auto !important;
//             transform: none;
//             margin: -30px auto 20px;
//           }

//           .avatar {
//             margin: 0 auto 20px !important;
//             order: -1;
//           }

//           .text {
//             text-align: center;
//           }

//           .rating {
//             justify-content: center;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default TeamCard;

// team.tsx

"use client";

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
        <img
          src={imgSrc}
          alt={name}
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
