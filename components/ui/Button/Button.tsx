import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'border' | 'underline' | 'text';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  href?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  /** Primary only: fill color (CSS value, e.g. var(--color-cream-100)) */
  fillColor?: string;
  /** Border variant only: border and text color (CSS value, e.g. var(--color-blue-100)) */
  color?: string;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ variant = 'primary', href, icon, fullWidth, fillColor, color, children, className, disabled, style, ...props }, ref) => {
    const isLink = Boolean(href);
    const Component = isLink ? Link : 'button';

    const wrapperStyle = { ...style } as React.CSSProperties & Record<string, string>;
    if (variant === 'primary' && fillColor) wrapperStyle['--button-primary-fill'] = fillColor;
    if (variant === 'border' && color) wrapperStyle['--button-border-color'] = color;

    const wrapperClasses = clsx(
      styles.buttonWrapper,
      styles[variant],
      fullWidth && styles.fullWidth,
      className
    );

    // Render logic for Primary, Secondary, Border, Underline (text + icon structure for arrow animation)
    if (variant === 'primary' || variant === 'secondary' || variant === 'border' || variant === 'underline') {
      const content = (
        <>
          <span className={styles.textPart}>
            {children}
          </span>
          {icon && (
            <span className={styles.iconPart}>
              {icon}
            </span>
          )}
        </>
      );

      if (isLink) {
        return (
          <Link href={href!} className={wrapperClasses} style={wrapperStyle} {...(props as any)}>
            {content}
          </Link>
        );
      }

      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          className={wrapperClasses}
          style={wrapperStyle}
          disabled={disabled}
          {...props}
        >
          {content}
        </button>
      );
    }

    // Render logic for Text only (Simple structure)
    const simpleContent = (
      <>
        {children}
        {icon}
      </>
    );

    if (isLink) {
      return (
        <Link href={href!} className={wrapperClasses} style={wrapperStyle} {...(props as any)}>
          {simpleContent}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={wrapperClasses}
        style={wrapperStyle}
        disabled={disabled}
        {...props}
      >
        {simpleContent}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
