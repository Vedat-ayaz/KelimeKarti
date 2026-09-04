import { Pressable, StyleSheet, Text } from 'react-native';
import { useAppColors } from '../theme/colors';

export function AppButton({ title, onPress, variant = 'primary', disabled = false }: { title: string; onPress(): void; variant?: 'primary' | 'success' | 'danger' | 'secondary'; disabled?: boolean }) {
  const colors = useAppColors(); const color = variant === 'success' ? colors.success : variant === 'danger' ? colors.danger : colors.primary;
  return <Pressable accessibilityRole="button" disabled={disabled} onPress={onPress} style={({ pressed }) => [styles.button, { backgroundColor: variant === 'secondary' ? colors.surface : color, borderColor: color, opacity: disabled ? 0.45 : pressed ? 0.8 : 1 }]}><Text style={[styles.text, { color: variant === 'secondary' ? color : '#FFFFFF' }]}>{title}</Text></Pressable>;
}
const styles = StyleSheet.create({ button: { minHeight: 50, borderRadius: 14, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 18, borderWidth: 1 }, text: { fontSize: 16, fontWeight: '700' } });
