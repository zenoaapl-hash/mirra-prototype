'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Share2, Edit3, Sparkles, ChevronRight, Check, ExternalLink } from 'lucide-react';
import { buildProfile, drops, collectionItems, WORLD_GRADIENTS } from '@/lib/data';
import { LargeAvatar, ItemCard, TagChip, WorldCard, RarityBadge, ProgressBar, C } from '@/components/ui';

function TasteConstellation({ data }: { data: { label: string; value: number; color: string }[] }) {
  const cx = 120, cy = 120, r = 80;
  const points = data.map((d, i) => {
    const angle = (i / data.length) * Math.PI * 2 - Math.PI / 2;
    const dist = (d.value / 100) * r;
    return { x: cx + Math.cos(angle) * dist, y: cy + Math.sin(angle) * dist, ...d };
  });
  const polygon = points.map(p => `${p.x},${p.y}`).join(' ');
  const rings = [0.25, 0.5, 0.75, 1].map(scale =>
    data.map((_, i) => {
      const angle = (i / data.length) * Math.PI * 2 - Math.PI / 2;
      return `${cx + Math.cos(angle) * r * scale},${cy + Math.sin(angle) * r * scale}`;
    }).join(' ')
  );
  const axes = data.map((_, i) => {
    const angle = (i / data.length) * Math.PI * 2 - Math.PI / 2;
    return { x2: cx + Math.cos(angle) * r, y2: cy + Math.sin(angle) * r };
  });
  const labels = data.map((d, i) => {
    const angle = (i / data.length) * Math.PI * 2 - Math.PI / 2;
    return { x: cx + Math.cos(angle) * (r + 18), y: cy + Math.sin(angle) * (r + 18), ...d };
  });
  return (
    <svg viewBox="0 0 240 240" className="w-full max-w-[180px] mx-auto" style={{ overflow: 'visible' }}>
      {rings.map((ring, i) => <polygon key={i} points={ring} fill="none" stroke="rgba(196,181,253,0.08)" strokeWidth="1"/>)}
      {axes.map((a, i) => <line key={i} x1={cx} y1={cy} x2={a.x2} y2={a.y2} stroke="rgba(196,181,253,0.12)" strokeWidth="1"/>)}
      <polygon points={polygon} fill="rgba(139,92,246,0.2)" stroke="rgba(196,181,253,0.7)" strokeWidth="1.5"/>
      {points.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="3.5" fill={p.color} stroke={C.deep} strokeWidth="1.5"/>)}
      {labels.map((l, i) => (
        <text key={i} x={l.x} y={l.y} textAnchor="middle" dominantBaseline="middle"
          fill={l.color} fontSize="8" fontFamily="Syne" fontWeight="600" opacity="0.9">
          {l.label.split(' ')[0]}
        </text>
      ))}
    </svg>
  );
}

