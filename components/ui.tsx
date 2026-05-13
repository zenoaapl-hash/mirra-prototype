'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sparkles, Zap } from 'lucide-react';
import { RARITY_CONFIG, ITEM_GRADIENTS, ITEM_EMOJI, WORLD_GRADIENTS, type Rarity, type World } from '@/lib/data';

// ─── BRAND COLORS (safe constants) ──────────────────────────────
export const C = {
  plum:     '#6D28D9',
  violet:   '#8B5CF6',
  lavender: '#C4B5FD',
  rose:     '#F472B6',
  cyan:     '#22D3EE',
  pearl:    '#F8F7FF',
  muted:    '#A1A1AA',
  subtle:   '#3F3F46',
  mid:      '#1A1028',
  deep:     '#11101A',
  black:    '#08070D',
};

// ─── NAV ────────────────────────────────────────────────────────
export function Nav() {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  const links = [
    { href: '/worlds',   label: 'Worlds'       },
    { href: '/drops',    label: 'Drops'        },
    { href: '/collection',label: 'Collection'  },
    { href: '/creators', label: 'For Creators' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
      <div className="max-w-lg mx-auto glass rounded-2xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <MirraLogo size={28} />
          <span className="font-display font-bold text-lg tracking-tight text-gradient-violet">MIRRA</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <Link key={l.href} href={l.href}
              className="text-sm transition-colors"
              style={{ color: path === l.href ? C.lavender : C.muted, fontFamily: 'DM Sans' }}>
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link href="/quiz"
            className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-display font-semibold text-white"
            style={{ background: `linear-gradient(135deg, ${C.plum}, ${C.violet})` }}>
            <Sparkles size={12} />
            Create Self
          </Link>
          <button onClick={() => setOpen(!open)} className="md:hidden p-1" style={{ color: C.pearl }}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden max-w-lg mx-auto mt-2 glass rounded-2xl px-4 py-4 flex flex-col gap-2">
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="text-sm py-2.5 border-b"
              style={{ color: C.muted, borderColor: 'rgba(196,181,253,0.08)', fontFamily: 'DM Sans' }}>
              {l.label}
            </Link>
          ))}
          <Link href="/quiz" onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 py-3 rounded-xl mt-2 text-sm font-display font-semibold text-white"
            style={{ background: `linear-gradient(135deg, ${C.plum}, ${C.violet})` }}>
            <Sparkles size={14} />
            Create My MIRRA Self
          </Link>
        </div>
      )}
    </nav>
  );
}

// ─── MIRRA LOGO ──────────────────────────────────────────────────
export function MirraLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <defs>
        <linearGradient id="mlg" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6D28D9"/>
          <stop offset="0.5" stopColor="#8B5CF6"/>
          <stop offset="1" stopColor="#C4B5FD"/>
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="15" stroke="url(#mlg)" strokeWidth="1.5" fill="none" opacity="0.5"/>
      <circle cx="16" cy="16" r="9"  stroke="url(#mlg)" strokeWidth="1"   fill="none" opacity="0.7"/>
      <circle cx="16" cy="16" r="3.5" fill="url(#mlg)"/>
      <circle cx="16" cy="8"   r="2"  fill="url(#mlg)" opacity="0.9"/>
      <circle cx="23.2" cy="20" r="2" fill="url(#mlg)" opacity="0.9"/>
      <circle cx="8.8"  cy="20" r="2" fill="url(#mlg)" opacity="0.9"/>
    </svg>
  );
}

// ─── AVATAR (CSS gradient placeholder) ──────────────────────────
export function Avatar({ name, size = 48, gradientKey }: {
  name: string; size?: number; gradientKey?: string;
}) {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();
  const grad = gradientKey && ITEM_GRADIENTS[gradientKey]
    ? ITEM_GRADIENTS[gradientKey]
    : `linear-gradient(135deg, ${C.plum}, ${C.violet})`;

  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      {/* Ring */}
      <div className="absolute inset-0 rounded-full p-px" style={{ background: grad }}>
        <div className="w-full h-full rounded-full" style={{ background: C.deep }}/>
      </div>
      {/* Inner */}
      <div className="absolute rounded-full flex items-center justify-center"
        style={{ inset: '3px', background: grad }}>
        <span className="font-display font-bold text-white" style={{ fontSize: size * 0.3 }}>
          {initials}
        </span>
      </div>
    </div>
  );
}

