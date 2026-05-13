// MIRRA Mock Data
// TODO: Replace with Supabase queries once database is connected.

export type Rarity = 'common' | 'rare' | 'epic' | 'legendary';
export type Country = 'us' | 'uk' | 'jp';

// Rarity config — communicated through craft/curation, not gambling language
export const RARITY_CONFIG: Record<Rarity, { label: string; color: string; bg: string; border: string }> = {
  common:    { label: 'Original',  color: '#A1A1AA', bg: 'rgba(113,113,122,0.12)', border: 'rgba(113,113,122,0.3)'  },
  rare:      { label: 'Limited',   color: '#C4B5FD', bg: 'rgba(196,181,253,0.1)',  border: 'rgba(139,92,246,0.4)'   },
  epic:      { label: 'Exclusive', color: '#8B5CF6', bg: 'rgba(139,92,246,0.12)', border: 'rgba(196,181,253,0.5)'  },
  legendary: { label: 'Signature',color: '#22D3EE', bg: 'rgba(34,211,238,0.1)',  border: 'rgba(34,211,238,0.5)'   },
};

// Item type -> emoji
export const ITEM_EMOJI: Record<string, string> = {
  'Profile Charm':  '✦',
  'Profile Effect': '◈',
  'Identity Badge': '◉',
  'Avatar Layer':   '◬',
  'Avatar Item':    '◍',
  'Room Object':    '◰',
};

// Item gradient strings — static, safe to use in inline styles
export const ITEM_GRADIENTS: Record<string, string> = {
  'neon-koi':     'linear-gradient(135deg, #6D28D9, #22D3EE)',
  'pixel-rain':   'linear-gradient(135deg, #4C1D95, #8B5CF6)',
  'arcade-badge': 'linear-gradient(135deg, #1E3A5F, #8B5CF6)',
  'night-bag':    'linear-gradient(135deg, #1F2937, #374151)',
  'golden-halo':  'linear-gradient(135deg, #92400E, #D97706)',
  'soft-launch':  'linear-gradient(135deg, #6D28D9, #C4B5FD)',
  'sunflare':     'linear-gradient(135deg, #D97706, #F472B6)',
  'camden-patch': 'linear-gradient(135deg, #500F4A, #8B5CF6)',
  'study-aura':   'linear-gradient(135deg, #1C1C4E, #3730A3)',
  'cozy-candle':  'linear-gradient(135deg, #1A1028, #6D28D9)',
  'starter':      'linear-gradient(135deg, #1F2937, #374151)',
};

// World hero gradient strings
export const WORLD_GRADIENTS: Record<string, { bg: string; accent: string }> = {
  'tokyo-night-arcade':  { bg: 'linear-gradient(135deg, #1A1028 0%, #3B1580 60%, #6D28D9 100%)', accent: '#8B5CF6' },
  'london-alt-summer':   { bg: 'linear-gradient(135deg, #1A1028 0%, #500F4A 60%, #8B348A 100%)', accent: '#C4B5FD' },
  'la-soft-launch':      { bg: 'linear-gradient(135deg, #1A1028 0%, #1E3A5F 60%, #2563EB 100%)', accent: '#60A5FA' },
  'cozy-horror-weekend': { bg: 'linear-gradient(135deg, #08070D 0%, #1A1028 60%, #2D1B69 100%)', accent: '#A78BFA' },
  'festival-fit-lab':    { bg: 'linear-gradient(135deg, #1A1028 0%, #2D1B69 60%, #4C1D95 100%)', accent: '#A78BFA' },
  'study-cafe-quest':    { bg: 'linear-gradient(135deg, #1A1028 0%, #1C1C4E 60%, #3730A3 100%)', accent: '#818CF8' },
};

export interface World {
  id: string;
  name: string;
  nameJp?: string;
  tagline: string;
  emoji: string;
  creatorName: string;
  creatorHandle: string;
  questCount: number;
  itemCount: number;
  daysLeft: number;
  tags: string[];
  featured?: boolean;
}

