// // ./team.tsx

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
// };

// const TeamCard: React.FC<TeamCardProps> = ({
//   name,
//   role,
//   rating,
//   reviews,
//   description,
//   imgSrc,
//   imagePosition = "right",
// }) => {
//   // Build star icons
//   const stars = Array.from({ length: 5 }).map((_, i) => (
//     <span key={i} className={i < Math.floor(rating) ? "filled" : ""}>
//       ★
//     </span>
//   ));

//   // build avatar element once
//   const avatar = (
//     <div className={`avatar ${imagePosition}`}>
//       <Image
//         src={imgSrc}
//         alt={name}
//         width={240}
//         height={240}
//         className="avatar-img"
//       />
//     </div>
//   );

//   return (
//     <div className={`card ${imagePosition}`}>
//       <div className="card-content">
//         <div className="text">
//           <h3 className="name">{name}</h3>
//           <p className="role">{role}</p>
//           <div className="rating">
//             <div className="stars">{stars}</div>
//             <span className="score">{rating.toFixed(1)}</span>
//             <span className="reviews">[{reviews} Reviews]</span>
//           </div>
//           <p className="description">{description}</p>
//         </div>
//       </div>

//       <div className={`avatar ${imagePosition}`}>
//         <Image
//           src={imgSrc}
//           alt={name}
//           width={240}
//           height={240}
//           className="avatar-img"
//         />
//       </div>
//       {/* {avatar} */}

//       <style jsx>{`
//         .card {
//           max-width: 100%;
//           border: 1px solid #e5e5e5;
//           border-radius: 16px;
//           overflow: hidden;
//           margin: 16px auto;
//           // padding-left: 75px;
//         }
//         .card.left {
//           padding-left: 75px;
//           padding-right: 0;
//         }
//         .card.right {
//           padding-left: 0;
//           padding-right: 50px;
//           // text-align: right;
//         }
//         .card-content {
//           display: flex;
//           align-items: center;
//           position: relative;
//           padding: 18px;
//         }
//         /* Flip order when imagePosition is left */
//         .card.left .card-content {
//           flex-direction: row-reverse;
//         }
//         .text {
//           flex: 1;
//           padding-right: 16px;
//         }
//         .card.left .text {
//           padding-right: 0;
//           padding-left: 16px;
//         }
//         .name {
//           margin: 0 0 8px;
//           font-size: 1.5rem;
//           font-weight: 600;
//           color: #111;
//         }
//         .role {
//           margin: 0 0 12px;
//           font-size: 0.9rem;
//           letter-spacing: 1px;
//           color: #666;
//           text-transform: uppercase;
//         }
//         .rating {
//           display: flex;
//           align-items: center;
//           margin-bottom: 12px;
//         }
//         .stars {
//           font-size: 1rem;
//           margin-right: 8px;
//         }
//         .stars span {
//           color: #ffd200;
//           margin-right: 2px;
//         }
//         .score {
//           font-weight: 500;
//           margin-right: 4px;
//         }
//         .reviews {
//           color: #999;
//           font-size: 0.85rem;
//         }
//         .description {
//           margin: 0;
//           color: #444;
//           line-height: 1.5;
//         }

//         .avatar {
//           flex-shrink: 0;
//           position: absolute;
//           // width: 240px;
//           // height: 240px;
//         }

//         .card.right .avatar {
//           // right: -40px;
//           bottom: 52%;
//           right: -30%;
//           transform: translateX(-30%);
//         }
//         .card.left .avatar {
//           // left: -40px;
//           bottom: 52%;
//           left: -14%;
//           transform: translateX(-14%);
//         }
//         .avatar-img {
//           border-radius: 12px;
//           object-fit: cover;
//           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//         }
//         @media (max-width: 768px) {
//           .card-content {
//             flex-direction: column;
//             padding: 16px;
//           }
//           .avatar {
//             position: relative;
//             top: auto;
//             transform: none;
//             margin: 0 auto 16px;
//             left: auto;
//             right: auto;
//           }
//           .text {
//             padding: 0;
//             text-align: center;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default TeamCard;

// team.tsx
"use client";

import React from "react";
import Image from "next/image";

export type TeamCardProps = {
  name: string;
  role: string;
  rating: number;
  reviews: number;
  description: string;
  imgSrc: string;
  imagePosition?: "left" | "right";
};

const TeamCard: React.FC<TeamCardProps> = ({
  name,
  role,
  rating,
  reviews,
  description,
  imgSrc,
  imagePosition = "right",
}) => {
  const stars = Array.from({ length: 5 }).map((_, i) => (
    <span
      key={i}
      className={i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}
    >
      ★
    </span>
  ));

  return (
    <div className={`relative mx-auto w-full max-w-2xl ${imagePosition}`}>
      <div className={`card ${imagePosition} overflow-visible rounded-2xl border border-gray-200 bg-white p-6 shadow-lg`}>
        <div
          className={`flex flex-col md:flex-row ${imagePosition === "left" ? "md:flex-row-reverse" : ""}`}
        >
          {/* Text Content */}
          <div className="flex-1 pr-0 md:pr-8">
            <h3 className="mb-1 text-2xl font-bold text-gray-900">{name}</h3>
            <p className="mb-3 text-xs font-semibold tracking-wider text-gray-500 uppercase">
              {role}
            </p>
            <div className="rating mb-3 flex items-center">
              <div className="stars mr-2 text-lg">{stars}</div>
              <span className="score mr-1 font-medium">
                {rating.toFixed(1)}
              </span>
              <span className="reviews text-sm text-gray-500">
                [{reviews} Reviews]
              </span>
            </div>
            <p className="leading-relaxed text-gray-600">{description}</p>
          </div>

          {/* Avatar positioning container */}
          <div className="relative mt-6 md:mt-0">
            <div
              className={`avatar-container absolute top-0 ${
                imagePosition === "right"
                  ? "right-0 md:right-[-40px]"
                  : "left-0 md:left-[-40px]"
              }`}
            >
              <div className="avatar h-40 w-40 overflow-hidden md:h-48 md:w-48">
                <Image
                  src={imgSrc}
                  alt={name}
                  width={200}
                  height={200}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .card {
          border: 1px solid #e5e5e5;
          border-radius: 16px;
          
          background: white;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          position: relative;
          z-index: 10;
        }
        .card.left {
          padding-left: 85px !important;
          padding-right: 0;
        }
        .card.right {
          padding-left: 0;
          padding-right: 50px;
          // text-align: right;
        }
        .avatar-container {
          z-index: 20;
          transform: translateY(-20%);
          transform: translateX(-75%);
        }

        @media (max-width: 768px) {
          .avatar-container {
            position: relative;
            top: auto;
            right: auto !important;
            left: auto !important;
            transform: none;
            margin: -30px auto 20px;
          }

          .avatar {
            margin: 0 auto 20px !important;
            order: -1;
          }

          .text {
            text-align: center;
          }

          .rating {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default TeamCard;
