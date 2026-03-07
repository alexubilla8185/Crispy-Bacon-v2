import { GoogleGenAI, Type } from "@google/genai";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const { insightId, audioUrl, mimeType, isDeepAnalysisEnabled } = await req.json();
    const supabase = await createClient();
    const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY! });
    
    const model = isDeepAnalysisEnabled ? "gemini-3.1-pro-preview" : "gemini-3-flash-preview";

    const response = await ai.models.generateContent({
      model,
      contents: {
        parts: [
          { text: "Analyze this audio and provide a structured summary, highlights, action items, topics, and sentiment." },
          { inlineData: { data: audioUrl, mimeType: mimeType || 'audio/webm' } }
        ]
      },
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
    const intelligence = JSON.parse(cleanJson);

    // Update the insights table
    const { error: updateError } = await supabase
      .from('insights')
      .update({
        processing_status: 'completed',
        summary: intelligence.summary,
        highlights: intelligence.highlights,
        action_items: intelligence.action_items,
        topics: intelligence.topics,
        sentiment: intelligence.sentiment,
        intelligence: intelligence,
        updated_at: new Date().toISOString(),
      })
      .eq('id', insightId);

    if (updateError) {
      console.error('Database update error:', updateError);
      return NextResponse.json({ error: 'Failed to update insight' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Server-side AI analysis error:', error);
    return NextResponse.json({ error: 'Failed to analyze content' }, { status: 500 });
  }
}
