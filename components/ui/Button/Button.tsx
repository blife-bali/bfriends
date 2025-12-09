import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'underline' | 'text';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  href?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ variant = 'primary', href, icon, fullWidth, children, className, disabled, ...props }, ref) => {
    
    const isLink = Boolean(href);
    const Component = isLink ? Link : 'button';
    
    // Determine wrapper classes based on variant
    const wrapperClasses = clsx(
      styles.buttonWrapper,
      styles[variant],
      fullWidth && styles.fullWidth,
      className
    );

    // Render logic for Primary and Secondary (Complex structure)
    if (variant === 'primary' || variant === 'secondary') {
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
          <Link href={href!} className={wrapperClasses} {...(props as any)}>
            {content}
          </Link>
        );
      }

      return (
        <button 
          ref={ref as React.Ref<HTMLButtonElement>} 
          className={wrapperClasses} 
          disabled={disabled} 
          {...props}
        >
          {content}
        </button>
      );
    }

    // Render logic for Underline and Text (Simple structure)
    const simpleContent = (
      <>
        {children}
        {icon}
      </>
    );

    if (isLink) {
      return (
        <Link href={href!} className={wrapperClasses} {...(props as any)}>
          {simpleContent}
        </Link>
      );
    }

    return (
      <button 
        ref={ref as React.Ref<HTMLButtonElement>} 
        className={wrapperClasses} 
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
