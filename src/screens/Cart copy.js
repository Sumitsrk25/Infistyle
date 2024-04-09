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
  Alert,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
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

const Cart = ({}) => {
  const [myData, setMyData] = useState([]);
  const [myData1, setMyData1] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const findUser = async () => {
    const result = await AsyncStorage.getItem("user_data");
    console.log(result);
    setUser(JSON.parse(result));
  };
  useEffect(() => {
    findUser();
  }, []);

  const navigation = useNavigation();

  const getTotalCartData = () => {
    axios
      .get("https://engistack.com/infistyle_reactapp/carttotal_user.php", {
        params: {
          iUserId: user.uid,
        },
      })
      .then((json) => setMyData1(json.data))
      .finally(() => setLoading(false));
  };

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

  //useFocusEffect(() => getCartData(), [user.uid]);

  useFocusEffect(
    React.useCallback(() => {
      getCartData();
      getTotalCartData();
      return () => null;
    }, [user.uid])
  );

  const deleteCartItem = (iCartId) => {
    try {
      Alert.alert("Warning", "Are you sure you want to delete from Cart ?", [
        {
          text: "Yes",
          onPress: async () => {
            const { data } = await axios.post(
              "https://engistack.com/infistyle_reactapp/cart_item_delete.php",
              {
                cartid: iCartId,
              }
            );

            console.log(data);
            // const userData = {
            //   email: data.data.sEmailId,
            //   uid: data.data.iUserId,

            //   // email: data.data.email,
            //   // uid: data.data.id,
            //   // uname: data.data.uname,
            // };

            if (data.status == "success") {
              //Alert.alert("Challenge Accepted");
              ToastAndroid.show(
                "Product Deleted From Cart!",
                ToastAndroid.LONG
              );
              handleRefresh();

              setLoading(true);
            } else {
              Alert.alert("Something Went Wrong !!");
            }
          },
        },
        {
          text: "No",
        },
      ]);
    } catch (err) {
      console.log(err);
    }
  };

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

  return (
    <>
      <Header3 />

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => handleRefresh()}
          />
        }
      >
        <View style={{ marginBottom: 100 }}>
          <Card containerStyle={{ borderRadius: 15 }}>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <FontAwesome
                name="shopping-cart"
                size={20}
                style={{ color: "#F6BB0A", marginRight: 50 }}
              />

              <Text style={styles.coachnameh3}>My Cart</Text>
              <FlatList
                data={myData1}
                keyExtractor={(item, index) => index.toString()} // Assuming each item has a unique index
                renderItem={({ item }) => (
                  <>
                    <View>
                      <Text>11{item.tblcarttotal}</Text>
                    </View>
                  </>
                )}
              />
            </View>
            <View style={{ display: "flex", flexDirection: "row" }}></View>
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
                                uri: `https://engistack.com/infistyle_reactapp/infipanel/admin/image/${item.prod_pic1}`,
                              }}
                              title="Infistyle"
                              containerStyle={{ backgroundColor: "grey" }}
                            />
                          </View>
                          <View>
                            <View
                              style={{ display: "flex", flexDirection: "row" }}
                            >
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
                              {/* <Icon
                                name="check"
                                type="font-awesome"
                                color="green"
                                size={18}
                                onPress={() => console.log("hello")}
                              /> */}
                            </View>
                            <View
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: 13,
                                  marginLeft: 20,
                                  marginRight: 10,
                                  fontWeight: "700",
                                }}
                              >
                                Quantity :
                              </Text>
                              <Text
                                style={{
                                  fontSize: 16,
                                  marginLeft: 20,
                                  marginRight: 10,
                                }}
                              >
                                {item.quantity}
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "flex-start",
                              }}
                            >
                              <LinearGradient
                                colors={["black", "black"]}
                                start={{ x: 0.3, y: 0.2 }}
                                end={{ x: 0.6, y: 0.8 }}
                                style={{
                                  borderRadius: 10,
                                  width: 120,
                                  fontSize: 12,
                                  marginVertical: 10,
                                  display: "flex",
                                  marginLeft: 10,
                                  alignItems: "center",
                                }}
                              >
                                <TouchableOpacity
                                  onPress={() => {
                                    //  setModalVisible(true);
                                    //  setPaymentDone(false);

                                    navigation.navigate("ProductPay", {
                                      iUserId: user.uid,
                                      product_id: item.product_id,
                                      quantity: item.quantity,
                                    });
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
                                      size={10}
                                      containerStyle={{}}
                                    />
                                    <Text
                                      style={{
                                        paddingHorizontal: 2,
                                        paddingVertical: 10,
                                        fontSize: 12,
                                        color: "white",
                                      }}
                                    >
                                      Buy{" "}
                                      {" ₹ " +
                                        item.product_amount * item.quantity}
                                    </Text>
                                  </View>
                                </TouchableOpacity>
                              </LinearGradient>

                              <TouchableOpacity
                                onPress={() => deleteCartItem(item.iCartId)}
                                style={{ marginLeft: 20 }}
                              >
                                <Icon
                                  raised
                                  name="trash"
                                  type="font-awesome"
                                  color="black"
                                  size={20}
                                  containerStyle={{}}
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </View>
                    );
                  }}
                />
              )}
            </View>
          </Card>
        </View>
      </ScrollView>
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

export default Cart;
