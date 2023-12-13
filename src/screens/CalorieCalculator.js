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
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Header, Icon, Card, Tile, Input } from "@rneui/themed";
import { Button } from "@rneui/themed";
import BackgroundImg from "../../assets/img/undraw_fitness_tracker_3033.png";
import { SafeAreaProvider } from "react-native-safe-area-context";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { Avatar } from "@rneui/base";
import { RefreshControl } from "react-native";

const CalorieCalculator = ({ route, navigation }) => {
  const [isLoaded, setIsLoaded] = useState(true);
  const [myData, setMyData] = useState([]);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [user, setUser] = useState({});

  const findUser = async () => {
    const result = await AsyncStorage.getItem("user_data");
    console.log(result);
    setUser(JSON.parse(result));
  };
  useEffect(() => {
    findUser();
    getUserData();
  }, [user?.uid]);

  const getUserData = () => {
    axios
      .get("https://engistack.com/infistyle_reactapp/userdata_fitmorphs.php", {
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

  return (
    <SafeAreaProvider style={styles.container}>
      <View
        style={{
          flex: 1,
        }}
      >
        <ScrollView
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
                      size={34}
                      rounded
                      source={{
                        uri: "https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg",
                      }}
                      title="Bj"
                      containerStyle={{ backgroundColor: "grey" }}
                    >
                      <Avatar.Accessory size={13} />
                    </Avatar>
                  }
                  rightComponent={
                    <View style={styles.headerRight}>
                      <TouchableOpacity style={{ marginLeft: 10 }}>
                        <Icon
                          type="font-awesome-5"
                          name="bell"
                          color="#585858"
                        />
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
          {/* <Text
            style={[
              styles.heading,
              { marginVertical: 10, textAlign: "left", marginHorizontal: 20 },
            ]}
          >
            Personal Information
          </Text> */}

          <View>
            <FlatList
              data={myData}
              renderItem={({ item }) => {
                const bmr_men_age = item.sAge;
                const bmr_men_weight = 13.8 * item.sWeight;
                const bmr_men_height = 5 * item.sHeight;
                const bmr_men_height1 = bmr_men_height / 6.8;
                const calorie1men = bmr_men_weight + bmr_men_height1;
                const calorie2men = calorie1men * bmr_men_age;

                const calorie_men = parseFloat(66.5 + calorie2men).toFixed(2);

                const bmr_women_age = item.sAge;
                const bmr_women_weight = 13.8 * item.sWeight;
                const bmr_women_height = 5 * item.sHeight;
                const bmr_women_height1 = bmr_women_height / 6.8;
                const calorie1women = bmr_women_weight + bmr_women_height1;
                const calorie2women = calorie1women * bmr_women_age;

                const calorie_women = parseFloat(66.5 + calorie2women).toFixed(
                  2
                );

                if (item.sGender == "Male") {
                  return (
                    <Card style={{ flex: 0.5 }}>
                      <Card.Title style={styles.inputheading}>
                        Your Calcorie Calculator
                      </Card.Title>
                      <Image
                        source={BackgroundImg}
                        style={styles.bgimg}
                      ></Image>

                      {/* <Text>{bmr_men_weight} </Text>
                      <Text>{bmr_men_height1} </Text>
                      <Text>{calorie1men} </Text>
                      <Text>{calorie2men} </Text>

                      <Text>{bmr_men_age} </Text> */}

                      <Text style={styles.sumtext}>
                        {calorie_men} kcal / day
                      </Text>
                    </Card>
                  );
                } else {
                  return (
                    <Card style={{ flex: 0.5 }}>
                      <Card.Title style={styles.inputheading}>
                        Your Calorie Calculator
                      </Card.Title>
                      <Image
                        source={BackgroundImg}
                        style={styles.bgimg}
                      ></Image>

                      <Text style={styles.sumtext}>
                        {calorie_women} kcal / day
                      </Text>
                    </Card>
                  );
                }
              }}
            />
          </View>
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
  bgimg: {
    height: 200,
    width: 200,
    marginHorizontal: 70,
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
    fontSize: 24,
  },
  inputheading: {
    color: "#474948",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  sumtext: {
    flex: 1,
    color: "#00BFFF",
    fontSize: 48,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 30,
    height: 400,
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
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "#F6BB0A",
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
    color: "#F6BB0A",
  },
  coachcategory: {
    fontSize: 14,
  },
  coachrating: {
    fontSize: 14,
  },
});

export default CalorieCalculator;
