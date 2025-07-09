import { useAudioPlayer } from "expo-audio";
import { Button, StyleSheet, Text, View } from "react-native";

interface AudioPlayerProps {
  uri?: string;
}

const AudioPlayer = ({ uri }: AudioPlayerProps) => {
  const player = useAudioPlayer(uri ? { uri } : undefined);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Audio Playback</Text>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <Button
          title='Play Audio'
          onPress={() => player.play()}
          disabled={!uri}
        />
        <Button
          title='Replay Audio'
          onPress={() => {
            player.seekTo(0);
            player.play();
          }}
          disabled={!uri}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

export default AudioPlayer;
