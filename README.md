# AI Voice Recorder

This project is an [Expo](https://expo.dev) app for recording, transcribing, and playing back audio notes, with cloud storage and AI-powered transcription. The initial build followed the [Galaxies.dev YouTube tutorial](https://www.youtube.com/watch?v=86iUP4fwl8c&list=TLPQMTMxMTIwMjSM1_-9RydWdQ&index=59) and is based on the [reference repository](https://github.com/Galaxies-dev/ai-voice-recorder/tree/main).

## Features

- Record audio notes and save them to the cloud (Firebase)
- Transcribe audio using OpenAI's API
- Playback recordings using the new `expo-audio` package
- File-based routing with `expo-router`
- Toast notifications with `sonner-native`
- Analytics and session replay with PostHog (if configured)
- Modern Expo SDK and TypeScript support

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

or

```bash
npm install
```

### 2. Set up environment variables

Copy `.env.example` to `.env` and fill in your Firebase, OpenAI, and (optionally) PostHog credentials.

```bash
cp .env.example .env
```

### 3. Start the app

```bash
pnpm expo start
```

or

```bash
npx expo start
```

You can open the app in:

- [Development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go) (for basic features)

### 4. Build for production

```bash
pnpm expo prebuild
pnpm expo run:android
pnpm expo run:ios
```

## Project Structure

- `app/` — Main app screens and API routes (file-based routing)
- `components/ui/AudioPlayer.tsx` — Audio playback component using `expo-audio`
- `utils/` — Firebase config and other utilities
- `.env.example` — Example environment variables

## Reference & Credits

- [Galaxies.dev YouTube Tutorial](https://www.youtube.com/watch?v=86iUP4fwl8c&list=TLPQMTMxMTIwMjSM1_-9RydWdQ&index=59)
- [Reference GitHub Repository](https://github.com/Galaxies-dev/ai-voice-recorder/tree/main)
- [Expo Documentation](https://docs.expo.dev/)
- [expo-audio Documentation](https://docs.expo.dev/versions/latest/sdk/audio/)

## Community

- [Expo on GitHub](https://github.com/expo/expo)
- [Expo Discord](https://chat.expo.dev)

---

Feel free to contribute or open issues!
