'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { quizQuestions } from '@/lib/data';
import { MirraLogo } from '@/components/ui';

export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);

  const question = quizQuestions[step];
  const isLast = step === quizQuestions.length - 1;

  function handleSelect(optionId: string) {
    setSelected(optionId);
  }

  function handleNext() {
    if (!selected) return;
    const newAnswers = { ...answers, [question.id]: selected };
    setAnswers(newAnswers);
    if (isLast) {
      // TODO: connect to Supabase — save user quiz results to profiles table
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

  const gradients = [
    'from-[#c084fc] to-[#818cf8]',
    'from-[#f472b6] to-[#c084fc]',
    'from-[#fbbf24] to-[#f472b6]',
    'from-[#34d399] to-[#818cf8]',
    'from-[#818cf8] to-[#34d399]',
    'from-[#c084fc] to-[#f472b6]',
  ];
  const activeGradient = gradients[step % gradients.length];

  return (
    <div className="min-h-screen relative flex flex-col items-center px-4 pt-20 pb-10 overflow-hidden">
      <div className="orb w-80 h-80 -top-20 -right-20 opacity-40"
        style={{background:`radial-gradient(circle,${step % 2 === 0 ? '#c084fc25' : '#f472b825'},transparent)`}}/>
      <div className="orb w-64 h-64 bottom-10 -left-10 opacity-30"
        style={{background:'radial-gradient(circle,#818cf825,transparent)'}}/>

      {/* Progress */}
      <div className="w-full max-w-sm mb-8 pt-4">
        <div className="flex items-center justify-between mb-3">
          <button onClick={handleBack} disabled={step === 0}
            className="text-[#6b7280] hover:text-white transition-colors disabled:opacity-30 flex items-center gap-1 text-sm font-body">
            <ChevronLeft size={16}/> Back
          </button>
          <div className="flex items-center gap-1.5">
            {quizQuestions.map((_, i) => (
              <div key={i} className="h-1 rounded-full transition-all duration-500"
                style={{
                  width: i < step ? '24px' : i === step ? '32px' : '16px',
                  background: i <= step ? 'linear-gradient(90deg,#c084fc,#818cf8)' : '#374151'
                }}/>
            ))}
          </div>
          <span className="text-[#6b7280] text-xs font-display">{step + 1} / {quizQuestions.length}</span>
        </div>
      </div>

      {/* Question card */}
      <div className="w-full max-w-sm mb-8">
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br ${activeGradient} mb-5`}>
          <MirraLogo size={24}/>
        </div>
        <h1 className="font-display font-800 text-2xl text-white mb-2 leading-tight">{question.question}</h1>
        {question.subtitle && <p className="text-[#9ca3af] text-sm font-body">{question.subtitle}</p>}
      </div>

      {/* Options */}
      <div className="w-full max-w-sm grid grid-cols-2 gap-3 mb-8">
        {question.options.map(option => {
          const isActive = selected === option.id;
          return (
            <button key={option.id} onClick={() => handleSelect(option.id)}
              className="relative rounded-2xl p-4 text-left transition-all duration-200 cursor-pointer"
              style={{
                border: `2px solid ${isActive ? '#c084fc' : 'rgba(255,255,255,0.08)'}`,
                background: isActive ? 'rgba(192,132,252,0.08)' : 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(20px)',
                transform: isActive ? 'scale(1.02)' : 'scale(1)',
              }}>
              {isActive && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-gradient-to-br from-[#c084fc] to-[#818cf8] flex items-center justify-center">
                  <Check size={10} className="text-white"/>
                </div>
              )}
              <div className="text-2xl mb-2">{option.emoji}</div>
              <div className="font-display font-700 text-sm leading-tight"
                style={{color: isActive ? '#fff' : '#d1d5db'}}>
                {option.label}
              </div>
            </button>
          );
        })}
      </div>

      {/* CTA */}
      <button onClick={handleNext} disabled={!selected}
        className="w-full max-w-sm flex items-center justify-center gap-2 py-4 rounded-2xl font-display font-700 text-base text-white transition-all disabled:opacity-40"
        style={{
          background: selected ? 'linear-gradient(135deg,#c084fc,#818cf8)' : '#1f2937',
          boxShadow: selected ? '0 8px 32px rgba(192,132,252,0.35)' : 'none',
        }}>
        {isLast ? '✨ Build my MIRRA Self' : 'Continue'}
        {!isLast && <ChevronRight size={16}/>}
      </button>

      <p className="text-[#374151] text-xs mt-4 font-body text-center">
        Your answers shape your identity — update anytime
      </p>
    </div>
  );
}
