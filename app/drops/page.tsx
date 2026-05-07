'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Zap, Clock, Users, ChevronRight, ArrowLeft } from 'lucide-react';
import { drops } from '@/lib/data';
import { ItemCard, RarityBadge, ProgressBar, Countdown, Avatar, TagChip, SectionHeader } from '@/components/ui';

export default function DropsPage() {
  const [activeDrop, setActiveDrop] = useState<string | null>(null);

  const dropDetail = drops.find(d => d.id === activeDrop);

  if (dropDetail) {
    return <DropDetail drop={dropDetail} onBack={() => setActiveDrop(null)} />;
  }

  return (
    <div className="min-h-screen px-4 pt-24 pb-16 max-w-lg mx-auto">
      <div className="orb w-80 h-80 top-10 -left-20 opacity-25"
        style={{background:'radial-gradient(circle,#f472b825,transparent)'}}/>

      <SectionHeader
        eyebrow="Creator Drops"
        title="Limited drops from the creators you love"
        subtitle="Digital identity items tied to creators you actually follow"
        gradient="sakura"
      />

      <div className="space-y-4">
        {drops.map(drop => (
          <div key={drop.id}
            className="glass rounded-3xl overflow-hidden cursor-pointer hover:border-white/15 transition-all"
            onClick={() => setActiveDrop(drop.id)}>
            {/* Hero */}
            <div className={`h-28 bg-gradient-to-br ${drop.gradient} relative flex items-end px-5 pb-4`}>
              <div className="absolute inset-0 bg-black/20"/>
              <div className="relative z-10">
                <div className="font-display font-800 text-lg text-white leading-tight">{drop.title}</div>
                <div className="text-white/70 text-sm font-body">by {drop.creator} · {drop.creatorFollowers} followers</div>
              </div>
              <div className="absolute top-3 right-3">
                <div className="glass px-2.5 py-1 rounded-full text-xs font-display flex items-center gap-1.5"
                  style={{color:'#fbbf24'}}>
                  <Clock size={10}/>
                  {drop.hoursLeft}h left
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <p className="text-[#9ca3af] text-xs font-body mb-3 leading-relaxed">{drop.tagline}</p>

              {/* Items */}
              <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
                {drop.items.map((item, i) => (
                  <div key={i} className="flex-shrink-0 flex flex-col items-center gap-1">
                    <ItemCard name={item.name} type={item.type} rarity={item.rarity} gradient={item.gradient} size="sm"/>
                    <div className="text-[10px] text-[#6b7280] font-body text-center max-w-[72px] leading-tight">
                      {item.name.length > 12 ? item.name.slice(0,10)+'…' : item.name}
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress + Price */}
              <ProgressBar value={drop.claimedSlots} max={drop.totalSlots}
                color={drop.gradient.includes('fbbf24') ? '#fbbf24' : '#f472b6'}
                label="Claimed"/>
              <div className="flex items-center justify-between mt-3">
                <div className="flex gap-1.5">
                  {drop.tags.slice(0,2).map(t => <TagChip key={t} label={t} color="#f472b6"/>)}
                </div>
                <div className="font-display font-800 text-lg text-white">${drop.price.us}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Coming soon placeholder */}
      <div className="mt-6 glass rounded-2xl p-5 text-center border-dashed border-white/10">
        <div className="text-2xl mb-2">🔮</div>
        <div className="font-display font-700 text-sm text-white mb-1">More drops coming soon</div>
        <p className="text-[#6b7280] text-xs font-body">Join the waitlist to get notified when your favourite creators launch</p>
        <Link href="/waitlist" className="inline-flex mt-3 items-center gap-1.5 text-xs font-display text-[#c084fc] hover:text-white transition-colors">
          Get notified <ChevronRight size={12}/>
        </Link>
      </div>
    </div>
  );
}

function DropDetail({ drop, onBack }: { drop: typeof drops[0]; onBack: () => void }) {
  return (
    <div className="min-h-screen pb-24">
      {/* Hero */}
      <div className={`h-56 bg-gradient-to-br ${drop.gradient} relative pt-20`}>
        <div className="absolute inset-0 bg-black/30"/>
        <button onClick={onBack}
          className="absolute top-20 left-4 glass p-2.5 rounded-xl text-white flex items-center gap-1.5 text-sm font-body z-10">
          <ArrowLeft size={16}/> Drops
        </button>
        <div className="absolute bottom-5 left-4 right-4 z-10">
          <div className="text-white/70 text-xs font-display uppercase tracking-widest mb-1"
            style={{letterSpacing:'0.12em'}}>Creator Drop</div>
          <h1 className="font-display font-800 text-2xl text-white leading-tight">{drop.title}</h1>
        </div>
      </div>

      <div className="px-4 max-w-lg mx-auto">
        {/* Creator + countdown */}
        <div className="glass rounded-2xl p-4 -mt-6 relative z-10 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar name={drop.creator} gradient={drop.gradient} size={40}/>
            <div>
              <div className="font-display font-700 text-sm text-white">{drop.creator}</div>
              <div className="text-[#9ca3af] text-xs font-body">{drop.creatorHandle} · {drop.creatorFollowers} followers</div>
            </div>
          </div>
          <Countdown hours={drop.hoursLeft}/>
        </div>

        {/* Tagline */}
        <p className="text-[#9ca3af] text-sm font-body leading-relaxed mb-4">{drop.tagline}</p>

        {/* Items in drop */}
        <div className="glass rounded-2xl p-4 mb-4">
          <div className="text-xs font-display uppercase tracking-widest text-[#6b7280] mb-4"
            style={{letterSpacing:'0.1em'}}>What you get</div>
          <div className="space-y-3">
            {drop.items.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <ItemCard name={item.name} type={item.type} rarity={item.rarity} gradient={item.gradient} size="sm"/>
                <div>
                  <div className="font-display font-700 text-sm text-white">{item.name}</div>
                  <div className="text-[#6b7280] text-xs font-body mb-1">{item.type}</div>
                  <RarityBadge rarity={item.rarity}/>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-3">
              <div className="w-20 h-20 rounded-2xl glass flex items-center justify-center text-2xl flex-shrink-0">⚡</div>
              <div>
                <div className="font-display font-700 text-sm text-white">{drop.questCount} Fan Quests</div>
                <div className="text-[#6b7280] text-xs font-body">Unlock bonus XP and creator interaction</div>
              </div>
            </div>
          </div>
        </div>

        {/* Slots */}
        <div className="glass rounded-2xl p-4 mb-4">
          <ProgressBar value={drop.claimedSlots} max={drop.totalSlots}
            color={drop.gradient.includes('fbbf24') ? '#fbbf24' : '#f472b6'}
            label={`${drop.totalSlots - drop.claimedSlots} slots remaining`}/>
        </div>

        {/* Checkout CTA */}
        <Link href="/checkout"
          className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-display font-800 text-base text-white mb-3"
          style={{background:`linear-gradient(135deg,${drop.gradient.includes('fbbf24')?'#fbbf24,#f472b6':'#c084fc,#818cf8'})`,
            boxShadow:'0 8px 32px rgba(192,132,252,0.35)'}}>
          <Zap size={16}/>
          Claim Drop · ${drop.price.us}
          <span className="text-sm font-400 opacity-70">/ £{drop.price.uk}</span>
        </Link>
        <p className="text-[#4b5563] text-xs text-center font-body">No hidden fees · Yours forever · Use on your MIRRA Self</p>
      </div>
    </div>
  );
}
