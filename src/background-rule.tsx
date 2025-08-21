'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

/**
 * Props for BackgroundRule.
 */
export type BackgroundRuleProps = {
  /** Light or dark flavor; controls base opacity & blend. */
  theme?: 'light' | 'dark';
  /** Number of animated orbs. */
  orbs?: number;
  /** Tailwind className to position this layer (usually absolute inset-0 -z-10). */
  className?: string;
};

/**
 * BackgroundRule renders an animated "sapphire" backdrop with soft blue/cyan orbs.
 * Use it behind sections/cards to get the Codimir glow.
 *
 * Example:
 * <div className="relative">
 *   <BackgroundRule theme="dark" className="absolute inset-0 -z-10" />
 *   <GlassCard>...</GlassCard>
 * </div>
 */
export function BackgroundRule({ theme = 'dark', orbs = 5, className = '' }: BackgroundRuleProps) {
  const seeds = useMemo(() => Array.from({ length: orbs }, (_, i) => i), [orbs]);

  return (
    <div
      className={`pointer-events-none overflow-hidden ${
        theme === 'dark' ? 'opacity-70 mix-blend-screen' : 'opacity-60 mix-blend-multiply'
      } ${className}`}
      aria-hidden
    >
      {seeds.map((i) => {
        const delay = (i * 0.7) % 3;
        const size = 180 + (i % 3) * 60;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0.2, x: 0, y: 0 }}
            animate={{
              opacity: [0.25, 0.6, 0.25],
              x: [0, 40, -30, 0],
              y: [0, -30, 30, 0],
            }}
            transition={{
              duration: 7 + (i % 4),
              delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute rounded-full blur-3xl"
            style={{
              width: size,
              height: size,
              left: `${(i * 17) % 80}%`,
              top: `${(i * 23) % 70}%`,
              background:
                'radial-gradient(ellipse at center, rgba(59,130,246,0.55), rgba(34,211,238,0.25) 60%, transparent 70%)',
              filter: 'saturate(120%)',
            }}
          />
        );
      })}
    </div>
  );
}

export default BackgroundRule;
