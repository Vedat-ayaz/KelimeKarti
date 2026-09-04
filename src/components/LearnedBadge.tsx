import { Pressable, StyleSheet, Text } from 'react-native';
import { strings } from '../constants/appStrings';
import { useAppColors } from '../theme/colors';
export function LearnedBadge({ learned, onPress }: { learned: boolean; onPress?(): void }) { const c = useAppColors(); const color = learned ? c.success : c.muted; return <Pressable onPress={onPress} disabled={!onPress} style={[styles.badge, { borderColor: color }]}><Text style={[styles.text, { color }]}>{learned ? strings.learned : strings.unlearned}</Text></Pressable>; }
const styles = StyleSheet.create({ badge: { borderWidth: 1, borderRadius: 20, paddingHorizontal: 9, paddingVertical: 5 }, text: { fontSize: 11, fontWeight: '700' } });
