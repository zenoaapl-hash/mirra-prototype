'use client';
import { useState } from 'react';
import { Check, Sparkles, Gamepad2, Shirt, Sparkles as SparklesIcon, BookOpen, Music, Video, Coffee, Calendar, Crown, Zap, Star, Lock } from 'lucide-react';
import { C } from '@/components/ui';

const INTEREST_TAGS = [
  { id:'gaming',   label:'Gaming',   Icon: Gamepad2,      color:'#818CF8' },
  { id:'fashion',  label:'Fashion',  Icon: Shirt,         color:'#C4B5FD' },
  { id:'beauty',   label:'Beauty',   Icon: SparklesIcon,  color:'#A78BFA' },
  { id:'anime',    label:'Anime',    Icon: BookOpen,      color:'#8B5CF6' },
  { id:'music',    label:'Music',    Icon: Music,         color:'#A78BFA' },
  { id:'creators', label:'Creators', Icon: Video,         color:'#C4B5FD' },
  { id:'food',     label:'Food',     Icon: Coffee,        color:'#818CF8' },
  { id:'events',   label:'Events',   Icon: Calendar,      color:'#8B5CF6' },
];

const PERKS = [
  { Icon: Crown, text: 'Season 01 founding badge — available during the first culture season' },
  { Icon: Zap,   text: 'First access to every new culture world' },
  { Icon: Star,  text: 'Free starter identity item pack on launch' },
  { Icon: Check, text: 'Shape the platform through early feedback access' },
  { Icon: Lock,  text: 'Founding member pricing locked in' },
];

