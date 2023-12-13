import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Header, Icon, Card, Tile, Input } from "@rneui/themed";
import { Button, Badge } from "@rneui/themed";
import CoachImage from "../../assets/img/coach1.jpg";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { Avatar } from "@rneui/base";
import Moment from "moment";
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

const Challenge = ({ navigation, route }) => {
  const [myData, setMyData] = useState([]);
  const [user, setUser] = useState({});
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const findUser = async () => {
    const result = await AsyncStorage.getItem("user_data");
    console.log(result);
    setUser(JSON.parse(result));
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
          width: "100%",
          height: "100%",
          zIndex: 2,
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
          <View style={{ marginTop: 50 }}>
            <Image
              style={{
                width: "100%",
                height: 220,
                marginTop: -80,
                zIndex: 1,
                // borderBottomLeftRadius: 100,
                // borderBottomRightRadius: 100,
                backgroundColor: "#222222",
              }}
              resizeMode="contain"
              // source={CoachImage}
            />
          </View>
          <View
            style={{
              zIndex: 2,
              borderTopStartRadius: 100,
            }}
          >
            <View
              style={{
                flexDirection: "row",

                marginTop: -120,
              }}
            >
              <Icon
                raised
                name="long-arrow-left"
                type="font-awesome"
                color="black"
                size={20}
                containerStyle={{}}
                onPress={() => navigation.goBack()}
              />
              <Text
                style={[
                  styles.heading,
                  {
                    color: "white",
                    marginBottom: -10,
                    marginTop: 10,

                    fontStyle: "italic",
                  },
                ]}
              >
                #FitMorphs Join The Challenge {"\n"}
                {/* User Id: {user.uid} */}
              </Text>
            </View>

            <FlatList
              data={myData}
              renderItem={({ item }) => {
                Moment.locale("en");
                var dt = item.sDate;

                return (
                  <Card containerStyle={{ borderRadius: 30 }}>
                    <View
                      style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 20,
                      }}
                    >
                      <Card.Title style={styles.plannameh1}>
                        Testing Challenge
                      </Card.Title>
                      <Text
                        style={{
                          fontSize: 12,
                          marginTop: moderateScale(-10),
                          marginBottom: moderateScale(10),
                        }}
                      >
                        {Moment(dt).format("Do MMM YYYY")} -{" "}
                        {Moment(dt).format("Do MMM YYYY")}
                      </Text>

                      <Button
                        // title="₹  item.sPrice / month"
                        title="Participate Now"
                        buttonStyle={{
                          backgroundColor: "#252525",
                          borderWidth: 2,
                          borderColor: "white",
                          borderRadius: 10,
                          marginHorizontal: 5,
                        }}
                        containerStyle={{
                          width: "100%",
                        }}
                        titleStyle={{ fontWeight: "bold" }}
                      />
                    </View>

                    <Card.Title
                      style={{
                        marginVertical: moderateScale(10),
                        textAlign: "left",
                      }}
                    >
                      About
                    </Card.Title>
                    <Text style={{ flex: 1, paddingLeft: 5, fontSize: 12 }}>
                      {item.sAbout}
                    </Text>
                    <Text
                      style={{
                        textAlign: "left",
                        textDecorationLine: "underline",
                        fontWeight: "600",
                        marginTop: moderateScale(10),
                      }}
                    >
                      Rules and Regulations :
                    </Text>

                    <View
                      style={{
                        flexDirection: "row",
                        flex: 1,
                        justifyContent: "space-evenly",
                        marginTop: 10,
                        marginBottom: 20,
                      }}
                    ></View>
                  </Card>
                );
              }}
            />
          </View>
        </ScrollView>
        <View
          style={{
            backgroundColor: "#fff",
            paddingVertical: 20,
            paddingHorizontal: 25,
            zIndex: 3,
            elevation: 10,
          }}
        >
          <Button
            title="Participate"
            buttonStyle={{
              backgroundColor: "#E7AB2B",
              borderWidth: 2,
              borderColor: "white",
              borderRadius: 10,
              marginHorizontal: 5,
              padding: 10,
            }}
            containerStyle={{
              width: "100%",
            }}
            titleStyle={{ fontWeight: "bold" }}
          />
        </View>
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
  },
  plannameh1: {
    // color: '#585858',
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  plannameh3: {
    fontSize: 16,

    marginTop: 40,
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

export default Challenge;
