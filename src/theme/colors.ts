import { useColorScheme } from 'react-native';

const light = { background: '#F6F7FB', surface: '#FFFFFF', text: '#172033', muted: '#667085', primary: '#5267E8', success: '#16845B', danger: '#D14343', border: '#E3E7EF' };
const dark = { background: '#11141B', surface: '#1C212C', text: '#F4F6FA', muted: '#A7AFBF', primary: '#8E9BFF', success: '#55D6A0', danger: '#FF8585', border: '#343B49' };
export type Colors = typeof light;
export const useAppColors = (): Colors => (useColorScheme() === 'dark' ? dark : light);
