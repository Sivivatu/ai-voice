import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ title: "Voice Recorder" }} />
      <Stack.Screen
        name='new-recording'
        options={{
          title: "New Recording",
          presentation: "modal",
          headerLeft: () => {
            return <Ionicons name='close' size={24} color='black' />;
          },
        }}
      />
    </Stack>
  );
}
