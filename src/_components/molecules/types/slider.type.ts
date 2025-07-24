import  { type ComponentPropsWithoutRef, type ElementType, type ReactNode } from "react";

export interface SliderImageItem {
  id: number;
  src: string;
  alt: string;
  width?: number;
  height?: number;
}


export interface SliderComponentItem<Tag extends ElementType = ElementType> {
  id: number;
  component: Tag | ReactNode;
  props?: ComponentPropsWithoutRef<Tag>;
}

export type SliderItem = SliderImageItem | SliderComponentItem;

export interface ImageSliderProps {
  type: "image" | "component";
  items: SliderItem[];
  className?: string;
  containerClassName?: string;
  itemClassName?: string;
  imageClassName?: string;
  orientation?: "horizontal" | "vertical";
  direction?: "left" | "right" | "up" | "down";
  speed?: "slow" | "normal" | "fast";
  pauseOnHover?: boolean;
  showFadeEffect?: boolean;
  fadeWidth?: "sm" | "md" | "lg" | "xl";
  backgroundColor?: string;
  grayscale?: boolean;
  grayscaleOnHover?: boolean;
  spacing?: "sm" | "md" | "lg" | "xl";
  priority?: number;
  respectReducedMotion?: boolean;
  verticalHeight?: string;
}