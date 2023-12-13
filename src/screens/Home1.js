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
import { Header, Icon, Card, Button, Tile } from "@rneui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import FontAwesome from "react-native-vector-icons/FontAwesome5";

import { Avatar, Accessory } from "@rneui/base";
import Slider1 from "../../assets/img/slider1.png";
import CoachesCard from "./CoachesCard";

const Home1 = () => {
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
          <Header
            backgroundColor="white"
            leftComponent={
              <Avatar
                size={34}
                rounded
                source={{
                  uri: "https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg",
                }}
                title="Bj"
                containerStyle={{ backgroundColor: "grey" }}
              >
                <Avatar.Accessory
                  size={13}
                  backgroundColor="orange"
                  containerStyle={{ borderRadius: 10 }}
                />
              </Avatar>
            }
            rightComponent={
              <View style={styles.headerRight}>
                <TouchableOpacity style={{ marginLeft: 10 }}>
                  <Icon type="font-awesome-5" name="bell" />
                </TouchableOpacity>
              </View>
            }
            centerComponent={{ text: "Home1", style: styles.heading }}
          />
          <View style={styles.customInputContainer}>
            <TextInput
              placeholder="Enter Your Email"
              placeholderTextColor={"grey"}
            />
            <TouchableOpacity style={{ marginTop: 10 }}>
              <FontAwesome
                name="search"
                size={20}
                style={{ color: "#02C38E" }}
              />
            </TouchableOpacity>
          </View>

          <View style={{ marginVertical: -40 }}>
            <Image
              style={{ width: "95%", height: 300, marginHorizontal: 10 }}
              resizeMode="contain"
              source={Slider1}
            />
          </View>

          <Text
            style={[
              styles.heading,
              { marginVertical: 10, textAlign: "left", marginHorizontal: 20 },
            ]}
          >
            Health Services
          </Text>
          <View
            style={{
              flexDirection: "row",

              marginBottom: 30,
              paddingHorizontal: 20,
            }}
          >
            <View style={{}}>
              <TouchableOpacity>
                <Avatar
                  marginHorizontal={15}
                  size={58}
                  rounded
                  icon={{ name: "pencil", type: "font-awesome" }}
                  containerStyle={{ backgroundColor: "#02C38E" }}
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
                  containerStyle={{ backgroundColor: "#02C38E" }}
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
                  containerStyle={{ backgroundColor: "#02C38E" }}
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
                  containerStyle={{ backgroundColor: "#02C38E" }}
                />
                <Text style={styles.categoryText}>S&C</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",

              marginBottom: 20,
              paddingHorizontal: 20,
            }}
          >
            <View style={{}}>
              <TouchableOpacity>
                <Avatar
                  marginHorizontal={15}
                  size={58}
                  rounded
                  icon={{ name: "pencil", type: "font-awesome" }}
                  containerStyle={{ backgroundColor: "#02C38E" }}
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
                  containerStyle={{ backgroundColor: "#02C38E" }}
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
                  containerStyle={{ backgroundColor: "#02C38E" }}
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
                  containerStyle={{ backgroundColor: "#02C38E" }}
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

            {/* <Text style={styles.subHeader}>Featured Tile</Text>
        <Tile
          imageSrc={{
            uri:
              'https://www.mediastorehouse.com/p/191/sunset-porthmeor-beach-st-ives-cornwall-11702500.jpg.webp',
          }}
          title="When I admire the wonders of a sunset or the beauty of the moon, my soul expands in the worship of the creator."
          titleStyle={{ fontSize: 15 }}
          featured
          caption="Mahatma Gandhi"
          activeOpacity={1}
          width={310}
        /> */}
          </ScrollView>
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
  heading: {
    // color: '#585858',
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
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
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "#02C38E",
    height: 45,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 0,
    borderRadius: 10,
    marginBottom: 1,
    marginTop: 10,
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
    color: "#02C38E",
  },
  coachcategory: {
    fontSize: 14,
  },
  coachrating: {
    fontSize: 14,
  },
});

export default Home1;
