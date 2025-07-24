import type { ReactNode } from "react";

export interface IndustryItem {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  color: string; // e.g., "from-red-600 to-red-700"
}

export interface IndustryCardProps {
  industry: IndustryItem;
  index: number;
}