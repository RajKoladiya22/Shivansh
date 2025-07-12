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

//       {/* <div className={`avatar ${imagePosition}`}>
//         <Image
//           src={imgSrc}
//           alt={name}
//           width={240}
//           height={240}
//           className="avatar-img"
//         />
//       </div> */}
//       {avatar}

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
// };

// function TeamCard({
//   name,
//   role,
//   rating,
//   reviews,
//   description,
//   imgSrc,
//   imagePosition = "right",
// }: TeamCardProps) {
//   const stars = Array.from({ length: 5 }).map((_, i) => (
//     <span key={i} className={i < Math.floor(rating) ? "filled" : ""}>
//       ★
//     </span>
//   ));

//   // build avatar element once
//   const avatar = (
//     <div className="avatar-wrapper">
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
//         {imagePosition === "left" && avatar}
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
//         {imagePosition === "right" && avatar}

//       <style jsx>{`
//         .card {
//           max-width: 100%;
//           border: 1px solid #e5e5e5;
//           border-radius: 16px;
//           overflow: hidden;
//           margin: 16px 0;
//         }

//         .card-content {
//           display: flex;
//           align-items: center;
//           position: relative;
//           padding: 24px;
//         }

//         /* text block */
//         .text {
//           flex: 1;
//           padding: 0 16px;
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

//         /* avatar wrapper pops out of the card */
//         .avatar-wrapper {
//           flex-shrink: 0;
//           width: 240px;
//           height: 240px;
//           border-radius: 12px;
//           overflow: hidden;
//           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//           /* negative margins based on position */
//           margin-left: ${imagePosition === "right" ? "-60px" : "0"};
//           margin-right: ${imagePosition === "left" ? "-60px" : "0"};
//         }

//         .avatar-img {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//         }

//         @media (max-width: 768px) {
//           .card-content {
//             flex-direction: column;
//             padding: 16px;
//           }
//           .avatar-wrapper {
//             margin: 0 0 16px;
//             width: 180px;
//             height: 180px;
//           }
//           .text {
//             text-align: center;
//             padding: 0;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

// export default TeamCard;

















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
  name, role, rating, reviews, description, imgSrc,
  imagePosition = "right",
}) => {

  const stars = Array.from({ length: 5 }).map((_, i) => (
    <span key={i} className={i < Math.floor(rating) ? "filled" : ""}>★</span>
  ));

  const avatar = (
    <div className="avatar">
      <Image src={imgSrc} alt={name} width={200} height={200} className="avatar-img" />
    </div>
  );

  return (
    <div className={`card ${imagePosition}`}>
      <div className="card-content">
        {imagePosition === "left" && avatar}
        
        <div className="text">
          <h3 className="name">{name}</h3>
          <p className="role">{role}</p>
          <div className="rating">
            <div className="stars">{stars}</div>
            <span className="score">{rating.toFixed(1)}</span>
            <span className="reviews">[{reviews} Reviews]</span>
          </div>
          <p className="description">{description}</p>
        </div>

        {imagePosition === "right" && avatar}
      </div>

      <style jsx>{`
        .card {
          overflow: visible;
          max-width: 600px;
          margin: 24px auto;
          border: 1px solid #e5e5e5;
          border-radius: 12px;
          background: white;
        }
        .card-content {
          display: flex;
          align-items: center;
          padding: 24px;
          position: relative;
        }
        .text {
          flex: 1;
          padding: 0 16px;
        }
        .name {
          margin: 0 0 8px;
          font-size: 1.5rem;
          font-weight: 600;
        }
        .role {
          margin: 0 0 12px;
          font-size: 0.9rem;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #666;
        }
        .rating {
          display: flex;
          align-items: center;
          margin-bottom: 12px;
        }
        .stars span {
          color: #ffd200;
          margin-right: 4px;
        }
        .score {
          font-weight: 600;
          margin-right: 8px;
        }
        .reviews {
          color: #777;
          font-size: 0.85rem;
        }
        .description {
          margin: 0;
          color: #444;
          line-height: 1.5;
        }

        .avatar {
          position: absolute;
          flex-shrink: 0;
          width: 200px;
          height: 200px;
          // margin-left: ${imagePosition === "left" ? "-100px" : "0"};
          margin-left: -100px;
          margin-right: ${imagePosition === "right" ? "-100px" : "0"};
        }
        .avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        @media (max-width: 768px) {
          .card-content {
            flex-direction: column;
            text-align: center;
          }
          .avatar {
            position: relative;
            margin: 0 0 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default TeamCard;
