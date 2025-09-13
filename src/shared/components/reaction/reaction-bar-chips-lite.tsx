import ChipButton from '@components/chips/chip-button';
import Icon from '@components/icon';
import { DIARY_EMOTIONS } from '@pages/diary/constants/diary-emotions';

export type EmotionId = (typeof DIARY_EMOTIONS)[number]['id'];
export type ReactionCounts = Record<EmotionId, number>;

interface Props {
  counts: ReactionCounts;
  myToggles: Set<EmotionId>;
  onToggle: (id: EmotionId) => void;
  order?: EmotionId[];
  className?: string;
  size?: 'small' | 'large';
}

export default function ReactionBarChipsLite({
  counts,
  myToggles,
  onToggle,
  order,
  className,
  size = 'small',
}: Props) {
  const map = Object.fromEntries(DIARY_EMOTIONS.map((m) => [m.id, m]));
  return (
    <div className={`flex flex-wrap gap-[1rem] ${className ?? ''}`}>
      {order?.map((id) => {
        const meta = map[id];
        if (!meta) return null;
        const active = myToggles.has(id);
        const value = counts[id] ?? 0;
        const IconC = ({ rotate, ...p }: React.SVGProps<SVGSVGElement>) => (
          <Icon name={meta.icon} size={size === 'large' ? 1.8 : 1.4} ariaHidden {...p} />
        );
        return (
          <ChipButton
            key={id}
            size={size}
            Icon={IconC}
            isSelected={active}
            onClick={() => onToggle(id)}
          >
            {`${meta.id} (${value})`}
          </ChipButton>
        );
      })}
    </div>
  );
}
