export interface SkillOption {
  value: string;
  emoji: string;
  label: string;
}

export const SKILL_SUGGESTIONS: SkillOption[] = [
  { value: "tutoring", emoji: "📚", label: "Tutoring" },
  { value: "communication", emoji: "💬", label: "Communication" },
  { value: "outdoor", emoji: "🌿", label: "Outdoor" },
  { value: "organization", emoji: "📋", label: "Organization" },
  { value: "teamwork", emoji: "🤝", label: "Teamwork" },
  { value: "patience", emoji: "🧘", label: "Patience" },
  { value: "technology", emoji: "💻", label: "Technology" },
  { value: "leadership", emoji: "🎯", label: "Leadership" },
  { value: "creativity", emoji: "🎨", label: "Creativity" },
  { value: "first-aid", emoji: "🩹", label: "First aid" },
];

const skillLookup = new Map(
  SKILL_SUGGESTIONS.map((skill) => [skill.value, skill]),
);

export function getSkillEmoji(skill: string): string {
  return skillLookup.get(skill.toLowerCase())?.emoji ?? "✨";
}

export function getSkillLabel(skill: string): string {
  const match = skillLookup.get(skill.toLowerCase());
  return match?.label ?? skill;
}
