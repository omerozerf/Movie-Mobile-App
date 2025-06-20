import { Stack } from "expo-router";
import './globals.css';

export default function RootLayout() {
  return <Stack>
    <Stack.Screen
      name="(tabs)"
      options={{headerShown: true}}
    />
    <Stack.Screen
      name="movies/[id]"
      options={{headerShown: false}}
    />
  </Stack>;
}
