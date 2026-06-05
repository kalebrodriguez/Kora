import type {
  AvatarAccessory,
  AvatarBackground,
  AvatarConfig,
  AvatarExpression,
  AvatarHair,
  AvatarHairColor,
  AvatarHat,
  AvatarSkinTone,
} from "@/lib/types/student";

export const SKIN_TONES: Record<AvatarSkinTone, string> = {
  light: "#FFDBAC",
  medium: "#E8B88A",
  tan: "#C68642",
  brown: "#8D5524",
  dark: "#5C3A1E",
};

export const HAIR_COLOR_VALUES: Record<AvatarHairColor, string> = {
  black: "#1A1A1A",
  brown: "#4A3728",
  blonde: "#D4A76A",
  red: "#B55239",
  auburn: "#8B3A2A",
};

export const BACKGROUND_COLORS: Record<AvatarBackground, string> = {
  lavender: "#EFEEEA",
  pink: "#FBE4F1",
  sky: "#DDF0FB",
  mint: "#E0F5E9",
};

export interface HatUnlock {
  hat: AvatarHat;
  hoursRequired: number;
  label: string;
  emoji: string;
}

export const HAT_UNLOCKS: HatUnlock[] = [
  { hat: "none", hoursRequired: 0, label: "No hat", emoji: "✨" },
  { hat: "baseball-cap", hoursRequired: 10, label: "Baseball cap", emoji: "🧢" },
  { hat: "beanie", hoursRequired: 25, label: "Beanie", emoji: "🧶" },
  { hat: "graduation-cap", hoursRequired: 50, label: "Graduation cap", emoji: "🎓" },
  { hat: "party-hat", hoursRequired: 75, label: "Party hat", emoji: "🎉" },
  { hat: "crown", hoursRequired: 100, label: "Gold crown", emoji: "👑" },
];

export const DEFAULT_AVATAR_CONFIG: AvatarConfig = {
  hair: "long",
  hairColor: "brown",
  skinTone: "medium",
  expression: "smile",
  background: "lavender",
  accessory: "none",
  hat: "none",
};

export const HAIR_OPTIONS: { value: AvatarHair; label: string; emoji: string }[] =
  [
    { value: "short", label: "Short", emoji: "✂️" },
    { value: "long", label: "Long", emoji: "💁" },
    { value: "curly", label: "Curly", emoji: "🌀" },
    { value: "ponytail", label: "Ponytail", emoji: "🎀" },
    { value: "buzz", label: "Buzz", emoji: "🪒" },
    { value: "bangs", label: "Bangs", emoji: "👩" },
    { value: "braids", label: "Braids", emoji: "🧶" },
    { value: "spiky", label: "Spiky", emoji: "⚡" },
  ];

export const HAIR_COLOR_OPTIONS: {
  value: AvatarHairColor;
  label: string;
  emoji: string;
}[] = [
  { value: "black", label: "Black", emoji: "⚫" },
  { value: "brown", label: "Brown", emoji: "🤎" },
  { value: "blonde", label: "Blonde", emoji: "💛" },
  { value: "red", label: "Red", emoji: "🔴" },
  { value: "auburn", label: "Auburn", emoji: "🍂" },
];

export const SKIN_TONE_OPTIONS: {
  value: AvatarSkinTone;
  label: string;
  emoji: string;
}[] = [
  { value: "light", label: "Light", emoji: "🏻" },
  { value: "medium", label: "Medium", emoji: "🏼" },
  { value: "tan", label: "Tan", emoji: "🏽" },
  { value: "brown", label: "Brown", emoji: "🏾" },
  { value: "dark", label: "Dark", emoji: "🏿" },
];

export const EXPRESSION_OPTIONS: {
  value: AvatarExpression;
  label: string;
  emoji: string;
}[] = [
  { value: "smile", label: "Smile", emoji: "😊" },
  { value: "neutral", label: "Neutral", emoji: "😐" },
  { value: "excited", label: "Excited", emoji: "🤩" },
  { value: "wink", label: "Wink", emoji: "😉" },
  { value: "laugh", label: "Laugh", emoji: "😂" },
  { value: "cool", label: "Cool", emoji: "😎" },
];

export const BACKGROUND_OPTIONS: {
  value: AvatarBackground;
  label: string;
  emoji: string;
}[] = [
  { value: "lavender", label: "Lavender", emoji: "💜" },
  { value: "pink", label: "Pink", emoji: "💗" },
  { value: "sky", label: "Sky", emoji: "💙" },
  { value: "mint", label: "Mint", emoji: "🌿" },
];

export const ACCESSORY_OPTIONS: {
  value: AvatarAccessory;
  label: string;
  emoji: string;
}[] = [
  { value: "none", label: "None", emoji: "➖" },
  { value: "glasses", label: "Glasses", emoji: "👓" },
  { value: "sunglasses", label: "Shades", emoji: "🕶️" },
];

export function normalizeAvatarConfig(
  config: Partial<AvatarConfig> | undefined,
): AvatarConfig {
  return {
    ...DEFAULT_AVATAR_CONFIG,
    ...config,
  };
}

export function isHatUnlocked(hat: AvatarHat, verifiedHours: number): boolean {
  const unlock = HAT_UNLOCKS.find((item) => item.hat === hat);
  return unlock ? verifiedHours >= unlock.hoursRequired : false;
}

export function hoursUntilHatUnlock(
  hat: AvatarHat,
  verifiedHours: number,
): number {
  const unlock = HAT_UNLOCKS.find((item) => item.hat === hat);
  if (!unlock) {
    return 0;
  }
  return Math.max(0, unlock.hoursRequired - verifiedHours);
}

export function getHighestUnlockedHat(verifiedHours: number): AvatarHat {
  const unlocked = [...HAT_UNLOCKS]
    .reverse()
    .find((item) => verifiedHours >= item.hoursRequired);
  return unlocked?.hat ?? "none";
}
