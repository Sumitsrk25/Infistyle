import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { Header, Icon, Card, Button, Badge } from "@rneui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import FontAwesome from "react-native-vector-icons/FontAwesome5";

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
import Slider1 from "../../assets/img/slider1.png";
import CoachesCard from "./CoachesCard";
import Header2 from "../component/Header2";
import { useNavigation, StackActions } from "@react-navigation/native";

const Plan = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaProvider style={styles.container}>
      <View
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
        }}
      >
        <ScrollView>
          <Header2 />

          <View style={styles.customInputContainer}>
            <TextInput
              placeholder="Enter Your Email"
              placeholderTextColor={"grey"}
            />
            <TouchableOpacity style={{ marginTop: moderateScale(10) }}>
              <FontAwesome
                name="search"
                size={20}
                style={{ color: "#F6BB0A" }}
              />
            </TouchableOpacity>
          </View>

          <Card containerStyle={{ borderRadius: 15 }}>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <FontAwesome
                name="lightbulb"
                size={20}
                style={{ color: "#F6BB0A", marginRight: 50 }}
              />

              <Card.Title style={styles.coachnameh3}>
                Under Development
              </Card.Title>
            </View>
            <Text
              style={{
                textAlign: "left",
                marginLeft: 60,
                marginRight: 40,
                marginTop: -10,
                fontSize: 13,
              }}
            >
              Please wait for next update
            </Text>
          </Card>
        </ScrollView>
      </View>
    </SafeAreaProvider>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6fbf6",
  },

  customInputContainer: {
    marginHorizontal: "10@msr",
    borderWidth: "1@s",
    borderColor: "#F6BB0A",
    height: "45@vs",
    backgroundColor: "#fff",
    paddingHorizontal: "15@msr",
    paddingVertical: "0@msr",
    borderRadius: "10@s",
    marginBottom: "1@msr",
    marginTop: "10@msr",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  coachnameh3: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Plan;
