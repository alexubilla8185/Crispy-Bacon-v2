import { GoogleGenAI, Type } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { audioUrl, isDeepAnalysisEnabled } = await req.json();
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
    
    const model = isDeepAnalysisEnabled ? "gemini-3.1-pro-preview" : "gemini-3-flash-preview";

    const response = await ai.models.generateContent({
      model,
      contents: `Analyze this audio: ${audioUrl}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            highlights: { type: Type.ARRAY, items: { type: Type.STRING } },
            action_items: { type: Type.ARRAY, items: { type: Type.STRING } },
            topics: { type: Type.ARRAY, items: { type: Type.STRING } },
            sentiment: { type: Type.STRING },
          },
          required: ["summary", "highlights", "action_items", "topics", "sentiment"],
        },
        systemInstruction: "You are a top-tier analyst. Provide dense, high-signal analysis."
      }
    });
    
    const cleanJson = response.text!.replace(/```json\n?|\n?```/g, "");
    return NextResponse.json(JSON.parse(cleanJson));
  } catch (error) {
    console.error('Server-side AI analysis error:', error);
    return NextResponse.json({ error: 'Failed to analyze content' }, { status: 500 });
  }
}
