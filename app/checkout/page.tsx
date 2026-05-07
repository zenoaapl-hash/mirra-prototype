'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Check, ShieldCheck, ArrowLeft, Sparkles, Globe } from 'lucide-react';
import { drops } from '@/lib/data';
import { ItemCard, RarityBadge, Countdown } from '@/components/ui';

type Currency = 'us' | 'uk' | 'jp';

const CURRENCY_CONFIG = {
  us: { symbol: '$', label: 'USD', flag: '🇺🇸' },
  uk: { symbol: '£', label: 'GBP', flag: '🇬🇧' },
  jp: { symbol: '¥', label: 'JPY', flag: '🇯🇵' },
};

export default function CheckoutPage() {
  const [currency, setCurrency] = useState<Currency>('us');
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  const drop = drops[0]; // Tokyo Night Arcade Starter Pack
  const cc = CURRENCY_CONFIG[currency];
  const price = drop.price[currency];

  function handlePurchase() {
    setLoading(true);
    // TODO: integrate Stripe — connect /api/checkout/route.ts with Stripe Checkout Session
    // Pass: price_id, user_id (from Supabase auth), drop_id
    setTimeout(() => {
      setLoading(false);
      setConfirmed(true);
    }, 1500);
  }

  if (confirmed) {
    return <ConfirmationScreen drop={drop} currency={currency}/>;
  }

  return (
    <div className="min-h-screen px-4 pt-24 pb-24 max-w-sm mx-auto">
      <div className="orb w-72 h-72 top-10 -right-16 opacity-30"
        style={{background:'radial-gradient(circle,#c084fc25,transparent)'}}/>

      {/* Back */}
      <Link href="/drops" className="flex items-center gap-1.5 text-[#9ca3af] hover:text-white transition-colors text-sm font-body mb-6">
        <ArrowLeft size={16}/> Back to Drops
      </Link>

      <div className="text-xs font-display uppercase tracking-widest text-[#c084fc] mb-2"
        style={{letterSpacing:'0.14em'}}>Checkout</div>
      <h1 className="font-display font-800 text-2xl text-white mb-6 leading-tight">
        {drop.title}
      </h1>

      {/* Countdown */}
      <div className="glass rounded-2xl p-3 mb-4 flex items-center justify-between">
        <span className="text-xs text-[#f87171] font-body">⏱ Drop closes in</span>
        <Countdown hours={drop.hoursLeft}/>
      </div>

      {/* What you get */}
      <div className="glass rounded-2xl p-4 mb-4">
        <div className="text-xs font-display uppercase tracking-widest text-[#6b7280] mb-4"
          style={{letterSpacing:'0.1em'}}>What's included</div>
        <div className="space-y-3">
          {drop.items.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <ItemCard name={item.name} type={item.type} rarity={item.rarity} gradient={item.gradient} size="sm"/>
              <div className="flex-1">
                <div className="font-display font-700 text-sm text-white">{item.name}</div>
                <div className="text-[#6b7280] text-xs font-body">{item.type}</div>
                <RarityBadge rarity={item.rarity}/>
              </div>
            </div>
          ))}
          <div className="flex items-center gap-3">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#818cf8]/20 to-[#c084fc]/20 border border-white/10 flex items-center justify-center text-2xl flex-shrink-0">
              ⚡
            </div>
            <div>
              <div className="font-display font-700 text-sm text-white">{drop.questCount} Fan Quests</div>
              <div className="text-[#6b7280] text-xs font-body">Earn XP + creator interaction</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#fbbf24]/20 to-[#f472b6]/20 border border-white/10 flex items-center justify-center text-2xl flex-shrink-0">
              🍵
            </div>
            <div>
              <div className="font-display font-700 text-sm text-white">Real-World Perk</div>
              <div className="text-[#6b7280] text-xs font-body">20% off at Tokyo Night partner cafés</div>
            </div>
          </div>
        </div>
      </div>

      {/* Currency selector */}
      <div className="glass rounded-2xl p-4 mb-4">
        <div className="text-xs font-display uppercase tracking-widest text-[#6b7280] mb-3"
          style={{letterSpacing:'0.1em'}}>Currency</div>
        <div className="flex gap-2">
          {(Object.entries(CURRENCY_CONFIG) as [Currency, typeof CURRENCY_CONFIG.us][]).map(([key, cfg]) => (
            <button key={key} onClick={() => setCurrency(key)}
              className="flex-1 py-2 rounded-xl text-sm font-display font-600 transition-all"
              style={{
                background: currency === key ? 'linear-gradient(135deg,#c084fc,#818cf8)' : 'rgba(255,255,255,0.04)',
                color: currency === key ? '#fff' : '#9ca3af',
                border: `1px solid ${currency === key ? 'transparent' : 'rgba(255,255,255,0.08)'}`,
              }}>
              {cfg.flag} {cfg.label}
            </button>
          ))}
        </div>
      </div>

      {/* Order summary */}
      <div className="glass rounded-2xl p-4 mb-6">
        <div className="text-xs font-display uppercase tracking-widest text-[#6b7280] mb-3"
          style={{letterSpacing:'0.1em'}}>Order Summary</div>
        <div className="space-y-2 mb-3">
          <div className="flex justify-between text-sm font-body">
            <span className="text-[#9ca3af]">Tokyo Night Arcade Pack</span>
            <span className="text-white">{cc.symbol}{price}</span>
          </div>
          <div className="flex justify-between text-sm font-body">
            <span className="text-[#9ca3af]">Platform fee</span>
            <span className="text-[#34d399]">Free</span>
          </div>
          <div className="flex justify-between text-sm font-body">
            <span className="text-[#9ca3af]">Hidden fees</span>
            <span className="text-[#34d399]">None</span>
          </div>
        </div>
        <div className="border-t border-white/8 pt-3 flex justify-between">
          <span className="font-display font-700 text-sm text-white">Total</span>
          <span className="font-display font-800 text-xl text-white">{cc.symbol}{price} <span className="text-sm text-[#6b7280] font-400">{cc.label}</span></span>
        </div>
      </div>

      {/* Trust signals */}
      <div className="flex items-center justify-center gap-4 mb-6 text-xs text-[#6b7280] font-body">
        <div className="flex items-center gap-1"><ShieldCheck size={12} className="text-[#34d399]"/> Secure</div>
        <div className="flex items-center gap-1"><Check size={12} className="text-[#34d399]"/> No subscription</div>
        <div className="flex items-center gap-1"><Check size={12} className="text-[#34d399]"/> Yours forever</div>
      </div>

      {/* Payment — TODO: replace with Stripe Elements or Stripe Checkout redirect */}
      <button onClick={handlePurchase} disabled={loading}
        className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-display font-800 text-base text-white transition-all disabled:opacity-60"
        style={{background:'linear-gradient(135deg,#c084fc,#818cf8)',boxShadow:'0 8px 40px rgba(192,132,252,0.4)'}}>
        {loading ? (
          <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin"/>
        ) : (
          <><Sparkles size={16}/> Complete Purchase · {cc.symbol}{price}</>
        )}
      </button>
      <p className="text-[#374151] text-xs text-center mt-3 font-body">
        Powered by Stripe · No account needed for first purchase
      </p>
    </div>
  );
}

