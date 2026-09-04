import { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import { useAppColors } from '../theme/colors';
export function AppCard({ children }: PropsWithChildren) { const c = useAppColors(); return <View style={[styles.card, { backgroundColor: c.surface, borderColor: c.border }]}>{children}</View>; }
const styles = StyleSheet.create({ card: { borderRadius: 20, borderWidth: StyleSheet.hairlineWidth, padding: 18 } });