export interface DropItem {
  name: string;
  type: string;
  rarity: Rarity;
  gradientKey: string;
}

export interface Drop {
  id: string;
  title: string;
  creatorName: string;
  creatorHandle: string;
  tagline: string;
  gradientKey: string;
  price: { us: number; uk: number; jp: number };
  items: DropItem[];
  questCount: number;
  hoursLeft: number;
  totalSlots: number;
  claimedSlots: number;
  tags: string[];
}

export interface CollectionItem {
  id: string;
  name: string;
  type: string;
  rarity: Rarity;
  gradientKey: string;
  acquired: string;
  worldId?: string;
  tradeValue: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  subtitle?: string;
  options: QuizOption[];
}

export interface QuizOption {
  id: string;
  label: string;
  emoji: string;
  tags: string[];
}

export const worlds: World[] = [
  {
    id: 'tokyo-night-arcade',
    name: 'Tokyo Night Arcade',
    nameJp: '東京夜のアーケード',
    tagline: 'Neon-soaked pixel energy meets chill J-city vibes',
    emoji: '🎮',
    creatorName: 'Yuki Tanaka',
    creatorHandle: '@yukitanaka',
    questCount: 7,
    itemCount: 12,
    daysLeft: 4,
    tags: ['anime', 'gaming', 'japan'],
    featured: true,
  },
  {
    id: 'london-alt-summer',
    name: 'London Alt-Summer',
    tagline: 'Charity shop couture, Camden energy, rain-soaked cool',
    emoji: '🌧️',
    creatorName: 'Ines Okafor',
    creatorHandle: '@inesokafor',
    questCount: 5,
    itemCount: 9,
    daysLeft: 6,
    tags: ['fashion', 'music', 'uk'],
  },
  {
    id: 'la-soft-launch',
    name: 'LA Soft-Launch Era',
    tagline: 'Main character energy, golden hour, new beginnings',
    emoji: '☀️',
    creatorName: 'Jade Williams',
    creatorHandle: '@jadewilliams',
    questCount: 6,
    itemCount: 10,
    daysLeft: 3,
    tags: ['beauty', 'fashion', 'us'],
  },
  {
    id: 'cozy-horror-weekend',
    name: 'Cozy Horror Weekend',
    tagline: 'Blanket, candles, jump scares, and emotional damage',
    emoji: '🕯️',
    creatorName: 'Marcus Chen',
    creatorHandle: '@marcuschen',
    questCount: 4,
    itemCount: 7,
    daysLeft: 2,
    tags: ['gaming', 'creators'],
  },
  {
    id: 'festival-fit-lab',
    name: 'Festival Fit Lab',
    tagline: 'Build your perfect stage-ready identity drop by drop',
    emoji: '🎪',
    creatorName: 'Priya Sharma',
    creatorHandle: '@priyasharma',
    questCount: 8,
    itemCount: 14,
    daysLeft: 7,
    tags: ['music', 'fashion', 'events'],
  },
  {
    id: 'study-cafe-quest',
    name: 'Study Café Quest',
    tagline: 'Soft productivity, matcha rituals, and focus rewards',
    emoji: '📚',
    creatorName: 'Hana Yamamoto',
    creatorHandle: '@hanayama',
    questCount: 5,
    itemCount: 8,
    daysLeft: 5,
    tags: ['japan', 'food', 'creators'],
  },
];