function ConfirmationScreen({ drop, currency }: { drop: typeof drops[0]; currency: Currency }) {
  const cc = CURRENCY_CONFIG[currency];
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="orb w-80 h-80 top-1/4 left-1/2 -translate-x-1/2 opacity-40"
        style={{background:'radial-gradient(circle,#c084fc25,transparent)'}}/>
      <div className="relative z-10 max-w-sm">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#c084fc] to-[#34d399] flex items-center justify-center text-4xl mx-auto mb-6 float glow-aurora">
          ✨
        </div>
        <div className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full text-xs font-display mb-4"
          style={{color:'#34d399',letterSpacing:'0.1em'}}>
          <Check size={10}/> Purchase confirmed
        </div>
        <h1 className="font-display font-800 text-2xl text-white mb-3">
          Your drop is yours! 🎉
        </h1>
        <p className="text-[#9ca3af] text-sm font-body leading-relaxed mb-6">
          Your items are now in your collection. Head to your profile to wear them and join the Tokyo Night Arcade world.
        </p>

        {/* Confirmation summary */}
        <div className="glass rounded-2xl p-4 mb-6 text-left">
          <div className="flex gap-2 mb-3">
            {drop.items.slice(0,3).map((item, i) => (
              <ItemCard key={i} name={item.name} type={item.type} rarity={item.rarity} gradient={item.gradient} size="sm"/>
            ))}
          </div>
          <div className="font-display font-700 text-sm text-white mb-0.5">{drop.title}</div>
          <div className="text-[#6b7280] text-xs font-body">{drop.items.length} items + {drop.questCount} quests added to your collection</div>
        </div>

        <div className="flex flex-col gap-3">
          <Link href="/profile"
            className="flex items-center justify-center gap-2 py-4 rounded-2xl font-display font-700 text-sm text-white"
            style={{background:'linear-gradient(135deg,#c084fc,#818cf8)',boxShadow:'0 8px 32px rgba(192,132,252,0.35)'}}>
            <Sparkles size={14}/> View on my MIRRA Self
          </Link>
          <Link href="/worlds"
            className="py-3.5 rounded-2xl font-display font-600 text-sm text-[#c084fc] glass border border-[#c084fc]/30 hover:border-[#c084fc]/60 transition-all text-center">
            Enter Tokyo Night Arcade →
          </Link>
        </div>
      </div>
    </div>
  );
}
