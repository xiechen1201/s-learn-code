import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { setStatusBarStyle } from 'expo-status-bar';

export default function RootLayout() {
  useEffect(() => {
    setTimeout(() => {
      setStatusBarStyle('light');
    }, 0);
  });

  return (
    <Stack>
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      <Stack.Screen name='+not-found' />
    </Stack>
  );
}
