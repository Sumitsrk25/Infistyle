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
import { StatusBar } from "expo-status-bar";
import { Header, Icon, Card, Button } from "@rneui/themed";
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

const Home = () => {
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

          <View style={{ marginVertical: moderateScale(-40) }}>
            <Image
              style={{
                width: "95%",
                height: verticalScale(300),
                marginHorizontal: moderateScale(10),
              }}
              resizeMode="contain"
              source={Slider1}
            />
          </View>

          <Text
            style={[
              styles.heading,
              {
                marginVertical: moderateScale(10),
                textAlign: "left",
                marginHorizontal: moderateScale(20),
              },
            ]}
          >
            Health Services
          </Text>
          <View
            style={{
              flexDirection: "row",

              marginBottom: moderateScale(30),
              paddingHorizontal: moderateScale(15),
            }}
          >
            <View style={{}}>
              <TouchableOpacity>
                <Avatar
                  marginHorizontal={15}
                  size={58}
                  rounded
                  icon={{ name: "pencil", type: "font-awesome" }}
                  containerStyle={{ backgroundColor: "#F6BB0A" }}
                />

                <Text style={styles.categoryText}>Muscle Build</Text>
              </TouchableOpacity>
            </View>

            <View style={{}}>
              <TouchableOpacity>
                <Avatar
                  marginHorizontal={15}
                  size={58}
                  rounded
                  icon={{ name: "rowing" }}
                  containerStyle={{ backgroundColor: "#F6BB0A" }}
                />
                <Text style={styles.categoryText}>Fat Loss</Text>
              </TouchableOpacity>
            </View>

            <View style={{}}>
              <TouchableOpacity>
                <Avatar
                  marginHorizontal={15}
                  size={58}
                  rounded
                  icon={{ name: "heartbeat", type: "font-awesome" }}
                  containerStyle={{ backgroundColor: "#F6BB0A" }}
                />
                <Text style={styles.categoryText}>Cross Fit</Text>
              </TouchableOpacity>
            </View>

            <View style={{}}>
              <TouchableOpacity>
                <Avatar
                  marginHorizontal={15}
                  size={58}
                  rounded
                  icon={{ name: "heartbeat", type: "font-awesome" }}
                  containerStyle={{ backgroundColor: "#F6BB0A" }}
                />
                <Text style={styles.categoryText}>S&C</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",

              marginBottom: moderateScale(20),
              paddingHorizontal: moderateScale(15),
            }}
          >
            <View style={{}}>
              <TouchableOpacity>
                <Avatar
                  marginHorizontal={15}
                  size={58}
                  rounded
                  icon={{ name: "pencil", type: "font-awesome" }}
                  containerStyle={{ backgroundColor: "#F6BB0A" }}
                />
                <Text style={styles.categoryText}>Muscle Build</Text>
              </TouchableOpacity>
            </View>

            <View style={{}}>
              <TouchableOpacity>
                <Avatar
                  marginHorizontal={15}
                  size={58}
                  rounded
                  icon={{ name: "rowing" }}
                  containerStyle={{ backgroundColor: "#F6BB0A" }}
                />
                <Text style={styles.categoryText}>Fat Loss</Text>
              </TouchableOpacity>
            </View>

            <View style={{}}>
              <TouchableOpacity>
                <Avatar
                  marginHorizontal={15}
                  size={58}
                  rounded
                  icon={{ name: "heartbeat", type: "font-awesome" }}
                  containerStyle={{ backgroundColor: "#F6BB0A" }}
                />
                <Text style={styles.categoryText}>Cross Fit</Text>
              </TouchableOpacity>
            </View>

            <View style={{}}>
              <TouchableOpacity>
                <Avatar
                  marginHorizontal={15}
                  size={58}
                  rounded
                  icon={{ name: "heartbeat", type: "font-awesome" }}
                  containerStyle={{ backgroundColor: "#F6BB0A" }}
                />
                <Text style={styles.categoryText}>S&C</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text
            style={[
              styles.heading,
              { marginVertical: 10, textAlign: "left", marginHorizontal: 20 },
            ]}
          >
            Personal Coaches
          </Text>

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <CoachesCard
              textData="Priya A"
              imgSrc={
                "https://plus.unsplash.com/premium_photo-1666283137119-372be475c27c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              }
              textData1="Yoga"
              rating="5"
            />

            <CoachesCard
              textData="David S"
              imgSrc={
                "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              }
              textData1="Gym"
              rating="4"
            />
          </ScrollView>
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
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: "20@msr",
    width: "100%",
    paddingVertical: "15@msr",
  },
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
  subheaderText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
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
  categoryText: {
    marginLeft: "3@msr",
    marginTop: "10@msr",
    fontSize: 12,
    textAlign: "center",
    fontWeight: "500",
  },
  coachname: {
    marginVertical: "20@msr",
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

export default Home;
