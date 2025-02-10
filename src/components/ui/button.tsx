'use client';

import {
  CSSProperties,
  ComponentType,
  HTMLAttributeAnchorTarget,
  MouseEventHandler,
  ReactElement,
  SVGProps,
  useMemo,
} from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import styles from '@/components/ui/button.module.css';
import React from 'react';

export type ButtonVariant =
  | 'gray'

export interface ButtonProps {
  LeadingIcon?: (props: SVGProps<SVGSVGElement>) => ReactElement | null;
  MainIcon?: (props: SVGProps<SVGSVGElement>) => ReactElement | null;
  TrailingIcon?: (props: SVGProps<SVGSVGElement>) => ReactElement | null;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  size?: 'sm' | 'md';
  style?: CSSProperties;
  target?: HTMLAttributeAnchorTarget;
  type?: 'button';
  variant?: ButtonVariant;
  loading?: boolean;
}

export const Button: ComponentType<ButtonProps> = ({
  LeadingIcon,
  MainIcon,
  TrailingIcon,
  children,
  className,
  disabled,
  onClick,
  size = 'md',
  style,
  type = 'button',
  variant = 'gray',
  href,
  target,
  loading
}) => {
  const classNames = useMemo(() => {
    const value: string[] = [styles.base];

    switch (size) {
      case 'sm':
        value.push(styles['title-sm']);
        break;
      case 'md':
        value.push(styles['title-md']);
        break;
    }

    if (
      variant === 'gray'
    ) {
      if (MainIcon) {
        switch (size) {
          case 'sm':
            value.push(styles['pad-sm-icon']);
            break;
          case 'md':
            value.push(styles['pad-md-icon']);
            break;
        }
      } else {
        switch (size) {
          case 'sm':
            value.push(styles['pad-sm']);
            break;
          case 'md':
            value.push(styles['pad-md']);
            break;
        }
      }
    }

    if (variant === 'gray') {
      value.push(styles['gray']);
    }

    return value.join(' ');
  }, [MainIcon, size, variant]);

  const content = (
    <>
      {MainIcon ? (
        <MainIcon
          className={clsx(
            size === 'sm' && 'h-5 w-5',
            size === 'md' && 'h-6 w-6'
          )}
        />
      ) : (
        <>
          {LeadingIcon && <LeadingIcon className={clsx('h-5 w-5', loading && 'animate-spin')} />}
          {loading ? children : children}
          {TrailingIcon && <TrailingIcon className="h-5 w-5" />}
        </>
      )}
    </>
  );

  if (href && (disabled || loading)) {
    return (
      <button
        className={clsx(classNames, className)}
        disabled={disabled || loading}
        style={style}
      >
        {content}
      </button>
    );
  }

  if (href) {
    return (
      <Link
        aria-disabled={disabled || loading}
        className={clsx(
          classNames,
          className,
          loading && 'cursor-not-allowed opacity-70'
        )}
        href={loading ? '#' : href}
        style={style}
        target={target}
        type={type}
        onClick={loading ? (e) => e.preventDefault() : onClick}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={clsx(classNames, className)}
      disabled={disabled || loading}
      style={style}
      onClick={onClick}
    >
      {content}
    </button>
  );
};
