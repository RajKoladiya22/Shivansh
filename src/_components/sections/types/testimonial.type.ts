export interface Testimonial {
  id: number;
  quote: string;
  name: string;
  heading: string;
  title: string;
  avatar: string;    // URL or path to avatar image
  document: string;  // URL or path to attached document/image
  rating: number;    // e.g. 1–5 stars
}