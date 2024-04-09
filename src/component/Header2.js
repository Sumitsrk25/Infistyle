import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import React from "react";
import { Header, Icon, Card, Button } from "@rneui/themed";
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
import { Avatar } from "@rneui/base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, StackActions } from "@react-navigation/native";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Header2 = () => {
  const navigation = useNavigation();
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

  const handleProfile = async () => {
    try {
      console.log("ProfileSettings");
      navigation.navigate("ProfileSettings");
      //navigation.dispatch(StackActions.replace("ProfileSettings"));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
      <Header
        backgroundColor="white"
        leftComponent={
          <View style={styles.headerLeft}>
            <TouchableOpacity
              style={{ marginLeft: moderateScale(30) }}
              onPress={() => handleProfile()}
            >
              <SimpleLineIcons
                name={"menu"}
                size={24}
                style={{ color: "black", textAlign: "center" }}
              />
            </TouchableOpacity>
          </View>

          // <Avatar
          //   size={34}
          //   rounded
          //   source={{
          //     uri: "https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg",
          //   }}
          //   title="Bj"
          //   containerStyle={{ backgroundColor: "grey" }}
          // >
          //   <Avatar.Accessory
          //     size={13}
          //     backgroundColor="orange"
          //     containerStyle={{ borderRadius: 10 }}
          //   />
          // </Avatar>
        }
        rightComponent={
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={{ marginLeft: moderateScale(-30) }}
              onPress={() => navigation.navigate("Orders")}
            >
              {/* <SimpleLineIcons name={"bag"} size={24} /> */}
              {/* <Icon type="ant-design" name="shoppingcart" size={30} /> */}
              <FontAwesome
                name={"shopping-bag"}
                size={20}
                style={{ color: "#085ac6", textAlign: "center" }}
              />
              <Text
                style={{
                  color: "black",
                  fontSize: 10,
                  marginLeft: -5,
                }}
              >
                Orders
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ marginLeft: moderateScale(30) }}
              onPress={() => handleLogout()}
            >
              <Text style={{ color: "#fff" }}>
                <Icon type="ant-design" name="logout" />
              </Text>
              <Text
                style={{
                  color: "black",
                  fontSize: 10,
                  marginLeft: -5,
                }}
              >
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        }
        // centerComponent={{ text: "Infistyle", style: styles.heading }}
        centerComponent={
          <Avatar
            source={{
              uri: "https://engistack.com/infistyle_reactapp/infistyle_logo22.png",
            }}
            // title="Infistyle"
            containerStyle={{
              backgroundColor: "white",
              width: "70%",
              height: 40,
              marginTop: 5,
            }}
          ></Avatar>
        }
      />
    </View>
  );
};

const styles = ScaledSheet.create({
  heading: {
    // color: '#585858',
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  headerRight: {
    display: "flex",
    flexDirection: "row",
    marginTop: "5@msr",
  },
  headerLeft: {
    display: "flex",
    flexDirection: "row",
    marginTop: "5@msr",
    marginLeft: "-15@msr",
  },
});

export default Header2;
