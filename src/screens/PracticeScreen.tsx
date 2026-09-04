import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BackHandler, StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppButton } from '../components/AppButton';
import { AppCard } from '../components/AppCard';
import { EmptyState } from '../components/EmptyState';
import { strings } from '../constants/appStrings';
import { RootStackParamList } from '../navigation/types';
import { usePracticeStore } from '../stores/usePracticeStore';
import { useWordsStore } from '../stores/useWordsStore';
import { useAppColors } from '../theme/colors';
type Props = NativeStackScreenProps<RootStackParamList, 'Practice'>;
export function PracticeScreen({ navigation }: Props) {
  const c = useAppColors(); const words = useWordsStore((s) => s.words); const recordAnswer = useWordsStore((s) => s.recordAnswer);
  const { queue, index, answerShown, lastAnswer, summary, answer, next } = usePracticeStore(); const id = queue[index]; const word = words.find((w) => w.id === id);
  useEffect(() => { const sub = BackHandler.addEventListener('hardwareBackPress', () => true); return () => sub.remove(); }, []);
  if (!word) return <SafeAreaView style={[styles.safe, { backgroundColor: c.background }]}><EmptyState title="Kart bulunamadı" body="Ana ekrana dönüp tekrar başlatın." /><AppButton title={strings.backHome} onPress={() => navigation.popToTop()} /></SafeAreaView>;
  const respond = async (known: boolean) => { if (answerShown) return; answer(word.id, known); await recordAnswer(word.id, known); };
  const advance = () => { if (index >= queue.length - 1) navigation.replace('PracticeSummary', summary); else next(); };
  return <SafeAreaView edges={['bottom']} style={[styles.safe, { backgroundColor: c.background }]}><Text style={[styles.progress, { color: c.muted }]}>{index + 1} / {queue.length}</Text><View style={styles.center}><AppCard><View style={styles.cardBody}><Text numberOfLines={4} adjustsFontSizeToFit style={[styles.term, { color: c.text }]}>{word.term}</Text>{answerShown ? <View style={styles.answer}><View style={[styles.line, { backgroundColor: lastAnswer ? c.success : c.danger }]} /><Text style={[styles.translation, { color: c.text }]}>{word.translation}</Text>{word.exampleSentence ? <Text style={[styles.detail, { color: c.muted }]}>“{word.exampleSentence}”</Text> : null}{word.note ? <Text style={[styles.detail, { color: c.muted }]}>Not: {word.note}</Text> : null}</View> : <Text style={[styles.hint, { color: c.muted }]}>Cevabınızı seçin</Text>}</View></AppCard></View><View style={styles.buttons}>{answerShown ? <AppButton title={index >= queue.length - 1 ? strings.finish : strings.next} onPress={advance} /> : <View style={styles.responseRow}><View style={styles.flex}><AppButton title={strings.dontKnow} variant="danger" onPress={() => void respond(false)} /></View><View style={styles.flex}><AppButton title={strings.know} variant="success" onPress={() => void respond(true)} /></View></View>}</View></SafeAreaView>;
}
const styles = StyleSheet.create({ safe: { flex: 1, padding: 16 }, progress: { textAlign: 'center', fontWeight: '600' }, center: { flex: 1, justifyContent: 'center' }, cardBody: { minHeight: 330, alignItems: 'center', justifyContent: 'center', padding: 14 }, term: { fontSize: 39, fontWeight: '800', textAlign: 'center' }, hint: { marginTop: 25 }, answer: { width: '100%', alignItems: 'center', marginTop: 28, gap: 12 }, line: { height: 3, width: 48, borderRadius: 2 }, translation: { fontSize: 26, textAlign: 'center', fontWeight: '700' }, detail: { fontSize: 15, textAlign: 'center' }, buttons: { paddingBottom: 6 }, responseRow: { flexDirection: 'row', gap: 12 }, flex: { flex: 1 } });
