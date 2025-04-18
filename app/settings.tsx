import { getApiKey, saveApiKey } from "@/services/localStorage";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";

function Settings() {
  const [googleApiKey, setGoogleApiKey] = useState("");
  const [mistralApiKey, setMistralApiKey] = useState("");

  useEffect(() => {
    const fetchApiKeys = async () => {
      const googleKey = await getApiKey("Google");
      const mistralKey = await getApiKey("Mistral");
      console.log("Google Key:", googleKey);
      console.log("Mistral Key:", mistralKey);
      setGoogleApiKey(googleKey || "");
      setMistralApiKey(mistralKey || "");
    };
    fetchApiKeys();
  }, []);

  const handleSaveGoogle = () => {
    saveApiKey(googleApiKey, "Google");
  };

  const handleSaveMistral = () => {
    saveApiKey(mistralApiKey, "Mistral");
  };

  return (
    <View className="flex-1 justify-center items-center bg-light-primary dark:bg-dark-primary px-6">
      <View className="w-full max-w-md p-6 rounded-2xl ">
        <Text className="text-base font-medium mb-2 text-gray-800 dark:text-gray-200">
          Your Google API Key:
        </Text>
        <View className="flex-row items-center space-x-2">
          <TextInput
            value={googleApiKey}
            onChangeText={setGoogleApiKey}
            placeholder="Enter your API key"
            placeholderTextColor="#888"
            className="flex-1 border border-gray-300 dark:border-gray-600 rounded-full px-4 py-2 text-gray-800 dark:text-gray-200 bg-white dark:bg-dark-primary"
          />
          <TouchableOpacity onPress={() => handleSaveGoogle()}>
            <Text className="bg-light-accent px-4 py-2 rounded-full text-white font-semibold">
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="w-full max-w-md p-6 rounded-2xl ">
        <Text className="text-base font-medium mb-2 text-gray-800 dark:text-gray-200">
          Your Mistral API Key:
        </Text>
        <View className="flex-row items-center space-x-2">
          <TextInput
            value={mistralApiKey}
            onChangeText={setMistralApiKey}
            placeholder="Enter your API key"
            placeholderTextColor="#888"
            className="flex-1 border border-gray-300 dark:border-gray-600 rounded-full px-4 py-2 text-gray-800 dark:text-gray-200 bg-white dark:bg-dark-primary"
          />
          <TouchableOpacity onPress={() => handleSaveMistral()}>
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
