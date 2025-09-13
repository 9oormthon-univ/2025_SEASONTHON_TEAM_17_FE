import ChipButton from '@components/chips/chip-button';
import Icon from '@components/icon';
import type React from 'react';

interface ChipsProps {
  size: 'small' | 'large';
  selected?: string[];
  emotions?: string[];
  onChange?: (selected: string[]) => void;
}

const sprite = (name: string) => (p: Omit<React.SVGProps<SVGSVGElement>, 'rotate'>) => (
  <Icon name={name} ariaHidden {...p} />
);

const chipsData = [
  { id: 'HAPPY', label: '행복', icon: sprite('happy') },
  { id: 'SAD', label: '우울', icon: sprite('sad') },
  { id: 'EXCITE', label: '신남', icon: sprite('exciting') },
  { id: 'ANGRY', label: '분노', icon: sprite('angry') },
  { id: 'TIRED', label: '피곤', icon: sprite('tired') },
  { id: 'SURPRISE', label: '놀람', icon: sprite('surprise') },
];

const Chips = ({ size, selected = [], emotions, onChange }: ChipsProps) => {
  const handleClick = (id: string) => {
    if (selected.includes(id)) onChange?.(selected.filter((x) => x !== id));
    else onChange?.([...selected, id]);
  };

  const filteredChips = emotions ? chipsData.filter((i) => emotions.includes(i.id)) : chipsData;

  return (
    <div className="flex flex-wrap gap-[1rem]">
      {filteredChips.map((item) => (
        <ChipButton
          key={item.id}
          size={size}
          Icon={item.icon}
          isSelected={selected.includes(item.id)}
          onClick={() => handleClick(item.id)}
        >
          {item.label}
        </ChipButton>
      ))}
      {!emotions && size === 'small' && <ChipButton size={size}>직접 입력</ChipButton>}
    </div>
  );
};

export default Chips;
