import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppButton } from '../components/AppButton';
import { AppCard } from '../components/AppCard';
import { strings } from '../constants/appStrings';
import { RootStackParamList } from '../navigation/types';
import { usePracticeStore } from '../stores/usePracticeStore';
import { useWordsStore } from '../stores/useWordsStore';
import { useAppColors } from '../theme/colors';
type Props = NativeStackScreenProps<RootStackParamList, 'PracticeSummary'>;
export function PracticeSummaryScreen({ navigation, route }: Props) { const c = useAppColors(); const words = useWordsStore((s) => s.words); const includeLearned = useWordsStore((s) => s.includeLearned); const start = usePracticeStore((s) => s.start); const remaining = words.filter((w) => !w.isLearned).length; const rows = [[strings.shown, route.params.shown], [strings.known, route.params.known], [strings.unknown, route.params.unknown], [strings.remaining, remaining]] as const; const restart = () => { const pool = words.filter((w) => includeLearned || !w.isLearned); if (!pool.length) { navigation.popToTop(); return; } start(words, includeLearned); navigation.replace('Practice'); }; return <SafeAreaView edges={['bottom']} style={[styles.safe, { backgroundColor: c.background }]}><View style={styles.center}><Text style={styles.emoji}>✓</Text><Text style={[styles.title, { color: c.text }]}>{strings.summary}</Text><AppCard>{rows.map(([label, value]) => <View key={label} style={[styles.row, { borderBottomColor: c.border }]}><Text style={{ color: c.muted }}>{label}</Text><Text style={[styles.value, { color: c.text }]}>{value}</Text></View>)}</AppCard></View><View style={styles.actions}><AppButton title={strings.startPractice} onPress={restart} /><AppButton title={strings.backHome} variant="secondary" onPress={() => navigation.popToTop()} /></View></SafeAreaView>; }
const styles = StyleSheet.create({ safe: { flex: 1, padding: 16 }, center: { flex: 1, justifyContent: 'center', gap: 18 }, emoji: { textAlign: 'center', fontSize: 48, color: '#16845B' }, title: { textAlign: 'center', fontSize: 28, fontWeight: '800' }, row: { minWidth: 260, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 14, borderBottomWidth: StyleSheet.hairlineWidth }, value: { fontSize: 18, fontWeight: '800' }, actions: { gap: 10 } });
