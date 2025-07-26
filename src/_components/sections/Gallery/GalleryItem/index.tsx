import React, { useState } from "react";
import { categoryColors, categoryIcons, categoryLabels, type GalleryItem } from "..";
import { ZoomIn } from "lucide-react";

// Gallery Item Component
export const GalleryItemComponent = React.memo(
  ({
    item,
    index,
    onClick,
    className = "",
  }: {
    item: GalleryItem;
    index: number;
    onClick: () => void;
    className?: string;
  }) => {
    const [imageLoaded, setImageLoaded] = useState(true);

    return (
      <div
        className={`group relative transform cursor-pointer overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${className}`}
        onClick={onClick}
      >
        {!imageLoaded && (
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div
              className="h-6 w-6 animate-spin rounded-full border-4 border-gray-300"
              style={{ borderTopColor: "#C50202" }}
            ></div>
          </div>
        )}
        <img
          src={item.image}
          alt={item.title}
          className={`w-full object-cover transition-all duration-700 group-hover:scale-110 ${className.includes("h-") ? "" : "h-64"} ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40"></div>

        {/* Category Badge */}
        {item.category !== "all" && (
          <div className="absolute top-4 left-4">
            <div
              className={`${categoryColors[item.category]} flex items-center gap-2 rounded-full px-3 py-2 font-medium text-white shadow-lg`}
            >
              {React.createElement(categoryIcons[item.category], {
                className: "w-4 h-4",
              })}
              {categoryLabels[item.category]}
            </div>
          </div>
        )}

        <div className="absolute right-4 bottom-4 left-4 text-white">
          <div className="mb-2 text-sm font-medium opacity-80">{item.date}</div>
          <h3 className="mb-2 text-xl leading-tight font-bold">{item.title}</h3>
          <p className="mb-3 text-sm leading-relaxed opacity-90">
            {item.description.length > 120
              ? `${item.description.substring(0, 120)}...`
              : item.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {item.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="border-opacity-30 bg-opacity-20 rounded-full border border-white bg-white px-3 py-1 text-xs text-black backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="absolute top-4 right-4 opacity-0 transition-opacity group-hover:opacity-100">
          <div className="border-opacity-30 bg-opacity-20 rounded-full border border-white p-2 backdrop-blur-sm">
            <ZoomIn className="h-5 w-5 text-white" />
          </div>
        </div>
      </div>
    );
  },
);

GalleryItemComponent.displayName = "GalleryItemComponent";

