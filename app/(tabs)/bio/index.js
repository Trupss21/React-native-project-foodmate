import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
  TextInput,
  Button,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Entypo, AntDesign } from "@expo/vector-icons";
import Carousel from "react-native-snap-carousel";
import axios from "axios";
import "core-js/stable/atob";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

const index = () => {
  const [option, setOption] = useState("AD");
  const [description, setDescription] = useState("");
  const [activeSlide, setActiveSlide] = React.useState(0);
  const [userId, setUserId] = useState("");
  const [selectedTurnOns, setSelectedTurnOns] = useState([]);
  const [lookingOptions, setLookingOptions] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [images, setImages] = useState([]);
  const profileImages = [
    {
      image:
        "https://images.pexels.com/photos/1042140/pexels-photo-1042140.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      image:
        "https://images.pexels.com/photos/1215695/pexels-photo-1215695.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      image:
        "https://images.pexels.com/photos/7580971/pexels-photo-7580971.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ];
  const turnons = [
    {
      id: "0",
      name: "Spicy",
    },
    {
      id: "10",
      name: "Chinese",
    },
    {
      id: "1",
      name: "Vegan",
    },
    {
      id: "2",
      name: "Vegetarian",
    },
    {
      id: "3",
      name: "Non-Veg",
    },
    {
      id: "4",
      name: "Seafood",
    },
    {
      id: "5",
      name: "Bengali",
    },
    {
      id: "6",
      name: "Italian",
    },
    {
      id: "7",
      name: "On-Diet",
    },
    {
      id: "8",
      name: "Simple",
    },
    {
      id: "9",
      name: "Fast-Food",
    },
  ];
  const data = [
    {
      id: "0",
      name: "Please join me",
      description:
        "I have something in my bucketlist I am looking for a foodmate who can join me and share memories with me",
    },
    {
      id: "1",
      name: "Lets plan a date",
      description:
        "I want to go out for munching, Lets make a plan together and go out for a date",
    },
    {
      id: "2",
      name: "Please Invite me",
      description:
        "I dont have any plan but really want someone to invite me to be part of their plan",
    },
    {
      id: "3",
      name: "Lets cook together",
      description: "Let's cook together",
    },
  ];
  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("auth");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);
  const fetchUserDescription = async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:3000/users/${userId}`);
      console.log(response);
      const user = response.data;

      setDescription(user?.user?.description);
      setSelectedTurnOns(user.user?.turnOns);
      setImages(user?.user.profileImages);
      setLookingOptions(user?.user.lookingFor);
    } catch (error) {
      console.log("Error fetching user description", error);
    }
  };
  useEffect(() => {
    if (userId) {
      fetchUserDescription();
    }
  }, [userId]);
  const updateUserDescription = async () => {
    try {
      const response = await axios.put(
        `http://10.0.2.2:3000/users/${userId}/description`,
        {
          description: description,
        }
      );

      console.log(response.data);

      if (response.status === 200) {
        Alert.alert("Success", "Description updated successfully");
      }
    } catch (error) {
      console.log("Error updating the user Description");
    }
  };
  const handleToggleTurnOn = (turnOn) => {
    if (selectedTurnOns.includes(turnOn)) {
      removeTurnOn(turnOn);
    } else {
      addTurnOn(turnOn);
    }
  };
  const handleOption = (lookingFor) => {
    if (lookingOptions.includes(lookingFor)) {
      removeLookingFor(lookingFor);
    } else {
      addLookingFor(lookingFor);
    }
  };
  const addLookingFor = async (lookingFor) => {
    try {
      const response = await axios.put(
        `http://10.0.2.2:3000/users/${userId}/looking-for`,
        {
          lookingFor: lookingFor,
        }
      );

      console.log(response.data);

      if (response.status == 200) {
        setLookingOptions([...lookingOptions, lookingFor]);
      }
    } catch (error) {
      console.log("Error addding looking for", error);
    }
  };
  const removeLookingFor = async (lookingFor) => {
    try {
      const response = await axios.put(
        `http://10.0.2.2:3000/users/${userId}/looking-for/remove`,
        {
          lookingFor: lookingFor,
        }
      );

      console.log(response.data); // Log the response for confirmation

      // Handle success or update your app state accordingly
      if (response.status === 200) {
        setLookingOptions(lookingOptions.filter((item) => item !== lookingFor));
      }
    } catch (error) {
      console.error("Error removing looking for:", error);
      // Handle error scenarios
    }
  };

  const addTurnOn = async (turnOn) => {
    try {
      const response = await axios.put(
        `http://10.0.2.2:3000/users/${userId}/turn-ons/add`,
        {
          turnOn: turnOn,
        }
      );

      console.log(response.data);

      if (response.status == 200) {
        setSelectedTurnOns([...selectedTurnOns, turnOn]);
      }
    } catch (error) {
      console.log("Error adding turn on", error);
    }
  };
  const removeTurnOn = async (turnOn) => {
    try {
      const response = await axios.put(
        `http://10.0.2.2:3000/users/${userId}/turn-ons/remove`,
        {
          turnOn: turnOn,
        }
      );

      console.log(response.data);

      if (response.status == 200) {
        setSelectedTurnOns(selectedTurnOns.filter((item) => item !== turnOn));
      }
    } catch (error) {
      console.log("error removing turn on", error);
    }
  };
  const renderImageCarousel = ({ item }) => (
    <View
      style={{ width: "100%", justifyContent: "center", alignItems: "center" }}
    >
      <Image
        style={{
          width: "85%",
          resizeMode: "cover",
          height: 290,
          borderRadius: 10,
          transform: [{ rotate: "-5deg" }],
        }}
        source={{ uri: item }}
      />
      <Text
        style={{ position: "absolute", top: 10, right: 10, color: "black" }}
      >
        {activeSlide + 1}/{images.length}
      </Text>
    </View>
  );
  const handleAddImage = async () => {
    try {
      const response = await axios.post(
        `http://10.0.2.2:3000/users/${userId}/profile-images`,
        {
          imageUrl: imageUrl,
        }
      );

      console.log(response);

      setImageUrl("");
    } catch (error) {
      console.log("error", error);
    }
  };
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };
  const randomImage = getRandomImage();
  const logout = () => {
    clearAuthToken();
  };
  const clearAuthToken = async () => {
    await AsyncStorage.removeItem("auth");
    console.log("auth token cleared");
    router.replace("/(authenticate)/register");
  };
  return (
    <ScrollView>
      <View>
        <View>
          <Pressable
            style={{
              padding: 25,
              backgroundColor: "#9AC699",
              width: 400,
            }}
          >
            <View style={{ display: "flex", flexDirection: "row" }}>
              <View>
                <Image
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: 30,
                    resizeMode: "cover",
                  }}
                  source={{
                    uri: randomImage,
                  }}
                />
              </View>
              <View style={{ marginLeft: 20 }}>
                <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 6 }}>
                  user.name
                </Text>
                <Text style={{ marginTop: 4, fontSize: 15 }}>22, Banglore</Text>
                <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 6 }}>
                  short description about myself, what i do, what i enjoy etc.
                </Text>
              </View>
            </View>
          </Pressable>
          <Pressable onPress={logout}>
            <Text>Logout</Text>
          </Pressable>
        </View>
      </View>
      <View
        style={{
          marginTop: 5,
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          gap: 25,
          justifyContent: "space-around",
          backgroundColor: "white",
          borderWidth: 2,
          borderColor: "#2b702a",
        }}
      >
        <Pressable onPress={() => setOption("FoodMate")}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              color: option == "FoodMate" ? "black" : "gray",
            }}
          >
            FoodMate
          </Text>
        </Pressable>
        <Pressable onPress={() => setOption("About")}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              color: option == "About" ? "black" : "gray",
            }}
          >
            About
          </Text>
        </Pressable>
      </View>

      <View style={{ marginHorizontal: 14, marginVertical: 15 }}>
        {option == "FoodMate" && (
          <View>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#bc1823",
                  padding: 5,
                }}
              >
                What are you Looking For?
              </Text>
              {data?.map((item, index) => (
                <Pressable
                  onPress={() => handleOption(item?.name)}
                  style={{
                    backgroundColor: lookingOptions.includes(item?.name)
                      ? "#bc1823"
                      : "white",
                    padding: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    width: 350,
                    margin: 5,

                    borderRadius: 10,
                    borderWidth: 1,
                    shadowOffset: 20,
                    shadowColor: "red",

                    borderColor: "#a6a6a6",
                    //borderWidth: lookingOptions.includes(item?.name)
                    //</View> ? "transparent"
                    // : 0.7,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontWeight: "500",
                      fontSize: 13,
                      color: lookingOptions.includes(item?.name)
                        ? "white"
                        : "black",
                    }}
                  >
                    {item?.name}
                  </Text>
                  <Text
                    style={{
                      color: lookingOptions.includes(item?.name)
                        ? "white"
                        : "gray",
                      textAlign: "center",
                      width: 330,
                      marginTop: 10,
                      fontSize: 13,
                    }}
                  >
                    {item?.description}
                  </Text>
                </Pressable>
              ))}
            </View>
            <View
              style={{
                padding: 10,
                borderRadius: 10,
                height: 150,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#bc1823",
                  padding: 5,
                }}
              >
                Advertisement
              </Text>
              <TextInput
                value={description}
                multiline
                onChangeText={(text) => setDescription(text)}
                style={{
                  fontSize: description ? 17 : 17,
                  borderColor: "#202020",
                  borderWidth: 1,
                  padding: 10,
                  margin: 5,
                }}
                placeholder="Write your whats in your mind while searching for a foodmate"
                //   placeholderTextColor={"black"}
              />
              <Pressable
                onPress={updateUserDescription}
                style={{
                  marginTop: 5,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 15,
                  backgroundColor: "black",
                  borderRadius: 5,
                  justifyContent: "center",
                  padding: 10,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontSize: 15,
                    fontWeight: "500",
                  }}
                >
                  Publish in feed
                </Text>
                <Entypo name="mask" size={24} color="white" />
              </Pressable>
            </View>
            <View
              style={{
                padding: 10,
                borderRadius: 10,
                height: 150,
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#bc1823",
                  padding: 5,
                }}
              >
                Manage Your Foodmates
              </Text>
            </View>
          </View>
        )}
      </View>
      <View style={{ marginHorizontal: 14 }}>
        {option == "About" && (
          <View>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#bc1823",
                  padding: 5,
                }}
              >
                About Me (Short bio)
              </Text>
            </View>
            <TextInput
              //  value={shortbio}
              multiline
              //  onChangeText={(text) => setShortbio(text)}
              style={{
                //  fontSize: shortbio ? 17 : 17,
                borderColor: "#202020",
                borderWidth: 1,
                padding: 10,
                margin: 5,
              }}
              placeholder="Write something about you"
              //   placeholderTextColor={"black"}
            />
            <Pressable
              // onPress={updateUserShortbio}
              style={{
                marginTop: 5,
                flexDirection: "row",
                alignItems: "center",
                gap: 15,
                backgroundColor: "black",
                borderRadius: 5,
                justifyContent: "center",
                padding: 10,
              }}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: 15,
                  fontWeight: "500",
                }}
              >
                Add Bio
              </Text>
            </Pressable>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#bc1823",
                  padding: 5,
                }}
              >
                My Photos
              </Text>
              <Carousel
                data={images}
                renderItem={renderImageCarousel}
                sliderWidth={350}
                itemWidth={300}
                onSnapToItem={(index) => setActiveSlide(index)}
              />

              <View style={{ marginTop: 25 }}>
                <Text>Add a picture of yourself</Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                    paddingVertical: 5,
                    borderRadius: 5,
                    marginVertical: 10,
                    backgroundColor: "#DCDCDC",
                  }}
                >
                  <Entypo
                    style={{ marginLeft: 8 }}
                    name="image"
                    size={24}
                    color="gray"
                  />
                  <TextInput
                    value={imageUrl}
                    onChangeText={(text) => setImageUrl(text)}
                    style={{ color: "gray", marginVertical: 10, width: 300 }}
                    placeholder="enter your image url"
                  />
                </View>
                <Button
                  onPress={handleAddImage}
                  style={{ marginTop: 5 }}
                  title="Add Image"
                />
              </View>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#bc1823",
                  padding: 5,
                }}
              >
                My Food Choices
              </Text>
              <View>
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                  {turnons?.map((item, index) => (
                    <Pressable
                      onPress={() => handleToggleTurnOn(item?.name)}
                      style={{
                        backgroundColor: "#D9D9D9",
                        padding: 5,
                        margin: 10,
                        width: 100,
                      }}
                      key={index}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            textAlign: "center",
                            fontSize: 15,
                            fontWeight: "bold",
                            flex: 1,
                          }}
                        >
                          {item?.name}
                        </Text>
                        {selectedTurnOns.includes(item?.name) && (
                          <AntDesign
                            name="checkcircle"
                            size={18}
                            color="#17B169"
                          />
                        )}
                      </View>
                    </Pressable>
                  ))}
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({});
