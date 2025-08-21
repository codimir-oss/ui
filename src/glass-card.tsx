'use client';

import { PropsWithChildren } from 'react';
import { motion } from 'framer-motion';

export type GlassCardProps = PropsWithChildren<{
  /** 1..3 blur intensity layers */
  layers?: 1 | 2 | 3;
  /** Optional extra classes */
  className?: string;
  /** Show faint moving highlights inside the card */
  highlights?: boolean;
}>;

/**
 * GlassCard provides Codimir's signature "mirror + blur" card.
 * - Adds 1–3 layered blurs to create depth
 * - Keeps content crisp while background diffuses
 *
 * Example:
 * <GlassCard layers={3} className="p-6">
 *   ...
 * </GlassCard>
 */
export function GlassCard({ layers = 2, className = '', highlights = true, children }: GlassCardProps) {
  return (
    <div className={`relative rounded-2xl border border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-md ${className}`}>
      {/* layered frosting */}
      {Array.from({ length: layers }).map((_, i) => (
        <div
          key={i}
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            border: '1px solid rgba(255,255,255,0.06)',
            backdropFilter: `blur(${6 + i * 6}px)`,
            maskImage: 'radial-gradient(250px 250px at 80% 0%, black, transparent)',
          }}
          aria-hidden
        />
      ))}

      {/* subtle highlights */}
      {highlights && (
        <>
          <motion.div
            className="pointer-events-none absolute -top-8 -left-8 w-40 h-40 rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.35), transparent 70%)' }}
            animate={{ x: [0, 8, -6, 0], y: [0, -6, 6, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="pointer-events-none absolute -bottom-10 -right-10 w-48 h-48 rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.25), transparent 70%)' }}
            animate={{ x: [0, -10, 6, 0], y: [0, 8, -8, 0] }}
            transition={{ duration: 7, repeat: Infinity, delay: 1 }}
          />
        </>
      )}

      {/* content */}
      <div className="relative">{children}</div>
    </div>
  );
}

export default GlassCard;
