'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sparkles, Zap, Globe, ChevronRight } from 'lucide-react';

// ─── NAV ────────────────────────────────────────────────────────
export function Nav() {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  const links = [
    { href: '/worlds', label: 'Worlds' },
    { href: '/drops', label: 'Drops' },
    { href: '/collection', label: 'Collection' },
    { href: '/creators', label: 'For Creators' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
      <div className="max-w-lg mx-auto glass rounded-2xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <MirraLogo size={28} />
          <span className="font-display font-800 text-lg tracking-tight text-gradient-aurora">MIRRA</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <Link key={l.href} href={l.href}
              className={`text-sm font-body transition-colors ${path === l.href ? 'text-[#c084fc]' : 'text-[#9ca3af] hover:text-white'}`}>
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link href="/quiz" className="hidden md:flex items-center gap-1.5 bg-gradient-to-r from-[#c084fc] to-[#818cf8] text-white text-xs font-display font-600 px-4 py-2 rounded-full">
            <Sparkles size={12} />
            Create Self
          </Link>
          <button onClick={() => setOpen(!open)} className="md:hidden text-white p-1">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden max-w-lg mx-auto mt-2 glass rounded-2xl px-4 py-4 flex flex-col gap-3">
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="text-sm font-body text-[#d1d5db] py-2 border-b border-white/5">
              {l.label}
            </Link>
          ))}
          <Link href="/quiz" onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#c084fc] to-[#818cf8] text-white text-sm font-display font-600 py-3 rounded-xl mt-2">
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
        <linearGradient id="lg" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#c084fc"/>
          <stop offset="0.5" stopColor="#818cf8"/>
          <stop offset="1" stopColor="#34d399"/>
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="15" stroke="url(#lg)" strokeWidth="1.5" fill="none" opacity="0.4"/>
      <circle cx="16" cy="16" r="10" stroke="url(#lg)" strokeWidth="1" fill="none" opacity="0.6"/>
      <circle cx="16" cy="16" r="4" fill="url(#lg)"/>
      <circle cx="16" cy="8" r="2" fill="url(#lg)" opacity="0.8"/>
      <circle cx="23.9" cy="20" r="2" fill="url(#lg)" opacity="0.8"/>
      <circle cx="8.1" cy="20" r="2" fill="url(#lg)" opacity="0.8"/>
    </svg>
  );
}

