import type { IconType } from "react-icons";

export interface StatItem {
  number: string;
  description: string;
  icon: IconType;
}

export interface StatCardProps {
  icon: React.ReactNode;
  number: string;
  label: string;
  color: string;
}