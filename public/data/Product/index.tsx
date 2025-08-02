import type {
  FlowGroup,
  Product,
} from "src/_components/sections/types/product.type";
import {
  MessageSquare,
  Monitor,
  CreditCard,
  Download,
  Heart,
  Sparkles,
} from "lucide-react";

export const ProductsList: Product[] = [
  {
    id: 1,
    title: "TallyPrime Silver",
    description:
      "Single user Edition For Single PC, GST Billing Inventory Management & Any Many More Facility Available in Tally",
    actualPrice: 25000,
    salePrice: 22500,
    image:
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop",
    introVideoId: "dQw4w9WgXcQ",
    detailedVideoId: "gUGY1IC9gQk",
    category: "Electronics",
    industry: "Photography",
    isTopProduct: true,
    isLatest: false,
    createdAt: "2024-01-15",
    features: [
      "Full-frame sensor",
      "4K video recording",
      "Weather-sealed body",
      "Interchangeable lenses",
    ],
    benefits: [
      "Crisp, high-resolution images",
      "Professional video quality",
      "Durability in harsh conditions",
      "Versatility across shooting scenarios",
    ],
    specs: [
      { key: "Sensor", value: "Full-frame CMOS" },
      { key: "Resolution", value: "24.2 MP" },
      { key: "Video", value: "4K at 30fps" },
      { key: "Connectivity", value: "Wi-Fi, Bluetooth" },
    ],
    stepsID: 1,
    review: {
      averageRating: 4.8,
      reviewCount: 132,
      latestReviews: [
        {
          id: 1,
          author: "Jane Doe",
          rating: 5,
          comment: "Amazing clarity and build quality!",
          date: "2025-07-01",
          verified: true,
        },
        {
          id: 2,
          author: "John Smith",
          rating: 4.5,
          comment: "Very reliable, great for low light.",
          date: "2025-06-28",
          verified: true,
        },
      ],
      allReviews: [
        {
          id: 1,
          author: "Jane Doe",
          rating: 5,
          comment:
            "Amazing clarity and build quality! The 4K video recording is superb and the weather sealing has saved me in tough conditions.",
          date: "2025-07-01",
          verified: true,
        },
        {
          id: 2,
          author: "John Smith",
          rating: 4.5,
          comment:
            "Very reliable, great for low light photography. The full-frame sensor makes a huge difference.",
          date: "2025-06-28",
          verified: true,
        },
        {
          id: 3,
          author: "Sarah Wilson",
          rating: 5,
          comment:
            "Professional quality at its finest. Worth every penny for serious photographers.",
          date: "2025-06-25",
          verified: false,
        },
        {
          id: 4,
          author: "Mike Johnson",
          rating: 4,
          comment:
            "Great camera, though the learning curve is steep for beginners. Build quality is excellent.",
          date: "2025-06-20",
          verified: true,
        },
        {
          id: 5,
          author: "Emily Chen",
          rating: 5,
          comment:
            "Outstanding performance in all lighting conditions. The interchangeable lens system is fantastic.",
          date: "2025-06-18",
          verified: true,
        },
        {
          id: 6,
          author: "David Brown",
          rating: 4,
          comment:
            "Good camera overall, battery life could be better but image quality is top-notch.",
          date: "2025-06-15",
          verified: false,
        },
        {
          id: 7,
          author: "Lisa Martinez",
          rating: 5,
          comment:
            "Perfect for wedding photography. The weather sealing and durability are impressive.",
          date: "2025-06-12",
          verified: true,
        },
        {
          id: 8,
          author: "Tom Anderson",
          rating: 4.5,
          comment:
            "Excellent build quality and image sharpness. Wi-Fi connectivity works flawlessly.",
          date: "2025-06-10",
          verified: true,
        },
        {
          id: 9,
          author: "Rachel Green",
          rating: 5,
          comment:
            "This camera exceeded my expectations. The 4K video quality is cinema-grade.",
          date: "2025-06-08",
          verified: false,
        },
        {
          id: 10,
          author: "Kevin White",
          rating: 4,
          comment:
            "Solid camera for professionals. Price is justified by the quality and features.",
          date: "2025-06-05",
          verified: true,
        },
        {
          id: 11,
          author: "Amanda Taylor",
          rating: 5,
          comment:
            "Best investment for my photography business. Clients love the image quality.",
          date: "2025-06-02",
          verified: true,
        },
        {
          id: 12,
          author: "Jason Lee",
          rating: 4.5,
          comment:
            "Fantastic camera with great low-light performance. Menu system could be more intuitive.",
          date: "2025-05-30",
          verified: false,
        },
      ],
    },
    tags: ["camera", "4K", "professional", "DSLR"],
    relatedProductIds: [2, 9, 12],
  },
  {
    id: 2,
    title: "TallyPrime Gold",
    description:
      "Durable machinery parts designed for heavy industrial applications and manufacturing.",
    actualPrice: 70000,
    salePrice: 67500,
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
    introVideoId: "dQw4w9WgXcQ",
    detailedVideoId: "gUGY1IC9gQk",
    category: "Machinery",
    industry: "Manufacturing",
    isTopProduct: true,
    isLatest: true,
    createdAt: "2024-02-20",
    features: [
      "Hardened steel construction",
      "Precision-machined tolerances",
      "Corrosion-resistant finish",
    ],
    benefits: [
      "Extended service life",
      "High accuracy in assembly",
      "Low maintenance requirements",
    ],
    stepsID: 1,
    review: {
      averageRating: 4.8,
      reviewCount: 132,
      latestReviews: [
        {
          id: 1,
          author: "Jane Doe",
          rating: 5,
          comment: "Amazing clarity and build quality!",
          date: "2025-07-01",
          verified: true,
        },
        {
          id: 2,
          author: "John Smith",
          rating: 4.5,
          comment: "Very reliable, great for low light.",
          date: "2025-06-28",
          verified: true,
        },
      ],
      allReviews: [
        {
          id: 1,
          author: "Jane Doe",
          rating: 5,
          comment:
            "Amazing clarity and build quality! The 4K video recording is superb and the weather sealing has saved me in tough conditions.",
          date: "2025-07-01",
          verified: true,
        },
        {
          id: 2,
          author: "John Smith",
          rating: 4.5,
          comment:
            "Very reliable, great for low light photography. The full-frame sensor makes a huge difference.",
          date: "2025-06-28",
          verified: true,
        },
        {
          id: 3,
          author: "Sarah Wilson",
          rating: 5,
          comment:
            "Professional quality at its finest. Worth every penny for serious photographers.",
          date: "2025-06-25",
          verified: false,
        },
        {
          id: 4,
          author: "Mike Johnson",
          rating: 4,
          comment:
            "Great camera, though the learning curve is steep for beginners. Build quality is excellent.",
          date: "2025-06-20",
          verified: true,
        },
        {
          id: 5,
          author: "Emily Chen",
          rating: 5,
          comment:
            "Outstanding performance in all lighting conditions. The interchangeable lens system is fantastic.",
          date: "2025-06-18",
          verified: true,
        },
        {
          id: 6,
          author: "David Brown",
          rating: 4,
          comment:
            "Good camera overall, battery life could be better but image quality is top-notch.",
          date: "2025-06-15",
          verified: false,
        },
        {
          id: 7,
          author: "Lisa Martinez",
          rating: 5,
          comment:
            "Perfect for wedding photography. The weather sealing and durability are impressive.",
          date: "2025-06-12",
          verified: true,
        },
        {
          id: 8,
          author: "Tom Anderson",
          rating: 4.5,
          comment:
            "Excellent build quality and image sharpness. Wi-Fi connectivity works flawlessly.",
          date: "2025-06-10",
          verified: true,
        },
        {
          id: 9,
          author: "Rachel Green",
          rating: 5,
          comment:
            "This camera exceeded my expectations. The 4K video quality is cinema-grade.",
          date: "2025-06-08",
          verified: false,
        },
        {
          id: 10,
          author: "Kevin White",
          rating: 4,
          comment:
            "Solid camera for professionals. Price is justified by the quality and features.",
          date: "2025-06-05",
          verified: true,
        },
        {
          id: 11,
          author: "Amanda Taylor",
          rating: 5,
          comment:
            "Best investment for my photography business. Clients love the image quality.",
          date: "2025-06-02",
          verified: true,
        },
        {
          id: 12,
          author: "Jason Lee",
          rating: 4.5,
          comment:
            "Fantastic camera with great low-light performance. Menu system could be more intuitive.",
          date: "2025-05-30",
          verified: false,
        },
      ],
    },
    tags: ["industrial", "steel", "precision"],
    relatedProductIds: [6, 10],
  },
  {
    id: 3,
    title: "TallyPrime Silver Renewal",
    description:
      "Benefits of Renewal Update New Release & Remote Access Facility & Also use Synchronization Facility.",
    actualPrice: 4500,
    salePrice: 5000,
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop",
    introVideoId: "dQw4w9WgXcQ",
    detailedVideoId: "gUGY1IC9gQk",
    category: "Food",
    industry: "Agriculture",
    isTopProduct: false,
    isLatest: true,
    createdAt: "2024-03-10",
    features: [
      "100% organic ingredients",
      "Non-GMO",
      "No artificial preservatives",
    ],
    benefits: [
      "Healthier nutrition",
      "Better taste",
      "Environmentally friendly farming",
    ],
    stepsID: 1,
    review: {
      averageRating: 4.8,
      reviewCount: 132,
      latestReviews: [
        {
          id: 1,
          author: "Jane Doe",
          rating: 5,
          comment: "Amazing clarity and build quality!",
          date: "2025-07-01",
          verified: true,
        },
        {
          id: 2,
          author: "John Smith",
          rating: 4.5,
          comment: "Very reliable, great for low light.",
          date: "2025-06-28",
          verified: true,
        },
      ],
      allReviews: [
        {
          id: 1,
          author: "Jane Doe",
          rating: 5,
          comment:
            "Amazing clarity and build quality! The 4K video recording is superb and the weather sealing has saved me in tough conditions.",
          date: "2025-07-01",
          verified: true,
        },
        {
          id: 2,
          author: "John Smith",
          rating: 4.5,
          comment:
            "Very reliable, great for low light photography. The full-frame sensor makes a huge difference.",
          date: "2025-06-28",
          verified: true,
        },
        {
          id: 3,
          author: "Sarah Wilson",
          rating: 5,
          comment:
            "Professional quality at its finest. Worth every penny for serious photographers.",
          date: "2025-06-25",
          verified: false,
        },
        {
          id: 4,
          author: "Mike Johnson",
          rating: 4,
          comment:
            "Great camera, though the learning curve is steep for beginners. Build quality is excellent.",
          date: "2025-06-20",
          verified: true,
        },
        {
          id: 5,
          author: "Emily Chen",
          rating: 5,
          comment:
            "Outstanding performance in all lighting conditions. The interchangeable lens system is fantastic.",
          date: "2025-06-18",
          verified: true,
        },
        {
          id: 6,
          author: "David Brown",
          rating: 4,
          comment:
            "Good camera overall, battery life could be better but image quality is top-notch.",
          date: "2025-06-15",
          verified: false,
        },
        {
          id: 7,
          author: "Lisa Martinez",
          rating: 5,
          comment:
            "Perfect for wedding photography. The weather sealing and durability are impressive.",
          date: "2025-06-12",
          verified: true,
        },
        {
          id: 8,
          author: "Tom Anderson",
          rating: 4.5,
          comment:
            "Excellent build quality and image sharpness. Wi-Fi connectivity works flawlessly.",
          date: "2025-06-10",
          verified: true,
        },
        {
          id: 9,
          author: "Rachel Green",
          rating: 5,
          comment:
            "This camera exceeded my expectations. The 4K video quality is cinema-grade.",
          date: "2025-06-08",
          verified: false,
        },
        {
          id: 10,
          author: "Kevin White",
          rating: 4,
          comment:
            "Solid camera for professionals. Price is justified by the quality and features.",
          date: "2025-06-05",
          verified: true,
        },
        {
          id: 11,
          author: "Amanda Taylor",
          rating: 5,
          comment:
            "Best investment for my photography business. Clients love the image quality.",
          date: "2025-06-02",
          verified: true,
        },
        {
          id: 12,
          author: "Jason Lee",
          rating: 4.5,
          comment:
            "Fantastic camera with great low-light performance. Menu system could be more intuitive.",
          date: "2025-05-30",
          verified: false,
        },
      ],
    },
    tags: ["organic", "fresh", "non-GMO"],
    relatedProductIds: [5, 8],
  },
  {
    id: 4,
    title: "TallyPrime Single to Multi Upgrade",
    description:
      "Benefits of Renewal Update New Release & Remote Access Facility & Also use Synchronization Facility.",
    actualPrice: 45000,
    salePrice: 50000,
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
    introVideoId: "dQw4w9WgXcQ",
    detailedVideoId: "gUGY1IC9gQk",
    category: "Medical",
    industry: "Healthcare",
    isTopProduct: true,
    isLatest: false,
    createdAt: "2024-01-05",
    features: [
      "Digital display",
      "Automated calibration",
      "Remote monitoring capability",
    ],
    benefits: [
      "High diagnostic accuracy",
      "Reduced manual errors",
      "24/7 patient monitoring",
    ],
    stepsID: 1,
    review: {
      averageRating: 4.8,
      reviewCount: 132,
      latestReviews: [
        {
          id: 1,
          author: "Jane Doe",
          rating: 5,
          comment: "Amazing clarity and build quality!",
          date: "2025-07-01",
          verified: true,
        },
        {
          id: 2,
          author: "John Smith",
          rating: 4.5,
          comment: "Very reliable, great for low light.",
          date: "2025-06-28",
          verified: true,
        },
      ],
      allReviews: [
        {
          id: 1,
          author: "Jane Doe",
          rating: 5,
          comment:
            "Amazing clarity and build quality! The 4K video recording is superb and the weather sealing has saved me in tough conditions.",
          date: "2025-07-01",
          verified: true,
        },
        {
          id: 2,
          author: "John Smith",
          rating: 4.5,
          comment:
            "Very reliable, great for low light photography. The full-frame sensor makes a huge difference.",
          date: "2025-06-28",
          verified: true,
        },
        {
          id: 3,
          author: "Sarah Wilson",
          rating: 5,
          comment:
            "Professional quality at its finest. Worth every penny for serious photographers.",
          date: "2025-06-25",
          verified: false,
        },
        {
          id: 4,
          author: "Mike Johnson",
          rating: 4,
          comment:
            "Great camera, though the learning curve is steep for beginners. Build quality is excellent.",
          date: "2025-06-20",
          verified: true,
        },
        {
          id: 5,
          author: "Emily Chen",
          rating: 5,
          comment:
            "Outstanding performance in all lighting conditions. The interchangeable lens system is fantastic.",
          date: "2025-06-18",
          verified: true,
        },
        {
          id: 6,
          author: "David Brown",
          rating: 4,
          comment:
            "Good camera overall, battery life could be better but image quality is top-notch.",
          date: "2025-06-15",
          verified: false,
        },
        {
          id: 7,
          author: "Lisa Martinez",
          rating: 5,
          comment:
            "Perfect for wedding photography. The weather sealing and durability are impressive.",
          date: "2025-06-12",
          verified: true,
        },
        {
          id: 8,
          author: "Tom Anderson",
          rating: 4.5,
          comment:
            "Excellent build quality and image sharpness. Wi-Fi connectivity works flawlessly.",
          date: "2025-06-10",
          verified: true,
        },
        {
          id: 9,
          author: "Rachel Green",
          rating: 5,
          comment:
            "This camera exceeded my expectations. The 4K video quality is cinema-grade.",
          date: "2025-06-08",
          verified: false,
        },
        {
          id: 10,
          author: "Kevin White",
          rating: 4,
          comment:
            "Solid camera for professionals. Price is justified by the quality and features.",
          date: "2025-06-05",
          verified: true,
        },
        {
          id: 11,
          author: "Amanda Taylor",
          rating: 5,
          comment:
            "Best investment for my photography business. Clients love the image quality.",
          date: "2025-06-02",
          verified: true,
        },
        {
          id: 12,
          author: "Jason Lee",
          rating: 4.5,
          comment:
            "Fantastic camera with great low-light performance. Menu system could be more intuitive.",
          date: "2025-05-30",
          verified: false,
        },
      ],
    },
    tags: ["medical", "diagnostic", "automated"],
    relatedProductIds: [7, 14],
  },
  {
    id: 5,
    title: "TallyPrime Gold Renewal",
    description:
      "Benefits of Renewal Update New Release & Remote Access Facility & Also use Synchronization Facility.",
    actualPrice: 13500,
    salePrice: 14500,
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
    introVideoId: "dQw4w9WgXcQ",
    detailedVideoId: "gUGY1IC9gQk",
    category: "Textiles",
    industry: "Fashion",
    isTopProduct: false,
    isLatest: true,
    createdAt: "2024-03-15",
    features: [
      "100% natural fibers",
      "High tensile strength",
      "Colorfast dyes",
    ],
    benefits: ["Long-lasting garments", "Comfortable wear", "Vibrant colors"],
    stepsID: 1,
    review: {
      averageRating: 4.8,
      reviewCount: 132,
      latestReviews: [
        {
          id: 1,
          author: "Jane Doe",
          rating: 5,
          comment: "Amazing clarity and build quality!",
          date: "2025-07-01",
          verified: true,
        },
        {
          id: 2,
          author: "John Smith",
          rating: 4.5,
          comment: "Very reliable, great for low light.",
          date: "2025-06-28",
          verified: true,
        },
      ],
      allReviews: [
        {
          id: 1,
          author: "Jane Doe",
          rating: 5,
          comment:
            "Amazing clarity and build quality! The 4K video recording is superb and the weather sealing has saved me in tough conditions.",
          date: "2025-07-01",
          verified: true,
        },
        {
          id: 2,
          author: "John Smith",
          rating: 4.5,
          comment:
            "Very reliable, great for low light photography. The full-frame sensor makes a huge difference.",
          date: "2025-06-28",
          verified: true,
        },
        {
          id: 3,
          author: "Sarah Wilson",
          rating: 5,
          comment:
            "Professional quality at its finest. Worth every penny for serious photographers.",
          date: "2025-06-25",
          verified: false,
        },
        {
          id: 4,
          author: "Mike Johnson",
          rating: 4,
          comment:
            "Great camera, though the learning curve is steep for beginners. Build quality is excellent.",
          date: "2025-06-20",
          verified: true,
        },
        {
          id: 5,
          author: "Emily Chen",
          rating: 5,
          comment:
            "Outstanding performance in all lighting conditions. The interchangeable lens system is fantastic.",
          date: "2025-06-18",
          verified: true,
        },
        {
          id: 6,
          author: "David Brown",
          rating: 4,
          comment:
            "Good camera overall, battery life could be better but image quality is top-notch.",
          date: "2025-06-15",
          verified: false,
        },
        {
          id: 7,
          author: "Lisa Martinez",
          rating: 5,
          comment:
            "Perfect for wedding photography. The weather sealing and durability are impressive.",
          date: "2025-06-12",
          verified: true,
        },
        {
          id: 8,
          author: "Tom Anderson",
          rating: 4.5,
          comment:
            "Excellent build quality and image sharpness. Wi-Fi connectivity works flawlessly.",
          date: "2025-06-10",
          verified: true,
        },
        {
          id: 9,
          author: "Rachel Green",
          rating: 5,
          comment:
            "This camera exceeded my expectations. The 4K video quality is cinema-grade.",
          date: "2025-06-08",
          verified: false,
        },
        {
          id: 10,
          author: "Kevin White",
          rating: 4,
          comment:
            "Solid camera for professionals. Price is justified by the quality and features.",
          date: "2025-06-05",
          verified: true,
        },
        {
          id: 11,
          author: "Amanda Taylor",
          rating: 5,
          comment:
            "Best investment for my photography business. Clients love the image quality.",
          date: "2025-06-02",
          verified: true,
        },
        {
          id: 12,
          author: "Jason Lee",
          rating: 4.5,
          comment:
            "Fantastic camera with great low-light performance. Menu system could be more intuitive.",
          date: "2025-05-30",
          verified: false,
        },
      ],
    },
    tags: ["textile", "fabric", "fashion"],
    relatedProductIds: [3, 11],
  },
  {
    id: 6,
    title: "TallyPrimeAuditor Renewal",
    description:
      "Benefits of Renewal Update New Release & Remote Access Facility & Also use Synchronization Facility.",
    actualPrice: 45000,
    salePrice: 47000,
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop",
    introVideoId: "dQw4w9WgXcQ",
    detailedVideoId: "gUGY1IC9gQk",
    category: "Tools",
    industry: "Construction",
    isTopProduct: false,
    isLatest: false,
    createdAt: "2024-01-20",
    features: ["Ergonomic grip", "High‑torque motor", "Dust‑proof casing"],
    benefits: [
      "Reduced operator fatigue",
      "Faster drilling/cutting",
      "Long service intervals",
    ],
    stepsID: 1,
    review: {
      averageRating: 4.8,
      reviewCount: 132,
      latestReviews: [
        {
          id: 1,
          author: "Jane Doe",
          rating: 5,
          comment: "Amazing clarity and build quality!",
          date: "2025-07-01",
          verified: true,
        },
        {
          id: 2,
          author: "John Smith",
          rating: 4.5,
          comment: "Very reliable, great for low light.",
          date: "2025-06-28",
          verified: true,
        },
      ],
      allReviews: [
        {
          id: 1,
          author: "Jane Doe",
          rating: 5,
          comment:
            "Amazing clarity and build quality! The 4K video recording is superb and the weather sealing has saved me in tough conditions.",
          date: "2025-07-01",
          verified: true,
        },
        {
          id: 2,
          author: "John Smith",
          rating: 4.5,
          comment:
            "Very reliable, great for low light photography. The full-frame sensor makes a huge difference.",
          date: "2025-06-28",
          verified: true,
        },
        {
          id: 3,
          author: "Sarah Wilson",
          rating: 5,
          comment:
            "Professional quality at its finest. Worth every penny for serious photographers.",
          date: "2025-06-25",
          verified: false,
        },
        {
          id: 4,
          author: "Mike Johnson",
          rating: 4,
          comment:
            "Great camera, though the learning curve is steep for beginners. Build quality is excellent.",
          date: "2025-06-20",
          verified: true,
        },
        {
          id: 5,
          author: "Emily Chen",
          rating: 5,
          comment:
            "Outstanding performance in all lighting conditions. The interchangeable lens system is fantastic.",
          date: "2025-06-18",
          verified: true,
        },
        {
          id: 6,
          author: "David Brown",
          rating: 4,
          comment:
            "Good camera overall, battery life could be better but image quality is top-notch.",
          date: "2025-06-15",
          verified: false,
        },
        {
          id: 7,
          author: "Lisa Martinez",
          rating: 5,
          comment:
            "Perfect for wedding photography. The weather sealing and durability are impressive.",
          date: "2025-06-12",
          verified: true,
        },
        {
          id: 8,
          author: "Tom Anderson",
          rating: 4.5,
          comment:
            "Excellent build quality and image sharpness. Wi-Fi connectivity works flawlessly.",
          date: "2025-06-10",
          verified: true,
        },
        {
          id: 9,
          author: "Rachel Green",
          rating: 5,
          comment:
            "This camera exceeded my expectations. The 4K video quality is cinema-grade.",
          date: "2025-06-08",
          verified: false,
        },
        {
          id: 10,
          author: "Kevin White",
          rating: 4,
          comment:
            "Solid camera for professionals. Price is justified by the quality and features.",
          date: "2025-06-05",
          verified: true,
        },
        {
          id: 11,
          author: "Amanda Taylor",
          rating: 5,
          comment:
            "Best investment for my photography business. Clients love the image quality.",
          date: "2025-06-02",
          verified: true,
        },
        {
          id: 12,
          author: "Jason Lee",
          rating: 4.5,
          comment:
            "Fantastic camera with great low-light performance. Menu system could be more intuitive.",
          date: "2025-05-30",
          verified: false,
        },
      ],
    },
    tags: ["drill", "power tool", "construction"],
    relatedProductIds: [2, 10],
  },
  {
    id: 7,
    title: "Laboratory Analysis Kit",
    description:
      "Complete lab kit for chemical and biological analysis in research facilities.",
    actualPrice: 22000,
    salePrice: 19000,
    image:
      "https://images.unsplash.com/photo-1581092337752-9c7d9450c3b8?w=400&h=300&fit=crop",
    introVideoId: "dQw4w9WgXcQ",
    detailedVideoId: "gUGY1IC9gQk",
    category: "Laboratory",
    industry: "Research",
    isTopProduct: true,
    isLatest: true,
    createdAt: "2024-04-01",
    features: [
      "pH meter",
      "Centrifuge",
      "Micro-pipette set",
      "Safety reagents",
    ],
    benefits: [
      "Accurate measurements",
      "Versatile sample prep",
      "Enhanced safety protocols",
    ],
    stepsID: 1,
    review: {
      averageRating: 4.8,
      reviewCount: 132,
      latestReviews: [
        {
          id: 1,
          author: "Jane Doe",
          rating: 5,
          comment: "Amazing clarity and build quality!",
          date: "2025-07-01",
          verified: true,
        },
        {
          id: 2,
          author: "John Smith",
          rating: 4.5,
          comment: "Very reliable, great for low light.",
          date: "2025-06-28",
          verified: true,
        },
      ],
      allReviews: [
        {
          id: 1,
          author: "Jane Doe",
          rating: 5,
          comment:
            "Amazing clarity and build quality! The 4K video recording is superb and the weather sealing has saved me in tough conditions.",
          date: "2025-07-01",
          verified: true,
        },
        {
          id: 2,
          author: "John Smith",
          rating: 4.5,
          comment:
            "Very reliable, great for low light photography. The full-frame sensor makes a huge difference.",
          date: "2025-06-28",
          verified: true,
        },
        {
          id: 3,
          author: "Sarah Wilson",
          rating: 5,
          comment:
            "Professional quality at its finest. Worth every penny for serious photographers.",
          date: "2025-06-25",
          verified: false,
        },
        {
          id: 4,
          author: "Mike Johnson",
          rating: 4,
          comment:
            "Great camera, though the learning curve is steep for beginners. Build quality is excellent.",
          date: "2025-06-20",
          verified: true,
        },
        {
          id: 5,
          author: "Emily Chen",
          rating: 5,
          comment:
            "Outstanding performance in all lighting conditions. The interchangeable lens system is fantastic.",
          date: "2025-06-18",
          verified: true,
        },
        {
          id: 6,
          author: "David Brown",
          rating: 4,
          comment:
            "Good camera overall, battery life could be better but image quality is top-notch.",
          date: "2025-06-15",
          verified: false,
        },
        {
          id: 7,
          author: "Lisa Martinez",
          rating: 5,
          comment:
            "Perfect for wedding photography. The weather sealing and durability are impressive.",
          date: "2025-06-12",
          verified: true,
        },
        {
          id: 8,
          author: "Tom Anderson",
          rating: 4.5,
          comment:
            "Excellent build quality and image sharpness. Wi-Fi connectivity works flawlessly.",
          date: "2025-06-10",
          verified: true,
        },
        {
          id: 9,
          author: "Rachel Green",
          rating: 5,
          comment:
            "This camera exceeded my expectations. The 4K video quality is cinema-grade.",
          date: "2025-06-08",
          verified: false,
        },
        {
          id: 10,
          author: "Kevin White",
          rating: 4,
          comment:
            "Solid camera for professionals. Price is justified by the quality and features.",
          date: "2025-06-05",
          verified: true,
        },
        {
          id: 11,
          author: "Amanda Taylor",
          rating: 5,
          comment:
            "Best investment for my photography business. Clients love the image quality.",
          date: "2025-06-02",
          verified: true,
        },
        {
          id: 12,
          author: "Jason Lee",
          rating: 4.5,
          comment:
            "Fantastic camera with great low-light performance. Menu system could be more intuitive.",
          date: "2025-05-30",
          verified: false,
        },
      ],
    },
    tags: ["lab", "analysis", "research"],
    relatedProductIds: [4, 14],
  },
  {
    id: 8,
    title: "Biodegradable Packaging Solutions",
    description:
      "Eco-friendly packaging materials that decompose naturally without harming the environment.",
    actualPrice: 800,
    salePrice: 650,
    image:
      "https://images.unsplash.com/photo-1593032465179-24083904d61f?w=400&h=300&fit=crop",
    introVideoId: "dQw4w9WgXcQ",
    detailedVideoId: "gUGY1IC9gQk",
    category: "Packaging",
    industry: "Sustainability",
    isTopProduct: false,
    isLatest: true,
    createdAt: "2024-05-12",
    features: [
      "Compostable film",
      "Recycled paperboard",
      "Moisture barrier coating",
    ],
    benefits: [
      "Reduces plastic waste",
      "Maintains product freshness",
      "Safe for food contact",
    ],
    stepsID: 1,
    review: {
      averageRating: 4.8,
      reviewCount: 132,
      latestReviews: [
        {
          id: 1,
          author: "Jane Doe",
          rating: 5,
          comment: "Amazing clarity and build quality!",
          date: "2025-07-01",
          verified: true,
        },
        {
          id: 2,
          author: "John Smith",
          rating: 4.5,
          comment: "Very reliable, great for low light.",
          date: "2025-06-28",
          verified: true,
        },
      ],
      allReviews: [
        {
          id: 1,
          author: "Jane Doe",
          rating: 5,
          comment:
            "Amazing clarity and build quality! The 4K video recording is superb and the weather sealing has saved me in tough conditions.",
          date: "2025-07-01",
          verified: true,
        },
        {
          id: 2,
          author: "John Smith",
          rating: 4.5,
          comment:
            "Very reliable, great for low light photography. The full-frame sensor makes a huge difference.",
          date: "2025-06-28",
          verified: true,
        },
        {
          id: 3,
          author: "Sarah Wilson",
          rating: 5,
          comment:
            "Professional quality at its finest. Worth every penny for serious photographers.",
          date: "2025-06-25",
          verified: false,
        },
        {
          id: 4,
          author: "Mike Johnson",
          rating: 4,
          comment:
            "Great camera, though the learning curve is steep for beginners. Build quality is excellent.",
          date: "2025-06-20",
          verified: true,
        },
        {
          id: 5,
          author: "Emily Chen",
          rating: 5,
          comment:
            "Outstanding performance in all lighting conditions. The interchangeable lens system is fantastic.",
          date: "2025-06-18",
          verified: true,
        },
        {
          id: 6,
          author: "David Brown",
          rating: 4,
          comment:
            "Good camera overall, battery life could be better but image quality is top-notch.",
          date: "2025-06-15",
          verified: false,
        },
        {
          id: 7,
          author: "Lisa Martinez",
          rating: 5,
          comment:
            "Perfect for wedding photography. The weather sealing and durability are impressive.",
          date: "2025-06-12",
          verified: true,
        },
        {
          id: 8,
          author: "Tom Anderson",
          rating: 4.5,
          comment:
            "Excellent build quality and image sharpness. Wi-Fi connectivity works flawlessly.",
          date: "2025-06-10",
          verified: true,
        },
        {
          id: 9,
          author: "Rachel Green",
          rating: 5,
          comment:
            "This camera exceeded my expectations. The 4K video quality is cinema-grade.",
          date: "2025-06-08",
          verified: false,
        },
        {
          id: 10,
          author: "Kevin White",
          rating: 4,
          comment:
            "Solid camera for professionals. Price is justified by the quality and features.",
          date: "2025-06-05",
          verified: true,
        },
        {
          id: 11,
          author: "Amanda Taylor",
          rating: 5,
          comment:
            "Best investment for my photography business. Clients love the image quality.",
          date: "2025-06-02",
          verified: true,
        },
        {
          id: 12,
          author: "Jason Lee",
          rating: 4.5,
          comment:
            "Fantastic camera with great low-light performance. Menu system could be more intuitive.",
          date: "2025-05-30",
          verified: false,
        },
      ],
    },
    tags: ["eco", "biodegradable", "packaging"],
    relatedProductIds: [3, 5],
  },
  {
    id: 9,
    title: "Wireless Noise‑Cancelling Headphones",
    description:
      "Premium over‑ear headphones with active noise cancellation and long battery life.",
    actualPrice: 12000,
    salePrice: 9000,
    image:
      "https://images.unsplash.com/photo-1516707570260-39e7b41c8c86?w=400&h=300&fit=crop",
    introVideoId: "dQw4w9WgXcQ",
    detailedVideoId: "gUGY1IC9gQk",
    category: "Audio",
    industry: "Electronics",
    isTopProduct: true,
    isLatest: false,
    createdAt: "2024-02-28",
    features: [
      "Active noise cancellation",
      "30‑hour battery",
      "Bluetooth 5.2",
      "Touch controls",
    ],
    benefits: ["Immersive listening", "All‑day use", "Seamless device pairing"],
    stepsID: 1,
    review: {
      averageRating: 4.8,
      reviewCount: 132,
      latestReviews: [
        {
          id: 1,
          author: "Jane Doe",
          rating: 5,
          comment: "Amazing clarity and build quality!",
          date: "2025-07-01",
          verified: true,
        },
        {
          id: 2,
          author: "John Smith",
          rating: 4.5,
          comment: "Very reliable, great for low light.",
          date: "2025-06-28",
          verified: true,
        },
      ],
      allReviews: [
        {
          id: 1,
          author: "Jane Doe",
          rating: 5,
          comment:
            "Amazing clarity and build quality! The 4K video recording is superb and the weather sealing has saved me in tough conditions.",
          date: "2025-07-01",
          verified: true,
        },
        {
          id: 2,
          author: "John Smith",
          rating: 4.5,
          comment:
            "Very reliable, great for low light photography. The full-frame sensor makes a huge difference.",
          date: "2025-06-28",
          verified: true,
        },
        {
          id: 3,
          author: "Sarah Wilson",
          rating: 5,
          comment:
            "Professional quality at its finest. Worth every penny for serious photographers.",
          date: "2025-06-25",
          verified: false,
        },
        {
          id: 4,
          author: "Mike Johnson",
          rating: 4,
          comment:
            "Great camera, though the learning curve is steep for beginners. Build quality is excellent.",
          date: "2025-06-20",
          verified: true,
        },
        {
          id: 5,
          author: "Emily Chen",
          rating: 5,
          comment:
            "Outstanding performance in all lighting conditions. The interchangeable lens system is fantastic.",
          date: "2025-06-18",
          verified: true,
        },
        {
          id: 6,
          author: "David Brown",
          rating: 4,
          comment:
            "Good camera overall, battery life could be better but image quality is top-notch.",
          date: "2025-06-15",
          verified: false,
        },
        {
          id: 7,
          author: "Lisa Martinez",
          rating: 5,
          comment:
            "Perfect for wedding photography. The weather sealing and durability are impressive.",
          date: "2025-06-12",
          verified: true,
        },
        {
          id: 8,
          author: "Tom Anderson",
          rating: 4.5,
          comment:
            "Excellent build quality and image sharpness. Wi-Fi connectivity works flawlessly.",
          date: "2025-06-10",
          verified: true,
        },
        {
          id: 9,
          author: "Rachel Green",
          rating: 5,
          comment:
            "This camera exceeded my expectations. The 4K video quality is cinema-grade.",
          date: "2025-06-08",
          verified: false,
        },
        {
          id: 10,
          author: "Kevin White",
          rating: 4,
          comment:
            "Solid camera for professionals. Price is justified by the quality and features.",
          date: "2025-06-05",
          verified: true,
        },
        {
          id: 11,
          author: "Amanda Taylor",
          rating: 5,
          comment:
            "Best investment for my photography business. Clients love the image quality.",
          date: "2025-06-02",
          verified: true,
        },
        {
          id: 12,
          author: "Jason Lee",
          rating: 4.5,
          comment:
            "Fantastic camera with great low-light performance. Menu system could be more intuitive.",
          date: "2025-05-30",
          verified: false,
        },
      ],
    },
    tags: ["headphones", "wireless", "noise-canceling"],
    relatedProductIds: [1, 12],
  },
  {
    id: 10,
    title: "Automotive Diagnostic Scanner",
    description:
      "Handheld OBD‑II scanner for quick vehicle diagnostics and real‑time data monitoring.",
    actualPrice: 7000,
    salePrice: 5500,
    image:
      "https://images.unsplash.com/photo-1563306406-23c1610a6f42?w=400&h=300&fit=crop",
    introVideoId: "dQw4w9WgXcQ",
    detailedVideoId: "gUGY1IC9gQk",
    category: "Automotive",
    industry: "Automotive Services",
    isTopProduct: false,
    isLatest: true,
    createdAt: "2024-03-22",
    features: [
      "Live engine data",
      "Error code reading",
      "Multi-protocol support",
      "Color display",
    ],
    benefits: [
      "Speeds up troubleshooting",
      "Reduces repair costs",
      "User‑friendly interface",
    ],
    stepsID: 1,
    review: {
      averageRating: 4.8,
      reviewCount: 132,
      latestReviews: [
        {
          id: 1,
          author: "Jane Doe",
          rating: 5,
          comment: "Amazing clarity and build quality!",
          date: "2025-07-01",
          verified: true,
        },
        {
          id: 2,
          author: "John Smith",
          rating: 4.5,
          comment: "Very reliable, great for low light.",
          date: "2025-06-28",
          verified: true,
        },
      ],
      allReviews: [
        {
          id: 1,
          author: "Jane Doe",
          rating: 5,
          comment:
            "Amazing clarity and build quality! The 4K video recording is superb and the weather sealing has saved me in tough conditions.",
          date: "2025-07-01",
          verified: true,
        },
        {
          id: 2,
          author: "John Smith",
          rating: 4.5,
          comment:
            "Very reliable, great for low light photography. The full-frame sensor makes a huge difference.",
          date: "2025-06-28",
          verified: true,
        },
        {
          id: 3,
          author: "Sarah Wilson",
          rating: 5,
          comment:
            "Professional quality at its finest. Worth every penny for serious photographers.",
          date: "2025-06-25",
          verified: false,
        },
        {
          id: 4,
          author: "Mike Johnson",
          rating: 4,
          comment:
            "Great camera, though the learning curve is steep for beginners. Build quality is excellent.",
          date: "2025-06-20",
          verified: true,
        },
        {
          id: 5,
          author: "Emily Chen",
          rating: 5,
          comment:
            "Outstanding performance in all lighting conditions. The interchangeable lens system is fantastic.",
          date: "2025-06-18",
          verified: true,
        },
        {
          id: 6,
          author: "David Brown",
          rating: 4,
          comment:
            "Good camera overall, battery life could be better but image quality is top-notch.",
          date: "2025-06-15",
          verified: false,
        },
        {
          id: 7,
          author: "Lisa Martinez",
          rating: 5,
          comment:
            "Perfect for wedding photography. The weather sealing and durability are impressive.",
          date: "2025-06-12",
          verified: true,
        },
        {
          id: 8,
          author: "Tom Anderson",
          rating: 4.5,
          comment:
            "Excellent build quality and image sharpness. Wi-Fi connectivity works flawlessly.",
          date: "2025-06-10",
          verified: true,
        },
        {
          id: 9,
          author: "Rachel Green",
          rating: 5,
          comment:
            "This camera exceeded my expectations. The 4K video quality is cinema-grade.",
          date: "2025-06-08",
          verified: false,
        },
        {
          id: 10,
          author: "Kevin White",
          rating: 4,
          comment:
            "Solid camera for professionals. Price is justified by the quality and features.",
          date: "2025-06-05",
          verified: true,
        },
        {
          id: 11,
          author: "Amanda Taylor",
          rating: 5,
          comment:
            "Best investment for my photography business. Clients love the image quality.",
          date: "2025-06-02",
          verified: true,
        },
        {
          id: 12,
          author: "Jason Lee",
          rating: 4.5,
          comment:
            "Fantastic camera with great low-light performance. Menu system could be more intuitive.",
          date: "2025-05-30",
          verified: false,
        },
      ],
    },
    tags: ["OBD-II", "diagnostic", "scanner"],
    relatedProductIds: [6, 11],
  },
  {
    id: 11,
    title: "Ergonomic Office Chair",
    description:
      "Adjustable office chair with lumbar support and breathable mesh back.",
    actualPrice: 8000,
    salePrice: 6500,
    image:
      "https://images.unsplash.com/photo-1587899891567-6d17e8a50719?w=400&h=300&fit=crop",
    introVideoId: "dQw4w9WgXcQ",
    detailedVideoId: "gUGY1IC9gQk",
    category: "Furniture",
    industry: "Office",
    isTopProduct: true,
    isLatest: false,
    createdAt: "2024-04-18",
    features: [
      "Adjustable lumbar support",
      "360° swivel",
      "Height and tilt adjustment",
    ],
    benefits: ["Improves posture", "Enhances comfort", "Boosts productivity"],
    stepsID: 1,
    review: {
      averageRating: 4.8,
      reviewCount: 132,
      latestReviews: [
        {
          id: 1,
          author: "Jane Doe",
          rating: 5,
          comment: "Amazing clarity and build quality!",
          date: "2025-07-01",
          verified: true,
        },
        {
          id: 2,
          author: "John Smith",
          rating: 4.5,
          comment: "Very reliable, great for low light.",
          date: "2025-06-28",
          verified: true,
        },
      ],
      allReviews: [
        {
          id: 1,
          author: "Jane Doe",
          rating: 5,
          comment:
            "Amazing clarity and build quality! The 4K video recording is superb and the weather sealing has saved me in tough conditions.",
          date: "2025-07-01",
          verified: true,
        },
        {
          id: 2,
          author: "John Smith",
          rating: 4.5,
          comment:
            "Very reliable, great for low light photography. The full-frame sensor makes a huge difference.",
          date: "2025-06-28",
          verified: true,
        },
        {
          id: 3,
          author: "Sarah Wilson",
          rating: 5,
          comment:
            "Professional quality at its finest. Worth every penny for serious photographers.",
          date: "2025-06-25",
          verified: false,
        },
        {
          id: 4,
          author: "Mike Johnson",
          rating: 4,
          comment:
            "Great camera, though the learning curve is steep for beginners. Build quality is excellent.",
          date: "2025-06-20",
          verified: true,
        },
        {
          id: 5,
          author: "Emily Chen",
          rating: 5,
          comment:
            "Outstanding performance in all lighting conditions. The interchangeable lens system is fantastic.",
          date: "2025-06-18",
          verified: true,
        },
        {
          id: 6,
          author: "David Brown",
          rating: 4,
          comment:
            "Good camera overall, battery life could be better but image quality is top-notch.",
          date: "2025-06-15",
          verified: false,
        },
        {
          id: 7,
          author: "Lisa Martinez",
          rating: 5,
          comment:
            "Perfect for wedding photography. The weather sealing and durability are impressive.",
          date: "2025-06-12",
          verified: true,
        },
        {
          id: 8,
          author: "Tom Anderson",
          rating: 4.5,
          comment:
            "Excellent build quality and image sharpness. Wi-Fi connectivity works flawlessly.",
          date: "2025-06-10",
          verified: true,
        },
        {
          id: 9,
          author: "Rachel Green",
          rating: 5,
          comment:
            "This camera exceeded my expectations. The 4K video quality is cinema-grade.",
          date: "2025-06-08",
          verified: false,
        },
        {
          id: 10,
          author: "Kevin White",
          rating: 4,
          comment:
            "Solid camera for professionals. Price is justified by the quality and features.",
          date: "2025-06-05",
          verified: true,
        },
        {
          id: 11,
          author: "Amanda Taylor",
          rating: 5,
          comment:
            "Best investment for my photography business. Clients love the image quality.",
          date: "2025-06-02",
          verified: true,
        },
        {
          id: 12,
          author: "Jason Lee",
          rating: 4.5,
          comment:
            "Fantastic camera with great low-light performance. Menu system could be more intuitive.",
          date: "2025-05-30",
          verified: false,
        },
      ],
    },
    tags: ["office", "ergonomic", "chair"],
    relatedProductIds: [5, 10],
  },
  {
    id: 12,
    title: "Cloud‑Based Accounting Software",
    description:
      "Comprehensive accounting software with invoicing, payroll, and real‑time reporting.",
    actualPrice: 15000,
    salePrice: 13000,
    image:
      "https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?w=400&h=300&fit=crop",
    introVideoId: "dQw4w9WgXcQ",
    detailedVideoId: "gUGY1IC9gQk",
    category: "Software",
    industry: "Finance",
    isTopProduct: true,
    isLatest: true,
    createdAt: "2024-06-05",
    features: [
      "Automated invoicing",
      "Payroll integration",
      "Real‑time dashboards",
      "Multi‑currency support",
    ],
    benefits: [
      "Streamlines bookkeeping",
      "Ensures tax compliance",
      "Improves cash flow visibility",
    ],
    stepsID: 1,
    review: {
      averageRating: 4.8,
      reviewCount: 132,
      latestReviews: [
        {
          id: 1,
          author: "Jane Doe",
          rating: 5,
          comment: "Amazing clarity and build quality!",
          date: "2025-07-01",
          verified: true,
        },
        {
          id: 2,
          author: "John Smith",
          rating: 4.5,
          comment: "Very reliable, great for low light.",
          date: "2025-06-28",
          verified: true,
        },
      ],
      allReviews: [
        {
          id: 1,
          author: "Jane Doe",
          rating: 5,
          comment:
            "Amazing clarity and build quality! The 4K video recording is superb and the weather sealing has saved me in tough conditions.",
          date: "2025-07-01",
          verified: true,
        },
        {
          id: 2,
          author: "John Smith",
          rating: 4.5,
          comment:
            "Very reliable, great for low light photography. The full-frame sensor makes a huge difference.",
          date: "2025-06-28",
          verified: true,
        },
        {
          id: 3,
          author: "Sarah Wilson",
          rating: 5,
          comment:
            "Professional quality at its finest. Worth every penny for serious photographers.",
          date: "2025-06-25",
          verified: false,
        },
        {
          id: 4,
          author: "Mike Johnson",
          rating: 4,
          comment:
            "Great camera, though the learning curve is steep for beginners. Build quality is excellent.",
          date: "2025-06-20",
          verified: true,
        },
        {
          id: 5,
          author: "Emily Chen",
          rating: 5,
          comment:
            "Outstanding performance in all lighting conditions. The interchangeable lens system is fantastic.",
          date: "2025-06-18",
          verified: true,
        },
        {
          id: 6,
          author: "David Brown",
          rating: 4,
          comment:
            "Good camera overall, battery life could be better but image quality is top-notch.",
          date: "2025-06-15",
          verified: false,
        },
        {
          id: 7,
          author: "Lisa Martinez",
          rating: 5,
          comment:
            "Perfect for wedding photography. The weather sealing and durability are impressive.",
          date: "2025-06-12",
          verified: true,
        },
        {
          id: 8,
          author: "Tom Anderson",
          rating: 4.5,
          comment:
            "Excellent build quality and image sharpness. Wi-Fi connectivity works flawlessly.",
          date: "2025-06-10",
          verified: true,
        },
        {
          id: 9,
          author: "Rachel Green",
          rating: 5,
          comment:
            "This camera exceeded my expectations. The 4K video quality is cinema-grade.",
          date: "2025-06-08",
          verified: false,
        },
        {
          id: 10,
          author: "Kevin White",
          rating: 4,
          comment:
            "Solid camera for professionals. Price is justified by the quality and features.",
          date: "2025-06-05",
          verified: true,
        },
        {
          id: 11,
          author: "Amanda Taylor",
          rating: 5,
          comment:
            "Best investment for my photography business. Clients love the image quality.",
          date: "2025-06-02",
          verified: true,
        },
        {
          id: 12,
          author: "Jason Lee",
          rating: 4.5,
          comment:
            "Fantastic camera with great low-light performance. Menu system could be more intuitive.",
          date: "2025-05-30",
          verified: false,
        },
      ],
    },
    tags: ["accounting", "cloud", "SaaS"],
    relatedProductIds: [1, 13, 15],
  },
  {
    id: 13,
    title: "Home Kitchen Appliance Set",
    description:
      "Essential kitchen appliances bundle: mixer, toaster, and blender for daily cooking needs.",
    actualPrice: 9000,
    salePrice: 7500,
    image:
      "https://images.unsplash.com/photo-1598514982433-74c3929d0e8e?w=400&h=300&fit=crop",
    introVideoId: "dQw4w9WgXcQ",
    detailedVideoId: "gUGY1IC9gQk",
    category: "Appliances",
    industry: "Home",
    isTopProduct: false,
    isLatest: false,
    createdAt: "2024-02-10",
    features: ["Multi-speed blender", "4-slice toaster", "Heavy-duty mixer"],
    benefits: [
      "Saves countertop space",
      "Versatile cooking options",
      "Durable performance",
    ],
    stepsID: 1,
    review: {
      averageRating: 4.8,
      reviewCount: 132,
      latestReviews: [
        {
          id: 1,
          author: "Jane Doe",
          rating: 5,
          comment: "Amazing clarity and build quality!",
          date: "2025-07-01",
          verified: true,
        },
        {
          id: 2,
          author: "John Smith",
          rating: 4.5,
          comment: "Very reliable, great for low light.",
          date: "2025-06-28",
          verified: true,
        },
      ],
      allReviews: [
        {
          id: 1,
          author: "Jane Doe",
          rating: 5,
          comment:
            "Amazing clarity and build quality! The 4K video recording is superb and the weather sealing has saved me in tough conditions.",
          date: "2025-07-01",
          verified: true,
        },
        {
          id: 2,
          author: "John Smith",
          rating: 4.5,
          comment:
            "Very reliable, great for low light photography. The full-frame sensor makes a huge difference.",
          date: "2025-06-28",
          verified: true,
        },
        {
          id: 3,
          author: "Sarah Wilson",
          rating: 5,
          comment:
            "Professional quality at its finest. Worth every penny for serious photographers.",
          date: "2025-06-25",
          verified: false,
        },
        {
          id: 4,
          author: "Mike Johnson",
          rating: 4,
          comment:
            "Great camera, though the learning curve is steep for beginners. Build quality is excellent.",
          date: "2025-06-20",
          verified: true,
        },
        {
          id: 5,
          author: "Emily Chen",
          rating: 5,
          comment:
            "Outstanding performance in all lighting conditions. The interchangeable lens system is fantastic.",
          date: "2025-06-18",
          verified: true,
        },
        {
          id: 6,
          author: "David Brown",
          rating: 4,
          comment:
            "Good camera overall, battery life could be better but image quality is top-notch.",
          date: "2025-06-15",
          verified: false,
        },
        {
          id: 7,
          author: "Lisa Martinez",
          rating: 5,
          comment:
            "Perfect for wedding photography. The weather sealing and durability are impressive.",
          date: "2025-06-12",
          verified: true,
        },
        {
          id: 8,
          author: "Tom Anderson",
          rating: 4.5,
          comment:
            "Excellent build quality and image sharpness. Wi-Fi connectivity works flawlessly.",
          date: "2025-06-10",
          verified: true,
        },
        {
          id: 9,
          author: "Rachel Green",
          rating: 5,
          comment:
            "This camera exceeded my expectations. The 4K video quality is cinema-grade.",
          date: "2025-06-08",
          verified: false,
        },
        {
          id: 10,
          author: "Kevin White",
          rating: 4,
          comment:
            "Solid camera for professionals. Price is justified by the quality and features.",
          date: "2025-06-05",
          verified: true,
        },
        {
          id: 11,
          author: "Amanda Taylor",
          rating: 5,
          comment:
            "Best investment for my photography business. Clients love the image quality.",
          date: "2025-06-02",
          verified: true,
        },
        {
          id: 12,
          author: "Jason Lee",
          rating: 4.5,
          comment:
            "Fantastic camera with great low-light performance. Menu system could be more intuitive.",
          date: "2025-05-30",
          verified: false,
        },
      ],
    },
    tags: ["kitchen", "appliances", "bundle"],
    relatedProductIds: [8, 14],
  },
  {
    id: 14,
    title: "Garden Landscaping Tools Set",
    description:
      "Complete set of hand and power tools for garden maintenance and landscaping.",
    actualPrice: 6000,
    salePrice: 5000,
    image:
      "https://images.unsplash.com/photo-1581094452111-3b2ed4f7dfdc?w=400&h=300&fit=crop",
    introVideoId: "dQw4w9WgXcQ",
    detailedVideoId: "gUGY1IC9gQk",
    category: "Garden",
    industry: "Outdoor",
    isTopProduct: false,
    isLatest: true,
    createdAt: "2024-05-22",
    features: [
      "Ergonomic pruning shears",
      "Battery-powered trimmer",
      "Adjustable rake",
    ],
    benefits: ["Reduces back strain", "Efficient trimming", "Easy cleanup"],
    stepsID: 1,
    review: {
      averageRating: 4.8,
      reviewCount: 132,
      latestReviews: [
        {
          id: 1,
          author: "Jane Doe",
          rating: 5,
          comment: "Amazing clarity and build quality!",
          date: "2025-07-01",
          verified: true,
        },
        {
          id: 2,
          author: "John Smith",
          rating: 4.5,
          comment: "Very reliable, great for low light.",
          date: "2025-06-28",
          verified: true,
        },
      ],
      allReviews: [
        {
          id: 1,
          author: "Jane Doe",
          rating: 5,
          comment:
            "Amazing clarity and build quality! The 4K video recording is superb and the weather sealing has saved me in tough conditions.",
          date: "2025-07-01",
          verified: true,
        },
        {
          id: 2,
          author: "John Smith",
          rating: 4.5,
          comment:
            "Very reliable, great for low light photography. The full-frame sensor makes a huge difference.",
          date: "2025-06-28",
          verified: true,
        },
        {
          id: 3,
          author: "Sarah Wilson",
          rating: 5,
          comment:
            "Professional quality at its finest. Worth every penny for serious photographers.",
          date: "2025-06-25",
          verified: false,
        },
        {
          id: 4,
          author: "Mike Johnson",
          rating: 4,
          comment:
            "Great camera, though the learning curve is steep for beginners. Build quality is excellent.",
          date: "2025-06-20",
          verified: true,
        },
        {
          id: 5,
          author: "Emily Chen",
          rating: 5,
          comment:
            "Outstanding performance in all lighting conditions. The interchangeable lens system is fantastic.",
          date: "2025-06-18",
          verified: true,
        },
        {
          id: 6,
          author: "David Brown",
          rating: 4,
          comment:
            "Good camera overall, battery life could be better but image quality is top-notch.",
          date: "2025-06-15",
          verified: false,
        },
        {
          id: 7,
          author: "Lisa Martinez",
          rating: 5,
          comment:
            "Perfect for wedding photography. The weather sealing and durability are impressive.",
          date: "2025-06-12",
          verified: true,
        },
        {
          id: 8,
          author: "Tom Anderson",
          rating: 4.5,
          comment:
            "Excellent build quality and image sharpness. Wi-Fi connectivity works flawlessly.",
          date: "2025-06-10",
          verified: true,
        },
        {
          id: 9,
          author: "Rachel Green",
          rating: 5,
          comment:
            "This camera exceeded my expectations. The 4K video quality is cinema-grade.",
          date: "2025-06-08",
          verified: false,
        },
        {
          id: 10,
          author: "Kevin White",
          rating: 4,
          comment:
            "Solid camera for professionals. Price is justified by the quality and features.",
          date: "2025-06-05",
          verified: true,
        },
        {
          id: 11,
          author: "Amanda Taylor",
          rating: 5,
          comment:
            "Best investment for my photography business. Clients love the image quality.",
          date: "2025-06-02",
          verified: true,
        },
        {
          id: 12,
          author: "Jason Lee",
          rating: 4.5,
          comment:
            "Fantastic camera with great low-light performance. Menu system could be more intuitive.",
          date: "2025-05-30",
          verified: false,
        },
      ],
    },
    tags: ["garden", "tools", "landscaping"],
    relatedProductIds: [6, 7],
  },
  {
    id: 15,
    title: "High‑Performance Sports Gear",
    description:
      "Durable sports equipment for training and competition across various disciplines.",
    actualPrice: 7000,
    salePrice: 6000,
    image:
      "https://images.unsplash.com/photo-1598970434795-0c54fe7c0642?w=400&h=300&fit=crop",
    introVideoId: "dQw4w9WgXcQ",
    detailedVideoId: "gUGY1IC9gQk",
    category: "Sports",
    industry: "Athletics",
    isTopProduct: true,
    isLatest: true,
    createdAt: "2024-06-28",
    features: [
      "Lightweight materials",
      "Sweat‑wicking fabrics",
      "Ergonomic design",
    ],
    benefits: [
      "Enhances performance",
      "Improves comfort",
      "Reduces injury risk",
    ],
    stepsID: 1,
    review: {
      averageRating: 4.8,
      reviewCount: 132,
      latestReviews: [
        {
          id: 1,
          author: "Jane Doe",
          rating: 5,
          comment: "Amazing clarity and build quality!",
          date: "2025-07-01",
          verified: true,
        },
        {
          id: 2,
          author: "John Smith",
          rating: 4.5,
          comment: "Very reliable, great for low light.",
          date: "2025-06-28",
          verified: true,
        },
      ],
      allReviews: [
        {
          id: 1,
          author: "Jane Doe",
          rating: 5,
          comment:
            "Amazing clarity and build quality! The 4K video recording is superb and the weather sealing has saved me in tough conditions.",
          date: "2025-07-01",
          verified: true,
        },
        {
          id: 2,
          author: "John Smith",
          rating: 4.5,
          comment:
            "Very reliable, great for low light photography. The full-frame sensor makes a huge difference.",
          date: "2025-06-28",
          verified: true,
        },
        {
          id: 3,
          author: "Sarah Wilson",
          rating: 5,
          comment:
            "Professional quality at its finest. Worth every penny for serious photographers.",
          date: "2025-06-25",
          verified: false,
        },
        {
          id: 4,
          author: "Mike Johnson",
          rating: 4,
          comment:
            "Great camera, though the learning curve is steep for beginners. Build quality is excellent.",
          date: "2025-06-20",
          verified: true,
        },
        {
          id: 5,
          author: "Emily Chen",
          rating: 5,
          comment:
            "Outstanding performance in all lighting conditions. The interchangeable lens system is fantastic.",
          date: "2025-06-18",
          verified: true,
        },
        {
          id: 6,
          author: "David Brown",
          rating: 4,
          comment:
            "Good camera overall, battery life could be better but image quality is top-notch.",
          date: "2025-06-15",
          verified: false,
        },
        {
          id: 7,
          author: "Lisa Martinez",
          rating: 5,
          comment:
            "Perfect for wedding photography. The weather sealing and durability are impressive.",
          date: "2025-06-12",
          verified: true,
        },
        {
          id: 8,
          author: "Tom Anderson",
          rating: 4.5,
          comment:
            "Excellent build quality and image sharpness. Wi-Fi connectivity works flawlessly.",
          date: "2025-06-10",
          verified: true,
        },
        {
          id: 9,
          author: "Rachel Green",
          rating: 5,
          comment:
            "This camera exceeded my expectations. The 4K video quality is cinema-grade.",
          date: "2025-06-08",
          verified: false,
        },
        {
          id: 10,
          author: "Kevin White",
          rating: 4,
          comment:
            "Solid camera for professionals. Price is justified by the quality and features.",
          date: "2025-06-05",
          verified: true,
        },
        {
          id: 11,
          author: "Amanda Taylor",
          rating: 5,
          comment:
            "Best investment for my photography business. Clients love the image quality.",
          date: "2025-06-02",
          verified: true,
        },
        {
          id: 12,
          author: "Jason Lee",
          rating: 4.5,
          comment:
            "Fantastic camera with great low-light performance. Menu system could be more intuitive.",
          date: "2025-05-30",
          verified: false,
        },
      ],
    },
    tags: ["sports", "fitness", "gear"],
    relatedProductIds: [9, 11],
  },
];