function IdentityCard({ profile }: { profile: ReturnType<typeof buildProfile> }) {
  const wg = WORLD_GRADIENTS[profile.aesthetic.gradientKey] || WORLD_GRADIENTS['tokyo-night-arcade'];
  return (
    <div className="glass-card rounded-3xl overflow-hidden glow-violet">
      <div className="relative h-36 flex items-end px-5 pb-0" style={{ background: wg.bg }}>
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.25)' }}/>
        <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full text-xs font-display font-semibold"
          style={{ color: C.lavender, letterSpacing: '0.08em' }}>
          Season 01 · Founding
        </div>
        <div className="relative z-10 -mb-8">
          <LargeAvatar name={profile.displayName} gradientKey={profile.aesthetic.gradientKey}
            emoji={profile.aesthetic.emoji} size={72}/>
        </div>
      </div>
      <div className="px-5 pt-12 pb-5">
        <div className="flex items-start justify-between mb-1">
          <div>
            <h2 className="font-display font-extrabold text-2xl text-white">{profile.displayName}</h2>
            <p className="text-sm font-semibold" style={{ color: C.lavender }}>
              {profile.country.flag} {profile.country.label} · {profile.aesthetic.name}
            </p>
          </div>
          <div className="text-right">
            <div className="font-display font-bold text-sm px-2.5 py-1 rounded-lg inline-block"
              style={{ color: C.muted, background: 'rgba(196,181,253,0.06)', border: '1px solid rgba(196,181,253,0.12)' }}>
              Locked
            </div>
            <div className="text-xs mt-1" style={{ color: C.muted }}>MIRRA Score</div>
            <div className="text-xs mt-0.5" style={{ color: 'rgba(161,161,170,0.45)' }}>Unlocks after first quest</div>
          </div>
        </div>
        <p className="text-sm italic mt-2 mb-4" style={{ color: C.muted }}>"{profile.aesthetic.tagline}"</p>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {profile.tags.map((tag, i) => (
            <TagChip key={i} label={tag} color={[C.lavender, C.violet, '#A78BFA', C.lavender][i % 4]}/>
          ))}
          <TagChip label={profile.country.flag + ' Based'} color={C.muted}/>
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1.5" style={{ fontFamily: 'DM Sans', color: C.muted }}>
            <span>Identity XP · Level {profile.level}</span>
            <span style={{ color: C.lavender }}>0 / 500 to Level 2</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <div className="h-full w-0 rounded-full" style={{ background: `linear-gradient(90deg, ${C.plum}, ${C.violet})` }}/>
          </div>
          <p className="text-xs mt-1.5" style={{ color: 'rgba(161,161,170,0.5)' }}>Join a world to start earning XP</p>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<ReturnType<typeof buildProfile> | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // TODO: Replace with Supabase auth + profiles table query
    const raw = sessionStorage.getItem('mirra_quiz');
    setProfile(buildProfile(raw ? JSON.parse(raw) : {}));
  }, []);

  function handleShare() {
    const url = typeof window !== 'undefined' ? window.location.href : 'https://mirra.app/profile';
    navigator.clipboard?.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  }

  if (!profile) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
        style={{ borderColor: `${C.violet} transparent ${C.violet} ${C.violet}` }}/>
    </div>
  );

  return (
    <div className="min-h-screen pb-20 relative overflow-hidden">
      <div className="orb w-96 h-96 -top-20 -right-20 opacity-20"
        style={{ background: `radial-gradient(circle, ${C.plum}28, transparent)` }}/>
      <div className="orb w-72 h-72 bottom-40 -left-10 opacity-12"
        style={{ background: `radial-gradient(circle, ${C.violet}18, transparent)` }}/>

      <div className="mirra-container pt-24 pb-8 relative z-10">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6 max-w-2xl mx-auto lg:max-w-none">
          <div>
            <div className="text-xs font-display font-semibold uppercase mb-1"
              style={{ color: C.violet, letterSpacing: '0.14em' }}>Your MIRRA Self</div>
            <h1 className="font-display font-extrabold text-2xl text-white">Identity Profile</h1>
          </div>
          <div className="flex gap-2">
            <button onClick={handleShare}
              className="glass p-2.5 rounded-xl transition-colors hover:border-white/20"
              style={{ color: copied ? '#4ADE80' : C.muted }}>
              {copied ? <Check size={16}/> : <Share2 size={16}/>}
            </button>
            <Link href="/quiz" className="glass p-2.5 rounded-xl transition-colors hover:border-white/20"
              style={{ color: C.muted }}>
              <Edit3 size={16}/>
            </Link>
          </div>
        </div>

        {copied && (
          <p className="text-xs mb-4 flex items-center gap-1.5 max-w-2xl mx-auto lg:max-w-none"
            style={{ color: '#4ADE80' }}>
            <Check size={12}/> Profile link copied
          </p>
        )}

        {/* Two-column on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-2xl mx-auto lg:max-w-none">

          {/* LEFT */}
          <div className="flex flex-col gap-5">
            <IdentityCard profile={profile}/>

            {/* Owned items */}
            <div className="glass-card rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs font-display font-semibold uppercase"
                  style={{ color: C.muted, letterSpacing: '0.1em' }}>Starting Collection</div>
                <Link href="/collection" className="text-xs flex items-center gap-1" style={{ color: C.lavender }}>
                  View all <ChevronRight size={12}/>
                </Link>
              </div>
              <div className="flex gap-3 flex-wrap">
                {collectionItems.slice(0, 4).map((item) => (
                  <div key={item.id} className="flex flex-col items-center gap-1.5">
                    <ItemCard name={item.name} type={item.type} rarity={item.rarity}
                      gradientKey={item.gradientKey} size="md"/>
                    <RarityBadge rarity={item.rarity}/>
                  </div>
                ))}
              </div>
            </div>

            {/* Share CTA */}
            <div className="glass-card rounded-2xl p-4" style={{ borderColor: `${C.violet}30` }}>
              <div className="text-xs font-display font-semibold mb-1.5" style={{ color: C.lavender }}>
                Your MIRRA Self is shareable
              </div>
              <p className="text-xs leading-relaxed mb-3" style={{ color: C.muted }}>
                Your taste constellation, aesthetic identity, and item collection are yours to show off.
              </p>
              <button onClick={handleShare}
                className="flex items-center gap-2 text-xs font-display font-semibold"
                style={{ color: C.lavender }}>
                <ExternalLink size={12}/> Copy profile link
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-5">
            {/* Taste constellation */}
            <div className="glass-card rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs font-display font-semibold uppercase"
                  style={{ color: C.muted, letterSpacing: '0.1em' }}>Taste Constellation</div>
                <div className="text-xs" style={{ color: C.violet }}>Built from your quiz</div>
              </div>
              <TasteConstellation data={profile.tasteGraph}/>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-4">
                {profile.tasteGraph.map(item => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.color }}/>
                    <div className="flex justify-between flex-1 text-xs" style={{ fontFamily: 'DM Sans' }}>
                      <span style={{ color: C.muted }}>{item.label.split(' ')[0]}</span>
                      <span style={{ color: item.color, fontFamily: 'Syne', fontWeight: 700 }}>{item.value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended world */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs font-display font-semibold uppercase"
                  style={{ color: C.muted, letterSpacing: '0.1em' }}>Recommended World</div>
                <span className="text-xs" style={{ color: C.violet }}>Based on your identity</span>
              </div>
              <WorldCard world={profile.recommendedWorld}/>
            </div>

            {/* Recommended drop */}
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="px-4 pt-4 pb-1">
                <div className="text-xs font-display font-semibold uppercase mb-3"
                  style={{ color: C.muted, letterSpacing: '0.1em' }}>Recommended Drop</div>
              </div>
              {(() => {
                const drop = profile.recommendedDrop;
                const wg = WORLD_GRADIENTS[drop.gradientKey] || WORLD_GRADIENTS['tokyo-night-arcade'];
                return (
                  <>
                    <div className="mx-4 rounded-xl overflow-hidden mb-3">
                      <div className="h-16 relative flex items-center px-4" style={{ background: wg.bg }}>
                        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.3)' }}/>
                        <div className="relative z-10">
                          <div className="font-display font-bold text-sm text-white">{drop.title}</div>
                          <div className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>by {drop.creatorName}</div>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 pb-4 flex items-center justify-between">
                      <div className="flex gap-2">
                        {drop.items.slice(0,3).map((item, i) => (
                          <ItemCard key={i} name={item.name} type={item.type}
                            rarity={item.rarity} gradientKey={item.gradientKey} size="sm"/>
                        ))}
                      </div>
                      <div className="text-right">
                        <div className="font-display font-extrabold text-lg text-white">${drop.price.us}</div>
                        <div className="text-xs" style={{ color: C.muted }}>{drop.items.length} items</div>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-3">
              <Link href="/worlds"
                className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-display font-bold text-sm text-white"
                style={{ background: `linear-gradient(135deg, ${C.plum}, ${C.violet})`, boxShadow: `0 8px 32px ${C.plum}40` }}>
                <Sparkles size={14}/> Enter {profile.recommendedWorld.name}
              </Link>
              <Link href="/drops"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-display font-semibold text-sm glass"
                style={{ color: C.lavender, border: `1px solid ${C.violet}30` }}>
                Browse creator drops <ChevronRight size={14}/>
              </Link>
              <div className="text-center">
                <Link href="/quiz" className="text-xs" style={{ color: 'rgba(161,161,170,0.4)' }}>
                  Retake identity quiz →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
