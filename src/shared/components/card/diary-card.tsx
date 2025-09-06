import Button from '@components/button/button';
import Divider from '@components/divider';
import { cn } from '@libs/cn';
import ToggleSwitch from '@pages/my-page/components/toggle-switch';
import dayjs from 'dayjs';

interface DiaryCardProps {
  title?: string;
  content?: string;
  emotions?: string[];
  date?: Date;
  onClickButton?: (type: '작성하기' | '삭제하기') => void;
  className?: string;
  privacySetting?: 'PUBLIC' | 'PRIVACY';
  onTogglePrivacy?: (next: 'PUBLIC' | 'PRIVACY') => void;
}

const DiaryCard = ({
  title,
  content,
  emotions,
  date,
  className = 'bg-gray-50',
  onClickButton,
  privacySetting,
  onTogglePrivacy,
}: DiaryCardProps) => {
  const isEmpty = !title && !content && emotions?.length === 0;
  const type = isEmpty ? '작성하기' : '삭제하기';

  const isPrivate = privacySetting === 'PRIVACY';
  const handleToggleClick = () => {
    onTogglePrivacy?.(isPrivate ? 'PUBLIC' : 'PRIVACY');
  };

  return (
    <div
      className={cn(
        'w-full flex-col gap-[1.2rem] rounded-[20px] border border-gray-200 p-[1.6rem]',
        className,
      )}
    >
      {!isEmpty && (
        <div className="flex items-start justify-between gap-[1.2rem]">
          <div className="min-w-0 flex-1">
            <p className="heading3-500">{title}</p>
            <p className="body2-500 h-[7.2rem] break-words">{content}</p>
          </div>

          {privacySetting && (
            <button
              type="button"
              onClick={handleToggleClick}
              className="flex shrink-0 items-center gap-[0.6rem]"
              role="switch"
              aria-checked={isPrivate}
            >
              <span className="sub-body-700 text-primary-800">{isPrivate ? '비공개' : '공개'}</span>
              <div className="pointer-events-none">
                <ToggleSwitch checked={isPrivate} aria-hidden="true" />
              </div>
            </button>
          )}
        </div>
      )}

      {isEmpty && (
        <p className="body1-500 text-gray-900">해당 날짜에는 감정 일기 기록이 없어요😢</p>
      )}

      <Divider />

      <div className="flex-row-between">
        <p className="detail text-gray-400">{dayjs(date).format('YYYY.MM.DD')}</p>
        <Button
          onClick={() => onClickButton?.(type)}
          className="detail rounded-[999px] bg-gray-100 px-[1.6rem] py-[0.7rem] text-gray-600"
        >
          {type}
        </Button>
      </div>
    </div>
  );
};

export default DiaryCard;
