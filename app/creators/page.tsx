'use client';
import { useState } from 'react';
import { Check, Sparkles } from 'lucide-react';
import { creatorBenefits as CB } from '@/lib/data';
import { C } from '@/components/ui';

export default function CreatorsPage() {
  const [formData, setFormData] = useState({
    name:'', handle:'', platform:'', followers:'', niche:'', country:'', email:'', pitch:''
  });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: connect to Supabase — insert into creator_applications table
    // Fields: name, handle, platform, followers_range, niche, country, email, pitch, status='pending', created_at
    setSubmitted(true);
  }

  function update(key: string, value: string) {
    setFormData(f => ({ ...f, [key]: value }));
  }

  return (
    <div className="min-h-screen pb-16">
      {/* Hero */}
      <div className="relative pt-24 pb-14 px-4 overflow-hidden">
        <div className="orb w-96 h-96 -top-20 -right-20 opacity-25"
          style={{background:`radial-gradient(circle,${C.plum}18,transparent)`}}/>
        <div className="orb w-72 h-72 bottom-0 -left-10 opacity-15"
          style={{background:`radial-gradient(circle,${C.violet}15,transparent)`}}/>
        <div className="max-w-sm mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full text-xs font-display font-semibold mb-6"
            style={{color:C.lavender,letterSpacing:'0.12em'}}>
            🎤 Creator Programme — First Season
          </div>
          <h1 className="font-display font-extrabold text-3xl text-white mb-4 leading-tight">
            Build your world.<br/>
            <span className="text-gradient-violet">Get paid for your culture.</span>
          </h1>
          <p className="text-sm leading-relaxed mb-7" style={{color:C.muted}}>
            MIRRA lets you host exclusive culture worlds, launch digital identity drops,
            and build deeper fan relationships — while keeping 80% of revenue.
          </p>
          <div className="flex gap-2.5 justify-center flex-wrap">
            {['80% revenue share','$0 upfront','You keep your audience'].map((s,i)=>(
              <div key={i} className="glass px-3 py-1.5 rounded-full text-xs font-display font-semibold flex items-center gap-1.5"
                style={{color:[C.lavender, C.violet, '#A78BFA'][i]}}>
                <Check size={10}/> {s}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 pb-10 max-w-sm mx-auto">
        {/* Benefits */}
        <div className="text-xs font-display font-semibold uppercase text-center mb-5"
          style={{color:C.muted,letterSpacing:'0.1em'}}>Why creators join MIRRA</div>
        <div className="grid grid-cols-1 gap-3 mb-10">
          {CB.map(b=>(
            <div key={b.title} className="glass-card rounded-2xl p-4 flex gap-4 items-start hover:border-white/15 transition-all">
              <div className="text-2xl flex-shrink-0">{b.icon}</div>
              <div>
                <div className="font-display font-bold text-sm text-white mb-0.5">{b.title}</div>
                <p className="text-xs leading-relaxed" style={{color:C.muted}}>{b.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Revenue illustration — MIRRA-only, clearly marked */}
        <div className="glass-card rounded-2xl p-5 mb-8">
          <div className="text-xs font-display font-semibold uppercase mb-1"
            style={{color:C.muted,letterSpacing:'0.1em'}}>Example drop scenario</div>
          <p className="text-xs mb-5" style={{color:'rgba(161,161,170,0.6)'}}>
            Illustrative only. Actual results depend on audience size, pricing, conversion,
            refunds, fees, taxes, and market.
          </p>

          {/* Single illustrative scenario */}
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

          <div className="space-y-2 text-xs" style={{color:C.muted,fontFamily:'DM Sans'}}>
            <div className="flex items-start gap-2">
              <span className="flex-shrink-0">•</span>
              <span>Potential revenue from a single 500-fan paid drop at $4.99</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="flex-shrink-0">•</span>
              <span>MIRRA creator share: 80% of net revenue after PayPal processing fees</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="flex-shrink-0">•</span>
              <span>Designed to help creators turn fan participation into paid digital experiences</span>
            </div>
          </div>
        </div>

        {/* Application form */}
        <div className="text-center mb-5">
          <h2 className="font-display font-extrabold text-xl text-gradient-violet mb-2">
            Apply for founding creator access
          </h2>
          <p className="text-sm" style={{color:C.muted}}>
            We're onboarding creators for our first culture season
          </p>
        </div>

        {submitted ? (
          <div className="glass-card rounded-3xl p-8 text-center glow-violet">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 float"
              style={{background:`linear-gradient(135deg,${C.plum},${C.violet})`}}>
              ✦
            </div>
            <div className="font-display font-extrabold text-xl text-white mb-2">Application received!</div>
            <p className="text-sm leading-relaxed" style={{color:C.muted}}>
              We're reviewing founding creator applications for the first culture season.
              We'll be in touch by email.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-5 space-y-4">
            {[
              {key:'name',    label:'Your name',         placeholder:'Jade Williams',              type:'text'},
              {key:'handle',  label:'Primary handle',    placeholder:'@jadewilliams',              type:'text'},
              {key:'email',   label:'Email address',     placeholder:'jade@example.com',           type:'email'},
            ].map(f=>(
              <div key={f.key}>
                <label className="block text-xs font-display font-semibold mb-1.5"
                  style={{color:C.muted,letterSpacing:'0.05em'}}>{f.label}</label>
                <input type={f.type} placeholder={f.placeholder} required
                  value={formData[f.key as keyof typeof formData]}
                  onChange={e=>update(f.key,e.target.value)}
                  className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none transition-all"
                  style={{
                    background:'rgba(196,181,253,0.04)',
                    border:'1px solid rgba(196,181,253,0.1)',
                    fontFamily:'DM Sans',
                    color:C.pearl,
                  }}/>
              </div>
            ))}
            {[
              {key:'platform', label:'Main platform',   opts:['TikTok','YouTube','Instagram','Twitch','Twitter / X']},
              {key:'followers',label:'Follower count',  opts:['1K–10K','10K–100K','100K–1M','1M+']},
              {key:'country',  label:'Country',         opts:['🇺🇸 United States','🇬🇧 United Kingdom','🇯🇵 Japan','Other']},
            ].map(f=>(
              <div key={f.key}>
                <label className="block text-xs font-display font-semibold mb-1.5"
                  style={{color:C.muted,letterSpacing:'0.05em'}}>{f.label}</label>
                <select value={formData[f.key as keyof typeof formData]}
                  onChange={e=>update(f.key,e.target.value)}
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none appearance-none"
                  style={{
                    background:'rgba(196,181,253,0.04)',
                    border:'1px solid rgba(196,181,253,0.1)',
                    fontFamily:'DM Sans',
                    color:formData[f.key as keyof typeof formData]?C.pearl:C.muted,
                  }}>
                  <option value="" style={{background:'#11101A'}}>Select…</option>
                  {f.opts.map(o=>(
                    <option key={o} value={o} style={{background:'#11101A'}}>{o}</option>
                  ))}
                </select>
              </div>
            ))}
            <div>
              <label className="block text-xs font-display font-semibold mb-1.5"
                style={{color:C.muted,letterSpacing:'0.05em'}}>Your niche / content type</label>
              <input type="text" placeholder="e.g. anime reviews, fashion hauls, gaming"
                value={formData.niche} onChange={e=>update('niche',e.target.value)}
                className="w-full rounded-xl px-4 py-3 text-sm outline-none"
                style={{background:'rgba(196,181,253,0.04)',border:'1px solid rgba(196,181,253,0.1)',fontFamily:'DM Sans',color:C.pearl}}/>
            </div>
            <div>
              <label className="block text-xs font-display font-semibold mb-1.5"
                style={{color:C.muted,letterSpacing:'0.05em'}}>Why do you want to create on MIRRA?</label>
              <textarea rows={3} placeholder="Tell us about your community and what world you'd build…"
                value={formData.pitch} onChange={e=>update('pitch',e.target.value)}
                className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none"
                style={{background:'rgba(196,181,253,0.04)',border:'1px solid rgba(196,181,253,0.1)',fontFamily:'DM Sans',color:C.pearl}}/>
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
  );
}
