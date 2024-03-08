import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("auth");
        if (token) {
          router.replace("/(tabs)/profile");
        }
      } catch (error) {
        console.log("Error", error);
        router.replace("/(authenticate)/register");
      }
    };
    checkLoginStatus();
  }, []);
  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };

    axios.post("http://10.0.2.2:3000/login", user).then((response) => {
      console.log(response);
      const token = response.data.token;
      AsyncStorage.setItem("auth", token);
      router.replace("/(authenticate)/select");
    });
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <View style={{ height: 150, width: "100%" }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 15,
          }}
        >
          <Image
            style={{ width: 200, height: 105, resizeMode: "contain" }}
            source={{
              uri: "https://img.freepik.com/free-vector/dating-couple-enjoying-romantic-dinner_74855-5233.jpg?w=740&t=st=1709367018~exp=1709367618~hmac=381cf4fd8656917f3a61f9a85dc1f51d612699555e082ccc7762caf55cf79cb6",
            }}
          />
        </View>
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            marginTop: 15,
          }}
        >
          Match your Food Mate
        </Text>
      </View>
      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginTop: 15,
              color: "red",
            }}
          >
            Log In to your account
          </Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Image
            style={{ width: 200, height: 100, resizeMode: "cover" }}
            source={{
              uri: "https://res.cloudinary.com/zyratrupti/image/upload/v1709366231/1_1_rcznra.png",
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
              marginTop: 20,
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

        <View
          style={{
            marginTop: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text>Keep me logged in</Text>

          <Text style={{ color: "#2b702a", fontWeight: "500" }}>
            Forgot Password ?
          </Text>
        </View>

        <View style={{ marginTop: 25 }} />

        <Pressable
          onPress={handleLogin}
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
            Login
          </Text>
        </Pressable>
        <Pressable
          onPress={() => router.replace("/register")}
          style={{ marginTop: 12 }}
        >
          <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
            Don't have an account? Sign Up
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default login;

const styles = StyleSheet.create({});
