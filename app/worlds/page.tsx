'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Globe, ChevronRight } from 'lucide-react';
import { worlds, WORLD_GRADIENTS } from '@/lib/data';
import { WorldCard, SectionHeader, TagChip, Avatar, ProgressBar, C } from '@/components/ui';

const TABS = ['All', 'Japan', 'UK', 'US', 'Gaming', 'Fashion', 'Music'];

export default function WorldsPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedWorld, setSelectedWorld] = useState<string | null>(null);

  const filtered = worlds.filter(w =>
    activeTab === 'All' || w.tags.some(t => t.toLowerCase() === activeTab.toLowerCase())
  );
  const featured = worlds.find(w => w.featured);
  const detailWorld = worlds.find(w => w.id === selectedWorld);

  return (
    <div className="min-h-screen px-4 pt-24 pb-16 max-w-lg mx-auto">
      <div className="orb w-72 h-72 top-10 -right-20 opacity-20"
        style={{background:`radial-gradient(circle,${C.violet}22,transparent)`}}/>

      <SectionHeader
        eyebrow="Weekly Culture Worlds"
        title="Enter a world. Live the vibe."
        subtitle="Limited-time creator-hosted culture experiences. New worlds every Monday."
      />

      {/* Featured */}
      {featured && (() => {
        const wg = WORLD_GRADIENTS[featured.id] || WORLD_GRADIENTS['tokyo-night-arcade'];
        return (
          <div className="mb-6 glass-card rounded-3xl overflow-hidden glow-violet">
            <div className="h-36 relative flex flex-col justify-end p-5" style={{background:wg.bg}}>
              <div className="absolute inset-0" style={{background:'rgba(0,0,0,0.3)'}}/>
              <div className="absolute top-4 left-4 glass px-2.5 py-1 rounded-full text-xs font-display font-semibold"
                style={{color:C.lavender,letterSpacing:'0.1em'}}>
                ✦ FEATURED WORLD
              </div>
              <div className="absolute top-4 right-4 glass px-2.5 py-1 rounded-full text-xs font-display font-semibold"
                style={{color:'#A78BFA'}}>
                {featured.daysLeft}d left
              </div>
              <div className="relative z-10">
                <div className="font-display font-extrabold text-2xl text-white">{featured.name}</div>
                <div className="font-jp text-xs mt-0.5" style={{color:'rgba(255,255,255,0.5)'}}>{featured.nameJp}</div>
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm leading-relaxed mb-3" style={{color:C.muted}}>{featured.tagline}</p>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-display font-bold"
                    style={{background:`linear-gradient(135deg,${C.plum},${C.violet})`}}>
                    {featured.creatorName[0]}
                  </div>
                  <span className="text-sm" style={{color:'#D1D5DB',fontFamily:'DM Sans'}}>{featured.creatorName}</span>
                </div>
                <div className="flex gap-3 text-xs" style={{color:C.muted}}>
                  <span>⚡ {featured.questCount} quests</span>
                  <span>💎 {featured.itemCount} items</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {featured.tags.map(t=><TagChip key={t} label={t} color={wg.accent}/>)}
              </div>
              <Link href="/checkout"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-display font-bold text-sm text-white"
                style={{background:`linear-gradient(135deg,${C.plum},${C.violet})`,boxShadow:`0 6px 24px ${C.plum}50`}}>
                Enter World
                <ChevronRight size={14}/>
              </Link>
            </div>
          </div>
        );
      })()}

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-5" style={{scrollbarWidth:'none'}}>
        {TABS.map(tab=>(
          <button key={tab} onClick={()=>setActiveTab(tab)}
            className="flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-display font-semibold transition-all"
            style={{
              background: activeTab===tab ? `linear-gradient(135deg,${C.plum},${C.violet})` : 'rgba(196,181,253,0.04)',
              border: `1px solid ${activeTab===tab?'transparent':'rgba(196,181,253,0.1)'}`,
              color: activeTab===tab ? '#fff' : C.muted,
            }}>
            {tab}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        {filtered.map(w=><WorldCard key={w.id} world={w} onClick={()=>setSelectedWorld(w.id)}/>)}
      </div>

      {/* What's inside */}
      <div className="glass-card rounded-2xl p-5 mb-4">
        <div className="text-xs font-display font-semibold uppercase mb-4"
          style={{color:C.muted,letterSpacing:'0.1em'}}>What's inside each world</div>
        <div className="grid grid-cols-2 gap-3">
          {[
            {emoji:'⚡',title:'Quests',desc:'Complete challenges to earn items and XP'},
            {emoji:'💎',title:'Digital Items',desc:'Exclusive charms, badges and effects'},
            {emoji:'🎤',title:'Creator Hosts',desc:'Live with the creator in their world'},
            {emoji:'🎁',title:'Real-World Perks',desc:'IRL rewards unlocked by your items'},
          ].map(f=>(
            <div key={f.title} className="rounded-xl p-3" style={{background:'rgba(196,181,253,0.04)'}}>
              <div className="text-xl mb-1.5">{f.emoji}</div>
              <div className="font-display font-bold text-xs text-white mb-0.5">{f.title}</div>
              <div className="text-xs leading-relaxed" style={{color:C.muted}}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* World detail modal */}
      {detailWorld && (() => {
        const wg = WORLD_GRADIENTS[detailWorld.id] || WORLD_GRADIENTS['tokyo-night-arcade'];
        return (
          <div className="fixed inset-0 z-50 flex items-end justify-center p-4"
            style={{background:'rgba(8,7,13,0.8)',backdropFilter:'blur(8px)'}}
            onClick={()=>setSelectedWorld(null)}>
            <div className="glass-strong rounded-3xl w-full max-w-sm overflow-hidden"
              onClick={e=>e.stopPropagation()}>
              <div className="h-28 relative flex items-end px-5 pb-4" style={{background:wg.bg}}>
                <div className="absolute inset-0" style={{background:'rgba(0,0,0,0.3)'}}/>
                <div className="relative z-10">
                  <div className="font-display font-extrabold text-xl text-white">{detailWorld.name}</div>
                  {detailWorld.nameJp && <div className="font-jp text-xs" style={{color:'rgba(255,255,255,0.5)'}}>{detailWorld.nameJp}</div>}
                </div>
                <button onClick={()=>setSelectedWorld(null)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-sm"
                  style={{background:'rgba(0,0,0,0.4)',color:C.pearl}}>✕</button>
              </div>
              <div className="p-5">
                <p className="text-sm leading-relaxed mb-4" style={{color:C.muted}}>{detailWorld.tagline}</p>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[
                    {label:`${detailWorld.questCount} Quests`, color:C.lavender},
                    {label:`${detailWorld.itemCount} Items`,   color:'#A78BFA'},
                    {label:`${detailWorld.daysLeft}d Left`,    color:C.muted},
                  ].map(s=>(
                    <div key={s.label} className="rounded-xl py-2 text-center" style={{background:'rgba(196,181,253,0.05)'}}>
                      <div className="font-display font-bold text-sm" style={{color:s.color}}>{s.label}</div>
                    </div>
                  ))}
                </div>
                <Link href="/checkout"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-display font-bold text-sm text-white"
                  style={{background:`linear-gradient(135deg,${C.plum},${C.violet})`,boxShadow:`0 6px 24px ${C.plum}50`}}>
                  Enter World · $7.99
                </Link>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
