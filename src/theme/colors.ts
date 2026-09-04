import { useColorScheme } from 'react-native';

const light = {
  background: '#F7F7F4', surface: '#FFFFFF', surfaceMuted: '#F0F1ED', text: '#1B1D1C',
  muted: '#747975', primary: '#315C4C', primarySoft: '#E4EEE9', success: '#2E7158',
  successSoft: '#E5F2EB', danger: '#A94747', dangerSoft: '#F8EAEA', border: '#E3E5E0',
};
const dark = {
  background: '#111412', surface: '#1A1E1B', surfaceMuted: '#222823', text: '#F3F5F2',
  muted: '#9AA19B', primary: '#84B5A0', primarySoft: '#243A31', success: '#79BE9E',
  successSoft: '#20382D', danger: '#E18B8B', dangerSoft: '#3A2424', border: '#303630',
};
export type Colors = typeof light;
export const useAppColors = (): Colors => (useColorScheme() === 'dark' ? dark : light);
