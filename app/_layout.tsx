import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { LanguageProvider } from '@/contexts/LanguageContext';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  
  const [fontsLoaded, fontError] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <LanguageProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          <Stack.Screen name="service-detail" options={{ headerShown: false, presentation: 'card' }} />
          <Stack.Screen name="environmental-awareness" options={{ headerShown: false, presentation: 'card' }} />
          <Stack.Screen name="weather-forecast" options={{ headerShown: false, presentation: 'card' }} />
          <Stack.Screen name="challenge-detail" options={{ headerShown: false, presentation: 'card' }} />
          <Stack.Screen name="challenge-praise" options={{ headerShown: false, presentation: 'card' }} />
          <Stack.Screen name="alarm-ring" options={{ headerShown: false, presentation: 'card' }} />
          <Stack.Screen name="challenge-photo" options={{ headerShown: false, presentation: 'card' }} />
          <Stack.Screen name="journal" options={{ headerShown: false, presentation: 'card' }} />
          <Stack.Screen name="profile" options={{ headerShown: false, presentation: 'card' }} />
          <Stack.Screen name="level3-planning" options={{ headerShown: false, presentation: 'card' }} />
        </Stack>
        <StatusBar style="light" backgroundColor="#A42417" />
      </ThemeProvider>
    </LanguageProvider>
  );
}
