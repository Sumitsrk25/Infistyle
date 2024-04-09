import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

//import screens
import Home from "../screens/Home";

import GetCoach from "../screens/GetCoach";
import Order from "../screens/Order";
import Cart from "../screens/Cart";
import Plan from "../screens/Plan";

import ProductDetail from "../screens/ProductDetail";
import ProfileSettings from "../screens/ProfileSettings";

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -30,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#7F5DF0",
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.5,
      elevation: 5,
    }}
    onPress={onPress}
  >
    <View
      style={{
        width: 60,
        height: 60,
        borderRadius: 35,

        backgroundColor: "black",
      }}
    >
      {children}
      <Text
        style={{
          fontSize: 12,

          textAlign: "center",
          margin: 5,
          color: "white",
        }}
      >
        Cart
      </Text>
    </View>

    {/* <Text style={{ fontSize: 12, fontWeight: "bold" }}>{"\n"}Plans</Text> */}
  </TouchableOpacity>
);

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 5,
          left: 5,
          right: 5,
          elevation: 0,
          backgroundColor: "white",
          opacity: 0.9,
          borderRadius: 15,
          height: 90,

          shadowColor: "#7F5DF0",
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.5,
          elevation: 5,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View>
              <MaterialCommunityIcons
                name="home-outline"
                size={40}
                color={focused ? "#085ac6" : "black"}
              />
              <Text
                style={{
                  color: focused ? "#085ac6" : "black",
                  fontSize: 10,
                  textAlign: "center",
                }}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />

      {/* <Tab.Screen
        name="Search"
        component={Order}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View>
              <MaterialCommunityIcons
                name="search-web"
                size={30}
                color={focused ? "#085ac6" : "black"}
                style={{ textAlign: "center" }}
              />
              <Text
                style={{
                  color: focused ? "#085ac6" : "black",
                  fontSize: 10,
                  textAlign: "justify",
                }}
              >
                Search
              </Text>
            </View>
          ),
        }}
      /> */}

      <Tab.Screen
        name="My Cart"
        component={Cart}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View>
              <MaterialCommunityIcons
                name="cart-outline"
                size={25}
                color={focused ? "#F6BB0A" : "white"}
                style={{ textAlign: "center", marginTop: 10 }}
              />
            </View>
          ),
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
      {/* 
      <Tab.Screen
        name="Wishlist"
        component={ProductDetail}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View>
              <MaterialCommunityIcons
                name="cards-heart-outline"
                size={30}
                color={focused ? "#085ac6" : "black"}
              />
              <Text
                style={{
                  color: focused ? "#085ac6" : "black",
                  fontSize: 10,
                  textAlign: "center",
                }}
              >
                Wishlist
              </Text>
            </View>
          ),
        }}
      /> */}

      <Tab.Screen
        name="My Biz"
        component={ProfileSettings}
        options={{
          headerShown: false,

          tabBarIcon: ({ focused }) => (
            <View>
              <MaterialCommunityIcons
                name="account-circle-outline"
                size={40}
                color={focused ? "#085ac6" : "black"}
              />
              <Text
                style={{
                  color: focused ? "#085ac6" : "black",
                  fontSize: 10,
                  textAlign: "center",
                }}
              >
                My Biz
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const BottomIconsContainer = (props) => {
  return (
    <Ionicons
      name={props.name}
      size={24}

      // color="#02C38E"
    />
  );
};
const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default BottomNavigator;
