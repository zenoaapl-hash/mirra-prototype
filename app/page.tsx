'use client';
import Link from 'next/link';
import { Sparkles, Zap, ArrowRight, Globe, Star, ChevronRight } from 'lucide-react';
import { worlds, drops, WORLD_GRADIENTS, ITEM_GRADIENTS, RARITY_CONFIG } from '@/lib/data';
import { WorldCard, TagChip, ItemCard, ProgressBar, C, MirraLogo } from '@/components/ui';

export default function Home() {
  return (
    <div className="relative">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-16 overflow-hidden">
        <div className="orb w-80 h-80 -top-20 -left-20" style={{background:`radial-gradient(circle,${C.plum}22,transparent)`}}/>
        <div className="orb w-96 h-96 -bottom-10 -right-10" style={{background:`radial-gradient(circle,${C.violet}18,transparent)`}}/>

        {/* Eyebrow */}
        <div className="glass inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-display font-semibold uppercase mb-6"
          style={{color:C.lavender,letterSpacing:'0.14em'}}>
          <div className="w-1.5 h-1.5 rounded-full pulse-glow" style={{background:C.violet}}/>
          Early access pilot now forming
        </div>

        {/* Headline */}
        <h1 className="font-display font-extrabold text-center leading-[0.95] mb-6" style={{maxWidth:'360px'}}>
          <span className="block text-5xl sm:text-6xl text-gradient-violet">Your identity</span>
          <span className="block text-4xl sm:text-5xl mt-1" style={{color:C.pearl}}>is your</span>
          <span className="block text-5xl sm:text-6xl text-gradient-rose mt-1">culture drop</span>
        </h1>

        <p className="text-center text-base sm:text-lg leading-relaxed max-w-sm mb-10"
          style={{color:C.muted, fontFamily:'DM Sans'}}>
          MIRRA is where you build a living digital identity — through creator worlds, quests, and collectibles that actually mean something.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs">
          <Link href="/quiz"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-display font-bold text-sm text-white transition-all hover:scale-105 active:scale-95"
            style={{background:`linear-gradient(135deg,${C.plum},${C.violet})`,boxShadow:`0 8px 32px ${C.plum}55`}}>
            <Sparkles size={16}/>
            Create your MIRRA Self
          </Link>
          <Link href="/waitlist"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-display font-bold text-sm glass transition-all hover:border-white/20"
            style={{color:C.lavender}}>
            Join waitlist <ArrowRight size={14}/>
          </Link>
        </div>

        {/* Early access pill — no fake numbers */}
        <div className="mt-8 glass px-4 py-2 rounded-full flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{background:`${C.violet}`}}/>
          <p className="text-xs" style={{color:C.muted,fontFamily:'DM Sans'}}>
            Founding member access opening soon
          </p>
        </div>

        {/* Product preview card */}
        <div className="mt-12 w-full max-w-sm glass-card rounded-3xl overflow-hidden glow-violet">
          <div className="p-4 border-b" style={{borderColor:'rgba(196,181,253,0.08)',background:`${C.plum}15`}}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                style={{background:`linear-gradient(135deg,${C.plum},${C.violet})`}}>
                💜
              </div>
              <div>
                <div className="font-display font-bold text-sm text-white">Yuki's MIRRA Self</div>
                <div className="text-xs" style={{color:C.muted}}>Cyber Pop · Japan · Collector</div>
              </div>
              <div className="ml-auto glass px-2 py-1 rounded-full text-xs font-display font-semibold"
                style={{color:C.lavender}}>Lv 1</div>
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {['Anime Fan','Collector','Taste Curator','Cyber Pop'].map((t,i)=>(
                <TagChip key={t} label={t} color={[C.lavender,C.violet,'#A78BFA',C.lavender][i%4]}/>
              ))}
            </div>
          </div>
          <div className="p-4">
            <div className="text-xs font-display font-semibold uppercase mb-3"
              style={{color:C.muted,letterSpacing:'0.1em'}}>Collection</div>
            <div className="flex gap-2">
              {[
                {r:'epic' as const,    t:'Profile Charm',  gk:'neon-koi'},
                {r:'legendary' as const,t:'Avatar Layer', gk:'golden-halo'},
                {r:'rare' as const,    t:'Profile Effect', gk:'pixel-rain'},
                {r:'common' as const,  t:'Avatar Item',    gk:'night-bag'},
              ].map((item,i)=>(
                <ItemCard key={i} name="" type={item.t} rarity={item.r} gradientKey={item.gk} size="sm"/>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CULTURE WORLDS ── */}
      <section className="px-4 py-16 relative">
        <div className="orb w-72 h-72 top-0 right-0 opacity-20"
          style={{background:`radial-gradient(circle,${C.violet}25,transparent)`}}/>
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full text-xs font-display font-semibold uppercase mb-4"
              style={{color:C.lavender,letterSpacing:'0.12em'}}>
              <Globe size={10}/> Weekly Worlds
            </div>
            <h2 className="font-display font-extrabold text-2xl text-gradient-violet">Culture drops every week</h2>
            <p className="text-sm mt-2" style={{color:C.muted}}>Limited-time worlds hosted by creators you actually follow</p>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-5">
            {worlds.slice(0,4).map(w=><WorldCard key={w.id} world={w}/>)}
          </div>
          <Link href="/worlds"
            className="flex items-center justify-center gap-2 glass rounded-2xl py-3.5 text-sm font-display font-semibold w-full transition-all hover:border-white/20"
            style={{color:C.lavender}}>
            Explore all worlds <ChevronRight size={14}/>
          </Link>
        </div>
      </section>

      {/* ── CREATOR DROPS ── */}
      <section className="px-4 py-16 relative">
        <div className="orb w-80 h-80 bottom-0 left-0 opacity-15"
          style={{background:`radial-gradient(circle,${C.violet}18,transparent)`}}/>
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full text-xs font-display font-semibold uppercase mb-4"
              style={{color:C.lavender,letterSpacing:'0.12em'}}>
              <Zap size={10}/> Creator Drops
            </div>
            <h2 className="font-display font-extrabold text-2xl text-gradient-violet">Drops from creators you love</h2>
            <p className="text-sm mt-2" style={{color:C.muted}}>Limited identity items tied to your favourite creators</p>
          </div>
          {drops.map(drop=>{
            const wg = WORLD_GRADIENTS[drop.gradientKey]||WORLD_GRADIENTS['tokyo-night-arcade'];
            return (
              <Link href="/drops" key={drop.id} className="block glass-card rounded-3xl overflow-hidden mb-4 hover:border-white/15 transition-all">
                <div className="h-20 relative flex items-end px-4 pb-3" style={{background:wg.bg}}>
                  <div className="absolute inset-0" style={{background:'rgba(0,0,0,0.3)'}}/>
                  <div className="relative z-10">
                    <div className="font-display font-bold text-base text-white">{drop.title}</div>
                    <div className="text-xs" style={{color:'rgba(255,255,255,0.6)'}}>by {drop.creatorName}</div>
                  </div>
                  <div className="absolute top-3 right-3 glass px-2 py-0.5 rounded-full text-xs font-display font-semibold"
                    style={{color:C.lavender}}>
                    {drop.hoursLeft}h left
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex gap-2">
                      {drop.items.slice(0,3).map((item,i)=>(
                        <ItemCard key={i} name={item.name} type={item.type} rarity={item.rarity} gradientKey={item.gradientKey} size="sm"/>
                      ))}
                    </div>
                    <div className="text-right">
                      <div className="font-display font-extrabold text-lg text-white">${drop.price.us}</div>
                      <div className="text-xs" style={{color:C.muted}}>{drop.claimedSlots} of {drop.totalSlots} claimed</div>
                    </div>
                  </div>
                  <ProgressBar value={drop.claimedSlots} max={drop.totalSlots} color={C.violet}
                    label="Spaces claimed"/>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── COLLECTION PREVIEW ── */}
      <section className="px-4 py-16">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full text-xs font-display font-semibold uppercase mb-4"
              style={{color:C.lavender,letterSpacing:'0.12em'}}>
              <Star size={10}/> Digital Collection
            </div>
            <h2 className="font-display font-extrabold text-2xl text-gradient-violet">Items that live in your identity</h2>
            <p className="text-sm mt-2" style={{color:C.muted}}>Charms, badges, effects, avatar layers — yours forever</p>
          </div>
          <div className="grid grid-cols-4 gap-3 mb-5">
            {[
              {r:'epic' as const,     t:'Profile Charm',  gk:'neon-koi'},
              {r:'legendary' as const,t:'Avatar Layer',   gk:'golden-halo'},
              {r:'epic' as const,     t:'Identity Badge', gk:'soft-launch'},
              {r:'rare' as const,     t:'Profile Effect', gk:'pixel-rain'},
              {r:'common' as const,   t:'Room Object',    gk:'cozy-candle'},
              {r:'common' as const,   t:'Profile Effect', gk:'study-aura'},
              {r:'rare' as const,     t:'Avatar Item',    gk:'night-bag'},
              {r:'rare' as const,     t:'Profile Charm',  gk:'camden-patch'},
            ].map((item,i)=>(
              <ItemCard key={i} name="" type={item.t} rarity={item.r} gradientKey={item.gk} size="md"/>
            ))}
          </div>
          <Link href="/collection"
            className="flex items-center justify-center gap-2 glass rounded-2xl py-3.5 text-sm font-display font-semibold w-full transition-all hover:border-white/20"
            style={{color:C.lavender}}>
            View your collection <ChevronRight size={14}/>
          </Link>
        </div>
      </section>

      {/* ── REAL-WORLD PERKS ── */}
      <section className="px-4 py-16">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full text-xs font-display font-semibold uppercase mb-4"
              style={{color:C.lavender,letterSpacing:'0.12em'}}>
              🎁 Real-World Perks
            </div>
            <h2 className="font-display font-extrabold text-2xl text-gradient-violet">Digital identity unlocks IRL rewards</h2>
            <p className="text-sm mt-2" style={{color:C.muted}}>Your digital world earns you real things</p>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {[
              {emoji:'🍵',title:'Matcha Café Discount',desc:'Tokyo Night Arcade members get 20% off at partner cafés in Japan',tag:'Japan · Food'},
              {emoji:'🎟️',title:'Festival Early Access',desc:'Festival Fit Lab world unlocks presale access to partner festivals in the UK',tag:'UK · Events'},
              {emoji:'👟',title:'Creator Merch First Look',desc:'Quest completers get first access to creator merchandise drops',tag:'US · Fashion'},
            ].map(perk=>(
              <div key={perk.title} className="glass-card rounded-2xl p-4 flex gap-4 items-start hover:border-white/15 transition-all">
                <div className="w-11 h-11 rounded-xl glass flex items-center justify-center text-xl flex-shrink-0">
                  {perk.emoji}
                </div>
                <div>
                  <div className="font-display font-bold text-sm text-white mb-0.5">{perk.title}</div>
                  <p className="text-xs leading-relaxed mb-1.5" style={{color:C.muted}}>{perk.desc}</p>
                  <div className="text-xs font-display font-semibold" style={{color:C.muted}}>{perk.tag}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WAITLIST CTA ── */}
      <section className="px-4 py-20 relative overflow-hidden">
        <div className="orb w-96 h-96 -bottom-20 left-1/2 -translate-x-1/2 opacity-30"
          style={{background:`radial-gradient(circle,${C.plum}25,transparent)`}}/>
        <div className="max-w-sm mx-auto text-center relative z-10">
          <div className="w-16 h-16 rounded-3xl flex items-center justify-center text-3xl mx-auto mb-6 float glow-violet"
            style={{background:`linear-gradient(135deg,${C.plum},${C.violet})`}}>
            ✦
          </div>
          <h2 className="font-display font-extrabold text-3xl text-gradient-violet mb-4 leading-tight">
            Be first to enter<br/>the MIRRA season
          </h2>
          <p className="text-sm leading-relaxed mb-8" style={{color:C.muted}}>
            Founding members get early world access, an exclusive item pack, and a founding badge — never restocked.
          </p>
          <Link href="/waitlist"
            className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-display font-bold text-base text-white hover:scale-[1.02] transition-all active:scale-[0.98]"
            style={{background:`linear-gradient(135deg,${C.plum},${C.violet})`,boxShadow:`0 8px 40px ${C.plum}55`}}>
            <Sparkles size={16}/>
            Join the waitlist
          </Link>
          <p className="text-xs mt-4" style={{color:C.subtle}}>Free to join · No spam · Founding member perks on launch</p>
        </div>
      </section>
    </div>
  );
}