export default function WaitlistPage() {
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [code] = useState('MIRRA-'+Math.random().toString(36).slice(2,8).toUpperCase());

  function toggleInterest(id: string) {
    setInterests(p => p.includes(id) ? p.filter(i => i !== id) : [...p, id]);
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: Supabase — upsert into waitlist table on email conflict
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen pb-20 relative overflow-hidden">
      <div className="orb w-[400px] h-[400px] top-0 left-1/2 -translate-x-1/2 opacity-20"
        style={{background:`radial-gradient(circle,${C.plum}22,transparent)`}}/>
      <div className="orb w-72 h-72 bottom-20 -right-10 opacity-12"
        style={{background:`radial-gradient(circle,${C.violet}15,transparent)`}}/>

      <div className="mirra-container-narrow pt-24 pb-8 relative z-10">
        {/* Hero */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-5 float glow-violet"
            style={{background:`linear-gradient(135deg,${C.plum},${C.violet})`}}>
            <Star size={28} className="text-white opacity-90"/>
          </div>
          <div className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full text-xs font-display font-semibold mb-4"
            style={{color:C.lavender,letterSpacing:'0.12em'}}>
            <Crown size={10} style={{color:C.lavender}}/> Founding Member Access
          </div>
          <h1 className="font-display font-extrabold text-white mb-3 leading-tight"
            style={{fontSize:'clamp(1.8rem,6vw,2.8rem)'}}>
            Be first to enter<br/>
            <span className="text-gradient-violet">the first culture season.</span>
          </h1>
          <p className="text-sm leading-relaxed" style={{color:C.muted}}>
            Founding members get early world access, a free starter identity item pack,
            and a Season 01 founding badge.
          </p>
        </div>

        {/* Perks */}
        <div className="glass-card rounded-2xl p-5 mb-7">
          <div className="text-xs font-display font-semibold uppercase mb-4"
            style={{color:C.muted,letterSpacing:'0.1em'}}>Founding member perks</div>
          <div className="space-y-3">
            {PERKS.map(({Icon, text}) => (
              <div key={text} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{background:`${C.violet}20`,border:`1px solid ${C.violet}25`,color:C.lavender}}>
                  <Icon size={13}/>
                </div>
                <span className="text-xs leading-relaxed" style={{color:'#D1D5DB'}}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Status pill */}
        <div className="flex items-center justify-center gap-2 mb-8 glass px-4 py-2.5 rounded-full">
          <div className="w-2 h-2 rounded-full pulse-glow" style={{background:C.violet}}/>
          <p className="text-xs" style={{color:C.muted,fontFamily:'DM Sans'}}>
            Early access pilot now forming — join the first culture season
          </p>
        </div>

        {/* Form / Success */}
        {submitted ? (
          <div className="glass-card rounded-3xl p-8 text-center glow-violet">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 float"
              style={{background:`linear-gradient(135deg,${C.plum},${C.violet})`}}>
              <Star size={28} className="text-white"/>
            </div>
            <div className="font-display font-extrabold text-2xl text-white mb-2">You're in!</div>
            <p className="text-sm leading-relaxed mb-6" style={{color:C.muted}}>
              Welcome to the MIRRA founding community. We'll notify you the moment early access opens.
            </p>
            <div className="glass-card rounded-xl p-4 mb-4">
              <div className="text-xs font-display font-semibold uppercase mb-2"
                style={{color:C.muted,letterSpacing:'0.1em'}}>Your referral code</div>
              <div className="font-display font-extrabold text-lg text-gradient-violet">{code}</div>
              <p className="text-xs mt-1" style={{color:C.muted}}>Share to unlock bonus identity items on launch day</p>
            </div>
            <button
              onClick={()=>navigator.clipboard?.writeText(`Join MIRRA — use my code ${code}: https://mirra-prototype.vercel.app/waitlist`)}
              className="w-full py-3 rounded-xl text-sm font-display font-bold text-white"
              style={{background:`linear-gradient(135deg,${C.plum},${C.violet})`}}>
              Copy invite link
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-display font-semibold mb-1.5" style={{color:C.muted}}>
                Email address
              </label>
              <input type="email" required placeholder="you@example.com"
                value={email} onChange={e=>setEmail(e.target.value)}
                className="w-full rounded-xl px-4 py-3.5 text-sm outline-none"
                style={{background:'rgba(196,181,253,0.04)',border:'1px solid rgba(196,181,253,0.1)',fontFamily:'DM Sans',color:C.pearl}}/>
            </div>

            <div>
              <label className="block text-xs font-display font-semibold mb-2" style={{color:C.muted}}>
                Where are you based?
              </label>
              <div className="flex gap-2">
                {[{v:'us',f:'🇺🇸',l:'US'},{v:'uk',f:'🇬🇧',l:'UK'},{v:'jp',f:'🇯🇵',l:'Japan'}].map(c=>(
                  <button type="button" key={c.v} onClick={()=>setCountry(c.v)}
                    className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl font-display font-semibold transition-all"
                    style={{
                      background:country===c.v?`linear-gradient(135deg,${C.plum},${C.violet})`:'rgba(196,181,253,0.04)',
                      border:`1px solid ${country===c.v?'transparent':'rgba(196,181,253,0.1)'}`,
                      color:country===c.v?'#fff':C.muted,
                      fontSize:'13px',
                    }}>
                    <span className="text-xl">{c.f}</span>
                    <span>{c.l}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-display font-semibold mb-2.5" style={{color:C.muted}}>
                I'm into… <span style={{color:C.subtle}}>(pick all that apply)</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {INTEREST_TAGS.map(({id, label, Icon, color})=>{
                  const active = interests.includes(id);
                  return (
                    <button type="button" key={id} onClick={()=>toggleInterest(id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-display font-semibold transition-all"
                      style={{
                        background:active?`${color}20`:'rgba(196,181,253,0.04)',
                        border:`1px solid ${active?color+'50':'rgba(196,181,253,0.1)'}`,
                        color:active?color:C.muted,
                      }}>
                      <Icon size={11}/>
                      {label}
                      {active && <Check size={10}/>}
                    </button>
                  );
                })}
              </div>
            </div>

            <button type="submit"
              className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-display font-extrabold text-base text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{background:`linear-gradient(135deg,${C.plum},${C.violet})`,boxShadow:`0 8px 40px ${C.plum}55`}}>
              <Sparkles size={16}/> Join the founding waitlist
            </button>
            <p className="text-xs text-center" style={{color:C.subtle}}>
              No spam ever · Founding member perks on launch · Free to join
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
