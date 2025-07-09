import { useAudioPlayer } from "expo-audio";
import { useLocalSearchParams } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";
// import { useState, useEffect } from "react";

const Page = () => {
  const { uri } = useLocalSearchParams<{ uri?: string }>();
  console.log("🚀 ~ Page ~ ", uri);
  const player = useAudioPlayer(uri ? { uri } : undefined);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>New Recording Page</Text>
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
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
