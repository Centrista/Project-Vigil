export type PokemonScamType = "AI-Native" | "AI-Transformed" | "Traditional";
export type PokemonScamRarity = "Common" | "Uncommon" | "Rare";

export interface PokemonScam {
  id: number;
  number: number;
  slug: string;
  name: string;
  scamLabel: string;
  image: string;
  type: PokemonScamType;
  rarity: PokemonScamRarity;
  threatLevel: 1 | 2 | 3 | 4 | 5;
  pokemonType: string[];
  strengths: string[];
  weaknesses: string[];
  habitat: string;
  description: string;
  aiPowerup?: string;
  relatedScamId?: number;
}

export const POKEDEX_TYPE_META: Record<
  PokemonScamType,
  { color: string; glow: string; badgeBackground: string }
> = {
  "AI-Native": {
    color: "#ff1744",
    glow: "rgba(255, 23, 68, 0.4)",
    badgeBackground: "rgba(255, 23, 68, 0.15)",
  },
  "AI-Transformed": {
    color: "#ff6d00",
    glow: "rgba(255, 109, 0, 0.36)",
    badgeBackground: "rgba(255, 109, 0, 0.15)",
  },
  Traditional: {
    color: "#00d4ff",
    glow: "rgba(0, 212, 255, 0.35)",
    badgeBackground: "rgba(0, 212, 255, 0.15)",
  },
};

