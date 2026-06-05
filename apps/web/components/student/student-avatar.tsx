import {
  BACKGROUND_COLORS,
  HAIR_COLOR_VALUES,
  SKIN_TONES,
  type HatUnlock,
} from "@/lib/avatar";
import type {
  AvatarAccessory,
  AvatarConfig,
  AvatarExpression,
  AvatarHair,
  AvatarHairColor,
  AvatarHat,
} from "@/lib/types/student";

interface StudentAvatarProps {
  config: AvatarConfig;
  size?: number;
  className?: string;
}

function HairLayer({
  hair,
  color,
}: {
  hair: AvatarHair;
  color: AvatarHairColor;
}) {
  const fill = HAIR_COLOR_VALUES[color];

  switch (hair) {
    case "buzz":
      return (
        <path
          d="M30 50 C30 34 70 34 70 50 C70 42 30 42 30 50 Z"
          fill={fill}
        />
      );
    case "bangs":
      return (
        <>
          <path
            d="M26 54 C24 30 76 30 74 54 C78 72 74 88 68 92 C64 80 36 80 32 92 C26 88 22 72 26 54 Z"
            fill={fill}
          />
          <path d="M30 52 C30 44 70 44 70 52 L70 60 C50 56 30 60 30 52 Z" fill={fill} />
        </>
      );
    case "braids":
      return (
        <>
          <path
            d="M28 52 C28 30 72 30 72 52 C72 40 28 40 28 52 Z"
            fill={fill}
          />
          <rect x="22" y="58" width="8" height="22" rx="4" fill={fill} />
          <rect x="70" y="58" width="8" height="22" rx="4" fill={fill} />
        </>
      );
    case "spiky":
      return (
        <>
          <path d="M34 48 L38 28 L42 48 Z" fill={fill} />
          <path d="M44 46 L50 22 L56 46 Z" fill={fill} />
          <path d="M58 48 L62 28 L66 48 Z" fill={fill} />
          <rect x="30" y="44" width="40" height="14" rx="6" fill={fill} />
        </>
      );
    case "short":
      return (
        <path
          d="M28 52 C28 28 72 28 72 52 C72 38 28 38 28 52 Z"
          fill={fill}
        />
      );
    case "long":
      return (
        <>
          <path
            d="M26 54 C24 30 76 30 74 54 C78 72 74 88 68 92 C64 80 36 80 32 92 C26 88 22 72 26 54 Z"
            fill={fill}
          />
          <ellipse cx="32" cy="78" rx="8" ry="14" fill={fill} />
          <ellipse cx="68" cy="78" rx="8" ry="14" fill={fill} />
        </>
      );
    case "curly":
      return (
        <>
          <circle cx="34" cy="38" r="10" fill={fill} />
          <circle cx="50" cy="32" r="11" fill={fill} />
          <circle cx="66" cy="38" r="10" fill={fill} />
          <circle cx="28" cy="48" r="8" fill={fill} />
          <circle cx="72" cy="48" r="8" fill={fill} />
          <rect x="30" y="44" width="40" height="16" rx="8" fill={fill} />
        </>
      );
    case "ponytail":
      return (
        <>
          <path
            d="M28 52 C28 30 72 30 72 52 C72 40 28 40 28 52 Z"
            fill={fill}
          />
          <ellipse cx="78" cy="58" rx="10" ry="16" fill={fill} />
        </>
      );
  }
}

