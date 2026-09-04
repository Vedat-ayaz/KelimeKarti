import { StyleSheet, Text, View } from 'react-native';
import { strings } from '../constants/appStrings';
import { useAppColors } from '../theme/colors';
export function EmptyState({ title = strings.emptyTitle, body = strings.emptyBody }: { title?: string; body?: string }) { const c = useAppColors(); return <View style={styles.wrap}><Text style={styles.icon}>◫</Text><Text style={[styles.title, { color: c.text }]}>{title}</Text><Text style={[styles.body, { color: c.muted }]}>{body}</Text></View>; }
const styles = StyleSheet.create({ wrap: { flex: 1, minHeight: 220, alignItems: 'center', justifyContent: 'center', padding: 32 }, icon: { fontSize: 42, color: '#8B95A7' }, title: { fontSize: 19, fontWeight: '700', marginTop: 12 }, body: { textAlign: 'center', marginTop: 6 } });
