import { Message } from "@/types";
import React from "react";
import { View, Text } from "react-native";

function ChatBubble({ message }: { message: Message }) {
  const { text, isSender, timestamp } = message;
  if (isSender) {
    return (
      <View>
        <View className="dark:bg-dark-secondary bg-light-secondary rounded-lg p-2 m-2 self-end my-6">
          <Text>{text}</Text>
        </View>
      </View>
    );
  }
  return (
    <View className="flex-row justify-center my-6">
      <View className="text-center w-auto max-w-[80%] p-4 rounded-lg">
        <Text className="dark:text-gray-300">{text}</Text>
      </View>
    </View>
  );
}

export default ChatBubble;
