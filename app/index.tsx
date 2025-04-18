import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center bg-light-primary dark:bg-dark-primary px-6">
      <Text className="text-2xl font-bold text-gray-800 dark:text-gray-200">
        Welcome to this llm app!
      </Text>
      <Text className="text-base font-medium mb-2 text-gray-800 dark:text-gray-200">
        This is a simple app that uses google's AI api.
      </Text>
      <Text className="text-base font-medium mb-2 text-gray-800 dark:text-gray-200">
        To start you must provide your API key in the settings page.
      </Text>
    </View>
  );
}