function FaceFeatures({ expression }: { expression: AvatarExpression }) {
  switch (expression) {
    case "neutral":
      return (
        <>
          <circle cx="40" cy="58" r="3" fill="#2D2D2D" />
          <circle cx="60" cy="58" r="3" fill="#2D2D2D" />
          <path
            d="M44 72 Q50 74 56 72"
            stroke="#2D2D2D"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </>
      );
    case "excited":
      return (
        <>
          <ellipse cx="40" cy="57" rx="4" ry="5" fill="#2D2D2D" />
          <ellipse cx="60" cy="57" rx="4" ry="5" fill="#2D2D2D" />
          <circle cx="41" cy="55" r="1.2" fill="white" />
          <circle cx="61" cy="55" r="1.2" fill="white" />
          <path
            d="M40 74 Q50 84 60 74"
            stroke="#2D2D2D"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
        </>
      );
    case "wink":
      return (
        <>
          <path
            d="M35 56 Q40 60 45 56"
            stroke="#2D2D2D"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="60" cy="58" r="3" fill="#2D2D2D" />
          <path
            d="M42 72 Q50 80 58 72"
            stroke="#2D2D2D"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </>
      );
    case "laugh":
      return (
        <>
          <path d="M36 56 Q40 52 44 56" stroke="#2D2D2D" strokeWidth="2" fill="none" />
          <path d="M56 56 Q60 52 64 56" stroke="#2D2D2D" strokeWidth="2" fill="none" />
          <ellipse cx="50" cy="76" rx="8" ry="6" fill="#2D2D2D" />
          <ellipse cx="50" cy="74" rx="5" ry="2" fill="#F4A0A0" opacity="0.5" />
        </>
      );
    case "cool":
      return (
        <>
          <path
            d="M35 56 Q40 58 45 56"
            stroke="#2D2D2D"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M55 56 Q60 58 65 56"
            stroke="#2D2D2D"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M44 74 Q50 76 56 74"
            stroke="#2D2D2D"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </>
      );
    case "smile":
    default:
      return (
        <>
          <path
            d="M35 56 Q40 60 45 56"
            stroke="#2D2D2D"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M55 56 Q60 60 65 56"
            stroke="#2D2D2D"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M42 72 Q50 80 58 72"
            stroke="#2D2D2D"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </>
      );
  }
}

function AccessoryLayer({ accessory }: { accessory: AvatarAccessory }) {
  switch (accessory) {
    case "glasses":
      return (
        <>
          <circle
            cx="40"
            cy="58"
            r="8"
            fill="none"
            stroke="#2D2D2D"
            strokeWidth="2"
          />
          <circle
            cx="60"
            cy="58"
            r="8"
            fill="none"
            stroke="#2D2D2D"
            strokeWidth="2"
          />
          <line x1="48" y1="58" x2="52" y2="58" stroke="#2D2D2D" strokeWidth="2" />
        </>
      );
    case "sunglasses":
      return (
        <>
          <rect x="30" y="52" width="18" height="12" rx="4" fill="#2D2D2D" />
          <rect x="52" y="52" width="18" height="12" rx="4" fill="#2D2D2D" />
          <line x1="48" y1="58" x2="52" y2="58" stroke="#2D2D2D" strokeWidth="2" />
        </>
      );
    case "none":
    default:
      return null;
  }
}

function HatLayer({ hat }: { hat: AvatarHat }) {
  switch (hat) {
    case "baseball-cap":
      return (
        <>
          <path
            d="M24 46 C24 32 76 32 76 46 L82 50 L24 50 Z"
            fill="#00C4CC"
          />
          <ellipse cx="50" cy="48" rx="28" ry="8" fill="#00A8B0" />
          <path d="M18 50 L82 50 L88 54 L18 54 Z" fill="#00A8B0" />
        </>
      );
    case "beanie":
      return (
        <>
          <path
            d="M26 48 C26 28 74 28 74 48 C74 42 26 42 26 48 Z"
            fill="#4DB7E8"
          />
          <rect x="24" y="44" width="52" height="8" rx="4" fill="#3A9FD4" />
          <circle cx="50" cy="30" r="5" fill="#4DB7E8" />
        </>
      );
    case "graduation-cap":
      return (
        <>
          <polygon points="50,22 18,40 82,40" fill="#2D2D2D" />
          <rect x="22" y="38" width="56" height="6" rx="2" fill="#2D2D2D" />
          <line
            x1="82"
            y1="40"
            x2="88"
            y2="58"
            stroke="#F4663F"
            strokeWidth="2"
          />
          <circle cx="88" cy="60" r="3" fill="#FFB300" />
        </>
      );
    case "party-hat":
      return (
        <>
          <polygon points="50,14 34,46 66,46" fill="#EC68A6" />
          <circle cx="50" cy="16" r="4" fill="#FFB300" />
          <circle cx="42" cy="32" r="2" fill="white" />
          <circle cx="58" cy="36" r="2" fill="white" />
          <circle cx="48" cy="42" r="2" fill="white" />
        </>
      );
    case "crown":
      return (
        <>
          <path
            d="M24 46 L30 28 L40 40 L50 22 L60 40 L70 28 L76 46 Z"
            fill="#FFB300"
            stroke="#E6A200"
            strokeWidth="1.5"
          />
          <rect x="24" y="44" width="52" height="6" rx="2" fill="#E6A200" />
          <circle cx="30" cy="30" r="2.5" fill="#FFDBAC" />
          <circle cx="50" cy="24" r="2.5" fill="#FFDBAC" />
          <circle cx="70" cy="30" r="2.5" fill="#FFDBAC" />
        </>
      );
    case "none":
    default:
      return null;
  }
}

