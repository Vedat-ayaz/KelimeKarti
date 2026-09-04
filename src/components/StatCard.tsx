import { StyleSheet, Text, View } from 'react-native';
import { useAppColors } from '../theme/colors';
export function StatCard({ label, value }: { label: string; value: number }) { const c = useAppColors(); return <View style={[styles.box, { backgroundColor: c.surface, borderColor: c.border }]}><Text style={[styles.value, { color: c.text }]}>{value}</Text><Text numberOfLines={1} style={[styles.label, { color: c.muted }]}>{label}</Text></View>; }
const styles = StyleSheet.create({ box: { flex: 1, borderWidth: 1, borderRadius: 14, padding: 12, alignItems: 'center' }, value: { fontSize: 22, fontWeight: '800' }, label: { fontSize: 11, marginTop: 3 } });
