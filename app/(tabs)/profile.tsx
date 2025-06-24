import { ID } from "react-native-appwrite";
import { icons } from "@/constants/icons";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { Client, Account } from "react-native-appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const account = new Account(client);

const Profile = () => {
  const [mode, setMode] = useState<"login" | "create">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");

  const handleLogin = async () => {
    try {
      await account.deleteSession('current');
    } catch (_) {
    }

    try {
      await account.createEmailPasswordSession(email, password);
      const user = await account.get();
      setUserName(user.name);
    } catch (error) {
      console.log("Login failed:", error);
    }
  };

  const handleCreate = async () => {
    try {
      await account.deleteSession('current');
    } catch (_) {}

    try {
      await account.create(ID.unique(), email, password, name || "New User");
      await account.createEmailPasswordSession(email, password);
      const user = await account.get();
      setUserName(user.name);
    } catch (error) {
      console.log("Create failed:", error);
    }
  };

  if (userName) {
    return (
      <SafeAreaView className="bg-primary flex-1 px-10">
        <View className="flex justify-center items-center flex-1 flex-col gap-5">
          <Image source={icons.person} className="size-10" tintColor="#fff" />
          <Text className="text-gray-500 text-base">{`Hello, ${userName}`}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-primary flex-1 px-10">
      <View className="flex justify-center items-center flex-1 gap-5">
        <Image source={icons.person} className="size-10" tintColor="#fff" />
        <Text className="text-white text-lg">{mode === "login" ? "Login" : "Create Account"}</Text>

        <TextInput
          className="w-full bg-white px-4 py-2 rounded"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          className="w-full bg-white px-4 py-2 rounded"
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {mode === "create" && (
          <TextInput
            className="w-full bg-white px-4 py-2 rounded"
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
        )}
        <TouchableOpacity
          onPress={mode === "login" ? handleLogin : handleCreate}
          className="bg-blue-500 px-6 py-2 rounded"
        >
          <Text className="text-white">{mode === "login" ? "Login" : "Create"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setMode(mode === "login" ? "create" : "login")}
        >
          <Text className="text-gray-300 text-sm mt-2">
            {mode === "login" ? "Don't have an account? Create one." : "Already have an account? Login."}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;