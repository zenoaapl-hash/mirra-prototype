// MIRRA Mock Data — connect to Supabase for real data

export type Rarity = 'common' | 'rare' | 'epic' | 'legendary';
export type Country = 'us' | 'uk' | 'jp';

export interface World {
  id: string;
  name: string;
  nameJp?: string;
  tagline: string;
  emoji: string;
  gradient: string;
  textColor: string;
  creator: string;
  creatorHandle: string;
  questCount: number;
  itemCount: number;
  daysLeft: number;
  participants: number;
  tags: string[];
  featured?: boolean;
}

export interface Drop {
  id: string;
  title: string;
  creator: string;
  creatorHandle: string;
  creatorFollowers: string;
  tagline: string;
  gradient: string;
  price: { us: number; uk: number; jp: number };
  items: DropItem[];
  questCount: number;
  hoursLeft: number;
  totalSlots: number;
  claimedSlots: number;
  tags: string[];
}

export interface DropItem {
  name: string;
  type: string;
  rarity: Rarity;
  gradient: string;
}

export interface CollectionItem {
  id: string;
  name: string;
  type: string;
  rarity: Rarity;
  gradient: string;
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
    gradient: 'from-[#c084fc] via-[#818cf8] to-[#34d399]',
    textColor: '#c084fc',
    creator: 'Yuki Tanaka',
    creatorHandle: '@yukitanaka',
    questCount: 7,
    itemCount: 12,
    daysLeft: 4,
    participants: 12847,
    tags: ['anime', 'gaming', 'japan'],
    featured: true,
  },
  {
    id: 'london-alt-summer',
    name: 'London Alt-Summer',
    tagline: 'Charity shop couture, Camden energy, rain-soaked cool',
    emoji: '🌧️',
    gradient: 'from-[#f472b6] via-[#c084fc] to-[#818cf8]',
    textColor: '#f472b6',
    creator: 'Ines Okafor',
    creatorHandle: '@inesokafor',
    questCount: 5,
    itemCount: 9,
    daysLeft: 6,
    participants: 8234,
    tags: ['fashion', 'music', 'uk'],
  },
  {
    id: 'la-soft-launch',
    name: 'LA Soft-Launch Era',
    tagline: 'Main character energy, golden hour, new beginnings',
    emoji: '☀️',
    gradient: 'from-[#fbbf24] via-[#f472b6] to-[#c084fc]',
    textColor: '#fbbf24',
    creator: 'Jade Williams',
    creatorHandle: '@jadewilliams',
    questCount: 6,
    itemCount: 10,
    daysLeft: 3,
    participants: 15621,
    tags: ['beauty', 'fashion', 'creators'],
  },
  {
    id: 'cozy-horror-weekend',
    name: 'Cozy Horror Weekend',
    tagline: 'Blanket, candles, jump scares, and emotional damage',
    emoji: '🕯️',
    gradient: 'from-[#374151] via-[#1f2937] to-[#c084fc]',
    textColor: '#a78bfa',
    creator: 'Marcus Chen',
    creatorHandle: '@marcuschen',
    questCount: 4,
    itemCount: 7,
    daysLeft: 2,
    participants: 6892,
    tags: ['gaming', 'creators'],
  },
  {
    id: 'festival-fit-lab',
    name: 'Festival Fit Lab',
    tagline: 'Build your perfect stage-ready identity drop by drop',
    emoji: '🎪',
    gradient: 'from-[#34d399] via-[#818cf8] to-[#f472b6]',
    textColor: '#34d399',
    creator: 'Priya Sharma',
    creatorHandle: '@priyasharma',
    questCount: 8,
    itemCount: 14,
    daysLeft: 7,
    participants: 9341,
    tags: ['music', 'fashion', 'events'],
  },
  {
    id: 'study-cafe-quest',
    name: 'Study Café Quest',
    tagline: 'Soft productivity, matcha rituals, and focus rewards',
    emoji: '📚',
    gradient: 'from-[#a3e635] via-[#34d399] to-[#818cf8]',
    textColor: '#a3e635',
    creator: 'Hana Yamamoto',
    creatorHandle: '@hanayama',
    questCount: 5,
    itemCount: 8,
    daysLeft: 5,
    participants: 7156,
    tags: ['japan', 'food', 'creators'],
  },
];

