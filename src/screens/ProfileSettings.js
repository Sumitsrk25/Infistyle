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

import { Header, Icon, Card, Tile, Input } from "@rneui/themed";
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

const ProfileSettings = () => {
  const navigation = useNavigation();

  const [isLoaded, setIsLoaded] = useState(true);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [myData, setMyData] = useState([]);
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
      "https://engistack.com/infistyle_reactapp/upload_profile_pic.php",
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
          <View style={{ marginTop: 50 }}>
            <LinearGradient
              colors={["#B9B4C7", "#352F44", "#352F44"]}
              style={{
                width: "100%",
                height: 400,
                marginTop: -50,
                zIndex: 1,
                // borderBottomLeftRadius: 100,
                // borderBottomRightRadius: 100,
              }}
            ></LinearGradient>
            {/* <View
              style={{
                width: "100%",
                height: 300,
                marginTop: -50,
                zIndex: 1,
                borderBottomLeftRadius: 100,
                borderBottomRightRadius: 100,
              }}
              resizeMode="contain"
            /> */}
          </View>

          <View
            style={{
              zIndex: 2,
              borderTopStartRadius: 100,
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              marginTop: -360,
            }}
          >
            {/* <Avatar
              size={100}
              rounded
              source={{
                uri: "${Strings.IMAGE_PREFIX1}/${item.sPhotoUrl}",
              }}
              title="Bj"
              containerStyle={{
                backgroundColor: "#E8E8E8",

                borderColor: "black",
                padding: 5,
              }}
            /> */}

            <FlatList
              data={myData}
              renderItem={({ item }) => (
                <>
                  <View style={styles.imageContainer}>
                    <Avatar
                      size={130}
                      rounded
                      source={{
                        uri: `${Strings.IMAGE_PREFIX1}/${item.sPhotoUrl}`,
                      }}
                      title="IS"
                      containerStyle={{
                        backgroundColor: "#E8E8E8",

                        borderColor: "black",
                        padding: 7,
                      }}
                    />
                  </View>

                  {/* <Button
                    title="UPLOAD "
                    onPress={pickImageAsync}
                    buttonStyle={{ backgroundColor: "#E7AB2B" }}
                    
                  /> */}
                  <TouchableOpacity
                    style={styles.imageiconContainer}
                    onPress={pickImageAsync}
                  >
                    <MaterialCommunityIcons
                      name="pencil-plus-outline"
                      size={25}
                      color={"#352F44"}
                    />
                  </TouchableOpacity>

                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      marginVertical: 10,
                      fontSize: 10,
                    }}
                  >
                    Business Profile
                  </Text>

                  <Text
                    style={[
                      styles.heading,
                      {
                        textAlign: "center",
                        color: "white",
                        marginBottom: 20,
                      },
                    ]}
                  >
                    {item.sName}
                  </Text>
                  {/* <Text
                    style={[
                      styles.heading,
                      {
                        textAlign: "center",
                        color: "white",
                        marginBottom: 20,
                      },
                    ]}
                  >
                    {item.sEmailId}
                  </Text> */}
                </>
              )}
            />
            <Button
              title="Edit Profile"
              buttonStyle={{
                borderRadius: 10,
                marginHorizontal: 5,
              }}
              ViewComponent={LinearGradient} // Don't forget this!
              linearGradientProps={{
                colors: ["#40afea", "#d63ba1"],
                start: { x: 0, y: 0.5 },
                end: { x: 1, y: 0.5 },
              }}
              containerStyle={{
                width: "30%",
              }}
              titleStyle={{
                fontWeight: "normal",
                fontSize: 11,
                color: "white",
              }}
              onPress={() => navigation.navigate("Profile")}
            />
          </View>

          <View
            style={{
              zIndex: 2,
              borderTopStartRadius: 100,
              marginTop: 20,
            }}
          >
            {/* <Text
              style={[
                styles.heading,
                {
                  marginTop: -100,
                  textAlign: "center",
                  color: "white",
                  marginBottom: 20,
                },
              ]}
            >
              Trainer Profile
            </Text> */}

            <Card
              containerStyle={{
                borderRadius: 30,
                marginTop: 60,
                backgroundColor: "#f5f4f2",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  justifyContent: "space-between",
                  marginTop: -50,
                }}
              >
                <View style={styles.servicecards}>
                  <View style={{ flexDirection: "column", flex: 1 }}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Tools")}
                    >
                      <View
                        style={{
                          backgroundColor: "#faeee3",
                          width: 40,
                          height: 40,
                          borderRadius: 50,
                          justifyContent: "center",
                          alignItems: "center",

                          marginLeft: 50,
                        }}
                      >
                        <Icon
                          name="calculator"
                          type="antdesign"
                          color="#f57802"
                          size={20}
                          style={{ justifyContent: "center" }}
                        />
                      </View>

                      <Text style={styles.profileinput}>My Profile</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.servicecards}>
                  <View style={{ flexDirection: "column", flex: 1 }}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Orders")}
                    >
                      <View
                        style={{
                          backgroundColor: "#e1f4fc",
                          width: 40,
                          height: 40,
                          borderRadius: 50,
                          justifyContent: "center",
                          alignItems: "center",

                          marginLeft: 50,
                        }}
                      >
                        <Icon
                          name="shopping-basket"
                          type="material"
                          color="#48C2F9"
                          size={20}
                          style={{ justifyContent: "center" }}
                        />
                      </View>

                      <Text style={styles.profileinput}>My Orders</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  justifyContent: "space-between",
                  marginTop: 20,
                }}
              >
                <View style={styles.servicecards}>
                  <View style={{ flexDirection: "column", flex: 1 }}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Cart")}
                    >
                      <View
                        style={{
                          backgroundColor: "#efedf8",
                          width: 40,
                          height: 40,
                          borderRadius: 50,
                          justifyContent: "center",
                          alignItems: "center",

                          marginLeft: 50,
                        }}
                      >
                        <Icon
                          name="cart"
                          type="material-community"
                          color="#613ac9"
                          size={20}
                          style={{ justifyContent: "center" }}
                        />
                      </View>

                      <Text style={styles.profileinput}>My Cart</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.servicecards}>
                  <View style={{ flexDirection: "column", flex: 1 }}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Home")}
                    >
                      <View
                        style={{
                          backgroundColor: "#fdf0e7",
                          width: 40,
                          height: 40,
                          borderRadius: 50,
                          justifyContent: "center",
                          alignItems: "center",

                          marginLeft: 50,
                        }}
                      >
                        <Icon
                          name="home"
                          type="material-community"
                          color="#f53658"
                          size={20}
                          S
                          style={{ justifyContent: "center" }}
                        />
                      </View>

                      <Text style={styles.profileinput}>Shop</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={{ marginVertical: 20 }}>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    marginVertical: 20,
                  }}
                ></View>

                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    marginVertical: -20,
                  }}
                >
                  <Button
                    title="Logout"
                    buttonStyle={{
                      backgroundColor: "#fff",
                      // borderWidth: 1,
                      // borderColor: "black",
                      borderRadius: 10,
                      marginHorizontal: 5,
                    }}
                    containerStyle={{
                      width: "100%",
                      marginBottom: 200,
                    }}
                    titleStyle={{ fontWeight: "normal", color: "black" }}
                    onPress={() => handleLogout()}
                  />
                </View>
              </View>

              {/* <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                }}
              >
                 <Button
                  title="Book"
                  buttonStyle={{
                    backgroundColor: "black",
                    borderWidth: 2,
                    borderColor: "white",
                    borderRadius: 10,
                    marginHorizontal: 5,
                  }}
                  containerStyle={{
                    width: "50%",

                    marginVertical: 10,
                  }}
                  titleStyle={{ fontWeight: "bold" }}
                /> 
              </View> */}
            </Card>
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

  coachnameh3: {
    fontSize: 12,
  },
  heading: {
    // color: '#585858',
    color: "black",
    fontSize: 17,
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

export default ProfileSettings;
