'use client';
import { useState } from 'react';
import { Check, Sparkles, Gift, Users } from 'lucide-react';

const INTEREST_TAGS = [
  { id: 'gaming', label: 'Gaming', emoji: '🎮', color: '#818cf8' },
  { id: 'fashion', label: 'Fashion', emoji: '✨', color: '#f472b6' },
  { id: 'beauty', label: 'Beauty', emoji: '💅', color: '#f9a8d4' },
  { id: 'anime', label: 'Anime', emoji: '⛩️', color: '#c084fc' },
  { id: 'music', label: 'Music', emoji: '🎧', color: '#34d399' },
  { id: 'creators', label: 'Creators', emoji: '🎬', color: '#fbbf24' },
  { id: 'food', label: 'Food', emoji: '🍜', color: '#f97316' },
  { id: 'events', label: 'Events', emoji: '🎪', color: '#a3e635' },
];

export default function WaitlistPage() {
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [referralCode] = useState('MIRRA-' + Math.random().toString(36).slice(2,8).toUpperCase());

  function toggleInterest(id: string) {
    setInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: connect to Supabase — insert into waitlist table
    // Fields: email, country, interests (jsonb), referral_code, created_at
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen pb-16 relative overflow-hidden">
      <div className="orb w-96 h-96 top-0 left-1/2 -translate-x-1/2 opacity-30"
        style={{background:'radial-gradient(circle,#c084fc20,transparent)'}}/>
      <div className="orb w-72 h-72 bottom-20 -right-10 opacity-20"
        style={{background:'radial-gradient(circle,#34d39920,transparent)'}}/>

      <div className="px-4 pt-24 pb-8 max-w-sm mx-auto relative z-10">
        {/* Hero */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-[#c084fc] to-[#818cf8] flex items-center justify-center text-3xl mx-auto mb-5 float glow-aurora">
            ✨
          </div>
          <div className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full text-xs font-display mb-4"
            style={{color:'#fbbf24',letterSpacing:'0.12em'}}>
            👑 Founding Member Access
          </div>
          <h1 className="font-display font-800 text-3xl text-white mb-3 leading-tight">
            Be first in.<br/>
            <span className="text-gradient-aurora">Shape the culture.</span>
          </h1>
          <p className="text-[#9ca3af] text-sm font-body leading-relaxed">
            Founding members get early world access, exclusive items, and a founding member badge that's never available again.
          </p>
        </div>

        {/* Founding member perks */}
        <div className="glass rounded-2xl p-4 mb-8">
          <div className="text-xs font-display uppercase tracking-widest text-[#6b7280] mb-3"
            style={{letterSpacing:'0.1em'}}>Founding member perks</div>
          <div className="space-y-2">
            {[
              {icon:'👑',text:'Exclusive Founding Member badge (never restocked)'},
              {icon:'⚡',text:'First access to every new culture world'},
              {icon:'💎',text:'Free starter digital item pack on launch'},
              {icon:'🎯',text:'Shape the platform with early feedback access'},
              {icon:'💰',text:'Locked-in founding member pricing forever'},
            ].map(perk=>(
              <div key={perk.text} className="flex items-start gap-2.5">
                <span className="text-base flex-shrink-0">{perk.icon}</span>
                <span className="text-[#d1d5db] text-xs font-body leading-relaxed">{perk.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Waitlist counter */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="flex -space-x-2">
            {['AK','TN','JW','MS','HY'].map((init,i)=>(
              <div key={init} className="w-8 h-8 rounded-full border-2 border-[#050508] flex items-center justify-center text-xs font-display font-700"
                style={{background:`linear-gradient(135deg,${['#c084fc','#f472b6','#fbbf24','#34d399','#818cf8'][i]},${['#818cf8','#c084fc','#f472b6','#818cf8','#34d399'][i]})`}}>
                {init}
              </div>
            ))}
          </div>
          <div className="text-sm font-body text-[#9ca3af]">
            <span className="text-white font-display font-700">12,847</span> on waitlist
          </div>
        </div>

        {submitted ? (
          <div className="glass rounded-3xl p-8 text-center glow-aurora">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#c084fc] to-[#34d399] flex items-center justify-center text-3xl mx-auto mb-4 float">
              ✨
            </div>
            <div className="font-display font-800 text-2xl text-white mb-2">You're in! 🎉</div>
            <p className="text-[#9ca3af] text-sm font-body leading-relaxed mb-6">
              Welcome to the MIRRA founding community. We'll notify you the moment early access opens.
            </p>
            <div className="glass rounded-xl p-4 mb-4">
              <div className="text-xs font-display uppercase tracking-widest text-[#6b7280] mb-2"
                style={{letterSpacing:'0.1em'}}>Your referral code</div>
              <div className="font-display font-800 text-lg text-gradient-aurora">{referralCode}</div>
              <p className="text-[#6b7280] text-xs font-body mt-1">
                Share with friends to move up the waitlist and unlock bonus items
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => navigator.clipboard?.writeText(`Join MIRRA — the social identity platform for Gen Z. Use my code ${referralCode} for founding member access: https://mirra.app/waitlist`)}
                className="flex-1 py-3 rounded-xl text-sm font-display font-600 text-white"
                style={{background:'linear-gradient(135deg,#c084fc,#818cf8)'}}>
                Copy invite link
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-display text-[#9ca3af] mb-1.5">Email address</label>
              <input type="email" required placeholder="you@example.com"
                value={email} onChange={e => setEmail(e.target.value)}
                className="w-full glass rounded-xl px-4 py-3.5 text-sm font-body text-white placeholder-[#4b5563] outline-none transition-all"
                style={{border:'1px solid rgba(255,255,255,0.08)'}}/>
            </div>

            <div>
              <label className="block text-xs font-display text-[#9ca3af] mb-1.5">Where are you based?</label>
              <div className="flex gap-2">
                {[{v:'us',f:'🇺🇸',l:'US'},{v:'uk',f:'🇬🇧',l:'UK'},{v:'jp',f:'🇯🇵',l:'Japan'}].map(c=>(
                  <button type="button" key={c.v} onClick={()=>setCountry(c.v)}
                    className="flex-1 flex flex-col items-center gap-1 py-3 rounded-xl text-sm font-display font-600 transition-all"
                    style={{
                      background:country===c.v?'linear-gradient(135deg,#c084fc,#818cf8)':'rgba(255,255,255,0.04)',
                      border:`1px solid ${country===c.v?'transparent':'rgba(255,255,255,0.08)'}`,
                      color:country===c.v?'#fff':'#9ca3af',
                    }}>
                    <span className="text-xl">{c.f}</span>
                    <span className="text-xs">{c.l}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-display text-[#9ca3af] mb-2">I'm into... <span className="text-[#6b7280]">(pick all that apply)</span></label>
              <div className="flex flex-wrap gap-2">
                {INTEREST_TAGS.map(tag => {
                  const isActive = interests.includes(tag.id);
                  return (
                    <button type="button" key={tag.id} onClick={() => toggleInterest(tag.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-display font-600 transition-all"
                      style={{
                        background: isActive ? `${tag.color}20` : 'rgba(255,255,255,0.04)',
                        border: `1px solid ${isActive ? tag.color + '60' : 'rgba(255,255,255,0.08)'}`,
                        color: isActive ? tag.color : '#9ca3af',
                      }}>
                      {tag.emoji} {tag.label}
                      {isActive && <Check size={10}/>}
                    </button>
                  );
                })}
              </div>
            </div>

            <button type="submit"
              className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-display font-800 text-base text-white transition-all hover:scale-[1.02] active:scale-[0.98] mt-2"
              style={{background:'linear-gradient(135deg,#c084fc,#818cf8,#34d399)',boxShadow:'0 8px 40px rgba(192,132,252,0.4)'}}>
              <Sparkles size={16}/>
              Join the founding waitlist
            </button>
            <p className="text-[#374151] text-xs text-center font-body">No spam ever · Founding member perks on launch · Free to join</p>
          </form>
        )}
      </div>
    </div>
  );
}