export const drops: Drop[] = [
  {
    id: 'tokyo-starter',
    title: 'Tokyo Night Arcade Starter Pack',
    creator: 'Yuki Tanaka',
    creatorHandle: '@yukitanaka',
    creatorFollowers: '847K',
    tagline: 'Limited first-access digital identity kit for the Tokyo Night Arcade world',
    gradient: 'from-[#c084fc] to-[#34d399]',
    price: { us: 7.99, uk: 6.99, jp: 900 },
    items: [
      { name: 'Neon Koi Charm', type: 'Profile Charm', rarity: 'epic', gradient: 'from-[#c084fc] to-[#34d399]' },
      { name: 'Pixel Rain Effect', type: 'Profile Effect', rarity: 'rare', gradient: 'from-[#818cf8] to-[#c084fc]' },
      { name: 'Arcade Badge', type: 'Identity Badge', rarity: 'rare', gradient: 'from-[#34d399] to-[#818cf8]' },
      { name: 'Night Haul Bag', type: 'Avatar Item', rarity: 'common', gradient: 'from-[#374151] to-[#6b7280]' },
    ],
    questCount: 3,
    hoursLeft: 47,
    totalSlots: 5000,
    claimedSlots: 3284,
    tags: ['anime', 'gaming', 'japan'],
  },
  {
    id: 'jade-golden',
    title: 'Golden Hour Creator Kit',
    creator: 'Jade Williams',
    creatorHandle: '@jadewilliams',
    creatorFollowers: '1.2M',
    tagline: 'Exclusive LA creator drop — main character edition',
    gradient: 'from-[#fbbf24] to-[#f472b6]',
    price: { us: 12.99, uk: 10.99, jp: 1500 },
    items: [
      { name: 'Golden Halo', type: 'Avatar Layer', rarity: 'legendary', gradient: 'from-[#fbbf24] to-[#f59e0b]' },
      { name: 'Soft Launch Badge', type: 'Identity Badge', rarity: 'epic', gradient: 'from-[#f472b6] to-[#c084fc]' },
      { name: 'Sunflare Effect', type: 'Profile Effect', rarity: 'epic', gradient: 'from-[#fbbf24] to-[#f472b6]' },
    ],
    questCount: 4,
    hoursLeft: 12,
    totalSlots: 2500,
    claimedSlots: 2198,
    tags: ['beauty', 'fashion', 'creators'],
  },
];

