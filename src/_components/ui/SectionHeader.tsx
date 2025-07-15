import React from 'react';
import type { JSX } from 'react';

interface SectionHeaderProps {
  // Main heading content
  heading?: string;
  headingText?: string;
  headingDescription?: string;
  
  // Optional subheading
  subheading?: string;
  
  // Styling and layout options
  alignment?: 'left' | 'center' | 'right';
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  
  // Colors and styling
  headingColor?: string;
  headingTextColor?: string;
  descriptionColor?: string;
  backgroundColor?: string;
  
  // Spacing and layout
  spacing?: 'compact' | 'normal' | 'loose';
  maxWidth?: string;
  
  // Conditional rendering
  showHeading?: boolean;
  showHeadingText?: boolean;
  showDescription?: boolean;
  showDivider?: boolean;
  
  // Custom classes
  containerClassName?: string;
  headingClassName?: string;
  headingTextClassName?: string;
  descriptionClassName?: string;
  
  // Animation and effects
  animate?: boolean;
  animationDelay?: number;
  
  // Custom components or elements
  customIcon?: React.ReactNode;
  customElement?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  heading,
  headingText,
  headingDescription,
  subheading,
  alignment = 'center',
  headingLevel = 2,
  headingColor = 'text-red-600',
  headingTextColor = 'text-gray-900',
  descriptionColor = 'text-gray-600',
  backgroundColor,
  spacing = 'normal',
  maxWidth = 'max-w-4xl',
  showHeading = true,
  showHeadingText = true,
  showDescription = true,
  showDivider = false,
  containerClassName = '',
  headingClassName = '',
  headingTextClassName = '',
  descriptionClassName = '',
  animate = false,
  animationDelay = 0,
  customIcon,
  customElement,
}) => {
  // Dynamic heading tag based on headingLevel
  const HeadingTag = `h${headingLevel}` as keyof JSX.IntrinsicElements;
  
  // Alignment classes
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };
  
  // Spacing classes
  const spacingClasses = {
    compact: 'space-y-2',
    normal: 'space-y-4',
    loose: 'space-y-6',
  };
  
  // Animation classes
  const animationClasses = animate 
    ? 'opacity-0 translate-y-4 transition-all duration-700 ease-out animate-fade-in' 
    : '';
  
  // Container classes
  const containerClasses = `
    w-full mx-auto px-4 sm:px-6 lg:px-8
    ${maxWidth}
    ${alignmentClasses[alignment]}
    ${spacingClasses[spacing]}
    ${animationClasses}
    ${containerClassName}
  `.trim();
  
  // Conditional styles
  const containerStyle = {
    backgroundColor,
    animationDelay: animate ? `${animationDelay}ms` : undefined,
  };
  
  return (
    <div className={containerClasses} style={containerStyle}>
      {/* Custom Icon */}
      {customIcon && (
        <div className="flex justify-center mb-4">
          {customIcon}
        </div>
      )}
      
      {/* Heading (Small text above main heading) */}
      {showHeading && heading && (
        <div className={`
          text-sm font-semibold tracking-wide uppercase
          ${headingColor}
          ${headingClassName}
        `.trim()}>
          {heading}
        </div>
      )}
      
      {/* Main Heading Text */}
      {showHeadingText && headingText && (
        <HeadingTag className={`
          text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight
          ${headingTextColor}
          ${headingTextClassName}
        `.trim()}>
          {headingText}
        </HeadingTag>
      )}
      
      {/* Subheading */}
      {subheading && (
        <h3 className="text-xl sm:text-2xl font-medium text-gray-700">
          {subheading}
        </h3>
      )}
      
      {/* Divider */}
      {showDivider && (
        <div className="w-20 h-1 bg-red-600 mx-auto"></div>
      )}
      
      {/* Description */}
      {showDescription && headingDescription && (
        <p className={`
          text-lg sm:text-xl leading-relaxed
          ${descriptionColor}
          ${descriptionClassName}
        `.trim()}>
          {headingDescription}
        </p>
      )}
      
      {/* Custom Element */}
      {customElement && (
        <div className="mt-4">
          {customElement}
        </div>
      )}
    </div>
  );
};

