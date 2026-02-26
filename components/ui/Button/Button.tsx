import React from "react";
import Link from "next/link";
import clsx from "clsx";
import { ArrowUpRight } from "lucide-react";
import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  /** Text/icon color (e.g. var(--color-blue-100)) */
  color?: string;
  /** Show arrow icon after text. Default false */
  showIcon?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ href, color, showIcon = false, fullWidth, children, className, disabled, style, ...props }, ref) => {
    const isLink = Boolean(href);
    const wrapperStyle = { ...style } as React.CSSProperties & Record<string, string>;
    if (color) wrapperStyle["--button-color"] = color;

    const wrapperClasses = clsx(styles.button, fullWidth && styles.fullWidth, className);

    const content = (
      <>
        <span className={styles.textPart}>{children}</span>
        {showIcon && (
          <ArrowUpRight size={14} className={styles.iconPart} aria-hidden />
        )}
      </>
    );

    if (isLink) {
      return (
        <Link
          href={href!}
          className={wrapperClasses}
          style={wrapperStyle}
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
