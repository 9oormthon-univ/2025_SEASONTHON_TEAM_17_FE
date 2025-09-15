import type { EmotionId, ReactionCounts } from '@components/reaction/reaction-bar-chips-lite';
import { useCallback, useMemo, useState } from 'react';
import { DIARY_COUNT } from '../constants/diary-emotions';
import { emotionLikeStore } from '../stores/emotion-like-store';

type Params = {
  hasEntry: boolean;
  hasServerIds: boolean;
  entryEmotions: EmotionId[];
  emotionIdByType: Record<EmotionId, number | undefined>;
  selectedKey: string;
  initialCounts: ReactionCounts;
  invalidate: () => void;
};

export function useEmotionToggle({
  hasEntry,
  hasServerIds,
  entryEmotions,
  emotionIdByType,
  selectedKey,
  initialCounts,
  invalidate,
}: Params) {
  const [countsByDate, setCountsByDate] = useState<Record<string, ReactionCounts>>({});
  const [togglesByDate, setTogglesByDate] = useState<Record<string, Set<EmotionId>>>({});

  const counts = hasEntry ? (countsByDate[selectedKey] ?? initialCounts) : initialCounts;

  const currentSelectedType = useMemo<EmotionId | undefined>(() => {
    if (!hasEntry) return undefined;

    if (hasServerIds) {
      for (const t of entryEmotions) {
        const eid = emotionIdByType[t];
        if (eid && emotionLikeStore.isLiked(eid)) return t;
      }
      return undefined;
    }

    const set = togglesByDate[selectedKey] ?? new Set<EmotionId>();
    for (const t of set) return t;
    return undefined;
  }, [hasEntry, hasServerIds, entryEmotions, emotionIdByType, togglesByDate, selectedKey]);

  const myToggles = useMemo(() => {
    if (!hasEntry) return new Set<EmotionId>();
    if (hasServerIds) {
      const s = new Set<EmotionId>();
      if (currentSelectedType) s.add(currentSelectedType);
      return s;
    }
    return togglesByDate[selectedKey] ?? new Set<EmotionId>();
  }, [hasEntry, hasServerIds, currentSelectedType, togglesByDate, selectedKey]);

  const handleToggle = useCallback(
    async (typeId: EmotionId) => {
      if (!hasEntry) return;
      const prevType = currentSelectedType;
      const same = prevType === typeId;
      const nextType = same ? undefined : typeId;

      if (hasServerIds) {
        const prevId = prevType ? emotionIdByType[prevType] : undefined;
        const nextId = nextType ? emotionIdByType[nextType] : undefined;

        const prevLiked = prevId ? emotionLikeStore.isLiked(prevId) : false;
        const nextLiked = nextId ? emotionLikeStore.isLiked(nextId) : false;

        if (prevId && prevLiked) emotionLikeStore.setLiked(prevId, false);
        if (nextId && !same) emotionLikeStore.setLiked(nextId, true);

        if (prevType) {
          setCountsByDate((p) => {
            const base = p[selectedKey] ?? initialCounts;
            const n = { ...base };
            n[prevType] = Math.max(0, (n[prevType] ?? 0) - 1);
            return { ...p, [selectedKey]: n };
          });
        }
        if (nextType) {
          setCountsByDate((p) => {
            const base = p[selectedKey] ?? initialCounts;
            const n = { ...base };
            n[nextType] = Math.max(0, (n[nextType] ?? 0) + 1);
            return { ...p, [selectedKey]: n };
          });
        }

        try {
          if (prevId && prevLiked) await /* unlike 대신 */ Promise.resolve();
          if (nextId && !same && !nextLiked) await Promise.resolve();
        } finally {
          invalidate();
        }
      } else {
        setTogglesByDate((prev) => {
          const set = new Set<EmotionId>();
          if (nextType) set.add(nextType);
          return { ...prev, [selectedKey]: set };
        });
        if (prevType) {
          setCountsByDate((p) => {
            const base = p[selectedKey] ?? initialCounts;
            const n = { ...base };
            n[prevType] = Math.max(0, (n[prevType] ?? 0) - 1);
            return { ...p, [selectedKey]: n };
          });
        }
        if (nextType) {
          setCountsByDate((p) => {
            const base = p[selectedKey] ?? initialCounts;
            const n = { ...base };
            n[nextType] = Math.max(0, (n[nextType] ?? 0) + 1);
            return { ...p, [selectedKey]: n };
          });
        }
      }
    },
    [
      hasEntry,
      hasServerIds,
      currentSelectedType,
      emotionIdByType,
      selectedKey,
      initialCounts,
      invalidate,
    ],
  );

  const resetCountsByToggles = (set: Set<EmotionId>) => {
    const next: ReactionCounts = { ...DIARY_COUNT };
    for (const t of set) next[t] = (next[t] ?? 0) + 1;
    setCountsByDate((p) => ({ ...p, [selectedKey]: next }));
  };

  return { counts, myToggles, handleToggle, resetCountsByToggles };
}
