import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { toast } from "sonner-native";
import AudioPlayer from "../components/ui/AudioPlayer";
// import { useState, useEffect } from "react";

const Page = () => {
  const { uri } = useLocalSearchParams<{ uri?: string }>();
  const [transcription, setTranscription] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  console.log("🚀 ~ Page ~ ", uri);

  useEffect(() => {
    // if (!uri) {
    //   console.error("No URI provided for audio playback.");
    //   return;
    // }

    handleTrascription();
  }, [uri]);

  // Function to handle transcription
  const handleTrascription = async () => {
    setIsLoading(true);
    toast.loading("Transcribing...");
    try {
      const formData = new FormData();
      const audioData = {
        uri,
        type: "audio/m4a",
        name: "audio.m4a",
      };
      formData.append("file", audioData as unknown as Blob);

      // Send the audio file to the server for transcription
      console.log("Sending audio data:", audioData);
      const response = await fetch("/api/speech-to-text", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      }).then((response) => response.json());
      console.log("Transcription response:", response);
      setTranscription(response.text || "No transcription available");
      toast.success("Transcription completed successfully!");
    } catch (error) {
      console.error("Error transcribing audio:", error);
    } finally {
      setIsLoading(false);
      toast.dismiss();
    }
  };

  const handleSave = () => {
    console.log("Saving transcription:", transcription);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.transcriptionInput}
        multiline
        value={transcription}
        onChangeText={setTranscription}
        placeholder='Transcription will appear here...'
        editable={!isLoading}
      />
      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSave}
        disabled={isLoading}
      >
        <Text style={styles.saveButtonText}>Save Transcription</Text>
      </TouchableOpacity>
      <AudioPlayer uri={uri} />
    </View>
  );
};

export default Page;

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  transcriptionInput: {
    backgroundColor: "white",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    minHeight: 150,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: "#FF9800",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
