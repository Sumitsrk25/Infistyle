import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import React from "react";
import { Header, Icon } from "@rneui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { Avatar } from "@rneui/base";
import Slider1 from "../../assets/img/slider1.png";

const Header1 = () => {
  return (
    <SafeAreaProvider style={styles.container}>
      <Header
        backgroundColor="white"
        leftComponent={
          <Avatar
            rounded
            size={34}
            source={{
              uri: "https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg",
            }}
          />
        }
        rightComponent={
          <View style={styles.headerRight}>
            <TouchableOpacity>
              <Icon name="description" color="#585858" />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 10 }}>
              <Icon type="antdesign" name="rocket1" color="#585858" />
            </TouchableOpacity>
          </View>
        }
        centerComponent={{ text: "Header1", style: styles.heading }}
      />
      <View style={styles.customInputContainer}>
        <TextInput
          placeholder="Enter Your Email"
          placeholderTextColor={"grey"}
        />
        <TouchableOpacity style={{ marginTop: 10 }}>
          <FontAwesome name="search" size={20} style={{ color: "#02C38E" }} />
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
          { marginVertical: 20, textAlign: "left", marginHorizontal: 20 },
        ]}
      >
        Explore Categories
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
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    color: "#585858",
    fontSize: 22,
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
});

export default Header1;
