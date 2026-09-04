import { Pressable, StyleSheet, Text, View } from 'react-native';
import { strings } from '../constants/appStrings';
import { useAppColors } from '../theme/colors';
import { WordFilter } from '../stores/useWordsStore';
const options: { value: WordFilter; label: string }[] = [{ value: 'all', label: strings.all }, { value: 'unlearned', label: strings.unlearnedPlural }, { value: 'learned', label: strings.learnedPlural }];
export function FilterChips({ value, onChange }: { value: WordFilter; onChange(value: WordFilter): void }) { const c = useAppColors(); return <View style={styles.row}>{options.map((item) => { const active = value === item.value; return <Pressable key={item.value} onPress={() => onChange(item.value)} style={[styles.chip, { backgroundColor: active ? c.primary : c.surface, borderColor: active ? c.primary : c.border }]}><Text style={{ color: active ? '#FFF' : c.text, fontWeight: '600' }}>{item.label}</Text></Pressable>; })}</View>; }
const styles = StyleSheet.create({ row: { flexDirection: 'row', gap: 8 }, chip: { borderWidth: 1, borderRadius: 22, paddingHorizontal: 12, paddingVertical: 8 } });
