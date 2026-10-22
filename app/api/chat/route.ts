import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import {
  GEMINI_SYSTEM_INSTRUCTION,
  getKnowledgeFallbackResponse,
} from "@/lib/geminiKnowledge";

interface ChatMessage {
  role: "user" | "assistant" | "model";
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, clientApiKey } = body as {
      messages: ChatMessage[];
      clientApiKey?: string;
    };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "A non-empty messages array is required." },
        { status: 400 }
      );
    }

    const lastMessage = messages[messages.length - 1];
    const userPrompt = lastMessage.content || "";

    // Check for API key (Client-provided or server-side environment variable)
    const apiKey = clientApiKey?.trim() || process.env.GEMINI_API_KEY?.trim();

    if (!apiKey) {
      // Graceful offline knowledge simulation if no API key is yet configured
      const fallbackReply = getKnowledgeFallbackResponse(userPrompt);
      return NextResponse.json({
        reply: fallbackReply,
        source: "local-knowledge-base",
        note: "To enable live Google Gemini AI, set GEMINI_API_KEY in .env.local or enter your key in the chatbot settings.",
      });
    }

    // Initialize Google Gen AI client with the provided key
    const ai = new GoogleGenAI({ apiKey });

    // Format conversation history for Gemini API
    // Gemini expects 'user' or 'model' roles
    const formattedContents = messages.map((m) => ({
      role: m.role === "assistant" ? ("model" as const) : ("user" as const),
      parts: [{ text: m.content }],
    }));

    // Primary model attempt: gemini-2.5-flash, fallback to gemini-1.5-flash
    let responseText = "";
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction: GEMINI_SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      responseText = response.text || "";
    } catch (primaryErr: any) {
      console.warn("Primary gemini-2.5-flash attempt failed, trying gemini-1.5-flash:", primaryErr?.message);
      try {
        const fallbackResponse = await ai.models.generateContent({
          model: "gemini-1.5-flash",
          contents: formattedContents,
          config: {
            systemInstruction: GEMINI_SYSTEM_INSTRUCTION,
            temperature: 0.7,
          },
        });
        responseText = fallbackResponse.text || "";
      } catch (fallbackErr: any) {
        throw new Error(fallbackErr?.message || primaryErr?.message || "Gemini API invocation failed.");
      }
    }

    return NextResponse.json({
      reply: responseText,
      source: "gemini-ai",
    });
  } catch (error: any) {
    console.error("Gemini Chat API Error:", error);
    return NextResponse.json(
      {
        error: error?.message || "Failed to generate AI response.",
        fallback: getKnowledgeFallbackResponse("skills"),
      },
      { status: 500 }
    );
  }
}
