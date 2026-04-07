import { GoogleGenAI, Type } from "@google/genai";
import { Message, SkillScore } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getChatResponse(history: Message[], currentScores: SkillScore[]) {
  const model = "gemini-3-flash-preview";
  
  const systemInstruction = `
    You are CogniMind AI, a compassionate cognitive health assistant.
    Your goal is to conduct a diagnostic conversation to identify cognitive skill deficiencies.
    
    Current User Profile:
    ${currentScores.map(s => `- ${s.skill}: ${s.score}/100`).join('\n')}
    
    Guidelines:
    1. Ask one insightful question at a time.
    2. Questions should be scenario-based to test cognitive functions (e.g., "How do you feel when you have to juggle three tasks at once?").
    3. Be empathetic and supportive.
    4. After 3-5 questions, provide a brief analysis and suggest a mental health strategy.
    5. Respond in a way that can be parsed for score updates if needed (but keep the text natural).
    
    Format your response as JSON:
    {
      "text": "Your natural language response to the user",
      "analysis": "Optional: Brief analysis of cognitive state if enough info gathered",
      "scoreUpdates": [
        { "skill": "Attention", "adjustment": 5 } // Optional: Adjust score based on response (-10 to 10)
      ],
      "strategy": "Optional: A mental health strategy or exercise"
    }
  `;

  const response = await ai.models.generateContent({
    model,
    contents: history.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          text: { type: Type.STRING },
          analysis: { type: Type.STRING },
          scoreUpdates: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                skill: { type: Type.STRING },
                adjustment: { type: Type.NUMBER }
              }
            }
          },
          strategy: { type: Type.STRING }
        },
        required: ["text"]
      }
    }
  });

  return JSON.parse(response.text);
}
