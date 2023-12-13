import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

//import screens
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import GetCoach from "../screens/GetCoach";
import Responsive from "../screens/Responsive";
import Plan from "../screens/Plan";
import Diet from "../screens/Diet";
import BuyPlan from "../screens/BuyPlan";
import BFP from "../screens/BFP";
import Tools from "../screens/Tools";
import Test from "../screens/Test";

const BottomNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: () => <BottomIconsContainer name="home" />,
        }}
      />

      <Tab.Screen
        name="Get A Coach"
        component={GetCoach}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <MaterialCommunityIcons name="dumbbell" size={25} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: () => <BottomIconsContainer name="person" />,
        }}
      />

      <Tab.Screen
        name="My Plan"
        component={Plan}
        options={{
          headerShown: false,
          tabBarIcon: () => <BottomIconsContainer name="eye" />,
        }}
      />

      <Tab.Screen
        name="BuyPlan"
        component={BuyPlan}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <MaterialCommunityIcons name="food-apple" size={25} />
          ),
        }}
      />

      <Tab.Screen
        name="Tools"
        component={Tools}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <MaterialCommunityIcons name="calculator-variant" size={25} />
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

const styles = StyleSheet.create({});

export default BottomNavigator;
