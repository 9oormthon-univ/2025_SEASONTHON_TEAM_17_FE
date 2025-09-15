import dayjs from 'dayjs';

// 공통 리패치 옵션(매직 넘버 상수화)
export const REFETCH_OPTS = {
  refetchInterval: 5000,
  refetchIntervalInBackground: true,
  refetchOnReconnect: true,
  refetchOnWindowFocus: true,
} as const;

export const keyOf = (d: Date) => dayjs(d).format('YYYY-MM-DD');
export const yOf = (d: Date) => dayjs(d).year();
export const mOf = (d: Date) => dayjs(d).month() + 1; // 0-index → 1-index
export const dOf = (d: Date) => dayjs(d).date();