// ─── AVATAR ──────────────────────────────────────────────────────
export function Avatar({
  name, gradient = 'from-[#c084fc] to-[#818cf8]', size = 48, ring = true
}: { name: string; gradient?: string; size?: number; ring?: boolean }) {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div className="relative" style={{ width: size, height: size }}>
      {ring && (
        <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${gradient} p-0.5`}>
          <div className="w-full h-full rounded-full bg-[#0d0d14]" />
        </div>
      )}
      <div className={`absolute inset-[2px] rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center`}
        style={{ inset: ring ? '3px' : '0' }}>
        <span className="font-display font-700 text-white" style={{ fontSize: size * 0.28 }}>{initials}</span>
      </div>
    </div>
  );
}

// ─── ITEM CARD ───────────────────────────────────────────────────
export function ItemCard({
  name, type, rarity, gradient, size = 'md'
}: {
  name: string; type: string; rarity: string; gradient: string; size?: 'sm' | 'md' | 'lg'
}) {
  const sz = { sm: 'w-20 h-20', md: 'w-28 h-28', lg: 'w-36 h-36' }[size];
  const rarityBg = {
    common: 'bg-gray-800/60 border-gray-600/30',
    rare: 'bg-indigo-950/60 border-indigo-500/40',
    epic: 'bg-purple-950/60 border-purple-500/50',
    legendary: 'bg-yellow-950/60 border-yellow-500/50',
  }[rarity] || 'bg-gray-800/60 border-gray-600/30';

  const rarityLabel = { common: 'Common', rare: 'Rare', epic: 'Epic', legendary: 'Legendary' }[rarity];
  const rarityColor = { common: '#6b7280', rare: '#818cf8', epic: '#c084fc', legendary: '#fbbf24' }[rarity];

  return (
    <div className={`${sz} relative border-2 rounded-2xl overflow-hidden flex flex-col items-center justify-center ${rarityBg} cursor-pointer group transition-transform hover:scale-105`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20 group-hover:opacity-30 transition-opacity`} />
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-2xl`}>
        {getItemEmoji(type)}
      </div>
      <div className="absolute bottom-1 left-0 right-0 px-1">
        <div className="text-center" style={{ color: rarityColor, fontSize: '8px', fontFamily: 'Syne', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {rarityLabel}
        </div>
      </div>
    </div>
  );
}

function getItemEmoji(type: string): string {
  const map: Record<string, string> = {
    'Profile Charm': '✨',
    'Profile Effect': '🌀',
    'Identity Badge': '🏅',
    'Avatar Layer': '👑',
    'Avatar Item': '🎒',
    'Room Object': '🕯️',
  };
  return map[type] || '💎';
}

// ─── RARITY BADGE ────────────────────────────────────────────────
export function RarityBadge({ rarity }: { rarity: string }) {
  const config = {
    common: { label: 'Common', color: '#6b7280', bg: 'rgba(107,114,128,0.15)' },
    rare: { label: 'Rare', color: '#818cf8', bg: 'rgba(129,140,248,0.15)' },
    epic: { label: 'Epic', color: '#c084fc', bg: 'rgba(192,132,252,0.15)' },
    legendary: { label: 'Legendary', color: '#fbbf24', bg: 'rgba(251,191,36,0.15)' },
  }[rarity] || { label: rarity, color: '#6b7280', bg: 'rgba(107,114,128,0.15)' };

  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-display font-700 uppercase tracking-wider"
      style={{ color: config.color, background: config.bg, letterSpacing: '0.06em', fontSize: '9px' }}>
      {config.label}
    </span>
  );
}

// ─── TAG CHIP ────────────────────────────────────────────────────
export function TagChip({ label, color = '#c084fc' }: { label: string; color?: string }) {
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-body font-500 capitalize"
      style={{ color, background: `${color}18`, border: `1px solid ${color}30` }}>
      {label}
    </span>
  );
}

// ─── SECTION HEADER ──────────────────────────────────────────────
export function SectionHeader({ eyebrow, title, subtitle, gradient = 'aurora' }: {
  eyebrow?: string; title: string; subtitle?: string; gradient?: 'aurora' | 'sakura' | 'solar'
}) {
  return (
    <div className="text-center mb-8">
      {eyebrow && (
        <div className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full text-xs font-display uppercase tracking-widest mb-4"
          style={{ color: '#c084fc', letterSpacing: '0.12em' }}>
          <Zap size={10} style={{ color: '#c084fc' }} />
          {eyebrow}
        </div>
      )}
      <h2 className={`font-display font-800 text-2xl text-gradient-${gradient} leading-tight`}>{title}</h2>
      {subtitle && <p className="text-[#9ca3af] text-sm mt-2 font-body">{subtitle}</p>}
    </div>
  );
}

// ─── WORLD CARD ──────────────────────────────────────────────────
export function WorldCard({ world, onClick }: { world: any; onClick?: () => void }) {
  return (
    <div onClick={onClick}
      className="glass rounded-2xl overflow-hidden cursor-pointer group hover:border-white/15 transition-all duration-300 hover:scale-[1.02]">
      <div className={`h-28 bg-gradient-to-br ${world.gradient} relative flex items-center justify-center`}>
        <span className="text-5xl float">{world.emoji}</span>
        <div className="absolute top-3 right-3 glass px-2 py-0.5 rounded-full text-xs font-display"
          style={{ color: '#fbbf24', fontSize: '11px' }}>
          {world.daysLeft}d left
        </div>
        <div className="absolute inset-0 bg-black/30" />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-1">
          <div>
            <h3 className="font-display font-700 text-sm text-white leading-tight">{world.name}</h3>
            {world.nameJp && <p className="font-jp text-[10px] mt-0.5" style={{ color: '#9ca3af' }}>{world.nameJp}</p>}
          </div>
        </div>
        <p className="text-[#9ca3af] text-xs font-body leading-relaxed mt-1 mb-3">{world.tagline}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Avatar name={world.creator} size={18} gradient={world.gradient} ring={false} />
            <span className="text-[#9ca3af] text-xs">{world.creatorHandle}</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-[#6b7280]">
            <span>{world.questCount} quests</span>
            <span>·</span>
            <span>{(world.participants / 1000).toFixed(1)}K in</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── COUNTDOWN ───────────────────────────────────────────────────
export function Countdown({ hours }: { hours: number }) {
  const h = Math.floor(hours);
  const m = Math.floor((hours % 1) * 60);
  const s = Math.floor(((hours % 1) * 60 % 1) * 60);
  return (
    <div className="flex items-center gap-2">
      {[{ v: h, l: 'HRS' }, { v: m, l: 'MIN' }, { v: s, l: 'SEC' }].map(({ v, l }) => (
        <div key={l} className="glass rounded-lg px-2 py-1 text-center min-w-[40px]">
          <div className="font-display font-800 text-base" style={{ color: '#fbbf24' }}>
            {String(v).padStart(2, '0')}
          </div>
          <div className="text-[8px] font-display uppercase tracking-widest text-[#6b7280]">{l}</div>
        </div>
      ))}
    </div>
  );
}

// ─── PROGRESS BAR ────────────────────────────────────────────────
export function ProgressBar({ value, max, color = '#c084fc', label }: {
  value: number; max: number; color?: string; label?: string;
}) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div>
      {label && (
        <div className="flex justify-between text-xs mb-1.5 font-body text-[#9ca3af]">
          <span>{label}</span>
          <span style={{ color }}>{value.toLocaleString()} / {max.toLocaleString()}</span>
        </div>
      )}
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}, ${color}99)` }} />
      </div>
    </div>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────
export function Footer() {
  return (
    <footer className="border-t border-white/5 px-4 py-8 mt-16">
      <div className="max-w-lg mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <MirraLogo size={20} />
          <span className="font-display font-700 text-sm text-gradient-aurora">MIRRA</span>
        </div>
        <p className="text-[#4b5563] text-xs font-body mb-4">Your identity. Your culture. Your world.</p>
        <div className="flex justify-center gap-4 text-[#4b5563] text-xs font-body">
          <Link href="/waitlist" className="hover:text-white transition-colors">Waitlist</Link>
          <Link href="/creators" className="hover:text-white transition-colors">Creators</Link>
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
        </div>
        <p className="text-[#374151] text-xs mt-4">© 2025 MIRRA. Social identity for the next generation.</p>
      </div>
    </footer>
  );
}

// ─── TOAST ───────────────────────────────────────────────────────
export function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] glass-strong rounded-2xl px-5 py-3 flex items-center gap-3 text-sm font-body"
      style={{ minWidth: 200, maxWidth: 320 }}>
      <span className="text-base">✨</span>
      <span className="text-white">{message}</span>
      <button onClick={onClose} className="text-[#6b7280] hover:text-white ml-2"><X size={14} /></button>
    </div>
  );
}
