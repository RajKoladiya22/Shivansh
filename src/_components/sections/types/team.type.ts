export interface Testimonial {
  id: number;
  clientName: string;
  clientCompany: string;
  clientPosition: string;
  testimonial: string;
  rating: number;
  projectType: string;
  date: string;
}

export interface TeamMember {
  id: number;
  name: string;
  position: string;
  department: string;
  bio: string;
  detailedBio: string;
  image: string;
  experience: string;
  specialties: string[];
  social: {
    linkedin?: string;
    twitter?: string;
    email?: string;
    phone?: string;
  };
  achievements: string[];
  education: string[];
  certifications: string[];
  location: string;
  joinDate: string;
  testimonials: Testimonial[];
}