import useCrazyModeStore, { KYOKI_THEME_ID } from '../store/useCrazyModeStore';
import { useThemePreferences } from '@/features/Preferences';

export const useCrazyModeTrigger = () => {
  const { theme: selectedTheme } = useThemePreferences();
  const isCrazyMode = selectedTheme === KYOKI_THEME_ID;
  const randomize = useCrazyModeStore(state => state.randomize);

  const trigger = () => {
    if (isCrazyMode) {
      randomize();
    }
  };

  return { trigger };
};
