import { GoogleGenAI, Type } from "@google/genai";

// FIX: Use process.env.API_KEY as required by the coding guidelines.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd want to handle this more gracefully.
  // For this example, we'll throw an error if the key is missing.
  // FIX: Updated the error message to comply with coding guidelines.
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const SYSTEM_INSTRUCTION = `You are an expert homeopathic AI assistant for certified doctors. Analyze the patient's medical history from the provided text and/or image. Provide a summary, suggest follow-up questions, and analyze potential remedies. For each remedy, provide a clear rationale, suggested potency and dosage, a list of key matching symptoms from the case, and a match strength ('High', 'Medium', or 'Low'). Conclude with a disclaimer that this is AI-generated and not a replacement for professional medical judgment.`;

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    patientHistorySummary: {
      type: Type.STRING,
      description: "A brief summary of the key symptoms, timeline, and relevant medical history from the document."
    },
    suggestedFollowUpQuestions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of precise, probing questions for the doctor to ask the patient to clarify symptoms and understand their state."
    },
    potentialRemedyAnalysis: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          remedyName: { type: Type.STRING, description: "The name of the homeopathic remedy." },
          rationale: { type: Type.STRING, description: "A clear rationale linking the remedy to the patient's specific symptoms." },
          potency: { type: Type.STRING, description: "The suggested potential potency (e.g., 30C, 200C, 1M)." },
          dosage: { type: Type.STRING, description: "The suggested starting dosage and frequency (e.g., 'one dose and wait')." },
          keySymptoms: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A brief list of the key patient symptoms that this remedy strongly matches."
          },
          matchStrength: {
            type: Type.STRING,
            description: "An assessment of how strongly the remedy matches the overall case. (e.g., 'High', 'Medium', 'Low')."
          }
        },
        required: ["remedyName", "rationale", "potency", "dosage", "keySymptoms", "matchStrength"]
      },
      description: "A list of potential homeopathic remedies that could be considered."
    },
    disclaimer: {
      type: Type.STRING,
      description: "A disclaimer stating that these are AI-generated suggestions and the final diagnosis is the doctor's responsibility."
    }
  },
  required: ["patientHistorySummary", "suggestedFollowUpQuestions", "potentialRemedyAnalysis", "disclaimer"]
};


export async function analyzePatientHistory(
    prompt: string,
    image?: { base64: string, mimeType: string }
  ): Promise<string> {
  try {
    const parts: any[] = [{ text: prompt }];
    if (image) {
        parts.push({
          inlineData: {
            data: image.base64,
            mimeType: image.mimeType,
          },
        });
    }

    const response = await ai.models.generateContent({
      // FIX: Upgraded model to gemini-2.5-pro for complex reasoning and structured JSON output.
      model: 'gemini-2.5-pro',
      contents: { parts },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      }
    });
    
    // The response.text should be a valid JSON string.
    return response.text;
  } catch (error) {
    console.error("Error analyzing patient history:", error);
    if (error instanceof Error) {
        return `Error: An issue occurred while contacting the AI model. Details: ${error.message}`;
    }
    return "Error: An unknown issue occurred while contacting the AI model.";
  }
}