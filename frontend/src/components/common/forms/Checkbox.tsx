'use client';

import React from 'react';

interface CheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export default function Checkbox({ id, label, checked, onChange, disabled = false, className = '' }: CheckboxProps) {
  return (
    <div className={`flex items-start space-x-3 ${className}`}>
      <div className="relative">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
          disabled={disabled}
        />
        <label htmlFor={id} className="flex items-center space-x-3 cursor-pointer group">
          <div
            className={`w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center ${
              checked ? 'bg-acm-pink border-acm-pink' : 'bg-white/10 border-white/20 group-hover:border-acm-pink/50'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {checked && (
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <span className="text-white text-sm leading-relaxed">{label}</span>
        </label>
      </div>
    </div>
  );
}


