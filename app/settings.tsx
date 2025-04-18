import { saveApiKey } from "@/services/localStorage";
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";

function Settings() {
  const [apiKey, setApiKey] = useState("");

  const handleSave = () => {
    saveApiKey(apiKey);
  };

  return (
    <View className="flex-1 justify-center items-center bg-light-primary dark:bg-dark-primary px-6">
      <View className="w-full max-w-md p-6 rounded-2xl ">
        <Text className="text-base font-medium mb-2 text-gray-800 dark:text-gray-200">
          Your API Key:
        </Text>
        <View className="flex-row items-center space-x-2">
          <TextInput
            value={apiKey}
            onChangeText={setApiKey}
            placeholder="Enter your API key"
            placeholderTextColor="#888"
            className="flex-1 border border-gray-300 dark:border-gray-600 rounded-full px-4 py-2 text-gray-800 dark:text-gray-200 bg-white dark:bg-dark-primary"
          />
          <TouchableOpacity onPress={handleSave}>
            <Text className="bg-light-accent px-4 py-2 rounded-full text-white font-semibold">
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Settings;
