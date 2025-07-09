import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack, useRouter } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Toaster } from "sonner-native";

export default function RootLayout() {
  const router = useRouter();
  return (
    <GestureHandlerRootView>
      <Toaster />
      <Stack>
        <Stack.Screen name='index' options={{ title: "Voice Recorder" }} />
        <Stack.Screen
          name='new-recording'
          options={{
            title: "New Recording",
            presentation: "modal",
            headerLeft: () => {
              return (
                <Ionicons
                  name='close'
                  size={24}
                  color='black'
                  onPress={() => router.back()}
                />
              );
            },
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}
