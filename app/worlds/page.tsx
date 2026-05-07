'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Globe, Users, Zap, ChevronRight, Star } from 'lucide-react';
import { worlds } from '@/lib/data';
import { WorldCard, SectionHeader, TagChip, Avatar, ProgressBar } from '@/components/ui';

const TABS = ['All', 'Japan', 'UK', 'US', 'Gaming', 'Fashion'];

export default function WorldsPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedWorld, setSelectedWorld] = useState<string | null>(null);

  const filtered = worlds.filter(w => {
    if (activeTab === 'All') return true;
    return w.tags.some(t => t.toLowerCase() === activeTab.toLowerCase());
  });

  const featured = worlds.find(w => w.featured);
  const detailWorld = worlds.find(w => w.id === selectedWorld);

  return (
    <div className="min-h-screen px-4 pt-24 pb-16 max-w-lg mx-auto">
      <div className="orb w-80 h-80 top-10 -right-20 opacity-25"
        style={{background:'radial-gradient(circle,#818cf825,transparent)'}}/>

      <SectionHeader
        eyebrow="Weekly Culture Worlds"
        title="Enter a world. Live the vibe."
        subtitle="Limited-time creator-hosted culture experiences. New worlds every Monday."
        gradient="aurora"
      />

      {/* Featured World */}
      {featured && (
        <div className="mb-6 glass rounded-3xl overflow-hidden glow-aurora">
          <div className={`h-36 bg-gradient-to-br ${featured.gradient} relative flex flex-col justify-end p-5`}>
            <div className="absolute inset-0 bg-black/25"/>
            <div className="absolute top-4 left-4 glass px-2.5 py-1 rounded-full text-xs font-display"
              style={{color:'#fbbf24',letterSpacing:'0.1em'}}>
              ⭐ FEATURED
            </div>
            <div className="absolute top-4 right-4 glass px-2.5 py-1 rounded-full text-xs font-display"
              style={{color:'#f87171'}}>
              {featured.daysLeft}d left
            </div>
            <div className="relative z-10">
              <div className="font-display font-800 text-2xl text-white">{featured.name}</div>
              <div className="font-jp text-xs text-white/60 mt-0.5">{featured.nameJp}</div>
            </div>
          </div>
          <div className="p-4">
            <p className="text-[#9ca3af] text-sm font-body mb-3">{featured.tagline}</p>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Avatar name={featured.creator} size={24} gradient={featured.gradient}/>
                <span className="text-sm font-body text-[#d1d5db]">{featured.creator}</span>
              </div>
              <div className="flex gap-3 text-xs text-[#6b7280] font-body">
                <span>⚡ {featured.questCount} quests</span>
                <span>💎 {featured.itemCount} items</span>
              </div>
            </div>
            <ProgressBar value={featured.participants} max={20000} color={featured.textColor} label="Participants"/>
            <div className="flex gap-2 mt-3 flex-wrap">
              {featured.tags.map(t => <TagChip key={t} label={t} color={featured.textColor}/>)}
            </div>
            <Link href={`/checkout`}
              className="flex items-center justify-center gap-2 w-full mt-4 py-3 rounded-xl font-display font-700 text-sm text-white"
              style={{background:`linear-gradient(135deg,#c084fc,#818cf8)`,boxShadow:'0 6px 24px rgba(192,132,252,0.3)'}}>
              Enter World
              <ChevronRight size={14}/>
            </Link>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-5 scrollbar-hide">
        {TABS.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className="flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-display font-600 transition-all"
            style={{
              background: activeTab === tab ? 'linear-gradient(135deg,#c084fc,#818cf8)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${activeTab === tab ? 'transparent' : 'rgba(255,255,255,0.08)'}`,
              color: activeTab === tab ? '#fff' : '#9ca3af',
            }}>
            {tab}
          </button>
        ))}
      </div>

      {/* World grid */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        {filtered.map(world => (
          <WorldCard key={world.id} world={world} onClick={() => setSelectedWorld(world.id)}/>
        ))}
      </div>

      {/* What's in a World */}
      <div className="glass rounded-2xl p-5 mb-6">
        <div className="text-xs font-display uppercase tracking-widest text-[#6b7280] mb-4"
          style={{letterSpacing:'0.1em'}}>What's inside each world</div>
        <div className="grid grid-cols-2 gap-3">
          {[
            {emoji:'⚡',title:'Quests',desc:'Complete challenges to earn items & XP'},
            {emoji:'💎',title:'Digital Items',desc:'Exclusive charms, badges & effects'},
            {emoji:'🎤',title:'Creator Hosts',desc:'Live with the creator in their world'},
            {emoji:'🎁',title:'Real-World Perks',desc:'IRL rewards unlocked by digital items'},
          ].map(f => (
            <div key={f.title} className="bg-white/3 rounded-xl p-3">
              <div className="text-xl mb-1.5">{f.emoji}</div>
              <div className="font-display font-700 text-xs text-white mb-0.5">{f.title}</div>
              <div className="text-[#6b7280] text-xs font-body leading-relaxed">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* World detail modal */}
      {detailWorld && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end justify-center p-4"
          onClick={() => setSelectedWorld(null)}>
          <div className="glass-strong rounded-3xl w-full max-w-sm overflow-hidden"
            onClick={e => e.stopPropagation()}>
            <div className={`h-28 bg-gradient-to-br ${detailWorld.gradient} relative flex items-center px-5`}>
              <div className="absolute inset-0 bg-black/25"/>
              <div className="relative z-10">
                <div className="font-display font-800 text-xl text-white">{detailWorld.name}</div>
                {detailWorld.nameJp && <div className="font-jp text-xs text-white/60">{detailWorld.nameJp}</div>}
              </div>
              <button onClick={() => setSelectedWorld(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 flex items-center justify-center text-white text-sm">
                ✕
              </button>
            </div>
            <div className="p-5">
              <p className="text-[#9ca3af] text-sm font-body mb-4">{detailWorld.tagline}</p>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  {label:`${detailWorld.questCount} Quests`, color:'#c084fc'},
                  {label:`${detailWorld.itemCount} Items`, color:'#f472b6'},
                  {label:`${detailWorld.daysLeft}d Left`, color:'#fbbf24'},
                ].map(s => (
                  <div key={s.label} className="bg-white/3 rounded-xl py-2 text-center">
                    <div className="font-display font-700 text-sm" style={{color:s.color}}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 mb-4">
                <Avatar name={detailWorld.creator} size={28} gradient={detailWorld.gradient}/>
                <div>
                  <div className="text-sm font-display font-600 text-white">{detailWorld.creator}</div>
                  <div className="text-xs text-[#6b7280] font-body">{detailWorld.creatorHandle}</div>
                </div>
              </div>
              <Link href="/checkout"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-display font-700 text-sm text-white"
                style={{background:`linear-gradient(135deg,#c084fc,#818cf8)`,boxShadow:'0 6px 24px rgba(192,132,252,0.3)'}}>
                Enter World · $7.99
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
