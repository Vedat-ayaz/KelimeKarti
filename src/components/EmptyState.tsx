import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { strings } from '../constants/appStrings';
import { useAppColors } from '../theme/colors';
export function EmptyState({ title = strings.emptyTitle, body = strings.emptyBody }: { title?: string; body?: string }) { const c = useAppColors(); return <View style={styles.wrap}><View style={[styles.iconBox, { backgroundColor: c.primarySoft }]}><Ionicons name="albums-outline" size={28} color={c.primary} /></View><Text style={[styles.title, { color: c.text }]}>{title}</Text><Text style={[styles.body, { color: c.muted }]}>{body}</Text></View>; }
const styles = StyleSheet.create({ wrap: { flex: 1, minHeight: 240, alignItems: 'center', justifyContent: 'center', padding: 32 }, iconBox: { width: 58, height: 58, borderRadius: 19, alignItems: 'center', justifyContent: 'center' }, title: { fontSize: 18, fontWeight: '700', marginTop: 16, letterSpacing: -0.2 }, body: { textAlign: 'center', marginTop: 7, lineHeight: 21, maxWidth: 260 } });