export const drops: Drop[] = [
  {
    id: 'tokyo-starter',
    title: 'Tokyo Night Arcade Starter Pack',
    creatorName: 'Yuki Tanaka',
    creatorHandle: '@yukitanaka',
    tagline: 'First-access digital identity kit for the Tokyo Night Arcade world. Four items, three quests, one real-world perk.',
    gradientKey: 'tokyo-night-arcade',
    price: { us: 7.99, uk: 6.99, jp: 900 },
    items: [
      { name: 'Neon Koi Charm',    type: 'Profile Charm',  rarity: 'epic',   gradientKey: 'neon-koi'    },
      { name: 'Pixel Rain Effect', type: 'Profile Effect', rarity: 'rare',   gradientKey: 'pixel-rain'  },
      { name: 'Arcade Badge',      type: 'Identity Badge', rarity: 'rare',   gradientKey: 'arcade-badge'},
      { name: 'Night Haul Bag',    type: 'Avatar Item',    rarity: 'common', gradientKey: 'night-bag'   },
    ],
    questCount: 3,
    hoursLeft: 47,
    totalSlots: 500,
    claimedSlots: 312,
    tags: ['anime', 'gaming', 'japan'],
  },
  {
    id: 'jade-golden',
    title: 'Golden Hour Creator Kit',
    creatorName: 'Jade Williams',
    creatorHandle: '@jadewilliams',
    tagline: 'Exclusive LA creator drop — main character edition. Signature halo, launch badge, sunflare effect.',
    gradientKey: 'la-soft-launch',
    price: { us: 12.99, uk: 10.99, jp: 1500 },
    items: [
      { name: 'Golden Halo',       type: 'Avatar Layer',   rarity: 'legendary', gradientKey: 'golden-halo' },
      { name: 'Soft Launch Badge', type: 'Identity Badge', rarity: 'epic',      gradientKey: 'soft-launch' },
      { name: 'Sunflare Effect',   type: 'Profile Effect', rarity: 'epic',      gradientKey: 'sunflare'    },
    ],
    questCount: 4,
    hoursLeft: 12,
    totalSlots: 250,
    claimedSlots: 218,
    tags: ['beauty', 'fashion', 'us'],
  },
];

