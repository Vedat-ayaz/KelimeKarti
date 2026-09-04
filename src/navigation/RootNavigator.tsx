import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { strings } from '../constants/appStrings';
import { AddEditWordScreen } from '../screens/AddEditWordScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { PracticeScreen } from '../screens/PracticeScreen';
import { PracticeSummaryScreen } from '../screens/PracticeSummaryScreen';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();
export function RootNavigator() {
  return <Stack.Navigator screenOptions={{ headerShadowVisible: false }}>
    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="AddEditWord" component={AddEditWordScreen} options={{ title: strings.addWord }} />
    <Stack.Screen name="Practice" component={PracticeScreen} options={{ title: strings.startPractice, gestureEnabled: false }} />
    <Stack.Screen name="PracticeSummary" component={PracticeSummaryScreen} options={{ title: strings.summary, headerBackVisible: false, gestureEnabled: false }} />
  </Stack.Navigator>;
}
