import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "core-js/stable/atob";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useRouter } from "expo-router";

const select = () => {
  const router = useRouter();
  const [option, setOption] = useState("");
  const [userId, setUserId] = useState("");
  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("auth");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);
  const updateUserGender = async () => {
    try {
      const response = await axios.put(
        `http://10.0.2.2:3000/users/${userId}/gender`,
        {
          gender: option,
        }
      );

      console.log(response.data);

      if (response.status == 200) {
        router.replace("(tabs)/bio");
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: "white", padding: 12 }}>
      <Pressable
        onPress={() => setOption("male")}
        style={{
          backgroundColor: "#F0F0F0",
          padding: 12,
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          marginTop: 25,
          borderRadius: 5,
          borderColor: option == "male" ? "#D0D0D0" : "transparent",
          borderWidth: option == "male" ? 1 : 0,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "500" }}>
          I am looking for Female Foodmate
        </Text>
      </Pressable>

      <Pressable
        onPress={() => setOption("female")}
        style={{
          backgroundColor: "#F0F0F0",
          padding: 12,
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          marginTop: 25,
          borderRadius: 5,
          borderColor: option == "female" ? "#D0D0D0" : "transparent",
          borderWidth: option == "female" ? 1 : 0,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "500" }}>
          I am looking for male Foodmate
        </Text>
      </Pressable>

      <Pressable
        onPress={() => setOption("nonbinary")}
        style={{
          backgroundColor: "#F0F0F0",
          padding: 12,
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          marginTop: 25,
          borderRadius: 5,
          borderColor: option == "nonbinary" ? "#D0D0D0" : "transparent",
          borderWidth: option == "nonbinary" ? 1 : 0,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "500" }}>
          I am open to All
        </Text>
      </Pressable>

      {option && (
        <Pressable
          onPress={updateUserGender}
          style={{
            marginTop: 25,
            backgroundColor: "black",
            padding: 12,
            borderRadius: 4,
          }}
        >
          <Text
            style={{ textAlign: "center", color: "Red", fontWeight: "600" }}
          >
            Done
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default select;

const styles = StyleSheet.create({});
