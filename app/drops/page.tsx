'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Clock, ChevronRight, ArrowLeft, Package } from 'lucide-react';
import { drops, WORLD_GRADIENTS } from '@/lib/data';
import { ItemCard, RarityBadge, ProgressBar, Countdown, TagChip, SectionHeader, C } from '@/components/ui';

export default function DropsPage() {
  const [activeDrop, setActiveDrop] = useState<string | null>(null);
  const dropDetail = drops.find(d => d.id === activeDrop);
  if (dropDetail) return <DropDetail drop={dropDetail} onBack={()=>setActiveDrop(null)}/>;

  return (
    <div className="min-h-screen pt-24 pb-20 relative">
      <div className="orb w-80 h-80 top-10 -left-20 opacity-15"
        style={{background:`radial-gradient(circle,${C.violet}18,transparent)`}}/>
      <div className="mirra-container">
        <SectionHeader eyebrow="Creator Drops" title="Limited drops from creators you love"
          subtitle="Transparent identity item bundles — one-time purchase, Always in your collection"/>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {drops.map(drop=>{
            const wg = WORLD_GRADIENTS[drop.gradientKey]||WORLD_GRADIENTS['tokyo-night-arcade'];
            return (
              <div key={drop.id} className="glass-card rounded-3xl overflow-hidden flex flex-col">
                {/* Hero */}
                <div className="h-28 relative flex items-end px-5 pb-3 cursor-pointer"
                  style={{background:wg.bg}} onClick={()=>setActiveDrop(drop.id)}>
                  <div className="absolute inset-0" style={{background:'rgba(0,0,0,0.25)'}}/>
                  <div className="relative z-10">
                    <div className="font-display font-bold text-base text-white leading-tight">{drop.title}</div>
                    <div className="text-xs" style={{color:'rgba(255,255,255,0.6)'}}>by {drop.creatorName}</div>
                  </div>
                  <div className="absolute top-3 right-3 glass px-2.5 py-1 rounded-full flex items-center gap-1.5 text-xs font-display font-semibold"
                    style={{color:C.lavender}}>
                    <Clock size={10}/>{drop.hoursLeft}h left
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 flex-1 flex flex-col">
                  <p className="text-xs leading-relaxed mb-4" style={{color:C.muted}}>{drop.tagline}</p>

                  {/* Items — with readable names */}
                  <div className="mb-4">
                    <div className="text-xs font-display font-semibold uppercase mb-2.5"
                      style={{color:C.muted,letterSpacing:'0.08em'}}>Bundle includes</div>
                    <div className="space-y-2">
                      {drop.items.map((item,i)=>(
                        <div key={i} className="flex items-center gap-3">
                          <ItemCard name={item.name} type={item.type} rarity={item.rarity}
                            gradientKey={item.gradientKey} size="sm"/>
                          <div>
                            <div className="font-display font-semibold text-xs text-white leading-snug">{item.name}</div>
                            <div className="text-xs mt-0.5" style={{color:C.muted}}>{item.type}</div>
                            <RarityBadge rarity={item.rarity}/>
                          </div>
                        </div>
                      ))}
                      <div className="flex items-center gap-3">
                        <div className="w-[72px] h-[72px] rounded-2xl flex items-center justify-center text-xl flex-shrink-0"
                          style={{background:`${C.violet}15`,border:`1px solid ${C.violet}30`,color:C.lavender}}>
                          <Package size={20}/>
                        </div>
                        <div>
                          <div className="font-display font-semibold text-xs text-white">{drop.questCount} Creator Quests</div>
                          <div className="text-xs" style={{color:C.muted}}>Earn XP and interact with the creator</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <ProgressBar value={drop.claimedSlots} max={drop.totalSlots} color={C.violet}
                    label="Spaces claimed"/>

                  {/* Price + CTA */}
                  <div className="flex items-center justify-between mt-4 mb-4">
                    <div>
                      <div className="font-display font-extrabold text-xl text-white">${drop.price.us}</div>
                      <div className="text-xs" style={{color:C.muted}}>One-time · No hidden fees</div>
                    </div>
                    <div className="flex gap-1.5">
                      {drop.tags.slice(0,2).map(t=><TagChip key={t} label={t} color={C.lavender}/>)}
                    </div>
                  </div>

                  <div className="flex gap-2 mt-auto">
                    <button onClick={()=>setActiveDrop(drop.id)}
                      className="flex-1 py-3 rounded-xl font-display font-semibold text-sm glass hover:border-white/20 transition-all"
                      style={{color:C.lavender}}>
                      View details
                    </button>
                    <Link href="/checkout"
                      className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl font-display font-bold text-sm text-white"
                      style={{background:`linear-gradient(135deg,${C.plum},${C.violet})`}}>
                      Get bundle · ${drop.price.us}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 glass-card rounded-2xl p-6 text-center max-w-md mx-auto">
          <div className="w-10 h-10 rounded-xl glass flex items-center justify-center mx-auto mb-3"
            style={{color:C.lavender}}><Package size={18}/></div>
          <div className="font-display font-bold text-sm text-white mb-1">More drops this season</div>
          <p className="text-xs mb-4" style={{color:C.muted}}>Join the waitlist to be notified when new drops launch</p>
          <Link href="/waitlist" className="inline-flex items-center gap-1.5 text-xs font-display font-semibold"
            style={{color:C.lavender}}>
            Get notified <ChevronRight size={12}/>
          </Link>
        </div>
      </div>
    </div>
  );
}

function DropDetail({ drop, onBack }: { drop: typeof drops[0]; onBack: ()=>void }) {
  const wg = WORLD_GRADIENTS[drop.gradientKey]||WORLD_GRADIENTS['tokyo-night-arcade'];
  return (
    <div className="min-h-screen pb-24">
      <div className="h-56 relative pt-20" style={{background:wg.bg}}>
        <div className="absolute inset-0" style={{background:'rgba(0,0,0,0.35)'}}/>
        <button onClick={onBack}
          className="absolute top-20 left-4 glass p-2.5 rounded-xl flex items-center gap-1.5 text-sm z-10"
          style={{color:C.pearl}}>
          <ArrowLeft size={16}/> Drops
        </button>
        <div className="absolute bottom-5 left-4 right-4 z-10">
          <div className="text-xs font-display font-semibold uppercase mb-1"
            style={{color:'rgba(255,255,255,0.5)',letterSpacing:'0.12em'}}>Creator Drop</div>
          <h1 className="font-display font-extrabold text-2xl text-white leading-tight">{drop.title}</h1>
        </div>
      </div>

      <div className="mirra-container-narrow">
        <div className="glass-card rounded-2xl p-4 -mt-6 relative z-10 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold"
              style={{background:`linear-gradient(135deg,${C.plum},${C.violet})`}}>{drop.creatorName[0]}</div>
            <div>
              <div className="font-display font-bold text-sm text-white">{drop.creatorName}</div>
              <div className="text-xs" style={{color:C.muted}}>{drop.creatorHandle}</div>
            </div>
          </div>
          <Countdown hours={drop.hoursLeft}/>
        </div>

        <p className="text-sm leading-relaxed mb-4" style={{color:C.muted}}>{drop.tagline}</p>

        <div className="glass-card rounded-2xl p-4 mb-4">
          <div className="text-xs font-display font-semibold uppercase mb-4"
            style={{color:C.muted,letterSpacing:'0.1em'}}>What's in this bundle</div>
          <div className="space-y-3">
            {drop.items.map((item,i)=>(
              <div key={i} className="flex items-center gap-3">
                <ItemCard name={item.name} type={item.type} rarity={item.rarity} gradientKey={item.gradientKey} size="sm"/>
                <div>
                  <div className="font-display font-bold text-sm text-white">{item.name}</div>
                  <div className="text-xs mb-1" style={{color:C.muted}}>{item.type}</div>
                  <RarityBadge rarity={item.rarity}/>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-3">
              <div className="w-[72px] h-[72px] rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{background:`${C.violet}15`,border:`1px solid ${C.violet}30`,color:C.lavender}}>
                <Package size={22}/>
              </div>
              <div>
                <div className="font-display font-bold text-sm text-white">{drop.questCount} Creator Quests</div>
                <div className="text-xs" style={{color:C.muted}}>Earn XP and interact with the creator</div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-4 mb-4">
          <ProgressBar value={drop.claimedSlots} max={drop.totalSlots} color={C.violet}
            label={`${drop.totalSlots-drop.claimedSlots} spaces remaining`}/>
        </div>

        <Link href="/checkout"
          className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-display font-bold text-base text-white mb-3"
          style={{background:`linear-gradient(135deg,${C.plum},${C.violet})`,boxShadow:`0 8px 32px ${C.plum}50`}}>
          Get bundle · ${drop.price.us}
          <span className="text-sm font-normal opacity-60">/ £{drop.price.uk}</span>
        </Link>
        <p className="text-xs text-center" style={{color:C.subtle}}>
          One-time purchase · No hidden fees · Always in your collection · Continue to PayPal
        </p>
      </div>
    </div>
  );
}
