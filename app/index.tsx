import ListItem from "@/components/ui/ListItem";
import { FIREBASE_DB, NOTE_COLLECTION } from "@/utils/firebaseConfig";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AudioModule, RecordingPresets, useAudioRecorder } from "expo-audio";
import { useRouter } from "expo-router";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const [isRecording, setIsRecording] = useState(false);
  const router = useRouter();
  const [notes, setNotes] = useState<any[]>([]); // Initialize with an empty array

  const { bottom } = useSafeAreaInsets();

  useEffect(() => {
    const notesCollection = collection(FIREBASE_DB, NOTE_COLLECTION);
    const q = query(notesCollection, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // console.log("Notes updated:", notes);
      setNotes(notes);
    });
    return () => unsubscribe();
  }, []);

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
      <FlatList
        data={notes}
        renderItem={({ item }) => (
          <ListItem
            id={item.id}
            preview={item.preview}
            createdAt={item.createdAt?.toDate()}
          />
        )}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <View style={[styles.buttonContainer, { bottom: bottom }]}>
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
  },
  buttonContainer: {
    position: "absolute",
    alignSelf: "center",
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
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#ccc",
  },
});