// ─── LARGE AVATAR (for profile page) ────────────────────────────
export function LargeAvatar({ name, gradientKey, emoji, size = 80 }: {
  name: string; gradientKey: string; emoji: string; size?: number;
}) {
  const grad = WORLD_GRADIENTS[gradientKey]?.bg
    || `linear-gradient(135deg, ${C.plum}, ${C.violet})`;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Outer glow ring */}
      <div className="absolute inset-0 rounded-3xl opacity-60 blur-sm" style={{ background: grad }}/>
      {/* Main circle */}
      <div className="absolute inset-0.5 rounded-3xl flex items-center justify-center"
        style={{ background: grad }}>
        <span style={{ fontSize: size * 0.45 }}>{emoji}</span>
      </div>
      {/* Level badge */}
      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center border-2"
        style={{ background: C.plum, borderColor: C.deep }}>
        <span className="font-display font-bold text-white" style={{ fontSize: 9 }}>1</span>
      </div>
    </div>
  );
}

// ─── ITEM CARD ───────────────────────────────────────────────────
export function ItemCard({ name, type, rarity, gradientKey, size = 'md' }: {
  name: string; type: string; rarity: Rarity; gradientKey: string; size?: 'sm' | 'md' | 'lg';
}) {
  const dims = { sm: 72, md: 96, lg: 112 }[size];
  const rc = RARITY_CONFIG[rarity] || RARITY_CONFIG.common;
  const grad = ITEM_GRADIENTS[gradientKey] || `linear-gradient(135deg, ${C.plum}, ${C.violet})`;
  const emoji = ITEM_EMOJI[type] || '✦';

  return (
    <div className="relative rounded-2xl overflow-hidden flex-shrink-0 cursor-pointer group transition-transform hover:scale-105"
      style={{ width: dims, height: dims, border: `2px solid ${rc.border}`, background: rc.bg }}>
      {/* Gradient fill */}
      <div className="absolute inset-0 opacity-25 group-hover:opacity-35 transition-opacity" style={{ background: grad }}/>
      {/* Icon */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: grad, fontSize: 18 }}>
          <span style={{ fontSize: dims * 0.22, color: C.pearl }}>{emoji}</span>
        </div>
      </div>
      {/* Rarity dot */}
      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex gap-0.5">
        {rarity === 'legendary' && [0,1,2].map(i => (
          <div key={i} className="w-1 h-1 rounded-full" style={{ background: rc.color }}/>
        ))}
        {rarity === 'epic' && [0,1].map(i => (
          <div key={i} className="w-1 h-1 rounded-full" style={{ background: rc.color }}/>
        ))}
        {(rarity === 'rare' || rarity === 'common') && (
          <div className="w-1 h-1 rounded-full" style={{ background: rc.color }}/>
        )}
      </div>
    </div>
  );
}

// ─── RARITY BADGE ────────────────────────────────────────────────
export function RarityBadge({ rarity }: { rarity: Rarity | string }) {
  const rc = RARITY_CONFIG[rarity as Rarity] || RARITY_CONFIG.common;
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full font-display font-semibold uppercase"
      style={{ color: rc.color, background: rc.bg, fontSize: 9, letterSpacing: '0.07em' }}>
      {rc.label}
    </span>
  );
}

// ─── TAG CHIP ────────────────────────────────────────────────────
export function TagChip({ label, color = C.lavender }: { label: string; color?: string }) {
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold capitalize"
      style={{ color, background: `${color}18`, border: `1px solid ${color}30`, fontFamily: 'DM Sans' }}>
      {label}
    </span>
  );
}

