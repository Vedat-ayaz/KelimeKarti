import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useAppColors } from '../theme/colors';

export function AppButton({ title, onPress, variant = 'primary', disabled = false, icon }: { title: string; onPress(): void; variant?: 'primary' | 'success' | 'danger' | 'secondary'; disabled?: boolean; icon?: keyof typeof Ionicons.glyphMap }) {
  const colors = useAppColors(); const color = variant === 'success' ? colors.success : variant === 'danger' ? colors.danger : colors.primary;
  const foreground = variant === 'secondary' ? colors.text : '#FFFFFF';
  return <Pressable accessibilityRole="button" disabled={disabled} onPress={onPress} style={({ pressed }) => [styles.button, { backgroundColor: variant === 'secondary' ? colors.surface : color, borderColor: variant === 'secondary' ? colors.border : color, opacity: disabled ? 0.45 : pressed ? 0.82 : 1 }]}><View style={styles.content}>{icon ? <Ionicons name={icon} size={19} color={foreground} /> : null}<Text style={[styles.text, { color: foreground }]}>{title}</Text></View></Pressable>;
}
const styles = StyleSheet.create({ button: { minHeight: 52, borderRadius: 16, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, borderWidth: 1 }, content: { flexDirection: 'row', alignItems: 'center', gap: 8 }, text: { fontSize: 16, fontWeight: '700', letterSpacing: -0.15 } });
