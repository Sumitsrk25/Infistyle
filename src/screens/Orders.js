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
  Alert,
  ToastAndroid,
  BackHandler,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Badge, Card, Icon } from "@rneui/themed";
import { useNavigation, StackActions } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
import Header2 from "../component/Header2";

const Orders = () => {
  const navigation = useNavigation();
  const [myData1, setMyData1] = useState([]);
  const [user, setUser] = useState({});
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const findUser = async () => {
    const result = await AsyncStorage.getItem("user_data");
    console.log(result);
    setUser(JSON.parse(result));
  };

  useEffect(() => {
    findUser();
  }, [user?.uid]);

  useEffect(() => {
    getUserData1();
  }, [user?.uid]);

  const getUserData1 = () => {
    axios
      .get("https://engistack.com/infistyle_reactapp/user_orders.php", {
        params: {
          iUserId: user.uid,
        },
      })
      .then((json) => setMyData1(json.data))
      .finally(() => setIsLoaded(false));
  };

  function handleBackButtonClick() {
    navigation.navigate("BottomNavigator");
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);

  const handleRefresh = async () => {
    console.log("function is calling");

    setIsRefreshing(true);

    getUserData1(); // await means till it dowsnt get data it will not execute function below it

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
          flexDirection: "row",
          backgroundColor: "black",
          marginTop: 30,
          height: 80,
        }}
      >
        <Icon
          raised
          name="long-arrow-left"
          type="font-awesome"
          color="black"
          size={20}
          containerStyle={{ marginTop: 20 }}
          onPress={() => navigation.navigate("BottomNavigator")}
        />
        <Text
          style={[
            styles.heading,
            {
              color: "white",

              marginTop: 28,
            },
          ]}
        >
          Orders
          {/* User Id: {user.uid} */}
        </Text>
      </View>
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

                marginTop: -180,
              }}
            ></View>

            <FlatList
              data={myData1}
              renderItem={({ item }) => {
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
                      <Text
                        style={{
                          fontSize: 12,
                          marginTop: moderateScale(-10),
                          marginBottom: moderateScale(10),
                        }}
                      >
                        Status
                      </Text>
                      <Card.Title style={styles.plannameh1}>
                        {item.status}
                      </Card.Title>

                      {/* <Image
                          style={{
                            width: "100%",
                            height: verticalScale(150),
                            marginBottom: moderateScale(30),
                            borderRadius: 10,
                          }}
                          resizeMode="contain"
                          source={{ uri: item.sImage }}
                        /> */}
                      {/* <Button
                        title="📄 View Invoice"
                        buttonStyle={{
                          backgroundColor: "#E7AB2B",
                          // backgroundColor: "#000000",
                          borderWidth: 2,
                          borderColor: "white",
                          borderRadius: 10,
                          marginHorizontal: 5,
                          padding: 10,
                        }}
                        containerStyle={{
                          width: "100%",
                        }}
                        titleStyle={{
                          fontWeight: "bold",
                        }}
                        onPress={() => signupUser()}
                      /> */}
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        flex: 1,
                        justifyContent: "space-evenly",
                        marginTop: 0,
                        marginBottom: 5,
                      }}
                    ></View>

                    <View style={{ marginVertical: 0 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          flex: 1,
                          marginBottom: 40,
                        }}
                      >
                        <View style={{ flex: 1 }}>
                          <Icon
                            name="clock-o"
                            type="font-awesome"
                            color="gray"
                            size={20}
                            style={{ justifyContent: "flex-start" }}
                          />
                        </View>

                        <View style={{ flex: 4 }}>
                          <Text style={{ marginLeft: 20 }}>Order Name:</Text>
                        </View>
                        <View style={{ flex: 4 }}>
                          <Text
                            style={{
                              position: "absolute",
                              left: 0,
                              fontWeight: "normal",
                            }}
                          >
                            {item.plan_name}
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          flex: 1,
                          marginBottom: 40,
                        }}
                      >
                        <View style={{ flex: 1 }}>
                          <Icon
                            name="clock-o"
                            type="font-awesome"
                            color="gray"
                            size={20}
                            style={{ justifyContent: "flex-start" }}
                          />
                        </View>

                        <View style={{ flex: 4 }}>
                          <Text style={{ marginLeft: 20 }}>Quantity:</Text>
                        </View>
                        <View style={{ flex: 4 }}>
                          <Text
                            style={{
                              position: "absolute",
                              left: 0,
                              fontWeight: "normal",
                            }}
                          >
                            {item.quantity}
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          flex: 1,
                          marginVertical: 10,
                        }}
                      >
                        <View style={{ flex: 1 }}>
                          <Icon
                            name="truck"
                            type="font-awesome"
                            color="gray"
                            size={20}
                            style={{ justifyContent: "flex-start" }}
                          />
                        </View>
                        <View style={{ flex: 4 }}>
                          <Text style={{ marginLeft: 20 }}>Order Type:</Text>
                        </View>
                        <View style={{ flex: 4 }}>
                          <Text
                            style={{
                              position: "absolute",
                              left: 0,
                              fontWeight: "normal",
                            }}
                          >
                            {item.order_type}
                          </Text>
                        </View>
                      </View>

                      {item.order_type === "COD" ? null : (
                        <View
                          style={{
                            flexDirection: "row",
                            flex: 1,
                            marginVertical: 10,
                          }}
                        >
                          <View style={{ flex: 1 }}>
                            <Icon
                              name="language"
                              type="font-awesome"
                              color="gray"
                              size={20}
                              style={{ justifyContent: "flex-start" }}
                            />
                          </View>
                          <View style={{ flex: 4 }}>
                            <Text style={{ marginLeft: 20 }}>
                              Order Id: {item.orderId}
                            </Text>
                          </View>

                          <View style={{ flex: 4 }}>
                            <Text
                              style={{
                                position: "absolute",
                                left: 0,
                                fontWeight: "normal",
                              }}
                            >
                              {item.pay_order_id}
                            </Text>
                          </View>
                        </View>
                      )}

                      <View
                        style={{
                          flexDirection: "row",
                          flex: 1,
                          marginVertical: 10,
                        }}
                      >
                        <View style={{ flex: 1 }}>
                          <Icon
                            name="graduation-cap"
                            type="font-awesome"
                            color="gray"
                            size={20}
                            style={{ justifyContent: "flex-start" }}
                          />
                        </View>
                        <View style={{ flex: 4 }}>
                          <Text style={{ marginLeft: 20 }}>Amount:</Text>
                        </View>
                        <View style={{ flex: 4 }}>
                          <Text
                            style={{
                              position: "absolute",
                              left: 0,
                              fontWeight: "bold",
                            }}
                          >
                            ₹ {item.amount}
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          flex: 1,
                          marginVertical: 10,
                        }}
                      >
                        <View style={{ flex: 1 }}>
                          <Icon
                            name="calendar-o"
                            type="font-awesome"
                            color="gray"
                            size={20}
                            style={{ justifyContent: "flex-start" }}
                          />
                        </View>
                        <View style={{ flex: 4 }}>
                          <Text style={{ marginLeft: 20 }}>Date:</Text>
                        </View>
                        <View style={{ flex: 4 }}>
                          <Text
                            style={{
                              position: "absolute",
                              left: 0,
                              fontWeight: "bold",
                            }}
                          >
                            {item.created_at}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </Card>
                );
              }}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaProvider>
  );
};

export default Orders;

const styles = StyleSheet.create({
  heading: {
    // color: '#585858',
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  plannameh1: {
    // color: '#585858',
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
});
