import Icon from '@components/icon';

interface BottomSheetIndicatorProps {
  onClick?: () => void;
}

const BottomSheetIndicator = ({ onClick }: BottomSheetIndicatorProps) => {
  return (
    <button type="button" className="flex-col-center cursor-pointer py-[2.4rem]" onClick={onClick}>
      <Icon name="indicator" className="h-[0.4rem] w-[8rem] text-gray-200" />
    </button>
  );
};

export default BottomSheetIndicator;
