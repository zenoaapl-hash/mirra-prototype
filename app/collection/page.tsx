'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Sparkles, RefreshCw, ChevronRight } from 'lucide-react';
import { collectionItems } from '@/lib/data';
import { ItemCard, RarityBadge, SectionHeader, TagChip } from '@/components/ui';

const FILTERS = ['All', 'Profile Charm', 'Identity Badge', 'Avatar Layer', 'Profile Effect', 'Room Object'];

export default function CollectionPage() {
  const [filter, setFilter] = useState('All');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const filtered = collectionItems.filter(item =>
    filter === 'All' || item.type === filter
  );

  const totalValue = collectionItems.reduce((s, i) => s + i.tradeValue, 0);
  const detail = collectionItems.find(i => i.id === selectedItem);

  const rarityOrder = { legendary: 0, epic: 1, rare: 2, common: 3 };
  const sorted = [...filtered].sort((a, b) =>
    (rarityOrder[a.rarity as keyof typeof rarityOrder] ?? 4) - (rarityOrder[b.rarity as keyof typeof rarityOrder] ?? 4)
  );

  return (
    <div className="min-h-screen px-4 pt-24 pb-16 max-w-lg mx-auto">
      <div className="orb w-72 h-72 top-20 -right-16 opacity-25"
        style={{background:'radial-gradient(circle,#34d39920,transparent)'}}/>

      <SectionHeader
        eyebrow="Your Collection"
        title="Digital identity items"
        subtitle="Items you've earned, collected, and traded for"
        gradient="aurora"
      />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          {label:'Items', value:collectionItems.length, color:'#c084fc'},
          {label:'Trade Credit', value:`${totalValue}⬥`, color:'#fbbf24'},
          {label:'Worlds', value:new Set(collectionItems.map(i=>i.worldId).filter(Boolean)).size, color:'#34d399'},
        ].map(s => (
          <div key={s.label} className="glass rounded-2xl p-3 text-center">
            <div className="font-display font-800 text-xl" style={{color:s.color}}>{s.value}</div>
            <div className="text-[#6b7280] text-xs font-body mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Trade credit explanation */}
      <div className="glass rounded-xl p-3 mb-5 flex items-start gap-3">
        <div className="text-xl">💱</div>
        <div>
          <div className="font-display font-700 text-xs text-white mb-0.5">Trade Credit</div>
          <p className="text-[#6b7280] text-xs font-body leading-relaxed">
            Items can be traded in for MIRRA Credits toward future drops and world access.
            Your items never expire — trade-in is always optional.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-5">
        {FILTERS.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-display font-600 transition-all"
            style={{
              background: filter === f ? 'linear-gradient(135deg,#c084fc,#818cf8)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${filter === f ? 'transparent' : 'rgba(255,255,255,0.08)'}`,
              color: filter === f ? '#fff' : '#9ca3af',
            }}>
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {sorted.map(item => (
          <div key={item.id} className="flex flex-col items-center gap-2"
            onClick={() => setSelectedItem(item.id)}>
            <ItemCard name={item.name} type={item.type} rarity={item.rarity} gradient={item.gradient} size="md"/>
            <div className="text-center w-full">
              <div className="text-white text-xs font-display font-600 truncate">{item.name}</div>
              <RarityBadge rarity={item.rarity}/>
            </div>
          </div>
        ))}
        {/* Empty slot */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-28 h-28 rounded-2xl border-2 border-dashed border-white/10 flex items-center justify-center text-[#374151] text-2xl cursor-pointer hover:border-white/20 transition-colors">
            +
          </div>
          <Link href="/drops" className="text-[#6b7280] text-xs font-body hover:text-[#c084fc] transition-colors">
            Get more
          </Link>
        </div>
      </div>

      {/* Use on profile CTA */}
      <Link href="/profile"
        className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-display font-700 text-sm text-white"
        style={{background:'linear-gradient(135deg,#c084fc,#818cf8)',boxShadow:'0 6px 24px rgba(192,132,252,0.3)'}}>
        <Sparkles size={14}/>
        Use items on MIRRA Self
      </Link>

      {/* Item detail sheet */}
      {detail && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end justify-center p-4"
          onClick={() => setSelectedItem(null)}>
          <div className="glass-strong rounded-3xl w-full max-w-sm p-5"
            onClick={e => e.stopPropagation()}>
            <div className="flex items-start gap-4 mb-4">
              <ItemCard name={detail.name} type={detail.type} rarity={detail.rarity} gradient={detail.gradient} size="lg"/>
              <div className="flex-1">
                <div className="font-display font-800 text-lg text-white mb-1">{detail.name}</div>
                <div className="text-[#9ca3af] text-sm font-body mb-2">{detail.type}</div>
                <RarityBadge rarity={detail.rarity}/>
                <div className="mt-2 text-xs text-[#6b7280] font-body">Acquired {detail.acquired}</div>
              </div>
            </div>
            <div className="glass rounded-xl p-3 mb-4 flex justify-between items-center">
              <div>
                <div className="text-xs text-[#6b7280] font-body">Trade Credit Value</div>
                <div className="font-display font-800 text-lg" style={{color:'#fbbf24'}}>{detail.tradeValue} ⬥</div>
              </div>
              <button className="flex items-center gap-1.5 glass px-3 py-2 rounded-xl text-xs font-display text-[#f472b6] border border-[#f472b6]/30 hover:border-[#f472b6]/60 transition-all">
                <RefreshCw size={12}/> Trade in
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Link href="/profile"
                className="flex items-center justify-center gap-1.5 py-3 rounded-xl font-display font-700 text-sm text-white"
                style={{background:'linear-gradient(135deg,#c084fc,#818cf8)'}}>
                <Sparkles size={13}/> Use on Self
              </Link>
              <button onClick={() => setSelectedItem(null)}
                className="py-3 rounded-xl font-display font-600 text-sm text-[#9ca3af] glass border border-white/10">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
