import { Conversation } from "@/types";
import { Content, GoogleGenAI } from "@google/genai";
import { getApiKey } from "./localStorage";
import { Mistral } from "@mistralai/mistralai";
import {
  AssistantMessage,
  UserMessage,
} from "@mistralai/mistralai/models/components";

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

export const askGoogle = async (
  question: string,
  conversation: Conversation
) => {
  const apiKey = await getApiKey("Google");
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

const convertMistralConversationToHistory = (conversation: Conversation) => {
  let role: "system" | "user" | "assistant" | "tool";
  const messages = conversation.messages.map((message) => {
    let role: "system" | "user" | "assistant" | "tool";
    if (message.isSender) {
      role = "user";
    } else {
      role = "assistant";
    }

    const content = message.text || "";

    return {
      role,
      content,
    };
  });
  return messages;
};

export const askMistral = async (
  question: string,
  conversation: Conversation
) => {
  const apiKey = await getApiKey("Mistral");
  if (!apiKey) {
    console.error("API Key not found.");
    return "Error: API Key not found. Please set it in the settings.";
  }

  const mistral = new Mistral({ apiKey: apiKey });

  if (!mistral) {
    console.error("MistralAI client not initialized.");
    return "Error: AI Client not initialized. Check API Key.";
  }

  const chatHistory = convertMistralConversationToHistory(conversation);
  chatHistory.push({
    role: "user",
    content: question,
  });

  try {
    const response = await mistral.chat.complete({
      model: "mistral-small-latest",
      messages: chatHistory,
    });

    if (!response.choices || response.choices.length === 0) {
      console.error("No choices in response from Mistral API.");
      return "Error: No response from AI.";
    }
    const aiResponse = response.choices[0].message.content;
    return aiResponse;
  } catch (e) {
    console.error("Error calling Mistral API:", e);
    return "Sorry, I encountered an error trying to respond." + e;
  }
};
