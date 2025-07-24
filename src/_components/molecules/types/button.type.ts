import type { ReactNode } from "react";

export interface ButtonProps {
    children: ReactNode;
    href?: string;
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg" | "xl";
    fontWeight?: "light" | "normal" | "semibold" | "bold";
    fontSize?: "sm" | "base" | "lg" | "xl";
    bgColor?: string; // Tailwind class string, e.g. "bg-blue-500"
    textColor?: string; // e.g. "text-white"
    padding?: string; // e.g. "px-6 py-3"
    margin?: string; // e.g. "my-4"
    hoverBgColor?: string; // e.g. "hover:bg-blue-600"
    className?: string;
    target?: "_blank" | "_self" | "_parent" | "_top";
    rel?: string;
    external?: boolean;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    onClick?: (e: React.MouseEvent) => void;
    fullWidth?: boolean;
    loading?: boolean;
    icon?: ReactNode;
    iconPosition?: "left" | "right";
}