export const POKEDEX_ENTRIES: PokemonScam[] = [
  {
    id: 1,
    number: 1,
    slug: "passal",
    name: "Passal",
    scamLabel: "Deepfake Audio",
    image: "passal.jpg",
    type: "AI-Native",
    rarity: "Rare",
    threatLevel: 5,
    pokemonType: ["Ghost"],
    strengths: [
      "Uses a fake reality to deceive victims through audio and calls, often imitating a loved one",
      "Uses a fake reality to deceive victims through videos and often is a loved one",
    ],
    weaknesses: [
      "People who have a strong emotional connection with the person will know everything about the person and can tell if it is fake.",
      "People who are naturally skeptical of their surroundings will check if it is real",
    ],
    habitat: "- Can appear anywhere, the most unexpected times to catch the victim off guard.",
    description:
      "A duo who appear at anytime, trying to catch their victim off guard through the mimicry of a loved through voice of one in a crisis to strike fear and make their victim irrationally willingly provide money, often working with Akmon to seem more convincing",
    relatedScamId: 2,
  },
  {
    id: 2,
    number: 2,
    slug: "akmon",
    name: "Akmon",
    scamLabel: "Deepfake Video",
    image: "akmon.jpg",
    type: "AI-Native",
    rarity: "Rare",
    threatLevel: 5,
    pokemonType: ["Ghost"],
    strengths: [
      "Uses a fake reality to deceive victims through videos and often is a loved one",
      "People who have a strong emotional connection with the person will know everything about the person and can tell if it is fake.",
    ],
    weaknesses: [
      "People who are naturally skeptical of their surroundings will check if it is real",
    ],
    habitat: "- Can appear anywhere, the most unexpected times to catch the victim off guard.",
    description:
      "Appear at any time, trying to catch their victim off guard through the mimicry of a loved one through video of one in a crisis to strike fear and make their victim irrationally willingly provide money. It often work together with its brother Passal, to make it seem more convincing",
    relatedScamId: 1,
  },
  {
    id: 3,
    number: 3,
    slug: "dolon",
    name: "Dolon",
    scamLabel: "Phishing (ai powered)",
    image: "dolon.jpg",
    type: "AI-Transformed",
    rarity: "Rare",
    threatLevel: 4,
    pokemonType: ["Dark"],
    strengths: ["exploits trust, panic, and psychological pressure"],
    weaknesses: [
      "The emotionally grounded and stable people will be able to think rationally and see through the scam",
    ],
    habitat:
      "Emails or messages - Places where scammers can spam many people with fake information, with little moderation",
    description:
      "Imitates a trusted entity, and pressures their victims to provide bank details, often providing severe consequences if they do not listen. The emotional stress often results in the victim listening",
    aiPowerup:
      "Catered Con - Hyperspecific details are provided to gain the victims trust and often uses small pieces of current day news to further convince victims of their legitimacy",
    relatedScamId: 6,
  },
  {
    id: 4,
    number: 4,
    slug: "acteon",
    name: "Acteon",
    scamLabel: "Sextortion",
    image: "acteon.jpg",
    type: "AI-Transformed",
    rarity: "Rare",
    threatLevel: 5,
    pokemonType: ["Fairy", "Psychic"],
    strengths: [
      "The corruption of something pure to scare the victim",
      "The long-lasting psychological effects of the scam will scar them forever",
    ],
    weaknesses: [
      "The mentally secure people will believe that because it is fake, it holds no value and will understand that providing money will beat the scam",
    ],
    habitat:
      "Instagram or whatsapp - Places where there is private messaging in order to not get found by their parents or guardian",
    description:
      "Uses their ingrained artificial intelligence to quickly generate nude images from their victim’s social media, threatening that if the victim does not surrender a certain sum of money, they will upload it online",
    relatedScamId: 9,
  },
  {
    id: 5,
    number: 5,
    slug: "fanir",
    name: "Fanir",
    scamLabel: "Gaming",
    image: "fanir.jpg",
    type: "Traditional",
    rarity: "Uncommon",
    threatLevel: 3,
    pokemonType: ["Electric", "poison"],
    strengths: [
      "Corrupts the genuine and youthful act of gaming, making it a scar to the person’s favourite pastime",
      "Lives in the digital infrastructure, and often through online gaming",
    ],
    weaknesses: [
      "Passionate and truly experienced people will recognise the slightest inaccuracy in a scam related to the game that they love",
    ],
    habitat:
      "Ads and online games - Unregulated ads and games allow for places for scams for popular video games and also allows for higher exposure to their target, the younger generation -",
    description:
      "It uses updated slang and terminology, to build trust among the audience, and provides a cheaper, easier alternative to win, using their naivety to take control of their game account, and forces them to pay money in exchange for their account back.",
    relatedScamId: 7,
  },
  {
    id: 6,
    number: 6,
    slug: "circe",
    name: "Circe",
    scamLabel: "Jobs",
    image: "circe.jpg",
    type: "Traditional",
    rarity: "Common",
    threatLevel: 3,
    pokemonType: ["Fire"],
    strengths: [
      "Uses their fiery determination to earn money and freedom against them, using that momentum to earn even more",
    ],
    weaknesses: [
      "The extra protection of parents who have been in the workforce can easily see through most job scams",
    ],
    habitat:
      "Linkedin - Formal job searching sites like Linkden, to pose as a genuine professional business to further convince their students",
    description:
      "Provides her victims with the chance to be professional, to be independent. She uses these emotions to lure her victims, together with the high pay and low working hours, she uses their naivety to make them provide banking details to ultimately scam them",
    relatedScamId: 3,
  },
  {
    id: 7,
    number: 7,
    slug: "glaukult",
    name: "Glaukult",
    scamLabel: "Ecommerce",
    image: "glaukult.jpg",
    type: "AI-Transformed",
    rarity: "Uncommon",
    threatLevel: 4,
    pokemonType: ["Metal"],
    strengths: ["Uses trickery to obtain money in any way or form through a trade"],
    weaknesses: [
      "unwilling to spend money on something they haven't thoroughly researched, allows them to evade scams",
    ],
    habitat:
      "Instagram ads and tiktok shop - Thrives on platforms with minimal seller verification, allowing them to earn money through these trades with minimal consequences",
    description:
      "Ai creates fake reviews, samples, and stores, to appear as an honest seller. However, whenever it trades with its victims, it always has a catch, whether it is a defect, trickery in the wording of the deal or a legal loophole, it always manages to make a better deal",
    aiPowerup:
      "Uses artificial intelligence to create even more realistic fake profiles with emotional backstories, attracting the attention of customers and manipulating their victims emotionally, often through social media.",
    relatedScamId: 5,
  },
  {
    id: 8,
    number: 8,
    slug: "ponsi",
    name: "Ponsi",
    scamLabel: "Investment",
    image: "ponsi.jpg",
    type: "Traditional",
    rarity: "Rare",
    threatLevel: 4,
    pokemonType: ["Fire"],
    strengths: [
      "The artificial dopamine created from rising numbers, but part of the sudden drop that allows Ponsi to earn money from their victims increases the amount of money that they give, resulting in more money earned by Ponsi",
    ],
    weaknesses: [
      "The primary layer of protection by parents, especially for their children who begin investing can often help avoid typical investment scams",
      "The cold, systematic research can often help to find flaws in the investments and expose the scam entirely",
    ],
    habitat:
      "Social Media - Social media is often trusted by teenagers, resulting in them turning there for help once they receive their first sum of money and want the taste of professionalism. -",
    description:
      "Ponsi wears many masks — crypto schemes, approval phishing, trading bots, NFT drops. It uses whatever trick works. Its preferred prey is teenagers who believe that investing makes them more mature and professional than their peers, often using their naivety",
    relatedScamId: 7,
  },
  {
    id: 9,
    number: 9,
    slug: "peitho",
    name: "Peitho (based on greek mythology)",
    scamLabel: "Pig-Butchering Scam (love scams)",
    image: "peitho.jpg",
    type: "AI-Transformed",
    rarity: "Rare",
    threatLevel: 5,
    pokemonType: ["Fairy"],
    strengths: ["Uses charm and charisma to beat their opponents"],
    weaknesses: [
      "Cold, factual, and straight to the point allows them to cut through their charm and not fall for the scams",
    ],
    habitat:
      "Dating sites - Places that you do not need to see their physical appearance, and people meet without skepticism and are left unchecked",
    description:
      "Lurks in dating apps, disguised as the ideal partner. Seeks out lonely targets and patiently earns their trust through small talk and false affection. Once the bond is strong enough, it strikes by asking for money before vanishing without a trace.",
    aiPowerup:
      "Specialised speech - Uses artificial intelligence to generate responses to perfectly suit the type of victim’s personality, which is also analysed by the AI to befriend easier, yet not be suspicious",
    relatedScamId: 4,
  },
];

export const POKEDEX_ENTRY_COUNT = POKEDEX_ENTRIES.length;

export const POKEDEX_ENTRIES_BY_SLUG = Object.fromEntries(
  POKEDEX_ENTRIES.map((entry) => [entry.slug, entry]),
) as Record<string, PokemonScam>;

export const POKEDEX_ENTRIES_BY_ID = Object.fromEntries(
  POKEDEX_ENTRIES.map((entry) => [entry.id, entry]),
) as Record<number, PokemonScam>;

export function getPokedexEntryBySlug(slug: string) {
  return POKEDEX_ENTRIES_BY_SLUG[slug];
}

export function getPokedexRelatedEntry(entry: PokemonScam) {
  return entry.relatedScamId ? POKEDEX_ENTRIES_BY_ID[entry.relatedScamId] : undefined;
}