export const collectionItems: CollectionItem[] = [
  { id: '1', name: 'Neon Koi Charm',    type: 'Profile Charm',  rarity: 'epic',      gradientKey: 'neon-koi',     acquired: '2 days ago',  worldId: 'tokyo-night-arcade', tradeValue: 120 },
  { id: '2', name: 'Rain Badge',         type: 'Identity Badge', rarity: 'rare',      gradientKey: 'arcade-badge', acquired: '5 days ago',                                  tradeValue: 60  },
  { id: '3', name: 'Camden Patch',       type: 'Avatar Layer',   rarity: 'rare',      gradientKey: 'camden-patch', acquired: '1 week ago',  worldId: 'london-alt-summer',  tradeValue: 75  },
  { id: '4', name: 'Golden Halo',        type: 'Avatar Layer',   rarity: 'legendary', gradientKey: 'golden-halo',  acquired: '1 week ago',                                  tradeValue: 400 },
  { id: '5', name: 'Soft Launch Badge',  type: 'Identity Badge', rarity: 'epic',      gradientKey: 'soft-launch',  acquired: '2 weeks ago', worldId: 'la-soft-launch',     tradeValue: 150 },
  { id: '6', name: 'Study Aura',         type: 'Profile Effect', rarity: 'common',    gradientKey: 'study-aura',   acquired: '3 weeks ago',                                 tradeValue: 25  },
  { id: '7', name: 'Pixel Rain Effect',  type: 'Profile Effect', rarity: 'rare',      gradientKey: 'pixel-rain',   acquired: '1 month ago', worldId: 'tokyo-night-arcade', tradeValue: 80  },
  { id: '8', name: 'Cozy Candle',        type: 'Room Object',    rarity: 'common',    gradientKey: 'cozy-candle',  acquired: '1 month ago',                                 tradeValue: 30  },
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'aesthetic',
    question: 'Which vibe matches your soul?',
    subtitle: 'Pick the world that feels like home',
    options: [
      { id: 'dark-academia', label: 'Dark Academia', emoji: '📖', tags: ['intellectual', 'cozy', 'vintage'] },
      { id: 'cyber-pop',     label: 'Cyber Pop',     emoji: '💜', tags: ['tech', 'neon', 'futuristic']      },
      { id: 'soft-life',     label: 'Soft Life',     emoji: '🌸', tags: ['minimal', 'pastel', 'calm']       },
      { id: 'streetcore',    label: 'Streetcore',    emoji: '🔥', tags: ['urban', 'bold', 'raw']            },
    ],
  },
  {
    id: 'fandom',
    question: 'Where do you live online?',
    subtitle: 'Your digital home energy',
    options: [
      { id: 'anime',   label: 'Anime & Manga',    emoji: '⛩️', tags: ['anime', 'japan', 'lore']     },
      { id: 'gaming',  label: 'Gaming Worlds',    emoji: '🎮', tags: ['gaming', 'esports', 'stream'] },
      { id: 'music',   label: 'Music & Artists',  emoji: '🎧', tags: ['music', 'concerts', 'fandom'] },
      { id: 'fashion', label: 'Fashion & Beauty', emoji: '✨', tags: ['fashion', 'beauty', 'style']  },
    ],
  },
  {
    id: 'spending-mood',
    question: 'How do you like to support things you love?',
    subtitle: 'No pressure — just vibes',
    options: [
      { id: 'collector',  label: 'I collect meaningful things',  emoji: '🏺', tags: ['collector', 'intentional'] },
      { id: 'supporter',  label: 'I love supporting creators',   emoji: '💛', tags: ['supporter', 'community']   },
      { id: 'experience', label: 'Give me the experience',       emoji: '🌈', tags: ['experiential', 'moments']  },
      { id: 'earner',     label: 'I want to earn everything',    emoji: '⚡', tags: ['achievement', 'quests']    },
    ],
  },
  {
    id: 'platform',
    question: 'Which platform raised you?',
    options: [
      { id: 'tiktok',  label: 'TikTok / Reels',   emoji: '📱', tags: ['shortform', 'trend', 'viral']   },
      { id: 'youtube', label: 'YouTube / Twitch',  emoji: '▶️', tags: ['longform', 'community', 'deep'] },
      { id: 'twitter', label: 'Twitter / Threads', emoji: '💬', tags: ['text', 'discourse', 'niche']    },
      { id: 'discord', label: 'Discord / Reddit',  emoji: '🛡️', tags: ['community', 'lore', 'depth']   },
    ],
  },
  {
    id: 'social-style',
    question: 'What kind of online presence are you?',
    options: [
      { id: 'lurker',    label: 'Silent observer',      emoji: '👀', tags: ['introvert', 'watcher', 'private']  },
      { id: 'creator',   label: 'Content creator mode', emoji: '🎬', tags: ['creator', 'builder', 'visible']    },
      { id: 'connector', label: 'Community glue',       emoji: '🤝', tags: ['social', 'warm', 'connector']      },
      { id: 'curator',   label: 'Taste arbiter',        emoji: '🎯', tags: ['taste', 'opinion', 'influence']    },
    ],
  },
  {
    id: 'country',
    question: 'Where are you based?',
    subtitle: 'For personalised world drops and real-world perks',
    options: [
      { id: 'us',    label: 'United States',  emoji: '🇺🇸', tags: ['us']     },
      { id: 'uk',    label: 'United Kingdom', emoji: '🇬🇧', tags: ['uk']     },
      { id: 'jp',    label: 'Japan',          emoji: '🇯🇵', tags: ['jp']     },
      { id: 'other', label: 'Somewhere else', emoji: '🌍', tags: ['global'] },
    ],
  },
];

export const creatorBenefits = [
  { icon: '💰', title: 'Paid Micro-Clubs',    desc: 'Charge fans for exclusive world access — you set the price, keep 80%' },
  { icon: '🎯', title: 'Creator-Led Drops',   desc: 'Launch limited digital item collections tied to your personal brand'  },
  { icon: '⚡', title: 'Fan Quests',          desc: 'Design challenges that deepen fan relationships and drive engagement'  },
  { icon: '🏺', title: 'Digital Identity Items',desc: 'Co-design exclusive charms, badges, and effects with our design team' },
  { icon: '🤝', title: 'Real-World Perks',    desc: 'Partner with brands to offer exclusive IRL rewards to your fans'      },
  { icon: '📊', title: 'Creator Analytics',   desc: 'Understand your community identity beyond follows and likes'           },
];

