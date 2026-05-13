'use client';
import { useState } from 'react';
import { Check, Sparkles, DollarSign, Target, Zap, Gem, Users, BarChart3 } from 'lucide-react';
import { creatorBenefits as CB } from '@/lib/data';
import { C } from '@/components/ui';

const BENEFIT_ICONS = [DollarSign, Target, Zap, Gem, Users, BarChart3];

export default function CreatorsPage() {
  const [formData, setFormData] = useState({ name:'',handle:'',platform:'',followers:'',niche:'',country:'',email:'',pitch:'' });
  const [submitted, setSubmitted] = useState(false);
  function update(key: string, value: string) { setFormData(f=>({...f,[key]:value})); }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: Supabase — insert into creator_applications table
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Hero */}
      <div className="relative pt-24 pb-16 overflow-hidden">
        <div className="orb w-[400px] h-[400px] -top-20 -right-20 opacity-20"
          style={{background:`radial-gradient(circle,${C.plum}20,transparent)`}}/>
        <div className="orb w-72 h-72 bottom-0 -left-10 opacity-12"
          style={{background:`radial-gradient(circle,${C.violet}15,transparent)`}}/>
        <div className="mirra-container relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full text-xs font-display font-semibold mb-6"
              style={{color:C.lavender,letterSpacing:'0.12em'}}>
              🎤 Creator Programme — First Season
            </div>
            <h1 className="font-display font-extrabold text-white mb-4 leading-tight"
              style={{fontSize:'clamp(2rem,6vw,3.5rem)'}}>
              Build your world.<br/>
              <span className="text-gradient-violet">Get paid for your culture.</span>
            </h1>
            <p className="text-base leading-relaxed mb-7 max-w-lg" style={{color:C.muted}}>
              MIRRA lets you host exclusive culture worlds, launch digital identity drops,
              and build deeper fan relationships — while keeping 80% of revenue.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {['80% revenue share','$0 upfront','You keep your audience'].map((s,i)=>(
                <div key={i} className="glass px-3.5 py-2 rounded-full text-xs font-display font-semibold flex items-center gap-1.5"
                  style={{color:[C.lavender,C.violet,'#A78BFA'][i]}}>
                  <Check size={10}/> {s}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mirra-container">
        {/* Benefits grid */}
        <div className="text-xs font-display font-semibold uppercase text-center mb-6"
          style={{color:C.muted,letterSpacing:'0.1em'}}>Why creators join MIRRA</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {CB.map((b, i)=>{
            const Icon = BENEFIT_ICONS[i] || Sparkles;
            return (
              <div key={b.title} className="glass-card rounded-2xl p-5 hover:border-white/15 transition-all">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{background:`${C.violet}20`,border:`1px solid ${C.violet}30`,color:C.lavender}}>
                  <Icon size={18}/>
                </div>
                <div className="font-display font-bold text-sm text-white mb-1.5">{b.title}</div>
                <p className="text-xs leading-relaxed" style={{color:C.muted}}>{b.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Revenue illustration */}
        <div className="glass-card rounded-2xl p-6 mb-12 max-w-lg mx-auto lg:mx-0">
          <div className="text-xs font-display font-semibold uppercase mb-1"
            style={{color:C.muted,letterSpacing:'0.1em'}}>Example drop scenario</div>
          <p className="text-xs mb-5" style={{color:'rgba(161,161,170,0.6)'}}>
            Illustrative only. Actual results depend on audience size, pricing, conversion, fees, taxes, and market.
          </p>
          <div className="rounded-2xl p-4 mb-4" style={{background:`${C.plum}15`,border:`1px solid ${C.violet}25`}}>
            <div className="font-display font-bold text-sm text-white mb-3">
              500 fans × $4.99 drop × 80% creator share
            </div>
            <div className="flex items-end gap-2 mb-3">
              <div className="font-display font-extrabold text-3xl text-gradient-violet">~$1,996</div>
              <div className="text-xs pb-1" style={{color:C.muted}}>before fees &amp; taxes</div>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{background:'rgba(255,255,255,0.06)'}}>
              <div className="h-full rounded-full" style={{width:'88%',background:`linear-gradient(90deg,${C.plum},${C.violet})`}}/>
            </div>
          </div>
          <div className="space-y-2 text-xs" style={{color:C.muted}}>
            {[
              'Potential revenue from a single 500-fan paid drop at $4.99',
              'MIRRA creator share: 80% of net revenue after PayPal processing fees',
              'Designed to help creators turn fan participation into paid digital experiences',
            ].map((t,i)=>(
              <div key={i} className="flex items-start gap-2">
                <span className="flex-shrink-0">•</span><span>{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Application form */}
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-6">
            <h2 className="mirra-headline-sm text-gradient-violet mb-2">Apply for founding creator access</h2>
            <p className="text-sm" style={{color:C.muted}}>We're onboarding creators for our first culture season</p>
          </div>

          {submitted ? (
            <div className="glass-card rounded-3xl p-10 text-center glow-violet">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 float"
                style={{background:`linear-gradient(135deg,${C.plum},${C.violet})`}}>✦</div>
              <div className="font-display font-extrabold text-xl text-white mb-2">Application received!</div>
              <p className="text-sm leading-relaxed" style={{color:C.muted}}>
                We're reviewing founding creator applications for the first culture season.
                We'll be in touch by email.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-6 space-y-4">
              {[
                {key:'name',   label:'Your name',      placeholder:'Jade Williams',    type:'text'},
                {key:'handle', label:'Primary handle', placeholder:'@jadewilliams',    type:'text'},
                {key:'email',  label:'Email address',  placeholder:'jade@example.com', type:'email'},
              ].map(f=>(
                <div key={f.key}>
                  <label className="block text-xs font-display font-semibold mb-1.5"
                    style={{color:C.muted,letterSpacing:'0.05em'}}>{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder} required
                    value={formData[f.key as keyof typeof formData]}
                    onChange={e=>update(f.key,e.target.value)}
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                    style={{background:'rgba(196,181,253,0.04)',border:'1px solid rgba(196,181,253,0.1)',color:C.pearl,fontFamily:'DM Sans'}}/>
                </div>
              ))}
              {[
                {key:'platform', label:'Main platform',  opts:['TikTok','YouTube','Instagram','Twitch','Twitter / X']},
                {key:'followers',label:'Follower count', opts:['1K–10K','10K–100K','100K–1M','1M+']},
                {key:'country',  label:'Country',        opts:['🇺🇸 United States','🇬🇧 United Kingdom','🇯🇵 Japan','Other']},
              ].map(f=>(
                <div key={f.key}>
                  <label className="block text-xs font-display font-semibold mb-1.5"
                    style={{color:C.muted,letterSpacing:'0.05em'}}>{f.label}</label>
                  <select value={formData[f.key as keyof typeof formData]}
                    onChange={e=>update(f.key,e.target.value)}
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none appearance-none"
                    style={{background:'rgba(196,181,253,0.04)',border:'1px solid rgba(196,181,253,0.1)',color:formData[f.key as keyof typeof formData]?C.pearl:C.muted,fontFamily:'DM Sans'}}>
                    <option value="" style={{background:'#11101A'}}>Select…</option>
                    {f.opts.map(o=><option key={o} value={o} style={{background:'#11101A'}}>{o}</option>)}
                  </select>
                </div>
              ))}
              <div>
                <label className="block text-xs font-display font-semibold mb-1.5"
                  style={{color:C.muted,letterSpacing:'0.05em'}}>Your niche / content type</label>
                <input type="text" placeholder="e.g. anime reviews, fashion hauls, gaming"
                  value={formData.niche} onChange={e=>update('niche',e.target.value)}
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none"
                  style={{background:'rgba(196,181,253,0.04)',border:'1px solid rgba(196,181,253,0.1)',color:C.pearl,fontFamily:'DM Sans'}}/>
              </div>
              <div>
                <label className="block text-xs font-display font-semibold mb-1.5"
                  style={{color:C.muted,letterSpacing:'0.05em'}}>Why do you want to create on MIRRA?</label>
                <textarea rows={3} placeholder="Tell us about your community and what world you'd build…"
                  value={formData.pitch} onChange={e=>update('pitch',e.target.value)}
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none"
                  style={{background:'rgba(196,181,253,0.04)',border:'1px solid rgba(196,181,253,0.1)',color:C.pearl,fontFamily:'DM Sans'}}/>
              </div>
              <button type="submit"
                className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-display font-bold text-base text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{background:`linear-gradient(135deg,${C.plum},${C.violet})`,boxShadow:`0 8px 32px ${C.plum}50`}}>
                <Sparkles size={16}/> Apply for founding creator access
              </button>
              <p className="text-xs text-center" style={{color:C.subtle}}>
                We're reviewing founding creator applications — limited spots for first season
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
