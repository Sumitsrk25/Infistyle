import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";

import { Header, Icon, Card, Tile, Input, Divider } from "@rneui/themed";
import { Button, Badge } from "@rneui/themed";
import CoachImage from "../../assets/img/coach1.jpg";
import { SafeAreaProvider } from "react-native-safe-area-context";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { useNavigation, StackActions } from "@react-navigation/native";
import { Avatar } from "@rneui/base";
import { LinearGradient } from "expo-linear-gradient";
import Header2 from "../component/Header2";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RefreshControl } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Strings } from "../constants";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import {
  ScaledSheet,
  scale,
  verticalScale,
  moderateScale,
  s,
  vs,
  ms,
  mvs,
  msr,
} from "react-native-size-matters";

const ShopKYC = () => {
  const navigation = useNavigation();

  const [isLoaded, setIsLoaded] = useState(true);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [myData, setMyData] = useState([]);
  const [myData1, setMyData1] = useState([]);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // const handleLogout = async () => {
  //   try {
  //     console.log("logout");
  //     await AsyncStorage.clear();

  //     navigation.dispatch(StackActions.replace("Login"));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleLogout = async () => {
    try {
      Alert.alert("Warning", "Are you sure to logout ?", [
        {
          text: "Yes",
          onPress: async () => {
            console.log("logout");
            await AsyncStorage.clear();
            navigation.dispatch(StackActions.replace("Login"));
          },
        },
        {
          text: "No",
        },
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  const findUser = async () => {
    const result = await AsyncStorage.getItem("user_data");
    console.log(result);
    setUser(JSON.parse(result));
  };
  useEffect(() => {
    findUser();
    getUserData();

    // setTimeout(async () => {
    //   handleRefresh();
    // }, 2000);
  }, [user?.uid]);

  const getUserData = () => {
    axios
      .get("https://engistack.com/infistyle_reactapp/userdata_infistyle.php", {
        params: {
          iUserId: user.uid,
        },
      })
      .then((json) => setMyData(json.data))
      .finally(() => setIsLoaded(false))
      .then((data) => formateMyData(data));
  };

  const formateMyData = (data) =>
    data.reduce((result, obj) => {
      const dateOnly = obj.sDate.split(" ")[0]; // Extract the date part
      const index = result.findIndex((group) => group.title === dateOnly);
      if (index !== -1) {
        result[index].data.push(obj);
      } else {
        result.push({ title: dateOnly, data: [obj] });
      }
      return result;
    }, []);

  const handleRefresh = async () => {
    console.log("function is calling");

    setIsRefreshing(true);

    getUserData(); // await means till it dowsnt get data it will not execute function below it

    setIsRefreshing(false);

    // setTimeout(() => {
    //   setIsRefreshing(false);
    //   //   console.log("function is ending");
    // }, 2000);
    console.log("function is ending");
  };

  const uploadImage = async (selectedImage) => {
    const payload = new FormData();

    const uriParts = selectedImage.uri.split("/");
    const filenameWithExtension = uriParts[uriParts.length - 1]; // Last part of the URI
    const [filename, fileType] = filenameWithExtension.split("."); // Split filename and extension

    console.log("Filename:", filename);
    console.log("File Type:", fileType);

    payload.append("image", {
      uri: selectedImage.uri,
      type: `${selectedImage.type}/${fileType}`,
      name: filenameWithExtension,
    });

    // payload.append("iChallengeId", iChallengeId);
    payload.append("iUserId", user.uid);

    const config = {
      body: payload,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    setIsLoading(true);

    await fetch(
      "https://engistack.com/infistyle_reactapp/uploadkyc.php",
      config
    )
      .then(getUserData)
      .then(setMyData)
      .finally(() => setIsLoading(false));
    console.log(response);
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      uploadImage(result.assets[0]);
    } else {
      alert("You did not select any image.");
    }
  };

  const uploadImage1 = async (selectedImage) => {
    const payload = new FormData();

    const uriParts = selectedImage.uri.split("/");
    const filenameWithExtension = uriParts[uriParts.length - 1]; // Last part of the URI
    const [filename, fileType] = filenameWithExtension.split("."); // Split filename and extension

    console.log("Filename:", filename);
    console.log("File Type:", fileType);

    payload.append("image", {
      uri: selectedImage.uri,
      type: `${selectedImage.type}/${fileType}`,
      name: filenameWithExtension,
    });

    // payload.append("iChallengeId", iChallengeId);
    payload.append("iUserId", user.uid);

    const config = {
      body: payload,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    setIsLoading(true);

    await fetch(
      "https://engistack.com/infistyle_reactapp/uploadkyc1.php",
      config
    )
      .then(getUserData)
      .then(setMyData1)
      .finally(() => setIsLoading(false));
    console.log(response);
  };
  const pickImageAsync1 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      uploadImage1(result.assets[0]);
    } else {
      alert("You did not select any image.");
    }
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <View
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
        }}
      >
        <Header2 />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={() => handleRefresh()}
            />
          }
        >
          <View>
            <Text
              style={[
                styles.heading,
                {
                  marginVertical: 10,
                  textAlign: "left",
                  marginHorizontal: 20,
                },
              ]}
            >
              Complete KYC
            </Text>
            <Text
              style={{
                marginVertical: 0,
                textAlign: "left",
                marginHorizontal: 20,
                fontStyle: "italic",
                fontSize: 12,
              }}
            >
              (Image Formats allowed)
            </Text>
            <View>
              <Text style={{ marginBottom: 1 }}></Text>
              <Divider />
              <Text style={styles.horizontalText}></Text>
            </View>
            <View>
              <TouchableOpacity onPress={pickImageAsync}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: 20,
                  }}
                >
                  <View
                    style={{
                      flex: 2,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <View
                        style={{
                          backgroundColor: "#fdf0e7",
                          width: 40,
                          height: 40,
                          borderRadius: 50,
                          justifyContent: "center",
                          alignItems: "center",

                          marginLeft: 20,
                        }}
                      >
                        <Icon
                          name="card-account-details"
                          type="material-community"
                          color="#f53658"
                          size={20}
                          S
                          style={{ justifyContent: "center" }}
                        />
                      </View>
                    </View>

                    <View style={{ flex: 5 }}>
                      <Text
                        style={{
                          fontSize: 14,
                          marginLeft: 20,
                          marginRight: 10,
                        }}
                      >
                        Shop KYC
                      </Text>
                      <FlatList
                        data={myData}
                        renderItem={({ item }) => {
                          if (item.sKycStatus == "3") {
                            return (
                              <Text style={{ color: "orange", marginLeft: 20 }}>
                                Uploaded (Verification Pending)
                              </Text>
                            );
                          } else if (item.sKycStatus == "1") {
                            return (
                              <Text style={{ color: "green", marginLeft: 20 }}>
                                Approved
                              </Text>
                            );
                          } else if (item.sKycStatus == "2") {
                            return (
                              <Text style={{ color: "red", marginLeft: 20 }}>
                                DisApproved
                              </Text>
                            );
                          } else {
                            return (
                              <Text style={{ color: "blue", marginLeft: 20 }}>
                                Upload KYC
                              </Text>
                            );
                          }
                        }}
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Icon
                        name="chevron-right"
                        type="font-awesome"
                        color="black"
                        size={14}
                      />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <View>
                <Text style={{ marginBottom: 1 }}></Text>
                <Divider />
                <Text style={styles.horizontalText}></Text>
              </View>
            </View>
            <View>
              <TouchableOpacity onPress={pickImageAsync1}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: 20,
                  }}
                >
                  <View
                    style={{
                      flex: 2,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <View
                        style={{
                          backgroundColor: "#fdf0e7",
                          width: 40,
                          height: 40,
                          borderRadius: 50,
                          justifyContent: "center",
                          alignItems: "center",

                          marginLeft: 20,
                        }}
                      >
                        <Icon
                          name="card-account-details"
                          type="material-community"
                          color="#539EE1"
                          size={20}
                          S
                          style={{ justifyContent: "center" }}
                        />
                      </View>
                    </View>

                    <View style={{ flex: 5 }}>
                      <Text
                        style={{
                          fontSize: 14,
                          marginLeft: 20,
                          marginRight: 10,
                        }}
                      >
                        Upload Pan (Should be linked to Business)
                      </Text>
                      <FlatList
                        data={myData}
                        renderItem={({ item }) => {
                          if (item.sKycStatus1 == "3") {
                            return (
                              <Text style={{ color: "orange", marginLeft: 20 }}>
                                Uploaded (Verification Pending)
                              </Text>
                            );
                          } else if (item.sKycStatus1 == "1") {
                            return (
                              <Text style={{ color: "green", marginLeft: 20 }}>
                                Approved
                              </Text>
                            );
                          } else if (item.sKycStatus1 == "2") {
                            return (
                              <Text style={{ color: "red", marginLeft: 20 }}>
                                DisApproved
                              </Text>
                            );
                          } else {
                            return (
                              <Text style={{ color: "blue", marginLeft: 20 }}>
                                Upload PAN
                              </Text>
                            );
                          }
                        }}
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Icon
                        name="chevron-right"
                        type="font-awesome"
                        color="black"
                        size={14}
                      />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <View>
                <Text style={{ marginBottom: 1 }}></Text>
                <Divider />
                <Text style={styles.horizontalText}></Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6fbf6",
  },
  heading: {
    fontWeight: "bold",
    textAlign: "left",
  },
  horizontal: {
    marginBottom: 0,
  },
  horizontalText: {
    textAlign: "center",
    fontSize: 16,
    marginVertical: 0,
  },
  coachnameh3: {
    fontSize: 12,
  },

  profileinput: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
  },
  imageContainer: {
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  imageiconContainer: {
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -25,
  },
  image: {
    width: 100,
    height: 100,

    borderRadius: 100,
    borderColor: "black",
    padding: 35,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  servicecards: {
    backgroundColor: "white",
    width: 150,
    height: 100,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 10,
    borderWidth: 1,
    borderColor: "#FFF",
  },
});

export default ShopKYC;
