import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  FlatList,
  refreshControl,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Header, Icon, Card, Tile, Input } from "@rneui/themed";
import { Button } from "@rneui/themed";

import { SafeAreaProvider } from "react-native-safe-area-context";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { Avatar } from "@rneui/base";
import { RefreshControl } from "react-native";
import { KeyboardAvoidingScrollView } from "react-native-keyboard-avoiding-scroll-view";
import { Strings } from "../constants";

const Passwd = ({ route, navigation }) => {
  const [isLoaded, setIsLoaded] = useState(true);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [myData, setMyData] = useState([]);

  const [user, setUser] = useState({});

  const [textInputPassword, setTextInputPassword] = useState("");

  const findUser = async () => {
    const result = await AsyncStorage.getItem("user_data");
    console.log(result);
    setUser(JSON.parse(result));
  };
  useEffect(() => {
    findUser();
  }, []);

  useEffect(() => {
    if (user?.uid) {
      getUserData();
    }
  }, [user?.uid]);

  const getUserData = () => {
    axios
      .get("https://engistack.com/infistyle_reactapp/userdata_infistyle.php", {
        params: {
          iUserId: user.uid,
        },
      })
      .then((json) => setMyData(json.data))
      .finally(() => setIsLoaded(false));
  };

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

  const signupUser = async () => {
    try {
      if (!textInputPassword.trim()) {
        alert("Please Enter Password");
        return;
      } else if (textInputPassword.length < 5) {
        alert("Password Characters should be more than 5");
        return;
      }

      console.log("textInputPassword :", textInputPassword);

      // formData.append('photo', { uri: localUri, name: filename, type });
      // formData.append('email,',email)

      const { data } = await axios.post(
        "https://engistack.com/infistyle_reactapp/update_userpwd.php",
        {
          sPassword: textInputPassword,
          iUserId: user.uid,
        }
      );

      console.log(data);
      const userData = {
        upassword: data.data.sPassword,
        uid: data.data.id,

        // email: data.data.email,
        // uid: data.data.id,
        // uname: data.data.uname,
      };

      if (data.status == "success") {
        Alert.alert("All Done!", "You have successfully registered.", [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("Profile");
            },
          },
        ]);
      } else {
        Alert.alert("User Not Created");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <View
        style={{
          flex: 1,
          width: "100%",
          height: 1000,
        }}
      >
        <KeyboardAvoidingScrollView
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={() => handleRefresh()}
            />
          }
        >
          <FlatList
            data={myData}
            renderItem={({ item }) => (
              <>
                <Header
                  backgroundColor="white"
                  leftComponent={
                    <Avatar
                      size={35}
                      rounded
                      source={{
                        uri: `${Strings.IMAGE_PREFIX1}/${item.sPhotoUrl}`,
                      }}
                      title="FM"
                      containerStyle={{
                        backgroundColor: "#E8E8E8",

                        borderColor: "black",
                        padding: 0,
                      }}
                    />
                  }
                  rightComponent={
                    <View style={styles.headerRight}>
                      {/* <TouchableOpacity
                          style={{ marginLeft: 10 }}
                          onPress={() => navigation.navigate("Passwd")}
                        >
                          <Icon
                            type="font-awesome-5"
                            name="bell"
                            color="#585858"
                          />
                        </TouchableOpacity> */}
                    </View>
                  }
                  centerComponent={{
                    text: item.sName,
                    style: styles.heading,
                  }}
                  placement="left"
                />
              </>
            )}
          />
          <Text
            style={[
              styles.heading,
              { marginVertical: 10, textAlign: "left", marginHorizontal: 20 },
            ]}
          >
            Set Password
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
            Set New and Strong Password for your account !
          </Text>

          {/* <View>
              <Text> Email = {user.uid}</Text>
              <FlatList
                data={myData}
                renderItem={({ item }) => (
                  <>
                    <Text>UserId : {item.iUserId}</Text>
                    <Text>Name : {item.sName}</Text>
                    <Text>Email : {item.sEmailId}</Text>
                  </>
                )}
              />
            </View> */}

          <FlatList
            data={myData}
            renderItem={({ item }) => (
              <>
                <Card
                  containerStyle={{
                    borderRadius: 10,
                  }}
                >
                  <Card.Title style={styles.inputheading}>
                    Current Password
                  </Card.Title>
                  <View style={styles.customInputContainer}>
                    <TextInput
                      placeholder="Current Password"
                      placeholderTextColor={"grey"}
                      value={item.sPassword}
                      editable={false}
                      selectTextOnFocus={false}
                    />
                  </View>

                  <Card.Title style={styles.inputheading}>
                    New Password
                  </Card.Title>
                  <View style={styles.customInputContainer}>
                    <TextInput
                      placeholder="New Password"
                      placeholderTextColor={"grey"}
                      onChangeText={(text) => setTextInputPassword(text)}
                    />
                  </View>

                  <Button
                    title="Save"
                    onPress={() => signupUser()}
                    buttonStyle={{
                      backgroundColor: "black",
                      borderWidth: 2,
                      borderColor: "white",
                      borderRadius: 30,
                    }}
                    containerStyle={{
                      width: "100%",
                      marginBottom: 50,
                      marginTop: 10,
                    }}
                    titleStyle={{ fontWeight: "bold" }}
                  />
                </Card>
              </>
            )}
          />
        </KeyboardAvoidingScrollView>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6fbf6",
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 20,
    width: "100%",
    paddingVertical: 15,
  },
  inputplaceholder: {
    // color: '#585858',
    color: "black",
    fontSize: 14,
  },
  inputheading: {
    // color: '#585858',
    color: "black",
    fontSize: 16,
    fontWeight: "normal",
    textAlign: "left",
  },
  heading: {
    // color: '#585858',
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
  },
  headerRight: {
    display: "flex",
    flexDirection: "row",
    marginTop: 5,
  },
  subheaderText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  customInputContainer: {
    marginHorizontal: 0,
    borderWidth: 1,
    borderColor: "#F6BB0A",
    height: 45,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 0,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 0,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoryText: {
    marginLeft: 3,
    marginTop: 10,
    fontSize: 12,
    textAlign: "center",
    fontWeight: "500",
  },
  coachname: {
    marginVertical: 20,
    fontSize: 20,
    color: "#F6BB0A",
  },
  coachcategory: {
    fontSize: 14,
  },
  coachrating: {
    fontSize: 14,
  },
});

export default Passwd;
