'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { quizQuestions } from '@/lib/data';
import { MirraLogo, C } from '@/components/ui';

export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);

  const question = quizQuestions[step];
  const isLast = step === quizQuestions.length - 1;

  function handleNext() {
    if (!selected) return;
    const newAnswers = { ...answers, [question.id]: selected };
    setAnswers(newAnswers);
    if (isLast) {
      // TODO: connect to Supabase — save quiz answers to profiles table
      sessionStorage.setItem('mirra_quiz', JSON.stringify(newAnswers));
      router.push('/profile');
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

  return (
    <div className="min-h-screen relative flex flex-col items-center px-4 pt-20 pb-10 overflow-hidden">
      <div className="orb w-80 h-80 -top-20 -right-20 opacity-35"
        style={{background:`radial-gradient(circle,${C.plum}25,transparent)`}}/>
      <div className="orb w-64 h-64 bottom-10 -left-10 opacity-20"
        style={{background:`radial-gradient(circle,${C.violet}20,transparent)`}}/>

      {/* Progress track */}
      <div className="w-full max-w-sm mb-8 pt-4">
        <div className="flex items-center justify-between mb-3">
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
          <span className="text-xs font-display" style={{color:C.muted}}>
            {step + 1} / {quizQuestions.length}
          </span>
        </div>
      </div>

      {/* Question */}
      <div className="w-full max-w-sm mb-7">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
          style={{background:`linear-gradient(135deg,${C.plum},${C.violet})`}}>
          <MirraLogo size={24}/>
        </div>
        <h1 className="font-display font-extrabold text-2xl text-white mb-2 leading-tight">
          {question.question}
        </h1>
        {question.subtitle && (
          <p className="text-sm" style={{color:C.muted,fontFamily:'DM Sans'}}>{question.subtitle}</p>
        )}
      </div>

      {/* Options */}
      <div className="w-full max-w-sm grid grid-cols-2 gap-3 mb-8">
        {question.options.map(option => {
          const isActive = selected === option.id;
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
              <div className="text-2xl mb-2">{option.emoji}</div>
              <div className="font-display font-bold text-sm leading-tight"
                style={{color: isActive ? C.pearl : '#D1D5DB'}}>
                {option.label}
              </div>
            </button>
          );
        })}
      </div>

      {/* CTA */}
      <button onClick={handleNext} disabled={!selected}
        className="w-full max-w-sm flex items-center justify-center gap-2 py-4 rounded-2xl font-display font-bold text-base text-white transition-all disabled:opacity-40"
        style={{
          background: selected ? `linear-gradient(135deg,${C.plum},${C.violet})` : C.subtle,
          boxShadow: selected ? `0 8px 32px ${C.plum}50` : 'none',
        }}>
        {isLast ? '✦ Build my MIRRA Self' : 'Continue'}
        {!isLast && <ChevronRight size={16}/>}
      </button>

      <p className="text-xs mt-4 text-center" style={{color:C.subtle}}>
        Your answers shape your identity — update anytime
      </p>
    </div>
  );
}
