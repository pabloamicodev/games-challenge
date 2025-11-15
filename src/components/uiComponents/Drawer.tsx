/**
 * Drawer Component
 * Panel lateral deslizable completamente responsive
 */

'use client';

import { useEffect, useState, type ReactNode } from 'react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

export function Drawer({ isOpen, onClose, children, title }: DrawerProps) {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Mount the component first
      setShouldRender(true);
      // Then trigger animation after a small delay
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, 10);
      document.body.style.overflow = 'hidden';
      return () => clearTimeout(timer);
    } else {
      // Trigger exit animation
      setIsAnimating(false);
      document.body.style.overflow = 'unset';
      // Unmount after animation completes
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!shouldRender) return null;

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
        role="presentation"
      />
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-full sm:w-96 md:w-[28rem] bg-white shadow-2xl transition-all duration-300 ease-in-out ${
          isAnimating ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        aria-describedby="drawer-description"
      >
        <div className="flex items-center justify-between border-b border-border p-6! sm:p-6 h-[64px] bg-[#EEEEEE] ">
          <h2 
            id="drawer-title" 
            className="text-lg sm:text-xl font-bold text-text-primary"
          >
            {title || 'Cart'}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-text-secondary hover:bg-surface hover:text-text-primary transition-colors"
            aria-label="Close cart drawer"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div 
          id="drawer-description" 
          className="h-[calc(100%-80px)] overflow-y-auto"
          role="region"
          aria-label="Cart contents"
        >
          {children}
        </div>
      </aside>
    </>
  );
}
