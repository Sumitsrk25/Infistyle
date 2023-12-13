import { Tab, TabView, Icon, Card } from "@rneui/themed";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Modal,
  Alert,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

import { Button, Badge, Divider } from "@rneui/themed";
import CoachImage from "../../assets/img/coach1.jpg";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { Avatar } from "@rneui/base";
import Moment from "moment";
import { LinearGradient } from "expo-linear-gradient";
import WebView from "react-native-webview";
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
import Header3 from "../component/Header3";

const Stack = createNativeStackNavigator();

const Cart1 = ({ route }) => {
  const webViewRef = useRef();
  const { iUserId } = route.params;
  const { product_id } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [isPaymentDone, setPaymentDone] = React.useState(false);
  const [myData, setMyData] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [title, setTitle] = useState("");

  const findUser = async () => {
    const result = await AsyncStorage.getItem("user_data");
    console.log(result);
    setUser(JSON.parse(result));
  };
  useEffect(() => {
    findUser();
    setModalVisible(true);
  }, []);

  const navigation = useNavigation();
  const getCartData = () => {
    axios
      .get("https://engistack.com/infistyle_reactapp/cart_user.php", {
        params: {
          iUserId: user.uid,
        },
      })
      .then((json) => setMyData(json.data))
      .finally(() => setLoading(false));
  };

  const getUserData1 = () => {
    axios
      .post("https://engistack.com/infistyle_reactapp/pay.php", {
        params: {
          iUserId: user.uid,
        },
      })
      .then((json) => setMyData(json.data));
  };

  //useFocusEffect(() => getCartData(), [user.uid]);

  useFocusEffect(
    React.useCallback(() => {
      getCartData();

      return () => null;
    }, [user.uid])
  );

  const handleRefresh = async () => {
    console.log("function is calling");

    setIsRefreshing(true);

    getCartData(); // await means till it dowsnt get data it will not execute function below it

    setIsRefreshing(false);

    // setTimeout(() => {
    //   setIsRefreshing(false);
    //   //   console.log("function is ending");
    // }, 2000);
    console.log("function is ending");
  };

  const handleWebViewNavigationStateChange = (newNavState) => {
    const { url } = newNavState;
    console.log(url);
    if (url === Strings.PAYMENT_END_FLOW) {
      setModalVisible(false);
      navigation.navigate("Cart");
    } else if (url === Strings.PAYMENT_SUCCESS1) {
      setPaymentDone(true);
      navigation.navigate("Orders");
    }
  };

  return (
    <>
      <Header3 />

      <View
        style={{
          width: "100%",
          height: "90%",
        }}
      >
        {/*
                <WebView
                      source={{
                        uri: "https://engistack.com/instamojo/form.php",
                        method: "POST",
                        body: `iUserId=${user.uid}&Price=${item.sPrice}`,
                      }}
                    /> */}

        <WebView
          ref={webViewRef}
          originWhitelist={["*"]}
          source={{
            uri: "https://engistack.com/infistyle_reactapp/pay.php",
            method: "POST",
            body: `iUserId=${iUserId}&ProductId=${product_id}`,
          }}
          onNavigationStateChange={(newNavState) =>
            handleWebViewNavigationStateChange(newNavState)
          }
        />

        {isPaymentDone && (
          <Button
            title={"Order Placed Successfully !!"}
            buttonStyle={{
              // backgroundColor: Colors.green,
              backgroundColor: "#d63ba1",
              borderWidth: 2,
              borderColor: "white",
              borderRadius: 10,
              marginHorizontal: 5,
            }}
            titleStyle={{ fontWeight: "bold", fontSize: 20 }}
            onPress={() => {
              // setModalVisible(!modalVisible);
              // handleRefresh();
              navigation.navigate("Orders");
            }}
          />
        )}
      </View>

      <Card containerStyle={{ borderRadius: 15 }}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <FontAwesome
            name="shopping-cart"
            size={20}
            style={{ color: "#F6BB0A", marginRight: 50 }}
          />

          <Text style={styles.coachnameh3}>My Cart 1</Text>
        </View>
        {/* <Text
                style={{
                  textAlign: "left",
                  marginLeft: 60,
                  marginRight: 40,
                  marginTop: -10,
                  fontSize: 13,
                }}
              >
                Try it now by tapping on any nutrition plan below
              </Text> */}
      </Card>
      <Card containerStyle={{ borderRadius: 10 }}>
        <View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text
              style={{
                textAlign: "left",
                fontWeight: "600",
                marginTop: -10,
                fontSize: 16,
              }}
            ></Text>
          </View>
          {loading ? (
            <ActivityIndicator size="large" color="#00ff00" />
          ) : (
            <FlatList
              data={myData}
              renderItem={({ item }) => {
                Moment.locale("en");
                var dt = item.sDate;

                return (
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginVertical: 10,
                    }}
                  >
                    <View
                      style={{
                        flex: 2,
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <View style={{ marginLeft: 15 }}>
                        <Avatar
                          size={100}
                          source={{
                            uri: item.prod_pic1,
                          }}
                          title="Infistyle"
                          containerStyle={{ backgroundColor: "grey" }}
                        />
                      </View>
                      <View>
                        <View style={{ display: "flex", flexDirection: "row" }}>
                          <Text
                            style={{
                              fontSize: 16,
                              marginLeft: 20,
                              marginRight: 10,
                              fontWeight: "700",
                            }}
                          >
                            {item.product_name}
                          </Text>
                          <Icon
                            name="check"
                            type="font-awesome"
                            color="green"
                            size={18}
                            onPress={() => console.log("hello")}
                          />
                        </View>
                        <LinearGradient
                          colors={["black", "black"]}
                          start={{ x: 0.3, y: 0.2 }}
                          end={{ x: 0.6, y: 0.8 }}
                          style={{
                            borderRadius: 10,
                            width: 140,
                            fontSize: 12,
                            marginVertical: 10,
                            display: "flex",
                            marginLeft: 20,
                            alignItems: "center",
                          }}
                        >
                          <TouchableOpacity
                            onPress={() => {
                              setModalVisible(true);
                              setPaymentDone(false);
                              getUserData1();
                            }}
                          >
                            <View
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <Icon
                                raised
                                name="shopping-bag"
                                type="Feather"
                                color="black"
                                size={12}
                                containerStyle={{}}
                              />
                              <Text
                                style={{
                                  paddingHorizontal: 10,
                                  paddingVertical: 10,
                                  fontSize: 12,
                                  color: "white",
                                }}
                              >
                                Buy {" ₹ " + item.product_amount}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </LinearGradient>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          )}
        </View>
      </Card>
    </>
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
  vertical: {
    marginBottom: 10,

    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  horizontal: {
    marginBottom: 10,
  },
  coachnameh3: {
    fontSize: 16,
    fontWeight: "bold",
  },
  textStyle: {
    color: "red",
  },
  button_group: {
    width: "30%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  counter: {
    fontSize: 16,
    textAlign: "center",
    width: "100%",
    padding: 20,
  },

  commonButton: {
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#ffc964",
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 0,
  },
});

export default Cart1;
