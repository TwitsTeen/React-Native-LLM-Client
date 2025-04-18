import "./global.css";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { useColorScheme } from "react-native";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const drawerStyle = {
    backgroundColor: colorScheme === "dark" ? "#1F1F1F" : "#FFFFFF",
  };

  const drawerLabelStyle = {
    color: colorScheme === "dark" ? "#FFFFFF" : "#000000",
  };

  const headerStyle = {
    backgroundColor: colorScheme === "dark" ? "#333" : "#fff",
    color: colorScheme === "dark" ? "#fff" : "#000",
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          drawerStyle: {
            backgroundColor: drawerStyle.backgroundColor,
          },
          drawerActiveBackgroundColor:
            colorScheme === "dark" ? "#444" : "#f1f1f1", // Active item background color
          drawerInactiveTintColor: drawerLabelStyle.color, // Inactive item text color
          drawerActiveTintColor: colorScheme === "dark" ? "#fff" : "#000", // Active item text color
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Home",
            title: "Overview",
            headerStyle: {
              backgroundColor: headerStyle.backgroundColor,
            },
            headerTintColor: headerStyle.color,
          }}
        />
        <Drawer.Screen
          name="conversationList"
          options={{
            drawerLabel: "Chat",
            title: "Chat",
            headerStyle: {
              backgroundColor: headerStyle.backgroundColor,
            },
            headerTintColor: headerStyle.color,
          }}
        />
        <Drawer.Screen
          name="chat/[id]"
          options={{
            drawerLabel: "Last Chat",
            title: "Last Chat",
            headerStyle: {
              backgroundColor: headerStyle.backgroundColor,
            },
            headerTintColor: headerStyle.color,
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            drawerLabel: "Settings",
            title: "Settings",
            headerStyle: {
              backgroundColor: headerStyle.backgroundColor,
            },
            headerTintColor: headerStyle.color,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
