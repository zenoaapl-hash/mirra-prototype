'use client';
import Link from 'next/link';
import { Sparkles, ArrowRight, ChevronRight, Gift, Ticket, ShoppingBag } from 'lucide-react';
import { worlds, drops, WORLD_GRADIENTS } from '@/lib/data';
import { WorldCard, TagChip, ItemCard, ProgressBar, C, MirraLogo, IconBox } from '@/components/ui';

export default function Home() {
  return (
    <div className="relative">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
        <div className="orb w-[500px] h-[500px] -top-40 -left-40 opacity-20"
          style={{background:`radial-gradient(circle,${C.plum}35,transparent)`}}/>
        <div className="orb w-[400px] h-[400px] bottom-0 -right-20 opacity-15"
          style={{background:`radial-gradient(circle,${C.violet}25,transparent)`}}/>

        <div className="mirra-container w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* LEFT — copy */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="glass inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-display font-semibold uppercase mb-6"
                style={{color:C.lavender,letterSpacing:'0.14em'}}>
                <div className="w-1.5 h-1.5 rounded-full pulse-glow" style={{background:C.violet}}/>
                Early access pilot now forming
              </div>

              <h1 className="mirra-headline mb-6">
                <span className="block text-gradient-violet">Your identity</span>
                <span className="block" style={{color:C.pearl}}>is your</span>
                <span className="block text-gradient-rose">culture drop</span>
              </h1>

              <p className="text-base sm:text-lg leading-relaxed max-w-md mb-8"
                style={{color:C.muted, fontFamily:'DM Sans'}}>
                MIRRA is where you build a living digital identity — through creator worlds,
                quests, and collectibles that actually mean something.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <Link href="/quiz"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 rounded-2xl font-display font-bold text-sm text-white transition-all hover:scale-105 active:scale-95"
                  style={{background:`linear-gradient(135deg,${C.plum},${C.violet})`,boxShadow:`0 8px 32px ${C.plum}55`}}>
                  <Sparkles size={16}/> Create your MIRRA Self
                </Link>
                <Link href="/waitlist"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-display font-bold text-sm glass transition-all hover:border-white/20"
                  style={{color:C.lavender}}>
                  Join waitlist <ArrowRight size={14}/>
                </Link>
              </div>

              <div className="mt-6 glass px-4 py-2 rounded-full flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{background:C.violet}}/>
                <p className="text-xs" style={{color:C.muted,fontFamily:'DM Sans'}}>
                  Founding member access opening soon
                </p>
              </div>
            </div>

            {/* RIGHT — product preview card */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-sm glass-card rounded-3xl overflow-hidden glow-violet">
                <div className="p-5 border-b" style={{borderColor:'rgba(196,181,253,0.08)',background:`${C.plum}15`}}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
                      style={{background:`linear-gradient(135deg,${C.plum},${C.violet})`}}>
                      💜
                    </div>
                    <div>
                      <div className="font-display font-bold text-base text-white">Yuki's MIRRA Self</div>
                      <div className="text-xs mt-0.5" style={{color:C.muted}}>Cyber Pop · Japan · Collector</div>
                    </div>
                    <div className="ml-auto glass px-2.5 py-1 rounded-full text-xs font-display font-semibold"
                      style={{color:C.lavender}}>Lv 1</div>
                  </div>
                  <div className="flex gap-1.5 flex-wrap">
                    {['Anime Fan','Collector','Taste Curator','Cyber Pop'].map((t,i)=>(
                      <TagChip key={t} label={t} color={[C.lavender,C.violet,'#A78BFA',C.lavender][i%4]}/>
                    ))}
                  </div>
                </div>
                <div className="p-5">
                  <div className="text-xs font-display font-semibold uppercase mb-3"
                    style={{color:C.muted,letterSpacing:'0.1em'}}>Starting Collection</div>
                  <div className="flex gap-3">
                    {[
                      {r:'epic' as const,     t:'Profile Charm',  gk:'neon-koi'},
                      {r:'legendary' as const,t:'Avatar Layer',   gk:'golden-halo'},
                      {r:'rare' as const,     t:'Profile Effect', gk:'pixel-rain'},
                      {r:'common' as const,   t:'Avatar Item',    gk:'night-bag'},
                    ].map((item,i)=>(
                      <ItemCard key={i} name="" type={item.t} rarity={item.r} gradientKey={item.gk} size="sm"/>
                    ))}
                  </div>
                  <div className="mt-4 h-1.5 rounded-full overflow-hidden" style={{background:'rgba(255,255,255,0.06)'}}>
                    <div className="h-full w-0 rounded-full"
                      style={{background:`linear-gradient(90deg,${C.plum},${C.violet})`}}/>
                  </div>
                  <p className="text-xs mt-1.5" style={{color:'rgba(161,161,170,0.5)'}}>Join a world to start earning XP</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── CULTURE WORLDS ── */}
      <section className="py-20 relative">
        <div className="orb w-72 h-72 top-0 right-0 opacity-15"
          style={{background:`radial-gradient(circle,${C.violet}22,transparent)`}}/>
        <div className="mirra-container">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full text-xs font-display font-semibold uppercase mb-4"
              style={{color:C.lavender,letterSpacing:'0.12em'}}>
              🌐 Weekly Worlds
            </div>
            <h2 className="mirra-headline-sm text-gradient-violet">Culture drops every week</h2>
            <p className="text-sm mt-2" style={{color:C.muted}}>Limited-time worlds hosted by creators you actually follow</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {worlds.slice(0,4).map(w=><WorldCard key={w.id} world={w}/>)}
          </div>
          <div className="text-center">
            <Link href="/worlds"
              className="inline-flex items-center gap-2 glass rounded-2xl px-6 py-3 text-sm font-display font-semibold transition-all hover:border-white/20"
              style={{color:C.lavender}}>
              Explore all worlds <ChevronRight size={14}/>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CREATOR DROPS ── */}
      <section className="py-20 relative">
        <div className="orb w-80 h-80 bottom-0 left-0 opacity-12"
          style={{background:`radial-gradient(circle,${C.violet}18,transparent)`}}/>
        <div className="mirra-container">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full text-xs font-display font-semibold uppercase mb-4"
              style={{color:C.lavender,letterSpacing:'0.12em'}}>
              ⚡ Creator Drops
            </div>
            <h2 className="mirra-headline-sm text-gradient-violet">Drops from creators you love</h2>
            <p className="text-sm mt-2" style={{color:C.muted}}>Limited identity items tied to your favourite creators</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            {drops.map(drop=>{
              const wg = WORLD_GRADIENTS[drop.gradientKey]||WORLD_GRADIENTS['tokyo-night-arcade'];
              return (
                <Link href="/drops" key={drop.id} className="glass-card rounded-3xl overflow-hidden hover:border-white/15 transition-all block">
                  <div className="h-24 relative flex items-end px-5 pb-3" style={{background:wg.bg}}>
                    <div className="absolute inset-0" style={{background:'rgba(0,0,0,0.3)'}}/>
                    <div className="relative z-10">
                      <div className="font-display font-bold text-base text-white">{drop.title}</div>
                      <div className="text-xs" style={{color:'rgba(255,255,255,0.6)'}}>by {drop.creatorName}</div>
                    </div>
                    <div className="absolute top-3 right-3 glass px-2 py-0.5 rounded-full text-xs font-display font-semibold"
                      style={{color:C.lavender}}>{drop.hoursLeft}h left</div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex gap-2">
                        {drop.items.slice(0,3).map((item,i)=>(
                          <ItemCard key={i} name={item.name} type={item.type} rarity={item.rarity} gradientKey={item.gradientKey} size="sm"/>
                        ))}
                      </div>
                      <div className="text-right">
                        <div className="font-display font-extrabold text-xl text-white">${drop.price.us}</div>
                        <div className="text-xs" style={{color:C.muted}}>{drop.claimedSlots} claimed</div>
                      </div>
                    </div>
                    <ProgressBar value={drop.claimedSlots} max={drop.totalSlots} color={C.violet} label="Spaces claimed"/>
                    <Link href="/checkout"
                      className="flex items-center justify-center gap-2 w-full mt-4 py-3 rounded-xl font-display font-bold text-sm text-white"
                      style={{background:`linear-gradient(135deg,${C.plum},${C.violet})`}}
                      onClick={e=>e.stopPropagation()}>
                      View bundle — ${drop.price.us}
                    </Link>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── COLLECTION ── */}
      <section className="py-20">
        <div className="mirra-container">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full text-xs font-display font-semibold uppercase mb-4"
              style={{color:C.lavender,letterSpacing:'0.12em'}}>
              ✦ Digital Collection
            </div>
            <h2 className="mirra-headline-sm text-gradient-violet">Items that live in your identity</h2>
            <p className="text-sm mt-2" style={{color:C.muted}}>Charms, badges, effects, avatar layers — yours forever</p>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3 mb-6">
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
              <div key={i} className="flex justify-center">
                <ItemCard name="" type={item.t} rarity={item.r} gradientKey={item.gk} size="md"/>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/collection"
              className="inline-flex items-center gap-2 glass rounded-2xl px-6 py-3 text-sm font-display font-semibold transition-all hover:border-white/20"
              style={{color:C.lavender}}>
              View your collection <ChevronRight size={14}/>
            </Link>
          </div>
        </div>
      </section>

      {/* ── REAL-WORLD PERKS ── */}
      <section className="py-20">
        <div className="mirra-container">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full text-xs font-display font-semibold uppercase mb-4"
              style={{color:C.lavender,letterSpacing:'0.12em'}}>
              <Gift size={10}/> Real-World Perks
            </div>
            <h2 className="mirra-headline-sm text-gradient-violet">Digital identity unlocks IRL rewards</h2>
            <p className="text-sm mt-2" style={{color:C.muted}}>Your digital world earns you real things</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {icon:<Ticket size={18}/>,title:'Matcha Café Discount',desc:'Tokyo Night Arcade members get 20% off at partner cafés in Japan',tag:'Japan · Food'},
              {icon:<ShoppingBag size={18}/>,title:'Festival Early Access',desc:'Festival Fit Lab world unlocks presale access to partner festivals in the UK',tag:'UK · Events'},
              {icon:<Gift size={18}/>,title:'Creator Merch First Look',desc:'Quest completers get first access to creator merchandise drops',tag:'US · Fashion'},
            ].map(perk=>(
              <div key={perk.title} className="glass-card rounded-2xl p-5 flex gap-4 items-start">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{background:`${C.violet}20`,border:`1px solid ${C.violet}30`,color:C.lavender}}>
                  {perk.icon}
                </div>
                <div>
                  <div className="font-display font-bold text-sm text-white mb-1">{perk.title}</div>
                  <p className="text-xs leading-relaxed mb-2" style={{color:C.muted}}>{perk.desc}</p>
                  <div className="text-xs font-display font-semibold" style={{color:C.muted}}>{perk.tag}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WAITLIST CTA ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="orb w-[500px] h-[500px] -bottom-40 left-1/2 -translate-x-1/2 opacity-25"
          style={{background:`radial-gradient(circle,${C.plum}28,transparent)`}}/>
        <div className="mirra-container-narrow text-center relative z-10">
          <div className="w-16 h-16 rounded-3xl flex items-center justify-center text-3xl mx-auto mb-6 float glow-violet"
            style={{background:`linear-gradient(135deg,${C.plum},${C.violet})`}}>
            ✦
          </div>
          <h2 className="mirra-headline-sm text-gradient-violet mb-4">
            Be first to enter<br/>the MIRRA season
          </h2>
          <p className="text-sm leading-relaxed mb-8" style={{color:C.muted}}>
            Founding members get early world access, an exclusive item pack, and a founding badge — never restocked.
          </p>
          <Link href="/waitlist"
            className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-display font-bold text-base text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{background:`linear-gradient(135deg,${C.plum},${C.violet})`,boxShadow:`0 8px 40px ${C.plum}55`}}>
            <Sparkles size={16}/> Join the waitlist
          </Link>
          <p className="text-xs mt-4" style={{color:C.subtle}}>Free to join · No spam · Founding member perks on launch</p>
        </div>
      </section>
    </div>
  );
}
