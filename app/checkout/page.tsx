'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Check, ShieldCheck, ArrowLeft, Sparkles, Gift, Package, Ticket } from 'lucide-react';
import { drops, WORLD_GRADIENTS } from '@/lib/data';
import { ItemCard, RarityBadge, C } from '@/components/ui';

type Currency = 'us' | 'uk' | 'jp';
const CURRENCY = {
  us: { symbol: '$', label: 'USD', flag: '🇺🇸' },
  uk: { symbol: '£', label: 'GBP', flag: '🇬🇧' },
  jp: { symbol: '¥', label: 'JPY', flag: '🇯🇵' },
};
const PERKS: Record<Currency, { icon: React.ReactNode; title: string; desc: string }> = {
  us: { icon: <Gift size={18}/>,    title: 'Creator Merch First Look', desc: 'Quest completers get early access to creator merchandise drops' },
  uk: { icon: <Ticket size={18}/>,  title: 'Festival Early Access',    desc: 'Unlock presale access to partner festival events in the UK' },
  jp: { icon: <Package size={18}/>, title: 'Matcha Café Discount',     desc: '20% off at Tokyo Night partner cafés in Japan' },
};

export default function CheckoutPage() {
  const [currency, setCurrency] = useState<Currency>('us');
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const drop = drops[0];
  const cc = CURRENCY[currency];
  const price = drop.price[currency];
  const perk = PERKS[currency];

  function handlePurchase() {
    setLoading(true);
    /*
     * TODO: PayPal JS SDK integration
     * 1. Load: <script src="https://www.paypal.com/sdk/js?client-id=YOUR_ID&currency=USD">
     * 2. Render: paypal.Buttons({ createOrder, onApprove }).render('#paypal-button')
     * 3. POST /api/paypal/create-order → { drop_id, currency, user_id }
     * 4. POST /api/paypal/capture-order → write to Supabase inventory
     */
    setTimeout(() => { setLoading(false); setConfirmed(true); }, 1500);
  }

  if (confirmed) return <Confirmation drop={drop} currency={currency}/>;

  return (
    <div className="min-h-screen pt-24 pb-24 relative">
      <div className="orb w-72 h-72 top-10 -right-16 opacity-20"
        style={{background:`radial-gradient(circle,${C.plum}22,transparent)`}}/>

      <div className="mirra-container">
        {/* Back link */}
        <Link href="/drops" className="inline-flex items-center gap-1.5 text-sm mb-6 transition-colors hover:text-white"
          style={{color:C.muted}}>
          <ArrowLeft size={16}/> Back to drops
        </Link>

        <div className="text-xs font-display font-semibold uppercase mb-2"
          style={{color:C.violet,letterSpacing:'0.14em'}}>Secure Checkout</div>
        <h1 className="font-display font-extrabold text-2xl text-white mb-2 leading-tight">{drop.title}</h1>
        <p className="text-sm mb-6" style={{color:C.muted}}>One-time purchase · No hidden fees · Items appear in your MIRRA collection after payment</p>

        {/* Desktop 2-col */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">

          {/* LEFT — order summary */}
          <div className="flex flex-col gap-4">

            {/* Bundle contents */}
            <div className="glass-card rounded-2xl p-5">
              <div className="text-xs font-display font-semibold uppercase mb-4"
                style={{color:C.muted,letterSpacing:'0.1em'}}>Bundle contents</div>
              <div className="space-y-3">
                {drop.items.map((item,i)=>(
                  <div key={i} className="flex items-center gap-3">
                    <ItemCard name={item.name} type={item.type} rarity={item.rarity}
                      gradientKey={item.gradientKey} size="sm"/>
                    <div className="flex-1 min-w-0">
                      <div className="font-display font-bold text-sm text-white leading-snug">{item.name}</div>
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
                    <div className="text-xs" style={{color:C.muted}}>Earn XP and creator interaction</div>
                  </div>
                </div>
                {/* Country-aware perk */}
                <div className="flex items-center gap-3">
                  <div className="w-[72px] h-[72px] rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{background:'rgba(196,181,253,0.08)',border:`1px solid ${C.violet}25`,color:C.lavender}}>
                    {perk.icon}
                  </div>
                  <div>
                    <div className="font-display font-bold text-sm text-white">{perk.title}</div>
                    <div className="text-xs" style={{color:C.muted}}>{perk.desc}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order summary */}
            <div className="glass-card rounded-2xl p-5">
              <div className="text-xs font-display font-semibold uppercase mb-3"
                style={{color:C.muted,letterSpacing:'0.1em'}}>Order Summary</div>
              <div className="space-y-2 mb-3">
                {[
                  {label:drop.title,              value:`${cc.symbol}${price}`, c:C.pearl},
                  {label:'Platform fee',           value:'Free',                 c:C.lavender},
                  {label:'Hidden charges',         value:'None',                 c:C.lavender},
                  {label:'Subscription required',  value:'No',                   c:C.lavender},
                ].map(row=>(
                  <div key={row.label} className="flex justify-between text-sm" style={{fontFamily:'DM Sans'}}>
                    <span style={{color:C.muted}}>{row.label}</span>
                    <span style={{color:row.c}}>{row.value}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-3 flex justify-between" style={{borderColor:'rgba(196,181,253,0.08)'}}>
                <span className="font-display font-bold text-sm text-white">Total</span>
                <span className="font-display font-extrabold text-xl text-white">
                  {cc.symbol}{price} <span className="text-sm font-normal" style={{color:C.muted}}>{cc.label}</span>
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT — payment */}
          <div className="flex flex-col gap-4">
            {/* Currency */}
            <div className="glass-card rounded-2xl p-5">
              <div className="text-xs font-display font-semibold uppercase mb-3"
                style={{color:C.muted,letterSpacing:'0.1em'}}>Currency</div>
              <div className="flex gap-2">
                {(Object.entries(CURRENCY) as [Currency, typeof CURRENCY.us][]).map(([key,cfg])=>(
                  <button key={key} onClick={()=>setCurrency(key)}
                    className="flex-1 py-2.5 rounded-xl text-sm font-display font-semibold transition-all"
                    style={{
                      background:currency===key?`linear-gradient(135deg,${C.plum},${C.violet})`:'rgba(196,181,253,0.04)',
                      color:currency===key?'#fff':C.muted,
                      border:`1px solid ${currency===key?'transparent':'rgba(196,181,253,0.1)'}`,
                    }}>
                    {cfg.flag} {cfg.label}
                  </button>
                ))}
              </div>
            </div>

            {/* PayPal payment card */}
            <div className="glass-card rounded-2xl p-5">
              <div className="text-xs font-display font-semibold uppercase mb-4"
                style={{color:C.muted,letterSpacing:'0.1em'}}>Payment</div>

              {/* PayPal card */}
              <div className="rounded-xl p-4 mb-4"
                style={{background:`${C.violet}10`,border:`2px solid ${C.violet}40`}}>
                <div className="flex items-center gap-3">
                  {/* PayPal wordmark treatment */}
                  <div className="px-3 py-2 rounded-lg font-extrabold text-sm"
                    style={{background:'#003087',color:'#fff',fontFamily:'sans-serif',letterSpacing:'-0.01em'}}>
                    Pay<span style={{color:'#009cde'}}>Pal</span>
                  </div>
                  <div>
                    <div className="font-display font-bold text-sm text-white">Pay with PayPal</div>
                    <div className="text-xs" style={{color:C.muted}}>Secure payment — review before being charged</div>
                  </div>
                </div>
              </div>

              {/* Reassurance */}
              <div className="rounded-xl p-3 mb-5" style={{background:'rgba(196,181,253,0.04)',border:`1px solid rgba(196,181,253,0.08)`}}>
                <p className="text-xs leading-relaxed" style={{color:C.muted}}>
                  You'll review and confirm payment securely on PayPal before anything is charged.
                </p>
              </div>

              {/* Trust signals */}
              <div className="flex items-center gap-4 mb-5 text-xs" style={{color:C.muted}}>
                <div className="flex items-center gap-1"><ShieldCheck size={11} style={{color:C.lavender}}/> Secured by PayPal</div>
                <div className="flex items-center gap-1"><Check size={11} style={{color:C.lavender}}/> Always in your collection</div>
              </div>

              {/* TODO: Replace with PayPal JS SDK button render target: <div id="paypal-button-container"/> */}
              <button onClick={handlePurchase} disabled={loading}
                className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-display font-extrabold text-base text-white transition-all disabled:opacity-60"
                style={{background:'#003087',boxShadow:'0 8px 32px rgba(0,48,135,0.5)'}}>
                {loading ? (
                  <div className="w-5 h-5 rounded-full border-2 border-t-white animate-spin"
                    style={{borderColor:'rgba(255,255,255,0.3) transparent rgba(255,255,255,0.3) rgba(255,255,255,0.3)'}}/>
                ) : `Continue with PayPal · ${cc.symbol}${price}`}
              </button>

              {/* Cancel link */}
              <div className="text-center mt-4">
                <Link href="/drops" className="text-xs hover:text-white transition-colors"
                  style={{color:C.subtle}}>
                  Cancel and return to drops
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function Confirmation({ drop, currency }: { drop: typeof drops[0]; currency: Currency }) {
  const cc = CURRENCY[currency];
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20 text-center">
      <div className="orb w-80 h-80 top-1/4 left-1/2 -translate-x-1/2 opacity-30"
        style={{background:`radial-gradient(circle,${C.plum}22,transparent)`}}/>
      <div className="relative z-10 w-full max-w-md">
        <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 float glow-violet"
          style={{background:`linear-gradient(135deg,${C.plum},${C.violet})`}}>✦</div>
        <div className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full text-xs font-display font-semibold mb-4"
          style={{color:'#4ADE80',letterSpacing:'0.1em'}}>
          <Check size={10}/> Payment confirmed
        </div>
        <h1 className="font-display font-extrabold text-2xl text-white mb-3">Your bundle is ready</h1>
        <p className="text-sm leading-relaxed mb-6" style={{color:C.muted}}>
          Identity items are now in your collection. Enter the Tokyo Night Arcade world to start your quests.
        </p>
        <div className="glass-card rounded-2xl p-5 mb-6 text-left">
          <div className="flex gap-2 mb-3">
            {drop.items.slice(0,3).map((item,i)=>(
              <ItemCard key={i} name={item.name} type={item.type} rarity={item.rarity}
                gradientKey={item.gradientKey} size="sm"/>
            ))}
          </div>
          <div className="font-display font-bold text-sm text-white mb-0.5">{drop.title}</div>
          <div className="text-xs" style={{color:C.muted}}>{drop.items.length} identity items + {drop.questCount} quests added</div>
        </div>
        <div className="flex flex-col gap-3">
          <Link href="/profile"
            className="flex items-center justify-center gap-2 py-4 rounded-2xl font-display font-bold text-sm text-white"
            style={{background:`linear-gradient(135deg,${C.plum},${C.violet})`,boxShadow:`0 8px 32px ${C.plum}50`}}>
            <Sparkles size={14}/> View on my MIRRA Self
          </Link>
          <Link href="/worlds"
            className="py-3.5 rounded-2xl font-display font-semibold text-sm glass text-center"
            style={{color:C.lavender}}>Enter Tokyo Night Arcade →</Link>
        </div>
      </div>
    </div>
  );
}