export function buildProfile(answers: Record<string, string>) {
  const aesthetic = answers.aesthetic       || 'cyber-pop';
  const fandom    = answers.fandom          || 'anime';
  const mood      = answers['spending-mood']|| 'collector';
  const country   = answers.country         || 'jp';
  const social    = answers['social-style'] || 'curator';

  const AESTHETIC_MAP: Record<string, { name: string; gradientKey: string; emoji: string; tagline: string }> = {
    'dark-academia': { name: 'Dark Scholar', gradientKey: 'cozy-horror-weekend', emoji: '📖', tagline: 'Intellectual · Atmospheric · Layered' },
    'cyber-pop':     { name: 'Cyber Pop',    gradientKey: 'tokyo-night-arcade',  emoji: '💜', tagline: 'Neon-bright · Digitally native · Precise' },
    'soft-life':     { name: 'Soft Life',    gradientKey: 'study-cafe-quest',    emoji: '🌸', tagline: 'Minimal · Calm · Intentional' },
    'streetcore':    { name: 'Streetcore',   gradientKey: 'la-soft-launch',      emoji: '🔥', tagline: 'Loud · Real · Unfiltered' },
  };
  const FANDOM_MAP:  Record<string, string> = { anime: 'Anime Fan', gaming: 'Gamer', music: 'Music Head', fashion: 'Fashion Forward' };
  const MOOD_MAP:    Record<string, string> = { collector: 'Collector', supporter: 'Creator Supporter', experience: 'Experience Seeker', earner: 'Quest Earner' };
  const SOCIAL_MAP:  Record<string, string> = { lurker: 'Silent Observer', creator: 'Content Creator', connector: 'Community Connector', curator: 'Taste Curator' };
  const COUNTRY_MAP: Record<string, { label: string; flag: string; worldId: string }> = {
    us:    { label: 'United States',  flag: '🇺🇸', worldId: 'la-soft-launch'     },
    uk:    { label: 'United Kingdom', flag: '🇬🇧', worldId: 'london-alt-summer'  },
    jp:    { label: 'Japan',          flag: '🇯🇵', worldId: 'tokyo-night-arcade' },
    other: { label: 'Global',         flag: '🌍', worldId: 'festival-fit-lab'   },
  };

  const aestheticProfile = AESTHETIC_MAP[aesthetic] || AESTHETIC_MAP['cyber-pop'];
  const countryProfile   = COUNTRY_MAP[country]     || COUNTRY_MAP.jp;
  const recommendedWorld = worlds.find(w => w.id === countryProfile.worldId) || worlds[0];

  const tags = [
    FANDOM_MAP[fandom]  || fandom,
    MOOD_MAP[mood]      || mood,
    SOCIAL_MAP[social]  || social,
    aestheticProfile.name,
  ];

  const tasteGraph = [
    { label: 'Anime & Manga',   value: fandom === 'anime'    ? 88 : 28, color: '#8B5CF6' },
    { label: 'Fashion & Style', value: fandom === 'fashion'  ? 82 : 40, color: '#C4B5FD' },
    { label: 'Gaming',          value: fandom === 'gaming'   ? 85 : 22, color: '#6D28D9' },
    { label: 'Music & Artists', value: fandom === 'music'    ? 90 : 32, color: '#A78BFA' },
    { label: 'Creator Culture', value: mood   === 'supporter'? 78 : 48, color: '#22D3EE' },
  ];

  return { displayName: 'Yuki', aesthetic: aestheticProfile, country: countryProfile, tags, tasteGraph, recommendedWorld, recommendedDrop: drops[0], level: 1 };
}
