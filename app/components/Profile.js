import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import * as Animatable from "react-native-animatable";

const Profile = ({ item, isEven, userId, setProfiles }) => {
  const colors = ["#F0F8FF", "#FFFFFF"];
  const [liked, setLiked] = useState(false);
  const [selected, setSelcted] = useState(false);
  const handleLike = async (selectedUserId) => {
    try {
      setLiked(true);
      await axios.post("http://10.0.2.2:3000/send-like", {
        currentUserId: userId,
        selectedUserId: selectedUserId,
      });

      setTimeout(() => {
        setProfiles((prevProfiles) =>
          prevProfiles.filter((profile) => profile._id !== selectedUserId)
        );
        setLiked(false);
      }, 200);
    } catch (error) {
      console.log("error liking", error);
    }
  };
  const handleLikeOther = async (selectedUserId) => {
    try {
      setSelcted(true);
      await axios.post("http://10.0.2.2:3000/send-like", {
        currentUserId: userId,
        selectedUserId: selectedUserId,
      });

      setTimeout(() => {
        setProfiles((prevProfiles) =>
          prevProfiles.filter((profile) => profile._id !== selectedUserId)
        );
        setSelcted(false);
      }, 200);

      // Handle success: Perform any UI updates or navigate to another screen
    } catch (error) {
      console.error("Error liking user:", error);
      // Handle error scenarios
    }
  };

  return (
    <View style={{ backgroundColor: "#F0F8FF" }}>
      <ScrollView>
        <View
          style={{
            margin: 15,
            borderWidth: 2,
            borderRadius: 30,
          }}
        >
          {item?.profileImages?.slice(0, 1).map((item, index) => (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  position: "absolute",
                  left: 300,
                  top: 20,
                }}
              >
                {liked ? (
                  <Pressable
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                      backgroundColor: "#E0E0E0",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Animatable.View
                      animation="swing"
                      easing={"ease-in-out-circ"}
                      iterationCount={2}
                    >
                      <AntDesign name="heart" size={30} color="red" />
                    </Animatable.View>
                  </Pressable>
                ) : (
                  <Pressable
                    onPress={() => handleLike(item?._id)}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                      backgroundColor: "#E0E0E0",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <AntDesign name="hearto" size={30} color="#FF033E" />
                  </Pressable>
                )}
              </View>
              <Image
                style={{
                  height: 400,
                  resizeMode: "cover",
                  borderTopLeftRadius: 30,
                  borderTopRightRadius: 30,
                }}
                source={{ uri: item }}
              />
            </View>
          ))}

          <Pressable
            style={{
              margin: 10,
              display: "flex",
              flexDirection: "row",
              gap: 10,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
              }}
            >
              {item?.name} (Banglore, 22)
            </Text>
            <Text
              style={{
                backgroundColor: "gray",
                borderRadius: 10,
                paddingHorizontal: 20,
                paddingVertical: 2,
                color: "white",
                fontSize: 20,
              }}
            >
              View Profile
            </Text>
          </Pressable>

          <Text
            style={{
              fontSize: 18,
              lineHeight: 30,
              margin: 10,
              marginBottom: 20,
              fontStyle: "italic",
            }}
          >
            <Entypo name="megaphone" size={30} color="red" />
            {item?.description?.length > 100
              ? item?.description
              : item?.description.toString().substr(0, 160)}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};
export default Profile;

const styles = StyleSheet.create({});
