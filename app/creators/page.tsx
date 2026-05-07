'use client';
import { useState } from 'react';
import { Check, Sparkles, ChevronRight, Users, Zap, BarChart3 } from 'lucide-react';
import { creatorBenefits } from '@/lib/data';

export default function CreatorsPage() {
  const [formData, setFormData] = useState({
    name: '', handle: '', platform: '', followers: '', niche: '', country: '', email: '', pitch: ''
  });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: connect to Supabase — insert into creator_applications table
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen pb-16">
      {/* Hero */}
      <div className="relative pt-24 pb-16 px-4 overflow-hidden">
        <div className="orb w-96 h-96 -top-20 -right-20 opacity-30"
          style={{background:'radial-gradient(circle,#f472b825,transparent)'}}/>
        <div className="orb w-72 h-72 bottom-0 -left-10 opacity-20"
          style={{background:'radial-gradient(circle,#c084fc20,transparent)'}}/>

        <div className="max-w-sm mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full text-xs font-display mb-6"
            style={{color:'#f472b6',letterSpacing:'0.12em'}}>
            🎤 Creator Program
          </div>
          <h1 className="font-display font-800 text-3xl text-white mb-4 leading-tight">
            Build your world.<br/>
            <span className="text-gradient-sakura">Get paid for your culture.</span>
          </h1>
          <p className="text-[#9ca3af] text-sm font-body leading-relaxed mb-8">
            MIRRA lets you host exclusive culture worlds, launch digital identity drops, and build deeper fan relationships — while keeping 80% of revenue.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            {['847K fans', '80% revenue share', '$0 upfront'].map((s, i) => (
              <div key={i} className="glass px-3 py-1.5 rounded-full text-xs font-display"
                style={{color:['#c084fc','#34d399','#fbbf24'][i]}}>
                ✓ {s}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="px-4 pb-12 max-w-sm mx-auto">
        <div className="text-xs font-display uppercase tracking-widest text-center text-[#6b7280] mb-6"
          style={{letterSpacing:'0.1em'}}>Why creators love MIRRA</div>
        <div className="grid grid-cols-1 gap-3 mb-10">
          {creatorBenefits.map(benefit => (
            <div key={benefit.title} className="glass rounded-2xl p-4 flex gap-4 items-start hover:border-white/15 transition-all">
              <div className="text-2xl flex-shrink-0">{benefit.icon}</div>
              <div>
                <div className="font-display font-700 text-sm text-white mb-0.5">{benefit.title}</div>
                <p className="text-[#9ca3af] text-xs font-body leading-relaxed">{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Revenue comparison */}
        <div className="glass rounded-2xl p-5 mb-10">
          <div className="text-xs font-display uppercase tracking-widest text-[#6b7280] mb-4"
            style={{letterSpacing:'0.1em'}}>Revenue per 1,000 fans</div>
          <div className="space-y-3">
            {[
              {platform:'YouTube ad revenue',value:'~$2–5',color:'#6b7280',pct:5},
              {platform:'TikTok Creator Fund',value:'~$0.02–0.04',color:'#6b7280',pct:1},
              {platform:'MIRRA Creator Drop',value:'~$800–2,000',color:'#34d399',pct:90},
            ].map(row=>(
              <div key={row.platform}>
                <div className="flex justify-between text-xs mb-1 font-body">
                  <span style={{color:row.color==='\#6b7280'?'#6b7280':'#d1d5db'}}>{row.platform}</span>
                  <span style={{color:row.color,fontFamily:'Syne',fontWeight:700}}>{row.value}</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-1000"
                    style={{width:`${row.pct}%`,background:row.color==='\#6b7280'?'#374151':`linear-gradient(90deg,${row.color},${row.color}88)`}}/>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[#4b5563] text-xs mt-3 font-body">*Estimates based on average drop performance across comparable platforms</p>
        </div>

        {/* Application form */}
        <div className="text-center mb-6">
          <h2 className="font-display font-800 text-xl text-gradient-aurora mb-2">Apply to create on MIRRA</h2>
          <p className="text-[#9ca3af] text-sm font-body">We're onboarding 50 creators for our first culture season</p>
        </div>

        {submitted ? (
          <div className="glass rounded-3xl p-8 text-center glow-aurora">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#c084fc] to-[#34d399] flex items-center justify-center text-3xl mx-auto mb-4 float">
              ✨
            </div>
            <div className="font-display font-800 text-xl text-white mb-2">Application received!</div>
            <p className="text-[#9ca3af] text-sm font-body leading-relaxed">
              We'll review your application and get back within 48 hours. Check your email for confirmation.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="glass rounded-3xl p-5 space-y-4">
            {[
              { key: 'name', label: 'Your name', placeholder: 'Jade Williams' },
              { key: 'handle', label: 'Primary handle', placeholder: '@jadewilliams' },
              { key: 'email', label: 'Email address', placeholder: 'jade@example.com', type: 'email' },
            ].map(field => (
              <div key={field.key}>
                <label className="block text-xs font-display text-[#9ca3af] mb-1.5" style={{letterSpacing:'0.05em'}}>
                  {field.label}
                </label>
                <input type={field.type || 'text'}
                  placeholder={field.placeholder}
                  value={formData[field.key as keyof typeof formData]}
                  onChange={e => setFormData(f => ({...f, [field.key]: e.target.value}))}
                  className="w-full glass rounded-xl px-4 py-3 text-sm font-body text-white placeholder-[#4b5563] outline-none focus:border-[#c084fc]/50 transition-all"
                  style={{border:'1px solid rgba(255,255,255,0.08)'}}
                  required/>
              </div>
            ))}
            <div>
              <label className="block text-xs font-display text-[#9ca3af] mb-1.5">Main platform</label>
              <select value={formData.platform}
                onChange={e => setFormData(f=>({...f,platform:e.target.value}))}
                className="w-full rounded-xl px-4 py-3 text-sm font-body text-white outline-none appearance-none"
                style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)'}}>
                <option value="">Select platform</option>
                {['TikTok','YouTube','Instagram','Twitch','Twitter/X'].map(p=>(
                  <option key={p} value={p.toLowerCase()} style={{background:'#0d0d14'}}>{p}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-display text-[#9ca3af] mb-1.5">Follower count (approx)</label>
              <select value={formData.followers}
                onChange={e => setFormData(f=>({...f,followers:e.target.value}))}
                className="w-full rounded-xl px-4 py-3 text-sm font-body text-white outline-none appearance-none"
                style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)'}}>
                <option value="">Select range</option>
                {['1K–10K','10K–100K','100K–1M','1M+'].map(r=>(
                  <option key={r} value={r} style={{background:'#0d0d14'}}>{r}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-display text-[#9ca3af] mb-1.5">Your niche / content type</label>
              <input type="text" placeholder="e.g. anime reviews, fashion hauls, gaming"
                value={formData.niche}
                onChange={e => setFormData(f=>({...f,niche:e.target.value}))}
                className="w-full glass rounded-xl px-4 py-3 text-sm font-body text-white placeholder-[#4b5563] outline-none"
                style={{border:'1px solid rgba(255,255,255,0.08)'}}/>
            </div>
            <div>
              <label className="block text-xs font-display text-[#9ca3af] mb-1.5">Country</label>
              <select value={formData.country}
                onChange={e => setFormData(f=>({...f,country:e.target.value}))}
                className="w-full rounded-xl px-4 py-3 text-sm font-body text-white outline-none appearance-none"
                style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)'}}>
                <option value="">Select country</option>
                {['🇺🇸 United States','🇬🇧 United Kingdom','🇯🇵 Japan','Other'].map(c=>(
                  <option key={c} value={c} style={{background:'#0d0d14'}}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-display text-[#9ca3af] mb-1.5">Why do you want to create on MIRRA?</label>
              <textarea placeholder="Tell us about your community and what world you'd build..."
                value={formData.pitch}
                onChange={e => setFormData(f=>({...f,pitch:e.target.value}))}
                rows={3}
                className="w-full glass rounded-xl px-4 py-3 text-sm font-body text-white placeholder-[#4b5563] outline-none resize-none"
                style={{border:'1px solid rgba(255,255,255,0.08)'}}/>
            </div>
            <button type="submit"
              className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-display font-700 text-base text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{background:'linear-gradient(135deg,#c084fc,#818cf8)',boxShadow:'0 8px 32px rgba(192,132,252,0.35)'}}>
              <Sparkles size={16}/> Apply to create on MIRRA
            </button>
            <p className="text-[#4b5563] text-xs text-center font-body">We reply within 48 hours · Limited spots available</p>
          </form>
        )}
      </div>
    </div>
  );
}
