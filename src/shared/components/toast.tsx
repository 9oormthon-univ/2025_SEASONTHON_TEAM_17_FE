import Icon from '@components/icon';

interface ToastProps {
  message: string;
}

export default function Toast({ message }: ToastProps) {
  return (
    <div className="pt-[1rem]">
      <div className="max-w-[calc(100vw-4rem)] flex-row-center flex-nowrap gap-[0.8rem] rounded-[16px] bg-primary-500 px-[2rem] py-[1.6rem] shadow-md">
        <Icon name="toast-check" size={2.4} />
        <span className="heading3-500 whitespace-nowrap text-gray-50">{message}</span>
      </div>
    </div>
  );
}
