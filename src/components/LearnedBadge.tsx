import { Pressable, StyleSheet, Text, View } from 'react-native';
import { strings } from '../constants/appStrings';
import { useAppColors } from '../theme/colors';
export function LearnedBadge({ learned, onPress }: { learned: boolean; onPress?(): void }) { const c = useAppColors(); const color = learned ? c.success : c.muted; return <Pressable onPress={onPress} disabled={!onPress} style={[styles.badge, { backgroundColor: learned ? c.successSoft : c.surfaceMuted }]}><View style={[styles.dot, { backgroundColor: color }]} /><Text style={[styles.text, { color }]}>{learned ? strings.learned : strings.unlearned}</Text></Pressable>; }
const styles = StyleSheet.create({ badge: { flexDirection: 'row', alignItems: 'center', gap: 6, borderRadius: 20, paddingHorizontal: 9, paddingVertical: 6 }, dot: { width: 6, height: 6, borderRadius: 3 }, text: { fontSize: 11, fontWeight: '700' } });
