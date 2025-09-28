import React from 'react';
import Link from 'next/link';

interface MenuItemProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function MenuItem({
  href,
  onClick,
  children,
  className = 'block px-4 py-2 text-black transition-colors',
}: MenuItemProps) {
  const baseStyle = { color: 'black' };
  const hoverStyle = '#D9D9D9';

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.backgroundColor = hoverStyle;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.backgroundColor = 'transparent';
  };

  // If href is provided, render as Link, otherwise as button
  if (href) {
    return (
      <Link
        href={href}
        className={className}
        style={baseStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={`w-full text-left ${className}`}
      style={baseStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
