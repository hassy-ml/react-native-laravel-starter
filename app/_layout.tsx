import '@/global.css';
import { Slot } from 'expo-router';
import 'react-native-reanimated';

import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function InnerLayout() {
  const { themeMode } = useTheme();

  return (
    <GluestackUIProvider mode={themeMode}>
      <SafeAreaProvider>
        <Slot />
      </SafeAreaProvider>
    </GluestackUIProvider>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <InnerLayout />
      </ThemeProvider>
    </AuthProvider>
  );
}