// ─── SECTION HEADER ──────────────────────────────────────────────
export function SectionHeader({ eyebrow, title, subtitle, gradient = 'violet' }: {
  eyebrow?: string; title: string; subtitle?: string; gradient?: 'violet' | 'rose' | 'aurora';
}) {
  return (
    <div className="text-center mb-8">
      {eyebrow && (
        <div className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full text-xs font-display font-semibold uppercase mb-4"
          style={{ color: C.lavender, letterSpacing: '0.12em' }}>
          <Zap size={10} style={{ color: C.violet }}/>
          {eyebrow}
        </div>
      )}
      <h2 className={`font-display font-extrabold text-2xl text-gradient-${gradient} leading-tight`}>{title}</h2>
      {subtitle && <p className="text-sm mt-2" style={{ color: C.muted }}>{subtitle}</p>}
    </div>
  );
}

// ─── WORLD CARD ──────────────────────────────────────────────────
export function WorldCard({ world, onClick }: { world: World; onClick?: () => void }) {
  const wg = WORLD_GRADIENTS[world.id] || WORLD_GRADIENTS['tokyo-night-arcade'];

  return (
    <div onClick={onClick}
      className="glass rounded-2xl overflow-hidden cursor-pointer group hover:border-white/15 transition-all duration-300 hover:scale-[1.02]">
      {/* Hero */}
      <div className="h-28 relative flex items-end p-3" style={{ background: wg.bg }}>
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.3)' }}/>
        <span className="text-4xl float relative z-10">{world.emoji}</span>
        <div className="absolute top-2.5 right-2.5 glass px-2 py-0.5 rounded-full font-display font-semibold"
          style={{ color: C.lavender, fontSize: 10 }}>
          {world.daysLeft}d left
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-display font-bold text-sm text-white leading-tight mb-0.5">{world.name}</h3>
        {world.nameJp && <p className="font-jp mb-1" style={{ color: C.muted, fontSize: 10 }}>{world.nameJp}</p>}
        <p className="text-xs leading-relaxed mb-2.5" style={{ color: C.muted }}>{world.tagline}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs" style={{ color: C.muted }}>{world.creatorHandle}</span>
          <span className="text-xs" style={{ color: wg.accent }}>⚡ {world.questCount}</span>
        </div>
      </div>
    </div>
  );
}

// ─── PROGRESS BAR ────────────────────────────────────────────────
export function ProgressBar({ value, max, color = C.violet, label }: {
  value: number; max: number; color?: string; label?: string;
}) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div>
      {label && (
        <div className="flex justify-between text-xs mb-1.5" style={{ color: C.muted, fontFamily: 'DM Sans' }}>
          <span>{label}</span>
          <span style={{ color }}>{value.toLocaleString()} / {max.toLocaleString()}</span>
        </div>
      )}
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}, ${color}99)` }}/>
      </div>
    </div>
  );
}

// ─── COUNTDOWN ───────────────────────────────────────────────────
export function Countdown({ hours }: { hours: number }) {
  const h = Math.floor(hours);
  const m = Math.floor((hours % 1) * 60);
  return (
    <div className="flex items-center gap-1.5">
      {[{ v: h, l: 'HRS' }, { v: m, l: 'MIN' }].map(({ v, l }) => (
        <div key={l} className="glass rounded-lg px-2 py-1 text-center min-w-[38px]">
          <div className="font-display font-bold text-sm" style={{ color: C.lavender }}>
            {String(v).padStart(2, '0')}
          </div>
          <div className="font-display font-semibold" style={{ fontSize: 7, color: C.subtle, letterSpacing: '0.1em' }}>{l}</div>
        </div>
      ))}
    </div>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────
export function Footer() {
  return (
    <footer className="border-t px-4 py-8 mt-16" style={{ borderColor: 'rgba(196,181,253,0.08)' }}>
      <div className="max-w-lg mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <MirraLogo size={20}/>
          <span className="font-display font-bold text-sm text-gradient-violet">MIRRA</span>
        </div>
        <p className="text-xs mb-4" style={{ color: C.subtle }}>Your identity. Your culture. Your world.</p>
        <div className="flex justify-center gap-5 text-xs" style={{ color: C.subtle }}>
          {[['Waitlist','/waitlist'],['Creators','/creators'],['Privacy','#'],['Terms','#']].map(([l,h])=>(
            <Link key={l} href={h} className="hover:text-white transition-colors">{l}</Link>
          ))}
        </div>
        <p className="text-xs mt-4" style={{ color: 'rgba(63,63,70,0.8)' }}>© MIRRA</p>
      </div>
    </footer>
  );
}
