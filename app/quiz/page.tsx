'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Check,
  BookOpen, Cpu, Leaf, Flame,
  Tv2, Gamepad2, Music, Shirt,
  Archive, Heart, Star, Zap,
  Smartphone, PlaySquare, MessageSquare, Shield,
  EyeOff, Video, Users, Target,
  Globe, Sparkles,
} from 'lucide-react';
import { quizQuestions, buildProfile, worlds } from '@/lib/data';
import { MirraLogo, C, WorldCard } from '@/components/ui';

const OPTION_ICONS: Record<string, React.ReactNode> = {
  'dark-academia': <BookOpen size={20}/>,
  'cyber-pop':     <Cpu size={20}/>,
  'soft-life':     <Leaf size={20}/>,
  'streetcore':    <Flame size={20}/>,
  'anime':         <Tv2 size={20}/>,
  'gaming':        <Gamepad2 size={20}/>,
  'music':         <Music size={20}/>,
  'fashion':       <Shirt size={20}/>,
  'collector':     <Archive size={20}/>,
  'supporter':     <Heart size={20}/>,
  'experience':    <Star size={20}/>,
  'earner':        <Zap size={20}/>,
  'tiktok':        <Smartphone size={20}/>,
  'youtube':       <PlaySquare size={20}/>,
  'twitter':       <MessageSquare size={20}/>,
  'discord':       <Shield size={20}/>,
  'lurker':        <EyeOff size={20}/>,
  'creator':       <Video size={20}/>,
  'connector':     <Users size={20}/>,
  'curator':       <Target size={20}/>,
  'us':            <span className="text-lg">🇺🇸</span>,
  'uk':            <span className="text-lg">🇬🇧</span>,
  'jp':            <span className="text-lg">🇯🇵</span>,
  'other':         <Globe size={20}/>,
};

type Phase = 'quiz' | 'building' | 'reveal';

