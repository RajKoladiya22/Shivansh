// _components/Button.tsx
import Link from "next/link";
import type { ReactNode } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { LinkProps } from "next/link";

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

export const Button: React.FC<ButtonProps> = ({
  children,
  href,
  variant = "primary",
  size = "md",
  fontWeight = "normal",
  fontSize,
  bgColor,
  textColor,
  padding,
  margin,
  hoverBgColor,
  className = "",
  target,
  rel,
  external = false,
  type = "button",
  disabled = false,
  onClick,
  fullWidth = false,
  loading = false,
  icon,
  iconPosition = "left",
}) => {
  // Base styles
  const baseStyles =
    "inline-flex items-center justify-center transition-all duration-300 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";

  // Variant styles
  const variantStyles: Record<string, string> = {
    primary:
      "bg-(--primery-color) text-white hover:bg-red-700 focus:ring-red-500 shadow-lg hover:shadow-xl",
    secondary:
      "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 shadow-lg hover:shadow-xl",
    outline:
      "border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white focus:ring-red-500",
    ghost: "text-red-600 hover:bg-red-50 focus:ring-red-500",
  };

  // Size styles
  const sizeStyles: Record<string, string> = {
    sm: "text-sm px-4 py-2 rounded-lg",
    md: "text-base px-6 py-3 rounded-full",
    lg: "text-lg px-8 py-4 rounded-full",
    xl: "text-xl px-10 py-5 rounded-full",
  };

  // Font weight map
  const fontWeightMap: Record<string, string> = {
    light: "font-light",
    normal: "font-normal",
    semibold: "font-semibold",
    bold: "font-bold",
  };

  // Font size map
  const fontSizeMap: Record<string, string> = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  //   const trackingMap = {
  //   tighter: 'tracking-tighter',
  //   tight: 'tracking-tight',
  //   normal: 'tracking-normal',
  //   wide: 'tracking-wide',
  //   wider: 'tracking-wider',
  //   widest: 'tracking-widest',
  // };

  // Combine all styles
  const combinedClassName = twMerge(
    clsx(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      fontWeightMap[fontWeight],
      fontSize && fontSizeMap[fontSize],
      bgColor,
      textColor,
      padding,
      margin,
      hoverBgColor,
      fullWidth && "w-full",
      loading && "cursor-wait",
      disabled && "pointer-events-none",
      className,
    ),
  );

  // Build content with icon and loading indicator
  const buttonContent = (
    <>
      {loading && (
        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {icon && iconPosition === "left" && !loading && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
      {icon && iconPosition === "right" && !loading && (
        <span className="ml-2">{icon}</span>
      )}
    </>
  );

  if (href) {
    // const linkProps: any = {
    //   href,
    //   className: combinedClassName,
    //   ...(external || target === '_blank'
    //     ? { target: target || '_blank', rel: rel || 'noopener noreferrer' }
    //     : {}),
    //   onClick,
    // };

    const linkProps: LinkProps = {
      href,
      // className is not a valid prop for LinkProps
      // Only pass valid LinkProps here
      // target and rel are only valid for <a>, so we'll pass them to the <a> element below if needed
    };

    return (
      // <Link {...linkProps} passHref legacyBehavior>
      //   <a
      //     className={combinedClassName}
      //     target={external || target === "_blank" ? (target ?? "_blank") : undefined}
      //     rel={rel ?? "noopener noreferrer"}
      //     onClick={onClick}
      //   >
      //     {buttonContent}
      //   </a>
      // </Link>
      <Link
        {...linkProps}
        className={combinedClassName}
        target={
          external || target === "_blank" ? (target ?? "_blank") : undefined
        }
        rel={rel ?? "noopener noreferrer"}
        onClick={onClick}
      >
        {buttonContent}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={combinedClassName}
    >
      {buttonContent}
    </button>
  );
};

// export default Button;

// Example usage of the Button component

{
  /* <Button>Default</Button>

<Button
  variant="outline"
  size="lg"
  fontWeight="bold"
  bgColor="bg-blue-500"
  textColor="text-white"
  hoverBgColor="hover:bg-blue-600"
  padding="px-8 py-4"
  margin="my-4"
  className="shadow-md"
>
  Custom Styled Button
</Button>

<Button href="/signup" external>
  Sign Up
</Button>

<Button loading icon={<MyIcon />} size="sm">
  Loading
</Button> */
}
