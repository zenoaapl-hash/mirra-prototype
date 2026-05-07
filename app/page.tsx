'use client';
import Link from 'next/link';
import { Sparkles, Zap, ArrowRight, Globe, Star, ChevronRight } from 'lucide-react';
import { worlds, drops } from '@/lib/data';
import { WorldCard, TagChip, Avatar, ItemCard, ProgressBar } from '@/components/ui';

export default function Home() {
  return (
    <div className="relative">
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-16 overflow-hidden">
        {/* Background orbs */}
        <div className="orb w-80 h-80 -top-20 -left-20" style={{background:'radial-gradient(circle,#c084fc22,transparent)'}}/>
        <div className="orb w-96 h-96 -bottom-20 -right-10" style={{background:'radial-gradient(circle,#34d39922,transparent)'}}/>
        <div className="orb w-64 h-64 top-40 right-10" style={{background:'radial-gradient(circle,#f472b615,transparent)'}}/>

        {/* Eyebrow */}
        <div className="glass inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-display uppercase tracking-widest mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700"
          style={{color:'#c084fc',letterSpacing:'0.14em'}}>
          <div className="w-1.5 h-1.5 rounded-full bg-[#34d399] pulse-glow"/>
          Now entering early access
        </div>

        {/* Headline */}
        <h1 className="font-display font-800 text-center leading-[0.95] mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          <span className="block text-5xl sm:text-6xl text-gradient-aurora">Your identity</span>
          <span className="block text-4xl sm:text-5xl text-white mt-1">is your</span>
          <span className="block text-5xl sm:text-6xl text-gradient-sakura mt-1">culture drop</span>
        </h1>

        <p className="text-center text-[#9ca3af] text-base sm:text-lg font-body leading-relaxed max-w-sm mb-10 animate-in fade-in duration-700 delay-200">
          MIRRA is where Gen Z builds a living digital identity — through creator worlds, quests, and collectibles that actually mean something.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs animate-in fade-in duration-700 delay-300">
          <Link href="/quiz" className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-display font-700 text-sm text-white transition-all hover:scale-105 active:scale-95"
            style={{background:'linear-gradient(135deg,#c084fc,#818cf8)',boxShadow:'0 8px 32px rgba(192,132,252,0.35)'}}>
            <Sparkles size={16}/>
            Create your MIRRA Self
          </Link>
          <Link href="/waitlist" className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-display font-700 text-sm text-[#c084fc] glass border border-[#c084fc]/30 hover:border-[#c084fc]/60 transition-all">
            Join waitlist
            <ArrowRight size={14}/>
          </Link>
        </div>

        {/* Social proof */}
        <div className="mt-8 flex items-center gap-3 animate-in fade-in duration-700 delay-500">
          <div className="flex -space-x-2">
            {['MK','TY','JW','PL','HY'].map((i,idx)=>(
              <div key={i} className="w-7 h-7 rounded-full border border-[#050508] flex items-center justify-center text-xs font-display font-700"
                style={{background:`linear-gradient(135deg,${['#c084fc','#f472b6','#fbbf24','#34d399','#818cf8'][idx]},${['#818cf8','#c084fc','#f472b6','#818cf8','#34d399'][idx]})`}}>
                {i}
              </div>
            ))}
          </div>
          <p className="text-xs text-[#6b7280] font-body">
            <span className="text-white font-500">12,000+</span> founding members waiting
          </p>
        </div>

        {/* Hero product preview */}
        <div className="mt-14 w-full max-w-sm glass rounded-3xl overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-500 glow-aurora">
          <div className="bg-gradient-to-br from-[#c084fc22] via-[#818cf822] to-[#34d39922] p-5 border-b border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#c084fc] to-[#34d399] flex items-center justify-center text-2xl">
                ✨
              </div>
              <div>
                <div className="font-display font-700 text-sm text-white">Yuki's MIRRA Self</div>
                <div className="text-[#9ca3af] text-xs font-body">Cyber Pop · Japan · Collector</div>
              </div>
              <div className="ml-auto glass px-2 py-1 rounded-full text-xs font-display" style={{color:'#34d399'}}>Lv 12</div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {['anime','cyber','collector','japan','gaming'].map(t=>(
                <TagChip key={t} label={t} color={{'anime':'#c084fc','cyber':'#818cf8','collector':'#34d399','japan':'#f472b6','gaming':'#fbbf24'}[t]||'#c084fc'}/>
              ))}
            </div>
          </div>
          <div className="p-4">
            <div className="text-xs font-display uppercase tracking-widest text-[#6b7280] mb-3" style={{letterSpacing:'0.1em'}}>Current Collection</div>
            <div className="flex gap-2">
              {[
                {g:'from-[#c084fc] to-[#34d399]',r:'epic',t:'Profile Charm'},
                {g:'from-[#fbbf24] to-[#f59e0b]',r:'legendary',t:'Avatar Layer'},
                {g:'from-[#818cf8] to-[#c084fc]',r:'rare',t:'Profile Effect'},
                {g:'from-[#374151] to-[#6b7280]',r:'common',t:'Avatar Item'},
              ].map((item,i)=>(
                <ItemCard key={i} name="" type={item.t} rarity={item.r as any} gradient={item.g} size="sm"/>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CULTURE WORLDS ── */}
      <section className="px-4 py-16 relative">
        <div className="orb w-72 h-72 top-0 right-0 opacity-30" style={{background:'radial-gradient(circle,#818cf820,transparent)'}}/>
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full text-xs font-display uppercase mb-4"
              style={{color:'#818cf8',letterSpacing:'0.12em'}}>
              <Globe size={10}/> Weekly Worlds
            </div>
            <h2 className="font-display font-800 text-2xl text-gradient-aurora">Culture drops every week</h2>
            <p className="text-[#9ca3af] text-sm mt-2 font-body">Limited-time worlds hosted by creators you actually follow</p>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {worlds.slice(0,4).map(w => <WorldCard key={w.id} world={w}/>)}
          </div>
          <Link href="/worlds" className="flex items-center justify-center gap-2 glass rounded-2xl py-3.5 text-sm font-display font-600 text-[#c084fc] hover:border-[#c084fc]/40 transition-all w-full">
            Explore all worlds
            <ChevronRight size={14}/>
          </Link>
        </div>
      </section>

      {/* ── CREATOR DROPS ── */}
      <section className="px-4 py-16 relative">
        <div className="orb w-80 h-80 bottom-0 left-0 opacity-20" style={{background:'radial-gradient(circle,#f472b825,transparent)'}}/>
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full text-xs font-display uppercase mb-4"
              style={{color:'#f472b6',letterSpacing:'0.12em'}}>
              <Zap size={10}/> Creator Drops
            </div>
            <h2 className="font-display font-800 text-2xl text-gradient-sakura">Drops from creators you love</h2>
            <p className="text-[#9ca3af] text-sm mt-2 font-body">Limited identity items tied to your favourite creators</p>
          </div>
          {drops.map(drop => (
            <Link href="/drops" key={drop.id} className="block glass rounded-3xl overflow-hidden mb-4 hover:border-white/15 transition-all">
              <div className={`h-24 bg-gradient-to-br ${drop.gradient} relative flex items-center px-5`}>
                <div className="absolute inset-0 bg-black/20"/>
                <div className="relative z-10">
                  <div className="font-display font-800 text-lg text-white">{drop.title}</div>
                  <div className="text-white/70 text-sm font-body">by {drop.creator}</div>
                </div>
                <div className="absolute top-3 right-3 glass px-2 py-0.5 rounded-full text-xs font-display"
                  style={{color:'#fbbf24'}}>
                  {drop.hoursLeft}h left
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex gap-2">
                    {drop.items.slice(0,3).map((item,i)=>(
                      <ItemCard key={i} name={item.name} type={item.type} rarity={item.rarity} gradient={item.gradient} size="sm"/>
                    ))}
                  </div>
                  <div className="text-right">
                    <div className="font-display font-800 text-lg text-white">${drop.price.us}</div>
                    <div className="text-[#6b7280] text-xs font-body">{drop.claimedSlots.toLocaleString()} claimed</div>
                  </div>
                </div>
                <ProgressBar value={drop.claimedSlots} max={drop.totalSlots} color="#f472b6" label="Slots claimed"/>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── COLLECTION ── */}
      <section className="px-4 py-16">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full text-xs font-display uppercase mb-4"
              style={{color:'#34d399',letterSpacing:'0.12em'}}>
              <Star size={10}/> Digital Collection
            </div>
            <h2 className="font-display font-800 text-2xl text-gradient-aurora">Items that live in your identity</h2>
            <p className="text-[#9ca3af] text-sm mt-2 font-body">Charms, badges, effects, and avatar layers — yours forever</p>
          </div>
          <div className="grid grid-cols-4 gap-3 mb-6">
            {[
              {g:'from-[#c084fc] to-[#34d399]',r:'epic',t:'Profile Charm'},
              {g:'from-[#fbbf24] to-[#f59e0b]',r:'legendary',t:'Avatar Layer'},
              {g:'from-[#f472b6] to-[#c084fc]',r:'epic',t:'Identity Badge'},
              {g:'from-[#818cf8] to-[#34d399]',r:'rare',t:'Profile Effect'},
              {g:'from-[#374151] to-[#c084fc]',r:'common',t:'Room Object'},
              {g:'from-[#a3e635] to-[#34d399]',r:'common',t:'Profile Effect'},
              {g:'from-[#818cf8] to-[#c084fc]',r:'rare',t:'Avatar Item'},
              {g:'from-[#f472b6] to-[#818cf8]',r:'rare',t:'Profile Charm'},
            ].map((item,i)=>(
              <ItemCard key={i} name="" type={item.t} rarity={item.r as any} gradient={item.g} size="md"/>
            ))}
          </div>
          <Link href="/collection" className="flex items-center justify-center gap-2 glass rounded-2xl py-3.5 text-sm font-display font-600 text-[#34d399] hover:border-[#34d399]/40 transition-all w-full">
            View your collection
            <ChevronRight size={14}/>
          </Link>
        </div>
      </section>

      {/* ── REAL-WORLD PERKS ── */}
      <section className="px-4 py-16">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full text-xs font-display uppercase mb-4"
              style={{color:'#fbbf24',letterSpacing:'0.12em'}}>
              🎁 Real-World Perks
            </div>
            <h2 className="font-display font-800 text-2xl text-gradient-solar">Digital unlocks IRL rewards</h2>
            <p className="text-[#9ca3af] text-sm mt-2 font-body">Your digital identity earns you real things in the real world</p>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {[
              {emoji:'🍵',title:'Matcha Café Discount',desc:'Tokyo Night Arcade members get 20% off at partner cafés in Japan',tag:'Japan · Food'},
              {emoji:'🎟️',title:'Festival Early Access',desc:'Festival Fit Lab world unlocks presale access to partner festivals in the UK',tag:'UK · Events'},
              {emoji:'👟',title:'Creator Merch First Look',desc:'Fan quest completers get first access to creator merchandise drops',tag:'US · Fashion'},
            ].map(perk=>(
              <div key={perk.title} className="glass rounded-2xl p-4 flex gap-4 items-start hover:border-white/15 transition-all">
                <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-2xl flex-shrink-0">
                  {perk.emoji}
                </div>
                <div>
                  <div className="font-display font-700 text-sm text-white mb-0.5">{perk.title}</div>
                  <p className="text-[#9ca3af] text-xs font-body leading-relaxed">{perk.desc}</p>
                  <div className="text-[#fbbf24] text-xs mt-2 font-display">{perk.tag}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WAITLIST CTA ── */}
      <section className="px-4 py-20 relative overflow-hidden">
        <div className="orb w-96 h-96 -bottom-20 left-1/2 -translate-x-1/2" style={{background:'radial-gradient(circle,#c084fc20,transparent)'}}/>
        <div className="max-w-sm mx-auto text-center relative z-10">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-[#c084fc] to-[#818cf8] flex items-center justify-center text-3xl mx-auto mb-6 glow-aurora float">
            ✨
          </div>
          <h2 className="font-display font-800 text-3xl text-gradient-aurora mb-4 leading-tight">
            Become a founding member
          </h2>
          <p className="text-[#9ca3af] text-sm font-body leading-relaxed mb-8">
            Join 12,000+ founding members and get early access to the first culture worlds before anyone else.
          </p>
          <Link href="/waitlist"
            className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-display font-700 text-base text-white hover:scale-105 transition-all active:scale-95"
            style={{background:'linear-gradient(135deg,#c084fc,#818cf8,#34d399)',boxShadow:'0 8px 40px rgba(192,132,252,0.4)'}}>
            <Sparkles size={16}/>
            Join the waitlist
          </Link>
          <p className="text-[#4b5563] text-xs mt-4 font-body">Free to join · No spam · Founding member perks</p>
        </div>
      </section>
    </div>
  );
}