export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>('quiz');
  const [profile, setProfile] = useState<ReturnType<typeof buildProfile> | null>(null);

  const question = quizQuestions[step];
  const isLast = step === quizQuestions.length - 1;

  function handleNext() {
    if (!selected) return;
    const newAnswers = { ...answers, [question.id]: selected };
    setAnswers(newAnswers);
    if (isLast) {
      sessionStorage.setItem('mirra_quiz', JSON.stringify(newAnswers));
      const p = buildProfile(newAnswers);
      setProfile(p);
      setPhase('building');
      // Simulate brief build moment, then show reveal
      setTimeout(() => setPhase('reveal'), 1800);
    } else {
      setStep(s => s + 1);
      setSelected(null);
    }
  }

  function handleBack() {
    if (step === 0) return;
    setStep(s => s - 1);
    setSelected(answers[quizQuestions[step - 1].id] || null);
  }

  // ── BUILDING STATE ────────────────────────────────────────────
  if (phase === 'building') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <div className="orb w-96 h-96 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30"
          style={{background:`radial-gradient(circle,${C.plum}30,transparent)`}}/>
        <div className="relative z-10">
          <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8"
            style={{background:`linear-gradient(135deg,${C.plum},${C.violet})`,boxShadow:`0 0 60px ${C.plum}60`}}>
            <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
              style={{borderColor:`rgba(196,181,253,0.4) transparent rgba(196,181,253,0.4) rgba(196,181,253,0.4)`}}/>
          </div>
          <div className="space-y-2">
            {['Reading your answers…','Mapping your aesthetic…','Building your MIRRA Self…'].map((t,i)=>(
              <p key={i} className="font-display font-semibold text-sm fade-up"
                style={{color:i===2?C.lavender:C.muted,animationDelay:`${i*0.4}s`}}>
                {t}
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── REVEAL STATE ──────────────────────────────────────────────
  if (phase === 'reveal' && profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 pb-16 text-center">
        <div className="orb w-[500px] h-[500px] top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-25"
          style={{background:`radial-gradient(circle,${C.plum}30,transparent)`}}/>

        <div className="relative z-10 w-full max-w-sm">
          {/* Archetype reveal */}
          <div className="mb-2 text-xs font-display font-semibold uppercase"
            style={{color:C.muted,letterSpacing:'0.16em'}}>Your archetype is</div>
          <h1 className="font-display font-extrabold mb-2 text-gradient-violet"
            style={{fontSize:'clamp(2rem,8vw,3.5rem)',lineHeight:1}}>
            {profile.aesthetic.name}
          </h1>
          <p className="text-sm italic mb-1" style={{color:C.muted}}>"{profile.aesthetic.tagline}"</p>
          <div className="flex items-center justify-center gap-2 mb-8">
            <span className="text-sm" style={{color:C.muted}}>{profile.country.flag} {profile.country.label}</span>
            <span style={{color:C.subtle}}>·</span>
            {profile.tags.slice(0,2).map((t,i)=>(
              <span key={i} className="text-sm" style={{color:C.muted}}>{t}</span>
            ))}
          </div>

          {/* Recommended world */}
          <div className="glass-card rounded-2xl p-4 mb-4 text-left">
            <div className="text-xs font-display font-semibold uppercase mb-3"
              style={{color:C.muted,letterSpacing:'0.1em'}}>Recommended world</div>
            <WorldCard world={profile.recommendedWorld}/>
          </div>

          {/* Drop preview */}
          <div className="glass-card rounded-xl p-4 mb-6 text-left flex items-center justify-between">
            <div>
              <div className="text-xs font-display font-semibold uppercase mb-0.5"
                style={{color:C.muted,letterSpacing:'0.08em'}}>Recommended drop</div>
              <div className="font-display font-bold text-sm text-white">{profile.recommendedDrop.title}</div>
              <div className="text-xs" style={{color:C.muted}}>by {profile.recommendedDrop.creatorName}</div>
            </div>
            <div className="font-display font-extrabold text-lg text-white">
              ${profile.recommendedDrop.price.us}
            </div>
          </div>

          <Link href="/profile"
            className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-display font-bold text-base text-white mb-3"
            style={{background:`linear-gradient(135deg,${C.plum},${C.violet})`,boxShadow:`0 8px 40px ${C.plum}55`}}>
            <Sparkles size={16}/> Reveal my MIRRA Self
          </Link>
          <p className="text-xs" style={{color:C.subtle}}>Takes you to your full identity profile</p>
        </div>
      </div>
    );
  }

  // ── QUIZ STEP ─────────────────────────────────────────────────
  return (
    <div className="min-h-screen relative flex flex-col items-center pt-20 pb-10 overflow-hidden">
      <div className="orb w-[400px] h-[400px] -top-20 -right-20 opacity-30"
        style={{background:`radial-gradient(circle,${C.plum}25,transparent)`}}/>
      <div className="orb w-[300px] h-[300px] bottom-10 -left-10 opacity-20"
        style={{background:`radial-gradient(circle,${C.violet}20,transparent)`}}/>

      <div className="mirra-container-narrow w-full flex flex-col items-center">
        {/* Progress */}
        <div className="w-full mb-8 pt-4">
          <div className="flex items-center justify-between mb-4">
            <button onClick={handleBack} disabled={step === 0}
              className="flex items-center gap-1 text-sm transition-colors disabled:opacity-30"
              style={{color:C.muted,fontFamily:'DM Sans'}}>
              <ChevronLeft size={16}/> Back
            </button>
            <div className="flex items-center gap-1.5">
              {quizQuestions.map((_, i) => (
                <div key={i} className="h-1 rounded-full transition-all duration-500"
                  style={{
                    width: i < step ? '24px' : i === step ? '32px' : '16px',
                    background: i <= step ? `linear-gradient(90deg,${C.plum},${C.violet})` : C.subtle,
                  }}/>
              ))}
            </div>
            <span className="text-xs font-display" style={{color:C.muted}}>{step + 1}/{quizQuestions.length}</span>
          </div>
        </div>

        {/* Question */}
        <div className="w-full mb-7 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 mx-auto sm:mx-0"
            style={{background:`linear-gradient(135deg,${C.plum},${C.violet})`}}>
            <MirraLogo size={24}/>
          </div>
          <h1 className="font-display font-extrabold text-white mb-2 leading-tight"
            style={{fontSize:'clamp(1.4rem,5vw,2rem)'}}>
            {question.question}
          </h1>
          {question.subtitle && (
            <p className="text-sm" style={{color:C.muted,fontFamily:'DM Sans'}}>{question.subtitle}</p>
          )}
        </div>

        {/* Options */}
        <div className="w-full grid grid-cols-2 gap-3 mb-8">
          {question.options.map(option => {
            const isActive = selected === option.id;
            const icon = OPTION_ICONS[option.id];
            return (
              <button key={option.id} onClick={() => setSelected(option.id)}
                className="relative rounded-2xl p-4 text-left transition-all duration-200 cursor-pointer"
                style={{
                  border: `2px solid ${isActive ? C.violet : 'rgba(196,181,253,0.1)'}`,
                  background: isActive ? `${C.violet}12` : 'rgba(196,181,253,0.03)',
                  backdropFilter: 'blur(20px)',
                  transform: isActive ? 'scale(1.02)' : 'scale(1)',
                }}>
                {isActive && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{background:`linear-gradient(135deg,${C.plum},${C.violet})`}}>
                    <Check size={10} className="text-white"/>
                  </div>
                )}
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-2.5"
                  style={{
                    background: isActive ? `${C.violet}30` : 'rgba(196,181,253,0.06)',
                    color: isActive ? C.lavender : C.muted,
                  }}>
                  {icon}
                </div>
                <div className="font-display font-bold text-sm leading-snug"
                  style={{color: isActive ? C.pearl : '#D1D5DB'}}>
                  {option.label}
                </div>
              </button>
            );
          })}
        </div>

        <button onClick={handleNext} disabled={!selected}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-display font-bold text-base text-white transition-all disabled:opacity-40"
          style={{
            background: selected ? `linear-gradient(135deg,${C.plum},${C.violet})` : C.subtle,
            boxShadow: selected ? `0 8px 32px ${C.plum}50` : 'none',
          }}>
          {isLast ? <><Sparkles size={16}/> Build my MIRRA Self</> : <>Continue <ChevronRight size={16}/></>}
        </button>
        <p className="text-xs mt-4 text-center" style={{color:C.subtle}}>Your answers shape your identity — update anytime</p>
      </div>
    </div>
  );
}
