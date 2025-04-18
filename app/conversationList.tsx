import {
  addConversation,
  deleteConversation,
  editConversationTitle,
  getConversations,
} from "@/services/localStorage";
import { Conversation } from "@/types";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Pressable,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";

function ConversationList() {
  const [conversations, setConversations] = useState<Conversation[]>();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    const fetchConversations = async () => {
      const convs = await getConversations();
      setConversations(convs);
    };
    fetchConversations();
  }, []);

  const handleNewConversation = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: "New Conversation",
      messages: [],
      createdAt: new Date(),
    };
    setConversations((prev) =>
      prev ? [...prev, newConversation] : [newConversation]
    );
    addConversation(newConversation);
  };

  const handleDeleteConversation = (id: string) => {
    deleteConversation(id);
    setConversations((prev) => prev?.filter((conv) => conv.id !== id));
  };

  const openEditModal = (id: string, currentTitle: string) => {
    setEditingId(id);
    setNewTitle(currentTitle);
    setModalVisible(true);
  };

  const handleEditConversation = async () => {
    if (!editingId) return;
    await editConversationTitle(editingId, newTitle);
    setConversations((prev) =>
      prev?.map((conv) =>
        conv.id === editingId ? { ...conv, title: newTitle } : conv
      )
    );
    setModalVisible(false);
    setEditingId(null);
    setNewTitle("");
  };

  return (
    <View className="flex-1 bg-light-primary dark:bg-dark-primary">
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="mx-4 my-2 p-4 bg-white dark:bg-dark-tertiary rounded-2xl flex-row justify-between items-center">
            <Link href={`/chat/${item.id}`} asChild>
              <TouchableOpacity className="flex-1 pr-4">
                <Text className="text-lg font-semibold text-black dark:text-white">
                  {item.title}
                </Text>
              </TouchableOpacity>
            </Link>
            <View className="flex-row space-x-3">
              <TouchableOpacity
                onPress={() => openEditModal(item.id, item.title)}
                className="p-1"
              >
                <Entypo name="edit" size={20} color="#4B5563" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDeleteConversation(item.id)}
                className="p-1"
              >
                <Feather name="trash" size={20} color="#EF4444" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* New Conversation Button */}
      <TouchableOpacity onPress={handleNewConversation}>
        <Text className="bg-light-accent text-white rounded-md p-4 text-center m-4">
          New
        </Text>
      </TouchableOpacity>

      {/* Modal for Editing Title */}
      <Modal animationType="slide" transparent visible={modalVisible}>
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white p-6 rounded-lg w-3/4">
            <Text className="text-lg font-bold mb-2">Edit Title</Text>
            <TextInput
              value={newTitle}
              onChangeText={setNewTitle}
              className="border border-gray-300 p-2 rounded mb-4"
              placeholder="Enter new title"
            />
            <View className="flex-row justify-end space-x-2">
              <Pressable
                onPress={() => {
                  setModalVisible(false);
                  setEditingId(null);
                }}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                <Text>Cancel</Text>
              </Pressable>
              <Pressable
                onPress={handleEditConversation}
                className="px-4 py-2 bg-blue-500 rounded"
              >
                <Text className="text-white">Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default ConversationList;
