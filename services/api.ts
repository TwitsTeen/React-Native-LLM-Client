import { Conversation } from "@/types";
import { Content, GoogleGenAI } from "@google/genai";
import { getApiKey } from "./localStorage";

const model = "gemini-2.0-flash";

const convertConversationToHistory = (conversation: Conversation) => {
  const history: Content[] = [];
  conversation.messages.forEach((message) => {
    const role = message.isSender ? "user" : "model";
    const parts = [{ text: message.text }];
    history.push({ role, parts });
  });
  return history;
};

export const askApi = async (question: string, conversation: Conversation) => {
  const apiKey = await getApiKey();
  if (!apiKey) {
    console.error("API Key not found.");
    return "Error: API Key not found. Please set it in the settings.";
  }

  const ai = new GoogleGenAI({ apiKey: apiKey });

  if (!ai) {
    console.error("GoogleGenerativeAI client not initialized.");
    return "Error: AI Client not initialized. Check API Key.";
  }

  const chatHistory = convertConversationToHistory(conversation);
  chatHistory.push({
    role: "user",
    parts: [{ text: question }],
  });

  try {
    const response = await ai.models.generateContent({
      model: model,

      contents: chatHistory,
    });
    const aiResponse = response.text;
    return aiResponse;
  } catch (e) {
    console.error("Error calling Gemini API:", e);
    return "Sorry, I encountered an error trying to respond.";
  }
};
