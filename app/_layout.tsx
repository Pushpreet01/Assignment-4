import { Stack, router } from 'expo-router';
import { useEffect } from 'react';

export default function RootLayout() {
  // Redirect to /signin on initial load
  useEffect(() => {
    router.replace('/signin');
  }, []);

  return (
    <Stack>
      <Stack.Screen name="signin" options={{ headerShown: true, title: 'Signin' }} />
      <Stack.Screen name="signup" options={{ headerShown: true, title: 'Signup' }} />
      <Stack.Screen name="landing" options={{ headerShown: true, title: 'Home' }} />
    </Stack>
  );
}