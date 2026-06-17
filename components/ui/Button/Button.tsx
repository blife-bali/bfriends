import React from "react";
import Link from "next/link";
import clsx from "clsx";
import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  target?: React.HTMLAttributeAnchorTarget;
  rel?: string;
  /** Text/icon color (e.g. var(--color-blue-100)) */
  color?: string;
  /** `always` = underline visible at rest; `hover` = underline animates in on hover only */
  underline?: "always" | "hover";
  /** `link` = text CTA with underline; `border` = pill outline button */
  variant?: "link" | "border";
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ href, target, rel, color, underline = "always", variant = "link", fullWidth, children, className, disabled, style, ...props }, ref) => {
    const isLink = Boolean(href);
    const wrapperStyle = { ...style } as React.CSSProperties & Record<string, string>;
    if (color) wrapperStyle["--button-color"] = color;

    const wrapperClasses = clsx(
      styles.button,
      variant === "border" && styles.buttonBorder,
      variant === "link" && underline === "hover" && styles.buttonUnderlineOnHover,
      fullWidth && styles.fullWidth,
      className
    );

    const content = <span className={styles.textPart}>{children}</span>;

    if (isLink) {
      return (
        <Link
          href={href!}
          className={wrapperClasses}
          style={wrapperStyle}
          target={target}
          rel={rel}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={props.type ?? "button"}
        className={wrapperClasses}
        style={wrapperStyle}
        disabled={disabled}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
