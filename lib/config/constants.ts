export const APP_CONFIG = {
  API: {
    BASE_URL: process.env.NEXT_PUBLIC_API_URL!,
    TIMEOUT: 10000,
    RETRY_ATTEMPTS: 3,
  },
  UI: {
    DEBOUNCE_DELAY: 300,
    INFINITE_SCROLL_THRESHOLD: 0.1,
    MODAL_TRANSITION_DURATION: 300,
  },
  CACHE: {
    STALE_TIME: 5 * 60 * 1000, // 5 minutes
    CACHE_TIME: 10 * 60 * 1000, // 10 minutes
  },
} as const;

export const CHARACTER_STATUS = {
  ALIVE: 'Alive' as const,
  DEAD: 'Dead' as const,
  UNKNOWN: 'unknown' as const,
} as const;

export const CHARACTER_GENDER = {
  FEMALE: 'Female' as const,
  MALE: 'Male' as const,
  GENDERLESS: 'Genderless' as const,
  UNKNOWN: 'unknown' as const,
} as const;
