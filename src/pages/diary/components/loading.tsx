import Icon from '@components/icon';
import LoadingSpinner from '@pages/diary/components/loading-spinner';
export default function Loading() {
  return (
    <div className="flex-col-center gap-[2rem] py-[15.2rem]">
      <Icon name="3d-speak" size={20} />
      <LoadingSpinner />
      <p className="body1-500 text-center text-gary-900">
        마몬이 당신의 감정 일기를 보고
        <br />
        <span className="text-primary-800">분석</span>하고 있어요!
      </p>
    </div>
  );
}
