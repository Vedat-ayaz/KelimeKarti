import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useMemo } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppButton } from '../components/AppButton';
import { EmptyState } from '../components/EmptyState';
import { FilterChips } from '../components/FilterChips';
import { StatCard } from '../components/StatCard';
import { WordListItem } from '../components/WordListItem';
import { strings } from '../constants/appStrings';
import { RootStackParamList } from '../navigation/types';
import { usePracticeStore } from '../stores/usePracticeStore';
import { useWordsStore } from '../stores/useWordsStore';
import { useAppColors } from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;
export function HomeScreen({ navigation }: Props) {
  const c = useAppColors();
  const { words, loadWords, deleteWord, toggleLearned, searchQuery, setSearchQuery, filter, setFilter, includeLearned, setIncludeLearned } = useWordsStore();
  const start = usePracticeStore((s) => s.start);
  useEffect(() => { void loadWords(); }, [loadWords]);
  const learned = words.filter((w) => w.isLearned).length;
  const shownWords = useMemo(() => words.filter((w) => (filter === 'all' || (filter === 'learned') === w.isLearned) && (searchQuery.trim() === '' || `${w.term} ${w.translation}`.toLocaleLowerCase('tr-TR').includes(searchQuery.trim().toLocaleLowerCase('tr-TR')))), [words, filter, searchQuery]);
  const begin = () => { const pool = words.filter((w) => includeLearned || !w.isLearned); if (!pool.length) { Alert.alert(words.length ? strings.noUnlearned : strings.emptyTitle); return; } start(words, includeLearned); navigation.navigate('Practice'); };
  const confirmDelete = (id: string) => Alert.alert(strings.deleteTitle, strings.deleteBody, [{ text: strings.cancel, style: 'cancel' }, { text: strings.delete, style: 'destructive', onPress: () => void deleteWord(id) }]);
  return <SafeAreaView style={[styles.safe, { backgroundColor: c.background }]} edges={['top']}><View style={styles.header}><Text style={[styles.title, { color: c.text }]}>{strings.appName}</Text><Text style={[styles.subtitle, { color: c.muted }]}>{strings.subtitle}</Text></View><View style={styles.stats}><StatCard label={strings.total} value={words.length} /><StatCard label={strings.learned} value={learned} /><StatCard label={strings.unlearned} value={words.length - learned} /></View><View style={styles.controls}><AppButton title={strings.startPractice} onPress={begin} /><View style={styles.switchRow}><Text style={{ color: c.text, flex: 1 }}>{strings.includeLearned}</Text><Switch value={includeLearned} onValueChange={setIncludeLearned} trackColor={{ true: c.primary }} /></View><TextInput value={searchQuery} onChangeText={setSearchQuery} placeholder={strings.search} placeholderTextColor={c.muted} style={[styles.search, { backgroundColor: c.surface, color: c.text, borderColor: c.border }]} /><FilterChips value={filter} onChange={setFilter} /></View><FlatList data={shownWords} keyExtractor={(item) => item.id} contentContainerStyle={styles.list} ItemSeparatorComponent={() => <View style={{ height: 10 }} />} renderItem={({ item }) => <WordListItem word={item} onEdit={() => navigation.navigate('AddEditWord', { wordId: item.id })} onDelete={() => confirmDelete(item.id)} onToggle={() => void toggleLearned(item.id)} />} ListEmptyComponent={<EmptyState title={words.length ? 'Sonuç bulunamadı' : undefined} body={words.length ? 'Arama veya filtreyi değiştirmeyi deneyin.' : undefined} />} /><Pressable accessibilityLabel={strings.addWord} onPress={() => navigation.navigate('AddEditWord')} style={({ pressed }) => [styles.fab, { backgroundColor: c.primary, opacity: pressed ? 0.8 : 1 }]}><Text style={styles.plus}>＋</Text></Pressable></SafeAreaView>;
}
const styles = StyleSheet.create({ safe: { flex: 1 }, header: { paddingHorizontal: 16, paddingTop: 12 }, title: { fontSize: 29, fontWeight: '800' }, subtitle: { marginTop: 2 }, stats: { flexDirection: 'row', padding: 16, gap: 9 }, controls: { paddingHorizontal: 16, gap: 13 }, switchRow: { flexDirection: 'row', alignItems: 'center' }, search: { borderWidth: 1, borderRadius: 13, height: 48, paddingHorizontal: 14, fontSize: 16 }, list: { padding: 16, paddingBottom: 100, flexGrow: 1 }, fab: { position: 'absolute', right: 20, bottom: 24, width: 60, height: 60, borderRadius: 30, alignItems: 'center', justifyContent: 'center', elevation: 5, shadowOpacity: 0.2, shadowRadius: 6 }, plus: { color: '#FFF', fontSize: 32, lineHeight: 36 } });
