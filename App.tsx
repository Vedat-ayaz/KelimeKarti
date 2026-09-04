import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './src/navigation/RootNavigator';

export default function App() {
  const dark = useColorScheme() === 'dark';
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={dark ? DarkTheme : DefaultTheme}>
        <StatusBar style={dark ? 'light' : 'dark'} />
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
