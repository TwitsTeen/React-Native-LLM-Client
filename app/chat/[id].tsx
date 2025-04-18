import ChatBubble from "@/components/ChatBubble";
import { askGoogle, askMistral } from "@/services/api";
import { getConversationById } from "@/services/localStorage";
import { Conversation, Message } from "@/types";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  useColorScheme,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { saveConversation as saveConversationLocalStorage } from "@/services/localStorage";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import { ContentChunk } from "@mistralai/mistralai/models/components";

function ChatScreen() {
  const { id } = useLocalSearchParams();
  const [conversation, setConversation] = useState<Conversation>();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState("mistral");
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const modelOptions = [
    { label: "Mistral", value: "mistral" },
    { label: "Google", value: "google" },
  ];

  useEffect(() => {
    const fetchConversation = async () => {
      const conv = await getConversationById(id as string);
      setConversation(conv);
      if (!conv) {
        console.error("Conversation not found");
        return;
      }
      setMessages(conv.messages);
    };

    fetchConversation();
  }, [id]);

  useEffect(() => {
    if (conversation) {
      const updatedConversation = {
        ...conversation,
        messages,
      };
      setConversation(updatedConversation);
      saveConversationLocalStorage(updatedConversation);
    }
  }, [messages]);

  useEffect(() => {
    const saveConversation = async () => {
      if (conversation) {
        const updatedConversation = {
          ...conversation,
          messages: messages,
        };
        await saveConversationLocalStorage(updatedConversation);
      }
    };

    saveConversation();
  }, [messages, conversation]);

  const handleSend = () => {
    if (newMessage.trim()) {
      const newMsg: Message = {
        id: Date.now().toString(),
        text: newMessage,
        isSender: true,
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, newMsg]);
      sendToServer(newMsg);
      setNewMessage("");
    }
  };

  const sendToServer = async (message: Message) => {
    setLoading(true);
    let response: string | ContentChunk[] | null | undefined = "";
    if (selectedModel === "google") {
      response = await askGoogle(message.text, conversation!);
    } else if (selectedModel === "mistral") {
      response = await askMistral(message.text, conversation!);
    }
    const receivedMessage: Message = {
      id: Date.now().toString(),
      text: Array.isArray(response) ? response.join("") : response ?? "",
      isSender: false,
      timestamp: new Date(),
    };
    setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    setLoading(false);
  };

  const navigation = useNavigation();

  useLayoutEffect(() => {
    if (conversation?.title) {
      navigation.setOptions({
        title: conversation.title,
      });
    }
  }, [conversation, navigation]);

  if (!conversation) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 dark:bg-dark-primary light:bg-light-primary bg-white">
      <Picker
        selectedValue={selectedModel}
        onValueChange={(itemValue, itemIndex) => setSelectedModel(itemValue)}
        style={{
          height: 50,
          width: 150,
          margin: 10,
          borderRadius: 10,
          padding: 10,
          backgroundColor: isDarkMode ? "#D6D6B1" : "#E5E5CD",
        }}
      >
        {modelOptions.map((option) => (
          <Picker.Item
            key={option.value}
            label={option.label}
            value={option.value}
          />
        ))}
      </Picker>
      <FlatList
        data={messages}
        renderItem={({ item }) => <ChatBubble message={item} />}
      ></FlatList>
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size={24} color="black" />
          <Text className="text-gray-500 dark:text-gray-300">Loading...</Text>
        </View>
      ) : null}
      <View className="flex-row items-center p-4 border-t border-gray-300 dark:border-dark-primary">
        <TextInput
          className="flex-1 h-10 border border-gray-300 dark:border-00 rounded-full px-4 dark:text-gray-300"
          placeholder="Type a message..."
          placeholderTextColor="#888"
          style={{
            flex: 1,
            height: 40,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 20,
            paddingHorizontal: 15,
          }}
          value={newMessage}
          onChangeText={setNewMessage}
          onSubmitEditing={handleSend}
        />
      </View>
    </View>
  );
}

export default ChatScreen;
