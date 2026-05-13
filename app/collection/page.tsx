'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Sparkles, RefreshCw, ChevronRight } from 'lucide-react';
import { collectionItems, RARITY_CONFIG } from '@/lib/data';
import { ItemCard, RarityBadge, SectionHeader, C } from '@/components/ui';

const FILTERS = ['All','Profile Charm','Identity Badge','Avatar Layer','Profile Effect','Room Object'];
const RARITY_ORDER = { legendary:0, epic:1, rare:2, common:3 };

export default function CollectionPage() {
  const [filter, setFilter] = useState('All');
  const [selectedItem, setSelectedItem] = useState<string|null>(null);
  const filtered = collectionItems.filter(i => filter==='All' || i.type===filter);
  const sorted = [...filtered].sort((a,b)=>(RARITY_ORDER[a.rarity]??4)-(RARITY_ORDER[b.rarity]??4));
  const totalCredit = collectionItems.reduce((s,i)=>s+i.tradeValue,0);
  const detail = collectionItems.find(i=>i.id===selectedItem);

  return (
    <div className="min-h-screen pt-24 pb-20 relative">
      <div className="orb w-72 h-72 top-20 -right-16 opacity-15"
        style={{background:`radial-gradient(circle,${C.violet}18,transparent)`}}/>
      <div className="mirra-container">
        <SectionHeader eyebrow="Your Collection" title="Digital identity items"
          subtitle="Items you've earned, collected, and curated — yours forever"/>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-5 max-w-sm mx-auto lg:max-w-none lg:grid-cols-3 lg:w-auto lg:max-w-xs">
          {[
            {label:'Items',        value:collectionItems.length, color:C.lavender},
            {label:'Trade Credit', value:`${totalCredit}⬥`,      color:C.violet},
            {label:'Worlds',       value:new Set(collectionItems.map(i=>i.worldId).filter(Boolean)).size, color:'#A78BFA'},
          ].map(s=>(
            <div key={s.label} className="glass-card rounded-2xl p-4 text-center">
              <div className="font-display font-extrabold text-2xl" style={{color:s.color}}>{s.value}</div>
              <div className="text-xs mt-0.5" style={{color:C.muted}}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Trade credit explainer */}
        <div className="glass-card rounded-xl p-4 mb-6 flex items-start gap-3 max-w-lg">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{background:`${C.violet}20`,border:`1px solid ${C.violet}30`,color:C.lavender}}>
            <RefreshCw size={16}/>
          </div>
          <div>
            <div className="font-display font-bold text-xs text-white mb-0.5">Trade Credit</div>
            <p className="text-xs leading-relaxed" style={{color:C.muted}}>
              Items can be traded in for MIRRA Credits toward future drops and world access.
              Your items never expire — trade-in is always optional.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6" style={{scrollbarWidth:'none'}}>
          {FILTERS.map(f=>(
            <button key={f} onClick={()=>setFilter(f)}
              className="flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-display font-semibold transition-all"
              style={{
                background:filter===f?`linear-gradient(135deg,${C.plum},${C.violet})`:'rgba(196,181,253,0.04)',
                border:`1px solid ${filter===f?'transparent':'rgba(196,181,253,0.1)'}`,
                color:filter===f?'#fff':C.muted,
              }}>
              {f}
            </button>
          ))}
        </div>

        {/* Grid — wider on desktop */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 mb-8">
          {sorted.map(item=>(
            <div key={item.id} className="flex flex-col items-center gap-2 cursor-pointer"
              onClick={()=>setSelectedItem(item.id)}>
              <ItemCard name={item.name} type={item.type} rarity={item.rarity}
                gradientKey={item.gradientKey} size="md"/>
              <div className="text-center w-full px-1">
                <div className="text-xs font-display font-semibold text-white truncate leading-snug">{item.name}</div>
                <RarityBadge rarity={item.rarity}/>
              </div>
            </div>
          ))}
          {/* Empty slot */}
          <div className="flex flex-col items-center gap-2">
            <Link href="/drops">
              <div className="w-24 h-24 rounded-2xl flex items-center justify-center cursor-pointer hover:border-white/20 transition-colors"
                style={{border:`2px dashed rgba(196,181,253,0.15)`,color:C.subtle,fontSize:24}}>
                +
              </div>
            </Link>
            <span className="text-xs" style={{color:C.subtle}}>Get more</span>
          </div>
        </div>

        <div className="flex justify-center">
          <Link href="/profile"
            className="flex items-center gap-2 px-7 py-4 rounded-2xl font-display font-bold text-sm text-white"
            style={{background:`linear-gradient(135deg,${C.plum},${C.violet})`,boxShadow:`0 6px 24px ${C.plum}50`}}>
            <Sparkles size={14}/> Use items on MIRRA Self
          </Link>
        </div>
      </div>

      {/* Detail sheet */}
      {detail && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
          style={{background:'rgba(8,7,13,0.85)',backdropFilter:'blur(8px)'}}
          onClick={()=>setSelectedItem(null)}>
          <div className="glass-strong rounded-3xl w-full max-w-sm p-5"
            onClick={e=>e.stopPropagation()}>
            <div className="flex items-start gap-4 mb-4">
              <ItemCard name={detail.name} type={detail.type} rarity={detail.rarity}
                gradientKey={detail.gradientKey} size="lg"/>
              <div className="flex-1">
                <div className="font-display font-extrabold text-lg text-white mb-1">{detail.name}</div>
                <div className="text-sm mb-2" style={{color:C.muted}}>{detail.type}</div>
                <RarityBadge rarity={detail.rarity}/>
                <div className="text-xs mt-2" style={{color:C.subtle}}>Acquired {detail.acquired}</div>
              </div>
            </div>
            <div className="glass-card rounded-xl p-3 mb-4 flex justify-between items-center">
              <div>
                <div className="text-xs" style={{color:C.muted}}>Trade Credit Value</div>
                <div className="font-display font-extrabold text-lg" style={{color:C.lavender}}>{detail.tradeValue}⬥</div>
              </div>
              <button className="flex items-center gap-1.5 glass px-3 py-2 rounded-xl text-xs font-display font-semibold"
                style={{color:C.lavender,border:`1px solid ${C.violet}30`}}>
                <RefreshCw size={12}/> Trade in
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Link href="/profile"
                className="flex items-center justify-center gap-1.5 py-3 rounded-xl font-display font-bold text-sm text-white"
                style={{background:`linear-gradient(135deg,${C.plum},${C.violet})`}}>
                <Sparkles size={13}/> Use on Self
              </Link>
              <button onClick={()=>setSelectedItem(null)}
                className="py-3 rounded-xl font-display font-semibold text-sm glass"
                style={{color:C.muted}}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
