import { CSSProperties, ComponentType, createElement } from "react";
import clsx from "clsx";
import styles from "./typography.module.css";
import React from "react";

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "sans-h3"
  | "body-sm"
  | "body-md"
  | "body-lg";

export interface TypographyProps {
  children?: React.ReactNode;
  className?: string;
  component?: "text";
  variant?: TypographyVariant;
  style?: CSSProperties;
}

export const Typography: ComponentType<TypographyProps> = ({
  children,
  className,
  component = "p",
  style,
  variant = "body-sm",
}) => {
  return createElement(
    component,
    {
      className: clsx(styles[variant], className),
      style,
    },
    children,
  );
};
