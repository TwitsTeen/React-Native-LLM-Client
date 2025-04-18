import { Conversation } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const key = "conversations";

export const storeConversations = async (conversations: Conversation[]) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(conversations));
  } catch (e) {
    new Error("Failed to save conversations : " + e);
  }
};

export const getConversations = async (): Promise<
  Conversation[] | undefined
> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : undefined;
  } catch (e) {
    new Error("Failed to fetch conversations : " + e);
  }
};

export const getConversationById = async (
  id: string
): Promise<Conversation | undefined> => {
  try {
    const conversations = await getConversations();
    return conversations?.find((conversation) => conversation.id === id);
  } catch (e) {
    new Error("Failed to fetch conversation by id : " + e);
  }
};

export const saveConversation = async (
  conversation: Conversation
): Promise<void> => {
  try {
    const conversations = await getConversations();
    if (conversations) {
      const updatedConversations = conversations.map((conv) =>
        conv.id === conversation.id ? conversation : conv
      );
      await storeConversations(updatedConversations);
    } else {
      await storeConversations([conversation]);
    }
  } catch (e) {
    new Error("Failed to save conversation : " + e);
  }
};

export const addConversation = async (
  conversation: Conversation
): Promise<void> => {
  try {
    const conversations = await getConversations();
    if (conversations) {
      await storeConversations([...conversations, conversation]);
    } else {
      await storeConversations([conversation]);
    }
  } catch (e) {
    new Error("Failed to add conversation : " + e);
  }
};

export const deleteConversation = async (id: string): Promise<void> => {
  try {
    const conversations = await getConversations();
    if (conversations) {
      const updatedConversations = conversations.filter(
        (conv) => conv.id !== id
      );
      await storeConversations(updatedConversations);
    }
  } catch (e) {
    new Error("Failed to delete conversation : " + e);
  }
};

export const editConversationTitle = async (
  id: string,
  newTitle: string
): Promise<void> => {
  try {
    const conversations = await getConversations();
    if (conversations) {
      const updatedConversations = conversations.map((conv) =>
        conv.id === id ? { ...conv, title: newTitle } : conv
      );
      await storeConversations(updatedConversations);
    }
  } catch (e) {
    new Error("Failed to edit conversation title : " + e);
  }
};

export const saveApiKey = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.setItem("apiKey", key);
  } catch (e) {
    new Error("Failed to save API key : " + e);
  }
};

export const getApiKey = async (): Promise<string | null> => {
  try {
    const apiKey = await AsyncStorage.getItem("apiKey");

    return apiKey;
  } catch (e) {
    new Error("Failed to fetch API key : " + e);
    return null;
  }
};
