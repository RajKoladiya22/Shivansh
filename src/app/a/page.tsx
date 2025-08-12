import { CarouselExample } from "src/_components/molecules/HeroSlider";


export default async function Apage() {
  const imageUrls = [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop&crop=entropy&auto=format&q=80",
    "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=600&fit=crop&crop=entropy&auto=format&q=80",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=600&fit=crop&crop=entropy&auto=format&q=80",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=600&fit=crop&crop=entropy&auto=format&q=80",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=600&fit=crop&crop=entropy&auto=format&q=80",
    "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=600&fit=crop&crop=entropy&auto=format&q=80",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop&crop=entropy&auto=format&q=80",
    "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=600&fit=crop&crop=entropy&auto=format&q=80",
  ];

  return (
    <>
      {/* Structured Data */}

      <div className="py-20">
        <CarouselExample  />
      </div>
    </>
  );
}
