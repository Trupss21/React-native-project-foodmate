import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import axios from "axios";

const select = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const profiles = JSON.parse(params?.profiles);

  const userId = params?.userId;

  const handleMatch = async (selectedUserId) => {
    try {
      await axios.post("http://10.0.2.2:3000/create-match", {
        currentUserId: userId,
        selectedUserId: selectedUserId,
      });

      setTimeout(() => {
        router.push("/chat");
      }, 500);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <ScrollView style={{ backgroundColor: "white", flex: 1, padding: 10 }}>
      {profiles?.length > 0 ? (
        <View
          style={{
            margin: 10,
            borderWidth: 2,
            borderRadius: 30,
          }}
        >
          {profiles?.map((item, index) => (
            <View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "600",
                    margin: 10,
                  }}
                >
                  {item?.name} (Banglore, 22){" "}
                </Text>
                <Pressable style={{}}>
                  <Text
                    style={{
                      backgroundColor: "gray",
                      borderRadius: 20,
                      padding: 10,
                      margin: 5,
                      textAlign: "center",
                      fontSize: 18,
                      marginRight: 15,
                      color: "white",
                    }}
                  >
                    Profile
                  </Text>
                </Pressable>
              </View>
              {item?.profileImages?.slice(0, 1).map((item, index) => (
                <View>
                  <Image
                    style={{
                      height: 400,
                      resizeMode: "cover",
                    }}
                    source={{ uri: item }}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      position: "absolute",
                      left: 300,
                      top: 10,
                    }}
                  >
                    <Pressable
                      onPress={() => handleMatch(item._id)}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        backgroundColor: "#E0E0E0",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <AntDesign name="hearto" size={27} color="#FF033E" />
                    </Pressable>
                  </View>
                </View>
              ))}

              <View style={{ margin: 10 }}>
                <Text>My Food Choices</Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    marginTop: 10,
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                >
                  {item?.turnOns?.map((item, index) => (
                    <Text
                      style={{
                        textAlign: "center",
                        color: "white",
                        fontWeight: "500",
                        backgroundColor: "gray",
                        padding: 10,
                        borderRadius: 22,
                      }}
                    >
                      {item}
                    </Text>
                  ))}
                </View>
              </View>

              <View style={{ margin: 10 }}>
                <Text>Looking For 👀</Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    marginTop: 10,
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                >
                  {item?.lookingFor?.map((item, index) => (
                    <Text
                      style={{
                        textAlign: "center",
                        color: "white",
                        fontWeight: "500",
                        backgroundColor: "gray",
                        padding: 10,
                        borderRadius: 22,
                      }}
                    >
                      {item}
                    </Text>
                  ))}
                </View>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 100,
          }}
        >
          <Image
            style={{ width: 100, height: 100 }}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/128/1642/1642611.png",
            }}
          />

          <View>
            <Text
              style={{
                fontSize: 15,

                textAlign: "center",
              }}
            >
              UH - OH{" "}
              <Text
                style={{
                  fontSize: 15,

                  color: "#FF69B4",
                }}
              >
                No likes yet
              </Text>
            </Text>

            <Text style={{ marginTop: 10, fontSize: 16, fontWeight: "600" }}>
              Improve your AD to get better likes
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default select;

const styles = StyleSheet.create({});