export const categories = [
  "All",
  "Electronics",
  "Machinery",
  "Food",
  "Medical",
  "Textiles",
  "Tools",
];
export const industries = [
  "All",
  "Photography",
  "Manufacturing",
  "Agriculture",
  "Healthcare",
  "Fashion",
  "Construction",
];

export const flowGroups: FlowGroup[] = [
  {
    id: 1,
    steps: [
      {
        id: 1,
        title: "Free Consultation",
        shortTitle: "Consult",
        description:
          "Tell us your needs and we'll create a perfect solution plan",
        icon: MessageSquare,
        color: "from-blue-500 to-blue-600",
        borderColor: "border-blue-200",
        bgColor: "bg-blue-50",
        duration: "30 min",
        status: "Free",
        details: [
          "No-obligation consultation call",
          "Business requirement analysis",
          "Custom solution recommendations",
          "Technology stack discussion",
        ],
      },
      {
        id: 2,
        title: "Live Product Demo",
        shortTitle: "Demo",
        description:
          "See the product working live on your system before you buy",
        icon: Monitor,
        color: "from-emerald-500 to-emerald-600",
        borderColor: "border-emerald-200",
        bgColor: "bg-emerald-50",
        duration: "45-60 min",
        status: "Interactive",
        details: [
          "Real-time demo on your system",
          "Test all features thoroughly",
          "Customization possibilities",
          "Performance evaluation",
        ],
      },
      {
        id: 3,
        title: "Secure Payment",
        shortTitle: "Payment",
        description:
          "Multiple secure payment options with instant confirmation",
        icon: CreditCard,
        color: "from-purple-500 to-purple-600",
        borderColor: "border-purple-200",
        bgColor: "bg-purple-50",
        duration: "5 min",
        status: "Secure",
        details: [
          "Multiple payment gateways",
          "Bank-grade security",
          "Instant confirmation",
          "Digital receipt & invoice",
        ],
      },
      {
        id: 4,
        title: "Instant Delivery",
        shortTitle: "Delivery",
        description: "Get complete source code and documentation immediately",
        icon: Download,
        color: "from-orange-500 to-orange-600",
        borderColor: "border-orange-200",
        bgColor: "bg-orange-50",
        duration: "Instant",
        status: "Complete",
        details: [
          "Full source code package",
          "Detailed documentation",
          "Installation guidelines",
          "Database & setup files",
        ],
      },
      {
        id: 5,
        title: "30-Day Support",
        shortTitle: "Support",
        description: "Free technical support and assistance for one month",
        icon: Heart,
        color: "from-rose-500 to-rose-600",
        borderColor: "border-rose-200",
        bgColor: "bg-rose-50",
        duration: "30 days",
        status: "Included",
        details: [
          "Technical troubleshooting",
          "Installation assistance",
          "Bug fixes & patches",
          "Training & guidance",
        ],
      },
      {
        id: 6,
        title: "Lifetime Updates",
        shortTitle: "Updates",
        description: "Get all future updates and new features forever",
        icon: Sparkles,
        color: "from-indigo-500 to-indigo-600",
        borderColor: "border-indigo-200",
        bgColor: "bg-indigo-50",
        duration: "Forever",
        status: "Free",
        details: [
          "New feature releases",
          "Security improvements",
          "Performance optimizations",
          "Technology upgrades",
        ],
      },
    ],
  },
];
