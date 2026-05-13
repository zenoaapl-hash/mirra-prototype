'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Check, ShieldCheck, ArrowLeft, Sparkles } from 'lucide-react';
import { drops, WORLD_GRADIENTS } from '@/lib/data';
import { ItemCard, RarityBadge, Countdown, C } from '@/components/ui';

type Currency = 'us' | 'uk' | 'jp';

const CURRENCY = {
  us: { symbol: '$', label: 'USD', flag: '🇺🇸' },
  uk: { symbol: '£', label: 'GBP', flag: '🇬🇧' },
  jp: { symbol: '¥', label: 'JPY', flag: '🇯🇵' },
};

export default function CheckoutPage() {
  const [currency, setCurrency] = useState<Currency>('us');
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [payMethod, setPayMethod] = useState<'paypal' | 'paylater'>('paypal');

  const drop = drops[0]; // Tokyo Night Arcade Starter Pack
  const cc = CURRENCY[currency];
  const price = drop.price[currency];
  const wg = WORLD_GRADIENTS[drop.gradientKey] || WORLD_GRADIENTS['tokyo-night-arcade'];

  function handlePurchase() {
    setLoading(true);
    /*
     * TODO: PayPal integration
     *
     * Option A — PayPal JavaScript SDK (client-side Orders API):
     *   1. Load SDK: <script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID&currency=USD">
     *   2. Render PayPal button: paypal.Buttons({ createOrder, onApprove }).render('#paypal-button')
     *   3. In createOrder: POST /api/paypal/create-order with { drop_id, currency, user_id }
     *   4. In onApprove: POST /api/paypal/capture-order with { orderID }
     *   5. On capture success: write items to Supabase inventory table
     *
     * Option B — PayPal Checkout redirect:
     *   1. POST /api/paypal/create-order → returns approvalUrl
     *   2. router.push(approvalUrl)
     *   3. On return, capture order and update Supabase
     *
     * Pay Later: available automatically when SDK is loaded with pay-later component enabled.
     * See: https://developer.paypal.com/docs/checkout/pay-later/
     */
    setTimeout(() => {
      setLoading(false);
      setConfirmed(true);
    }, 1500);
  }

  if (confirmed) return <Confirmation drop={drop} currency={currency}/>;

  return (
    <div className="min-h-screen px-4 pt-24 pb-24 max-w-sm mx-auto">
      <div className="orb w-72 h-72 top-10 -right-16 opacity-25"
        style={{background:`radial-gradient(circle,${C.plum}25,transparent)`}}/>

      <Link href="/drops" className="flex items-center gap-1.5 text-sm mb-6 transition-colors hover:text-white"
        style={{color:C.muted}}>
        <ArrowLeft size={16}/> Back to Drops
      </Link>

      <div className="text-xs font-display font-semibold uppercase mb-2"
        style={{color:C.violet,letterSpacing:'0.14em'}}>Secure Checkout</div>
      <h1 className="font-display font-extrabold text-2xl text-white mb-5 leading-tight">{drop.title}</h1>

      {/* Countdown */}
      <div className="glass-card rounded-2xl p-3 mb-4 flex items-center justify-between">
        <span className="text-xs" style={{color:'#F87171'}}>⏱ Drop closes in</span>
        <Countdown hours={drop.hoursLeft}/>
      </div>

      {/* What's included */}
      <div className="glass-card rounded-2xl p-4 mb-4">
        <div className="text-xs font-display font-semibold uppercase mb-4"
          style={{color:C.muted,letterSpacing:'0.1em'}}>What's included</div>
        <div className="space-y-3">
          {drop.items.map((item,i)=>(
            <div key={i} className="flex items-center gap-3">
              <ItemCard name={item.name} type={item.type} rarity={item.rarity} gradientKey={item.gradientKey} size="sm"/>
              <div className="flex-1">
                <div className="font-display font-bold text-sm text-white">{item.name}</div>
                <div className="text-xs mb-1" style={{color:C.muted}}>{item.type}</div>
                <RarityBadge rarity={item.rarity}/>
              </div>
            </div>
          ))}
          <div className="flex items-center gap-3">
            <div className="w-[72px] h-[72px] rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{background:`${C.violet}15`,border:`1px solid ${C.violet}30`}}>
              ⚡
            </div>
            <div>
              <div className="font-display font-bold text-sm text-white">{drop.questCount} Fan Quests</div>
              <div className="text-xs" style={{color:C.muted}}>Earn XP and creator interaction</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-[72px] h-[72px] rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{background:'rgba(217,119,6,0.12)',border:'1px solid rgba(217,119,6,0.25)'}}>
              🍵
            </div>
            <div>
              <div className="font-display font-bold text-sm text-white">Real-World Perk</div>
              <div className="text-xs" style={{color:C.muted}}>20% off at Tokyo Night partner cafés in Japan</div>
            </div>
          </div>
        </div>
      </div>

      {/* Currency selector */}
      <div className="glass-card rounded-2xl p-4 mb-4">
        <div className="text-xs font-display font-semibold uppercase mb-3"
          style={{color:C.muted,letterSpacing:'0.1em'}}>Currency</div>
        <div className="flex gap-2">
          {(Object.entries(CURRENCY) as [Currency, typeof CURRENCY.us][]).map(([key,cfg])=>(
            <button key={key} onClick={()=>setCurrency(key)}
              className="flex-1 py-2.5 rounded-xl text-sm font-display font-semibold transition-all"
              style={{
                background: currency===key?`linear-gradient(135deg,${C.plum},${C.violet})`:'rgba(196,181,253,0.04)',
                color: currency===key?'#fff':C.muted,
                border:`1px solid ${currency===key?'transparent':'rgba(196,181,253,0.1)'}`,
              }}>
              {cfg.flag} {cfg.label}
            </button>
          ))}
        </div>
      </div>

      {/* Order summary — transparent, no hidden fees */}
      <div className="glass-card rounded-2xl p-4 mb-4">
        <div className="text-xs font-display font-semibold uppercase mb-3"
          style={{color:C.muted,letterSpacing:'0.1em'}}>Order Summary</div>
        <div className="space-y-2 mb-3">
          {[
            {label:'Tokyo Night Arcade Pack', value:`${cc.symbol}${price}`,    valueColor:C.pearl},
            {label:'Platform fee',            value:'Free',                    valueColor:C.lavender},
            {label:'Hidden charges',          value:'None',                    valueColor:C.lavender},
            {label:'Subscription required',   value:'No',                      valueColor:C.lavender},
          ].map(row=>(
            <div key={row.label} className="flex justify-between text-sm"
              style={{fontFamily:'DM Sans'}}>
              <span style={{color:C.muted}}>{row.label}</span>
              <span style={{color:row.valueColor}}>{row.value}</span>
            </div>
          ))}
        </div>
        <div className="border-t pt-3 flex justify-between"
          style={{borderColor:'rgba(196,181,253,0.08)'}}>
          <span className="font-display font-bold text-sm text-white">Total</span>
          <span className="font-display font-extrabold text-xl text-white">
            {cc.symbol}{price} <span className="text-sm font-normal" style={{color:C.muted}}>{cc.label}</span>
          </span>
        </div>
      </div>

      {/* PayPal method selector */}
      <div className="glass-card rounded-2xl p-4 mb-5">
        <div className="text-xs font-display font-semibold uppercase mb-3"
          style={{color:C.muted,letterSpacing:'0.1em'}}>Pay with</div>
        <div className="flex flex-col gap-2">
          {[
            { key: 'paypal' as const,   label: 'PayPal',       sub: 'Pay securely with your PayPal account',  badge: '' },
            { key: 'paylater' as const, label: 'Pay Later',    sub: 'Pay Later where available — terms vary by country and eligibility', badge: 'Where available' },
          ].map(opt=>(
            <button key={opt.key} onClick={()=>setPayMethod(opt.key)}
              className="flex items-center gap-3 p-3 rounded-xl text-left transition-all"
              style={{
                border:`2px solid ${payMethod===opt.key?C.violet:'rgba(196,181,253,0.1)'}`,
                background: payMethod===opt.key?`${C.violet}12`:'rgba(196,181,253,0.03)',
              }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center font-display font-extrabold text-xs"
                style={{background:'#003087',color:'#fff'}}>PP</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-sm text-white">{opt.label}</span>
                  {opt.badge && (
                    <span className="text-xs px-1.5 py-0.5 rounded"
                      style={{background:'rgba(196,181,253,0.12)',color:'#C4B5FD',fontSize:9}}>
                      {opt.badge}
                    </span>
                  )}
                </div>
                <span className="text-xs" style={{color:C.muted}}>{opt.sub}</span>
              </div>
              <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                style={{borderColor:payMethod===opt.key?C.violet:C.subtle}}>
                {payMethod===opt.key && <div className="w-2 h-2 rounded-full" style={{background:C.violet}}/>}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Trust signals */}
      <div className="flex items-center justify-center gap-4 mb-5 text-xs" style={{color:C.muted}}>
        <div className="flex items-center gap-1"><ShieldCheck size={12} style={{color:C.lavender}}/> Secured by PayPal</div>
        <div className="flex items-center gap-1"><Check size={12} style={{color:C.lavender}}/> Items are yours forever</div>
      </div>

      {/*
       * TODO: Replace this button with the PayPal JS SDK button render target:
       * <div id="paypal-button-container"/>
       * Initialise in useEffect: paypal.Buttons({...}).render('#paypal-button-container')
       */}
      <button onClick={handlePurchase} disabled={loading}
        className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-display font-extrabold text-base text-white transition-all disabled:opacity-60"
        style={{background:'#003087',boxShadow:'0 8px 32px rgba(0,48,135,0.5)'}}>
        {loading ? (
          <div className="w-5 h-5 rounded-full border-2 border-t-white animate-spin"
            style={{borderColor:'rgba(255,255,255,0.3) transparent rgba(255,255,255,0.3) rgba(255,255,255,0.3)'}}/>
        ) : (
          <span>Continue with PayPal · {cc.symbol}{price}</span>
        )}
      </button>
      <p className="text-xs text-center mt-3" style={{color:C.subtle}}>
        You'll review all available PayPal options before payment is taken
      </p>
    </div>
  );
}

function Confirmation({ drop, currency }: { drop: typeof drops[0]; currency: Currency }) {
  const cc = CURRENCY[currency];
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="orb w-80 h-80 top-1/4 left-1/2 -translate-x-1/2 opacity-35"
        style={{background:`radial-gradient(circle,${C.plum}22,transparent)`}}/>
      <div className="relative z-10 max-w-sm">
        <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 float glow-violet"
          style={{background:`linear-gradient(135deg,${C.plum},${C.violet})`}}>
          ✦
        </div>
        <div className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full text-xs font-display font-semibold mb-4"
          style={{color:'#4ADE80',letterSpacing:'0.1em'}}>
          <Check size={10}/> Payment confirmed
        </div>
        <h1 className="font-display font-extrabold text-2xl text-white mb-3">Your drop is yours! 🎉</h1>
        <p className="text-sm leading-relaxed mb-6" style={{color:C.muted}}>
          Your items are now in your collection. Head to your profile to wear them and enter the Tokyo Night Arcade world.
        </p>
        <div className="glass-card rounded-2xl p-4 mb-6 text-left">
          <div className="flex gap-2 mb-3">
            {drop.items.slice(0,3).map((item,i)=>(
              <ItemCard key={i} name={item.name} type={item.type} rarity={item.rarity} gradientKey={item.gradientKey} size="sm"/>
            ))}
          </div>
          <div className="font-display font-bold text-sm text-white mb-0.5">{drop.title}</div>
          <div className="text-xs" style={{color:C.muted}}>
            {drop.items.length} items + {drop.questCount} quests added to your collection
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Link href="/profile"
            className="flex items-center justify-center gap-2 py-4 rounded-2xl font-display font-bold text-sm text-white"
            style={{background:`linear-gradient(135deg,${C.plum},${C.violet})`,boxShadow:`0 8px 32px ${C.plum}50`}}>
            <Sparkles size={14}/> View on my MIRRA Self
          </Link>
          <Link href="/worlds"
            className="py-3.5 rounded-2xl font-display font-semibold text-sm glass text-center"
            style={{color:C.lavender}}>
            Enter Tokyo Night Arcade →
          </Link>
        </div>
      </div>
    </div>
  );
}
