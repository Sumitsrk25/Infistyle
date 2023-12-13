import { View, Text, StyleSheet, Image, StatusBar } from "react-native";
import React, { useEffect } from "react";
import { useNavigation, StackActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(async () => {
      // navigation.dispatch(StackActions.replace('Login'));
      const isUserLogin = await AsyncStorage.getItem("isUserLogin"); // Taken from Login file after User is Successfully Login
      console.log(isUserLogin);

      if (isUserLogin) {
        navigation.dispatch(StackActions.replace("BottomNavigator"));
      } else {
        navigation.dispatch(StackActions.replace("AppIntro"));
      }
    }, 4000);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF",
      }}
    >
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#F6BB0A"
      />
      <Image
        source={require("../../assets/img/115427-top-stores-search.gif")}
        style={{ width: 300, height: 300 }}
      />
      <Text
        style={{
          fontFamily: "OpenSans-Bold",
          fontSize: 42,
          color: "orangered",
          fontWeight: "bold",
        }}
      >
        I N F I S T Y L E
      </Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({});
