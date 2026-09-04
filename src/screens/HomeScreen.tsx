import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useMemo } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
  const start = usePracticeStore((state) => state.start);
  useEffect(() => { void loadWords(); }, [loadWords]);
  const learned = words.filter((word) => word.isLearned).length;
  const shownWords = useMemo(() => words.filter((word) => {
    const matchesFilter = filter === 'all' || (filter === 'learned') === word.isLearned;
    const query = searchQuery.trim().toLocaleLowerCase('tr-TR');
    return matchesFilter && (!query || `${word.term} ${word.translation}`.toLocaleLowerCase('tr-TR').includes(query));
  }), [words, filter, searchQuery]);
  const begin = () => { const pool = words.filter((word) => includeLearned || !word.isLearned); if (!pool.length) { Alert.alert(words.length ? strings.noUnlearned : strings.emptyTitle); return; } start(words, includeLearned); navigation.navigate('Practice'); };
  const confirmDelete = (id: string) => Alert.alert(strings.deleteTitle, strings.deleteBody, [{ text: strings.cancel, style: 'cancel' }, { text: strings.delete, style: 'destructive', onPress: () => void deleteWord(id) }]);

  return <SafeAreaView style={[styles.safe, { backgroundColor: c.background }]} edges={['top']}>
    <FlatList data={shownWords} keyExtractor={(item) => item.id} contentContainerStyle={styles.list} ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      ListHeaderComponent={<>
        <View style={styles.header}><View><Text style={[styles.eyebrow, { color: c.primary }]}>{strings.subtitle.toLocaleUpperCase('tr-TR')}</Text><Text style={[styles.title, { color: c.text }]}>{strings.appName}</Text></View><Pressable onPress={() => navigation.navigate('AddEditWord')} style={[styles.headerAdd, { backgroundColor: c.surface }]}><Ionicons name="add" size={24} color={c.text} /></Pressable></View>
        <View style={styles.stats}><StatCard label={strings.total} value={words.length} /><StatCard label={strings.learned} value={learned} accent /><StatCard label={strings.unlearned} value={words.length - learned} /></View>
        <Pressable onPress={begin} style={({ pressed }) => [styles.practice, { backgroundColor: c.primary, opacity: pressed ? 0.86 : 1 }]}><View style={styles.practiceIcon}><Ionicons name="play" size={18} color={c.primary} /></View><View style={styles.practiceCopy}><Text style={styles.practiceTitle}>{strings.startPractice}</Text><Text style={styles.practiceBody}>{includeLearned ? 'Tüm kartlarla tekrar yap' : `${words.length - learned} kart tekrar bekliyor`}</Text></View><Ionicons name="arrow-forward" size={21} color="#FFFFFF" /></Pressable>
        <View style={[styles.includeRow, { backgroundColor: c.surface, borderColor: c.border }]}><View style={[styles.smallIcon, { backgroundColor: c.surfaceMuted }]}><Ionicons name="layers-outline" size={17} color={c.muted} /></View><Text style={[styles.includeLabel, { color: c.text }]}>{strings.includeLearned}</Text><Switch value={includeLearned} onValueChange={setIncludeLearned} trackColor={{ false: c.border, true: c.primary }} thumbColor="#FFFFFF" /></View>
        <View style={[styles.searchBox, { backgroundColor: c.surface, borderColor: c.border }]}><Ionicons name="search-outline" size={20} color={c.muted} /><TextInput value={searchQuery} onChangeText={setSearchQuery} placeholder={strings.search} placeholderTextColor={c.muted} style={[styles.search, { color: c.text }]} /><Pressable onPress={() => setSearchQuery('')} disabled={!searchQuery}>{searchQuery ? <Ionicons name="close-circle" size={19} color={c.muted} /> : null}</Pressable></View>
        <View style={styles.filterRow}><Text style={[styles.sectionTitle, { color: c.text }]}>Kelimeler</Text><Text style={[styles.count, { color: c.muted }]}>{shownWords.length}</Text></View><FilterChips value={filter} onChange={setFilter} /><View style={styles.listGap} />
      </>}
      renderItem={({ item }) => <WordListItem word={item} onEdit={() => navigation.navigate('AddEditWord', { wordId: item.id })} onDelete={() => confirmDelete(item.id)} onToggle={() => void toggleLearned(item.id)} />}
      ListEmptyComponent={<EmptyState title={words.length ? 'Sonuç bulunamadı' : undefined} body={words.length ? 'Arama veya filtreyi değiştirmeyi deneyin.' : undefined} />}
    />
    <Pressable accessibilityLabel={strings.addWord} onPress={() => navigation.navigate('AddEditWord')} style={({ pressed }) => [styles.fab, { backgroundColor: c.text, opacity: pressed ? 0.82 : 1 }]}><Ionicons name="add" size={27} color={c.background} /></Pressable>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1 }, list: { paddingHorizontal: 18, paddingBottom: 104, flexGrow: 1 }, header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16, paddingBottom: 22 },
  eyebrow: { fontSize: 11, fontWeight: '700', letterSpacing: 1.5, marginBottom: 5 }, title: { fontSize: 32, fontWeight: '700', letterSpacing: -1.1 }, headerAdd: { width: 44, height: 44, borderRadius: 15, alignItems: 'center', justifyContent: 'center' }, stats: { flexDirection: 'row', gap: 9, marginBottom: 14 },
  practice: { minHeight: 78, borderRadius: 21, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', gap: 13 }, practiceIcon: { width: 39, height: 39, borderRadius: 14, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' }, practiceCopy: { flex: 1 }, practiceTitle: { color: '#FFFFFF', fontSize: 17, fontWeight: '700' }, practiceBody: { color: 'rgba(255,255,255,0.72)', fontSize: 12, marginTop: 4 },
  includeRow: { minHeight: 58, borderWidth: StyleSheet.hairlineWidth, borderRadius: 18, marginTop: 10, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', gap: 10 }, smallIcon: { width: 34, height: 34, borderRadius: 11, alignItems: 'center', justifyContent: 'center' }, includeLabel: { flex: 1, fontSize: 14, fontWeight: '500' }, searchBox: { height: 52, borderWidth: StyleSheet.hairlineWidth, borderRadius: 16, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, gap: 9, marginTop: 18 }, search: { flex: 1, height: '100%', fontSize: 15 },
  filterRow: { flexDirection: 'row', alignItems: 'baseline', gap: 7, marginTop: 24, marginBottom: 12 }, sectionTitle: { fontSize: 20, fontWeight: '700', letterSpacing: -0.4 }, count: { fontSize: 13 }, listGap: { height: 14 }, fab: { position: 'absolute', right: 20, bottom: 24, width: 56, height: 56, borderRadius: 19, alignItems: 'center', justifyContent: 'center', elevation: 4, shadowColor: '#000', shadowOpacity: 0.18, shadowRadius: 10, shadowOffset: { width: 0, height: 5 } },
});
