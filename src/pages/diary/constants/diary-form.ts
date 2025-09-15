export const TITLE_MAX_LEN = 100;
export const CONTENT_MIN_LEN = 50;

export const PRIVACY_LABEL_PUBLIC = '친구 공개';
export const PRIVACY_LABEL_PRIVATE = '나만 보기';

export const PRIVACY_TO_API = {
  [PRIVACY_LABEL_PUBLIC]: 'PUBLIC',
  [PRIVACY_LABEL_PRIVATE]: 'PRIVACY',
} as const;

export type PrivacyUiLabel = keyof typeof PRIVACY_TO_API;
