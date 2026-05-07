'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Share2, Edit3, Sparkles, ChevronRight } from 'lucide-react';
import { worlds, drops, quizQuestions } from '@/lib/data';
import { Avatar, ItemCard, TagChip, WorldCard, RarityBadge } from '@/components/ui';

function buildProfile(answers: Record<string, string>) {
  const aesthetic = answers.aesthetic || 'cyber-pop';
  const fandom = answers.fandom || 'anime';
  const mood = answers['spending-mood'] || 'collector';
  const country = answers.country || 'us';
  const social = answers['social-style'] || 'lurker';

  const aestheticMap: Record<string, { name: string; gradient: string; emoji: string }> = {
    'dark-academia': { name: 'Dark Scholar', gradient: 'from-[#374151] to-[#c084fc]', emoji: '📖' },
    'cyber-pop': { name: 'Cyber Pop', gradient: 'from-[#c084fc] to-[#818cf8]', emoji: '💜' },
    'soft-life': { name: 'Soft Life', gradient: 'from-[#f9a8d4] to-[#c084fc]', emoji: '🌸' },
    'streetcore': { name: 'Streetcore', gradient: 'from-[#fbbf24] to-[#f472b6]', emoji: '🔥' },
  };
  const fandomMap: Record<string, string> = {
    anime: 'Anime Fan', gaming: 'Gamer', music: 'Music Head', fashion: 'Fashion Forward',
  };
  const moodMap: Record<string, string> = {
    collector: 'Collector', supporter: 'Creator Supporter', experience: 'Experience Seeker', earner: 'Quest Earner',
  };
  const socialMap: Record<string, string> = {
    lurker: 'Silent Observer', creator: 'Content Creator', connector: 'Community Connector', curator: 'Taste Curator',
  };
  const countryMap: Record<string, { label: string; flag: string; worldId: string }> = {
    us: { label: 'United States', flag: '🇺🇸', worldId: 'la-soft-launch' },
    uk: { label: 'United Kingdom', flag: '🇬🇧', worldId: 'london-alt-summer' },
    jp: { label: 'Japan', flag: '🇯🇵', worldId: 'tokyo-night-arcade' },
    other: { label: 'Global', flag: '🌍', worldId: 'festival-fit-lab' },
  };

  const aestheticProfile = aestheticMap[aesthetic] || aestheticMap['cyber-pop'];
  const countryProfile = countryMap[country] || countryMap.us;
  const recommendedWorld = worlds.find(w => w.id === countryProfile.worldId) || worlds[0];
  const recommendedDrop = drops[0];

  const tags = [
    fandomMap[fandom] || fandom,
    moodMap[mood] || mood,
    socialMap[social] || social,
    aestheticProfile.name,
    countryProfile.label,
  ];

  const tasteGraph = [
    { label: 'Anime & Manga', value: fandom === 'anime' ? 90 : 30, color: '#c084fc' },
    { label: 'Fashion & Style', value: fandom === 'fashion' ? 85 : 40, color: '#f472b6' },
    { label: 'Gaming', value: fandom === 'gaming' ? 88 : 25, color: '#818cf8' },
    { label: 'Music & Artists', value: fandom === 'music' ? 92 : 35, color: '#34d399' },
    { label: 'Creator Culture', value: mood === 'supporter' ? 80 : 50, color: '#fbbf24' },
  ];

  return {
    name: 'My MIRRA Self',
    aesthetic: aestheticProfile,
    country: countryProfile,
    tags,
    tasteGraph,
    recommendedWorld,
    recommendedDrop,
    level: 1,
    xp: 0,
  };
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<ReturnType<typeof buildProfile> | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // TODO: connect to Supabase — fetch user profile from database
    const raw = sessionStorage.getItem('mirra_quiz');
    if (raw) {
      setProfile(buildProfile(JSON.parse(raw)));
    } else {
      // Default demo profile
      setProfile(buildProfile({ aesthetic: 'cyber-pop', fandom: 'anime', 'spending-mood': 'collector', country: 'jp', 'social-style': 'curator' }));
    }
  }, []);

  function handleShare() {
    navigator.clipboard?.writeText('https://mirra.app/profile/demo').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  if (!profile) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-[#c084fc] border-t-transparent animate-spin"/>
    </div>
  );

  return (
    <div className="min-h-screen px-4 pt-24 pb-16 max-w-sm mx-auto">
      <div className="orb w-80 h-80 top-0 -right-20 opacity-30"
        style={{background:'radial-gradient(circle,#c084fc20,transparent)'}}/>

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="text-xs font-display uppercase tracking-widest text-[#c084fc] mb-2"
            style={{letterSpacing:'0.14em'}}>Your MIRRA Self</div>
          <h1 className="font-display font-800 text-2xl text-white">Identity Profile</h1>
        </div>
        <div className="flex gap-2">
          <button onClick={handleShare}
            className="glass p-2.5 rounded-xl text-[#9ca3af] hover:text-white transition-colors">
            <Share2 size={16}/>
          </button>
          <Link href="/quiz" className="glass p-2.5 rounded-xl text-[#9ca3af] hover:text-white transition-colors">
            <Edit3 size={16}/>
          </Link>
        </div>
      </div>
      {copied && <div className="text-xs text-[#34d399] mb-3 font-body">Link copied!</div>}

      {/* Identity card */}
      <div className="glass rounded-3xl overflow-hidden mb-4 glow-aurora">
        <div className={`bg-gradient-to-br ${profile.aesthetic.gradient} h-24 relative flex items-center px-5`}>
          <div className="absolute inset-0 bg-black/30"/>
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center text-4xl">
              {profile.aesthetic.emoji}
            </div>
            <div>
              <div className="font-display font-800 text-xl text-white">{profile.aesthetic.name}</div>
              <div className="text-white/70 text-sm font-body">{profile.country.flag} {profile.country.label}</div>
            </div>
          </div>
          <div className="absolute top-3 right-3 glass px-2.5 py-1 rounded-full text-xs font-display"
            style={{color:'#fbbf24'}}>
            Lv {profile.level} · Founding Member
          </div>
        </div>
        <div className="p-4">
          <div className="flex flex-wrap gap-1.5 mb-4">
            {profile.tags.map((tag, i) => (
              <TagChip key={i} label={tag}
                color={['#c084fc','#818cf8','#f472b6','#34d399','#fbbf24'][i % 5]}/>
            ))}
          </div>
          {/* XP Bar */}
          <div>
            <div className="flex justify-between text-xs mb-1.5 font-body text-[#6b7280]">
              <span>Identity XP</span>
              <span className="text-[#c084fc]">0 / 500 to Level 2</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full w-0 rounded-full"
                style={{background:'linear-gradient(90deg,#c084fc,#818cf8)'}}/>
            </div>
            <p className="text-[#4b5563] text-xs mt-2 font-body">Complete quests and join worlds to earn XP</p>
          </div>
        </div>
      </div>

      {/* Taste Graph */}
      <div className="glass rounded-2xl p-4 mb-4">
        <div className="text-xs font-display uppercase tracking-widest text-[#6b7280] mb-4"
          style={{letterSpacing:'0.1em'}}>Taste Profile</div>
        <div className="space-y-3">
          {profile.tasteGraph.map(item => (
            <div key={item.label}>
              <div className="flex justify-between text-xs mb-1 font-body text-[#9ca3af]">
                <span>{item.label}</span>
                <span style={{color: item.color}}>{item.value}%</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-1000"
                  style={{width: `${item.value}%`, background: `linear-gradient(90deg,${item.color},${item.color}88)`}}/>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Collection placeholder */}
      <div className="glass rounded-2xl p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs font-display uppercase tracking-widest text-[#6b7280]"
            style={{letterSpacing:'0.1em'}}>Starter Items</div>
          <Link href="/collection" className="text-xs text-[#c084fc] font-body">View all →</Link>
        </div>
        <div className="flex gap-2">
          {[
            {g:'from-[#c084fc] to-[#34d399]', r:'rare', t:'Profile Charm'},
            {g:'from-[#818cf8] to-[#c084fc]', r:'common', t:'Identity Badge'},
            {g:'from-[#374151] to-[#6b7280]', r:'common', t:'Avatar Item'},
          ].map((item,i)=>(
            <ItemCard key={i} name="" type={item.t} rarity={item.r as any} gradient={item.g} size="md"/>
          ))}
          <div className="w-28 h-28 rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-1 text-[#4b5563]">
            <span className="text-xl">+</span>
            <span className="text-xs font-body">Earn more</span>
          </div>
        </div>
      </div>

      {/* Recommended World */}
      <div className="mb-4">
        <div className="text-xs font-display uppercase tracking-widest text-[#6b7280] mb-3"
          style={{letterSpacing:'0.1em'}}>Recommended for you</div>
        <WorldCard world={profile.recommendedWorld}/>
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-3">
        <Link href="/worlds"
          className="flex items-center justify-center gap-2 py-4 rounded-2xl font-display font-700 text-sm text-white"
          style={{background:'linear-gradient(135deg,#c084fc,#818cf8)',boxShadow:'0 8px 32px rgba(192,132,252,0.3)'}}>
          <Sparkles size={14}/> Enter a World
        </Link>
        <button onClick={handleShare}
          className="flex items-center justify-center gap-2 py-3.5 rounded-2xl font-display font-600 text-sm text-[#c084fc] glass border border-[#c084fc]/30 hover:border-[#c084fc]/60 transition-all">
          <Share2 size={14}/> Share my MIRRA Self
        </button>
      </div>
    </div>
  );
}