export const collectionItems: CollectionItem[] = [
  { id: '1', name: 'Neon Koi Charm', type: 'Profile Charm', rarity: 'epic', gradient: 'from-[#c084fc] to-[#34d399]', acquired: '2 days ago', worldId: 'tokyo-night-arcade', tradeValue: 120 },
  { id: '2', name: 'Rain Badge', type: 'Identity Badge', rarity: 'rare', gradient: 'from-[#818cf8] to-[#c084fc]', acquired: '5 days ago', tradeValue: 60 },
  { id: '3', name: 'Camden Patch', type: 'Avatar Layer', rarity: 'rare', gradient: 'from-[#f472b6] to-[#c084fc]', acquired: '1 week ago', worldId: 'london-alt-summer', tradeValue: 75 },
  { id: '4', name: 'Golden Halo', type: 'Avatar Layer', rarity: 'legendary', gradient: 'from-[#fbbf24] to-[#f59e0b]', acquired: '1 week ago', tradeValue: 400 },
  { id: '5', name: 'Soft Launch Badge', type: 'Identity Badge', rarity: 'epic', gradient: 'from-[#f472b6] to-[#c084fc]', acquired: '2 weeks ago', worldId: 'la-soft-launch', tradeValue: 150 },
  { id: '6', name: 'Study Aura', type: 'Profile Effect', rarity: 'common', gradient: 'from-[#a3e635] to-[#34d399]', acquired: '3 weeks ago', tradeValue: 25 },
  { id: '7', name: 'Pixel Rain Effect', type: 'Profile Effect', rarity: 'rare', gradient: 'from-[#818cf8] to-[#34d399]', acquired: '1 month ago', tradeValue: 80 },
  { id: '8', name: 'Cozy Candle', type: 'Room Object', rarity: 'common', gradient: 'from-[#374151] to-[#c084fc]', acquired: '1 month ago', tradeValue: 30 },
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'aesthetic',
    question: 'Which vibe matches your soul?',
    subtitle: 'Pick the world that feels like home',
    options: [
      { id: 'dark-academia', label: 'Dark Academia', emoji: '📖', tags: ['intellectual', 'cozy', 'vintage'] },
      { id: 'cyber-pop', label: 'Cyber Pop', emoji: '💜', tags: ['tech', 'neon', 'futuristic'] },
      { id: 'soft-life', label: 'Soft Life', emoji: '🌸', tags: ['minimal', 'pastel', 'calm'] },
      { id: 'streetcore', label: 'Streetcore', emoji: '🔥', tags: ['urban', 'bold', 'raw'] },
    ],
  },
  {
    id: 'fandom',
    question: 'Where do you live online?',
    subtitle: 'Your digital home energy',
    options: [
      { id: 'anime', label: 'Anime & Manga', emoji: '⛩️', tags: ['anime', 'japan', 'lore'] },
      { id: 'gaming', label: 'Gaming Worlds', emoji: '🎮', tags: ['gaming', 'esports', 'stream'] },
      { id: 'music', label: 'Music & Artists', emoji: '🎧', tags: ['music', 'concerts', 'fandom'] },
      { id: 'fashion', label: 'Fashion & Beauty', emoji: '✨', tags: ['fashion', 'beauty', 'style'] },
    ],
  },
  {
    id: 'spending-mood',
    question: 'How do you feel about treating yourself?',
    subtitle: 'No judgment — just vibes',
    options: [
      { id: 'collector', label: 'I collect meaningful things', emoji: '🏺', tags: ['collector', 'intentional'] },
      { id: 'supporter', label: 'I love supporting creators I adore', emoji: '💛', tags: ['supporter', 'community'] },
      { id: 'experience', label: 'Give me the experience', emoji: '🌈', tags: ['experiential', 'moments'] },
      { id: 'earner', label: 'I want to earn everything', emoji: '⚡', tags: ['achievement', 'quests'] },
    ],
  },
  {
    id: 'platform',
    question: 'Which platform raised you?',
    options: [
      { id: 'tiktok', label: 'TikTok / Reels', emoji: '📱', tags: ['shortform', 'trend', 'viral'] },
      { id: 'youtube', label: 'YouTube / Twitch', emoji: '▶️', tags: ['longform', 'community', 'deep'] },
      { id: 'twitter', label: 'Twitter / X / Threads', emoji: '💬', tags: ['text', 'discourse', 'niche'] },
      { id: 'discord', label: 'Discord / Reddit', emoji: '🛡️', tags: ['community', 'lore', 'depth'] },
    ],
  },
  {
    id: 'social-style',
    question: 'What kind of online presence are you?',
    options: [
      { id: 'lurker', label: 'Silent observer 👀', emoji: '👀', tags: ['introvert', 'watcher', 'private'] },
      { id: 'creator', label: 'Content creator mode', emoji: '🎬', tags: ['creator', 'builder', 'visible'] },
      { id: 'connector', label: 'Community glue', emoji: '🤝', tags: ['social', 'warm', 'connector'] },
      { id: 'curator', label: 'Taste arbiter', emoji: '🎯', tags: ['taste', 'opinion', 'influence'] },
    ],
  },
  {
    id: 'country',
    question: 'Where are you based?',
    subtitle: 'For personalized world drops and perks',
    options: [
      { id: 'us', label: 'United States', emoji: '🇺🇸', tags: ['us'] },
      { id: 'uk', label: 'United Kingdom', emoji: '🇬🇧', tags: ['uk'] },
      { id: 'jp', label: 'Japan', emoji: '🇯🇵', tags: ['jp'] },
      { id: 'other', label: 'Somewhere else', emoji: '🌍', tags: ['global'] },
    ],
  },
];

export const creatorBenefits = [
  { icon: '💰', title: 'Paid Micro-Clubs', desc: 'Charge fans for exclusive world access — you set the price, keep 80%' },
  { icon: '🎯', title: 'Creator-Led Drops', desc: 'Launch limited digital item collections tied to your personal brand' },
  { icon: '⚡', title: 'Fan Quests', desc: 'Design challenges that deepen fan relationships and drive engagement' },
  { icon: '🏺', title: 'Digital Collectibles', desc: 'Co-design exclusive charms, badges, and effects with our design team' },
  { icon: '🤝', title: 'Real-World Perks', desc: 'Partner with brands to offer exclusive IRL rewards to your fans' },
  { icon: '📊', title: 'Creator Analytics', desc: 'Deep identity insights on your community — beyond follows and likes' },
];
