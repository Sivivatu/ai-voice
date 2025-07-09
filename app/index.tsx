import Ionicons from "@expo/vector-icons/Ionicons";
import { AudioModule, RecordingPresets, useAudioRecorder } from "expo-audio";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const [isRecording, setIsRecording] = useState(false);
  const router = useRouter();

  const { bottom } = useSafeAreaInsets();

  const startRecording = async () => {
    await audioRecorder.prepareToRecordAsync();
    console.log("Starting recording...");
    audioRecorder.record();
    setIsRecording(true);
  };

  const stopRecording = async () => {
    if (!isRecording) return;
    // The recording will be available on `audioRecorder.uri`.
    console.log("Stopping recording...");
    await audioRecorder.stop();
    const uri = audioRecorder.uri;
    console.log("Recording URI:", uri);
    setIsRecording(false);

    if (!uri) {
      Alert.alert("Recording failed", "No recording was created.");
      return;
    } else {
      // Navigate to the new recording page with the recording URI
      router.push(`/new-recording?uri=${encodeURIComponent(uri)}`);
      console.log("Navigating to new recording page with URI:", uri);
    }
  };

  useEffect(() => {
    (async () => {
      const status = await AudioModule.requestRecordingPermissionsAsync();
      if (!status.granted) {
        Alert.alert("Permission to access microphone was denied");
        return;
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      {/* TODO: Render items in recording list */}
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <View style={[styles.buttonContainer, { bottom }]}>
        <TouchableOpacity
          onPress={isRecording ? stopRecording : startRecording}
          style={[
            styles.recordButton,
            isRecording ? styles.recordingButton : styles.notRecordingButton,
          ]}
        >
          <Ionicons
            name={isRecording ? "stop" : "mic"}
            size={24}
            color='white'
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    position: "absolute",
    alignItems: "center",
  },
  recordButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  recordingButton: {
    backgroundColor: "#ff4444",
  },
  notRecordingButton: {
    backgroundColor: "#4444ff",
  },
});
