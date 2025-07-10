import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack, useNavigationContainerRef, useRouter } from "expo-router";
import { PostHogProvider } from "posthog-react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Toaster } from "sonner-native";

const POSTHOG_API_KEY = process.env.EXPO_PUBLIC_POSTHOG_API_KEY;
const HOST = process.env.EXPO_PUBLIC_POSTHOG_HOST;
if (!POSTHOG_API_KEY) {
  console.warn(
    "PostHog API key is not set. Set EXPO_PUBLIC_POSTHOG_API_KEY to enable tracking in .env file."
  );
}

if (!HOST) {
  console.warn(
    "PostHog host is not set. Set EXPO_PUBLIC_POSTHOG_HOST to enable tracking in .env file."
  );
}

export default function RootLayout() {
  const navigationRef = useNavigationContainerRef();
  const router = useRouter();
  return (
    <GestureHandlerRootView>
      <PostHogProvider
        apiKey={POSTHOG_API_KEY}
        debug={true}
        options={{
          // Optional: Add any PostHog options here
          host: HOST,
          enableSessionReplay: true,

          sessionReplayConfig: {
            // Whether text inputs are masked. Default is true.
            // Password inputs are always masked regardless
            maskAllTextInputs: true,
            // Whether images are masked. Default is true.
            maskAllImages: true,
            // Capture logs automatically. Default is true.
            // Android only (Native Logcat only)
            captureLog: true,
            // Whether network requests are captured in recordings. Default is true
            // Only metric-like data like speed, size, and response code are captured.
            // No data is captured from the request or response body.
            // iOS only
            captureNetworkTelemetry: true,
            // Deboucer delay used to reduce the number of snapshots captured and reduce performance impact. Default is 500ms
            androidDebouncerDelayMs: 500,
            // Deboucer delay used to reduce the number of snapshots captured and reduce performance impact. Default is 1000ms
            iOSdebouncerDelayMs: 1000,
          },
        }}
        autocapture={{ navigationRef }}
      >
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
      </PostHogProvider>
    </GestureHandlerRootView>
  );
}
