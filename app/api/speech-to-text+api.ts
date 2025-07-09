import OpenAI from "openai";

const API_KEY = process.env.OPENAI_API_KEY;

if (!API_KEY) {
  throw new Error("OPENAI_API_KEY is not set");
}

export async function POST(request: Request) {
  //   const { uri } = await request.json();
  try {
    const formData = await request.formData();
    const audioFile = formData.get("file") as any;

    // if (!audioFile || !(audioFile instanceof File)) {
    //   return Response.json(
    //     { error: "No audio file provided" },
    //     { status: 400 }
    //   );
    // }

    const openai = new OpenAI({ apiKey: API_KEY });

    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: "gpt-4o-mini-transcribe",
    });

    console.log(transcription.text);

    return Response.json({ text: transcription.text });
  } catch (error) {
    console.error("Error transcribing audio:", error);
    return Response.json(
      { error: "Failed to transcribe audio" },
      { status: 500 }
    );
  }
}
