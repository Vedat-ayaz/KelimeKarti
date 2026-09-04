import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Word } from '../domain/entities/Word';
import { useAppColors } from '../theme/colors';
import { AppCard } from './AppCard';
import { LearnedBadge } from './LearnedBadge';
export function WordListItem({ word, onEdit, onDelete, onToggle }: { word: Word; onEdit(): void; onDelete(): void; onToggle(): void }) { const c = useAppColors(); return <AppCard><View style={styles.row}><View style={styles.content}><Text numberOfLines={2} style={[styles.term, { color: c.text }]}>{word.term}</Text><Text numberOfLines={2} style={[styles.translation, { color: c.muted }]}>{word.translation}</Text><LearnedBadge learned={word.isLearned} onPress={onToggle} /></View><View style={styles.actions}><Pressable accessibilityLabel="Düzenle" onPress={onEdit} hitSlop={10}><Text style={[styles.icon, { color: c.primary }]}>✎</Text></Pressable><Pressable accessibilityLabel="Sil" onPress={onDelete} hitSlop={10}><Text style={[styles.icon, { color: c.danger }]}>⌫</Text></Pressable></View></View></AppCard>; }
const styles = StyleSheet.create({ row: { flexDirection: 'row', gap: 10 }, content: { flex: 1, alignItems: 'flex-start', gap: 6 }, actions: { flexDirection: 'row', gap: 18, alignItems: 'center' }, term: { fontSize: 19, fontWeight: '700' }, translation: { fontSize: 15 }, icon: { fontSize: 24 } });
