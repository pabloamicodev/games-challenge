/**
 * Footer Component
 * Pie de página responsive con logo de Apply Digital
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ROUTES } from '@/config/constants';

export function Footer() {

  return (
  <footer role="contentinfo" className="w-full border-t border-border bg-neutral-700 py-8 mt-auto flex justify-center h-[102px]">
          <Link
            href={ROUTES.HOME}
            className="flex items-center gap-3 text-white hover:opacity-80 transition-opacityrounded"
            aria-label="Apply Digital - Go to home page"
          >
                <Image
                  src="/apply-digital-logo.svg"
                  alt="Apply Digital Logo"
                  width={100}
                  height={100}
                  className="object-contain"
                  priority
                />
           
          </Link>
    </footer>
  );
}
