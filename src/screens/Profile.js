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
import { ImageSlider } from "react-native-image-slider-banner";
import { SafeAreaProvider } from "react-native-safe-area-context";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { Avatar } from "@rneui/base";
import { RefreshControl } from "react-native";

import SwitchSelector from "react-native-switch-selector";
import { Strings } from "../constants";
import { Dropdown } from "react-native-element-dropdown";

const data = [
  { label: "Sedentary", value: "Sedentary" },
  { label: "Lightly active", value: "Lightly active" },
  { label: "Moderately active", value: "Moderately active" },
  { label: "Very active", value: "Very active" },
  { label: "Super active", value: "Super active" },
];

const Profile = ({ route, navigation }) => {
  const [isLoaded, setIsLoaded] = useState(true);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [myData, setMyData] = useState([]);

  const [user, setUser] = useState({});
  const [name, setName] = useState({});
  const [mobile, setMobile] = useState({});

  const [bname, setBname] = useState({});

  const _renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {/* <Image style={styles.icon} source={require("../../assets/icon.png")} /> */}
      </View>
    );
  };

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
      .then((json) => {
        const { sName, sMobileNo, sBname } = json.data?.[0] || {};
        setMyData(json.data);
        setName(sName);
        setMobile(sMobileNo);
        setBname(sBname);
      })
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
      if (!name.trim()) {
        alert("Please Enter Name");
        return;
      }

      console.log("name :", name);

      // formData.append('photo', { uri: localUri, name: filename, type });
      // formData.append('email,',email)

      const { data } = await axios.post(
        "https://engistack.com/infistyle_reactapp/update_user.php",
        {
          sName: name,
          iUserId: user.uid,
          sMobileNo: mobile,
          sBName: bname,
        }
      );

      console.log(data);

      if (data.status == "success") {
        Alert.alert("Data Updated Successfully");
      } else {
        Alert.alert("User Not Created");
      }
    } catch (err) {
      Alert.alert("Not Updated");
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
        <FlatList
          data={myData}
          renderItem={({ item }) => (
            <>
              <Header
                backgroundColor="white"
                leftComponent={
                  <TouchableOpacity onPress={() => navigation.goBack()}>
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
                  </TouchableOpacity>
                  // <Avatar
                  //   size={34}
                  //   rounded
                  //   source={{
                  //     uri: "https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg",
                  //   }}
                  //   title="Bj"
                  //   containerStyle={{ backgroundColor: "grey" }}
                  // >
                  //   <Avatar.Accessory size={13} />
                  // </Avatar>
                }
                rightComponent={
                  <View style={styles.headerRight}>
                    <TouchableOpacity
                      style={{ marginLeft: 10 }}
                      onPress={() => navigation.navigate("Passwd")}
                    >
                      <Text>
                        <Icon
                          type="font-awesome-5"
                          name="key"
                          color="#585858"
                          size={10}
                          marginRight={5}
                        />
                        Set Password
                      </Text>
                    </TouchableOpacity>
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

        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={() => handleRefresh()}
            />
          }
        >
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
                  Account Information
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
                  Keep Your Profile Updated To Get The Best Results !
                </Text>
                <Card
                  containerStyle={{
                    borderRadius: 10,
                  }}
                >
                  <Card.Title style={styles.inputheading}>Name</Card.Title>
                  <View style={styles.customInputContainer}>
                    <TextInput
                      placeholder="Name"
                      style={styles.inputplaceholder}
                      placeholderTextColor={"grey"}
                      onChangeText={(text) => setName(text)}
                      value={name}
                    />
                  </View>

                  <Card.Title style={[styles.inputheading, { marginTop: 20 }]}>
                    Mobile No
                  </Card.Title>
                  <View style={styles.customInputContainer}>
                    <TextInput
                      placeholder="Mobile No"
                      style={styles.inputplaceholder}
                      onChangeText={(text) => setMobile(text)}
                      defaultValue={item.sMobileNo}
                    />
                    {/* <Text style={{ marginTop: 15, color: "#41AAE8" }}>cms</Text> */}
                  </View>

                  <Card.Title style={[styles.inputheading, { marginTop: 20 }]}>
                    Business Name
                  </Card.Title>
                  <View style={styles.customInputContainer}>
                    <TextInput
                      placeholder="Business Name"
                      style={styles.inputplaceholder}
                      onChangeText={(text) => setHeight(text)}
                      defaultValue={item.sBName}
                    />
                  </View>

                  <Card.Title style={styles.inputheading}>
                    Business Email{" "}
                  </Card.Title>
                  <View style={styles.customInputContainer}>
                    <TextInput
                      placeholder="Business Email Id"
                      style={styles.inputplaceholder}
                      defaultValue={item.sEmailId}
                      selectTextOnFocus={false}
                      editable={false}
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
                      marginBottom: 100,
                      marginTop: 10,
                    }}
                    titleStyle={{ fontWeight: "bold" }}
                  />
                </Card>
              </>
            )}
          />
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
    flex: 1,
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
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    customInputContainer: {
      marginVertical: 20,
      borderWidth: 2,
      borderColor: "#F6BB0A",
      height: 60,
      backgroundColor: "#fff",
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginBottom: 10,
      width: 100,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  dropdown: {
    backgroundColor: "white",
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    marginTop: 20,
    width: 280,
  },

  item: {
    paddingVertical: 17,
    paddingHorizontal: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
});

export default Profile;
