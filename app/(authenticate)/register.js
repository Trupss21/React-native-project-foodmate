import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
    };
    axios
      .post("http:10.0.2.2:3000/register", user)
      .then((response) => {
        console.log(response);
        Alert.alert(
          "Registration successfull",
          "You have been registered successfully",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]
        );
        setEmail("");
        setName("");
        setPassword("");
      })
      .catch((error) => {
        console.log("error while registering the user", error);
        Alert.alert(
          "Registration failed",
          "An error occured during registration"
        );
      });
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <KeyboardAvoidingView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 80,
          }}
        >
          <Image
            style={{ width: 200, height: 100, resizeMode: "cover" }}
            source={{
              uri: "https://res.cloudinary.com/zyratrupti/image/upload/v1709366231/1_1_rcznra.png",
            }}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",

              color: "red",
            }}
          >
            Register to your account
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            borderWidth: 2,
            borderColor: "#bc1823",
            paddingVertical: 5,
            borderRadius: 5,
            marginTop: 10,
          }}
        >
          <Ionicons
            style={{ marginLeft: 8 }}
            name="person"
            size={24}
            color="#bc1823"
          />
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder="Enter your Name"
            placeholderTextColor={"#bc1823"}
            style={{
              marginVertical: 10,
              width: 300,
              fontSize: password ? 17 : 17,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            borderWidth: 2,
            borderColor: "#bc1823",
            paddingVertical: 5,
            borderRadius: 5,
            marginTop: 10,
          }}
        >
          <MaterialIcons
            style={{ marginLeft: 8 }}
            name="email"
            size={24}
            color="#bc1823"
          />
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Enter your email"
            placeholderTextColor={"#bc1823"}
            style={{
              marginVertical: 10,
              width: 300,
              fontSize: password ? 17 : 17,
            }}
          />
        </View>

        <View style={{}}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              borderWidth: 2,
              borderColor: "#bc1823",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 10,
            }}
          >
            <AntDesign
              style={{ marginLeft: 8 }}
              name="lock1"
              size={24}
              color="#bc1823"
            />
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              placeholder="Enter your password"
              style={{
                marginVertical: 10,
                width: 300,
                fontSize: password ? 17 : 17,
              }}
              placeholderTextColor="#bc1823"
            />
          </View>
        </View>

        <View style={{ marginTop: 25 }} />

        <Pressable
          onPress={handleRegister}
          style={{
            width: 200,
            backgroundColor: "#bc1823",
            borderRadius: 6,
            marginLeft: "auto",
            marginRight: "auto",
            padding: 15,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Register
          </Text>
        </Pressable>
        <Pressable
          onPress={() => router.replace("/login")}
          style={{ marginTop: 12 }}
        >
          <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
            Already have an account? Log In
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default register;

const styles = StyleSheet.create({});