export function StudentAvatar({
  config,
  size = 44,
  className = "",
}: StudentAvatarProps) {
  const skin = SKIN_TONES[config.skinTone];
  const background = BACKGROUND_COLORS[config.background];
  const showHairUnderHat =
    config.hat === "none" ||
    config.hat === "beanie" ||
    config.hat === "baseball-cap";
  const hideEyes =
    config.accessory === "glasses" || config.accessory === "sunglasses";

  return (
    <svg
      viewBox="0 0 100 120"
      width={size}
      height={size}
      className={className}
      aria-hidden
    >
      <rect width="100" height="120" rx="50" fill={background} />
      <ellipse cx="50" cy="108" rx="32" ry="14" fill="#00C4CC" opacity="0.25" />
      <ellipse cx="50" cy="100" rx="28" ry="18" fill="#00A8B0" />
      <circle cx="50" cy="62" r="26" fill={skin} />
      {showHairUnderHat ? (
        <HairLayer hair={config.hair} color={config.hairColor} />
      ) : null}
      {!hideEyes ? <FaceFeatures expression={config.expression} /> : null}
      <ellipse cx="38" cy="66" rx="4" ry="2.5" fill="#F4A0A0" opacity="0.45" />
      <ellipse cx="62" cy="66" rx="4" ry="2.5" fill="#F4A0A0" opacity="0.45" />
      <AccessoryLayer accessory={config.accessory} />
      {hideEyes && config.expression !== "laugh" ? (
        <path
          d="M42 72 Q50 80 58 72"
          stroke="#2D2D2D"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      ) : null}
      <HatLayer hat={config.hat} />
    </svg>
  );
}

export function HatIcon({
  hat,
  locked,
  selected,
  onClick,
  unlock,
  verifiedHours,
}: {
  hat: AvatarHat;
  locked: boolean;
  selected: boolean;
  onClick: () => void;
  unlock: HatUnlock;
  verifiedHours: number;
}) {
  const hoursLeft = Math.max(0, unlock.hoursRequired - verifiedHours);
  const tooltip = locked ? `${hoursLeft} hrs to unlock` : unlock.label;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={locked}
      title={tooltip}
      aria-label={locked ? `${unlock.label}, ${tooltip}` : unlock.label}
      className={`group relative flex h-20 w-20 flex-col items-center justify-center gap-1 rounded-card transition ${
        selected
          ? "bg-primary/10 ring-2 ring-primary"
          : "bg-accent-lavender hover:bg-primary/10"
      } ${locked ? "cursor-not-allowed opacity-40 grayscale" : ""}`}
    >
      <span className="text-[18px] leading-none">{unlock.emoji}</span>
      <StudentAvatar
        config={{
          hair: "short",
          hairColor: "brown",
          skinTone: "medium",
          expression: "smile",
          background: "lavender",
          accessory: "none",
          hat,
        }}
        size={36}
      />
      {locked ? (
        <span className="pointer-events-none absolute -bottom-8 left-1/2 z-10 hidden -translate-x-1/2 whitespace-nowrap rounded-chip bg-ink px-2.5 py-1 text-[11px] font-semibold text-white opacity-0 shadow-raised transition group-hover:opacity-100">
          {hoursLeft} hrs to unlock
        </span>
      ) : null}
    </button>
  );
}
