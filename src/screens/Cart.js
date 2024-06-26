import { Tab, TabView, Icon, Card } from "@rneui/themed";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  ScrollView,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Alert,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

import { Button, Badge, Divider, Dialog } from "@rneui/themed";
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
import { Strings } from "../constants";
import WebView from "react-native-webview";

const Stack = createNativeStackNavigator();

const Cart = ({}) => {
  const [myData, setMyData] = useState([]);
  const [cartTotal, setCartTotal] = useState(null);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isPaymentDone, setPaymentDone] = React.useState(false);

  const toggleDialog1 = () => {
    setVisible1(!visible1);
  };
  const toggleDialog2 = () => {
    setVisible2(!visible2);
  };

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

      .then((response) => {
        console.log("API Response:", response.data);

        setCartTotal(response.data.tblcarttotal);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
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

  const orderCod = async (product_id, quantity, iCartId) => {
    try {
      const { data } = await axios.post(
        "https://engistack.com/infistyle_reactapp/payment/razorpay/user_orders.php",
        {
          iUserId: user.uid,
          product_id: product_id,
          quantity: quantity,
          iCartId: iCartId,
        }
      );

      console.log(data);

      if (data.status == "success") {
        //Alert.alert("Challenge Accepted");
        ToastAndroid.show(
          "Product Purchased - Cash on Delivery !",
          ToastAndroid.LONG
        );

        navigation.navigate("Orders");
      } else {
        Alert.alert("Sorry !! Product Not Purchased");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const orderCod1 = () => {
    console.log("Request sent with data:", { iUserId: user.uid });

    // Create the data object to be sent in the request body
    const data = {
      iUserId: user.uid,
    };

    // Configure the fetch request
    fetch(
      "https://engistack.com/infistyle_reactapp/payment/razorpayall/user_orders.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => {
        // Check if the response is ok (status code 200)
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Parse the response as JSON
        return response.json();
      })
      .then((data) => {
        console.log(data);

        if (data.status === "success") {
          ToastAndroid.show(
            "Product Purchased - Cash on Delivery !",
            ToastAndroid.LONG
          );
          navigation.navigate("Orders");
        } else {
          Alert.alert("Sorry !! Product Not Purchased");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleRefresh = async () => {
    console.log("function is calling");

    setIsRefreshing(true);
    getTotalCartData();
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

    if (url === Strings.PAYMENT_END_FLOW) {
      setModalVisible(false);
    } else if (url === Strings.PAYMENT_SUCCESS1) {
      setPaymentDone(true);
      navigation.navigate("Orders");
    }
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
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            if (!isPaymentDone) {
              Alert.alert("Payment Cancelled. Please Try Again !! .");
              navigation.navigate("ProductDetail");
            }
            setModalVisible(!modalVisible);
            handleRefresh();
          }}
        >
          <View
            style={{
              width: "100%",
              height: "100%",
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
              source={{
                uri: "https://engistack.com/infistyle_reactapp/pay.php",
                method: "POST",
                body: `iUserId=${user.uid}`,
              }}
              onNavigationStateChange={(newNavState) =>
                handleWebViewNavigationStateChange(newNavState)
              }
            />
            {isPaymentDone && (
              <Button
                title={"Order Placed Successfully !!"}
                buttonStyle={{
                  backgroundColor: "#d63ba1",
                  borderWidth: 2,
                  borderColor: "white",
                  borderRadius: 10,
                  marginHorizontal: 5,
                }}
                titleStyle={{ fontWeight: "bold" }}
                onPress={() => {
                  // setModalVisible(!modalVisible);
                  // handleRefresh();
                  navigation.navigate("Cart");
                }}
              />
            )}
          </View>
        </Modal>

        <View style={{ marginBottom: 100 }}>
          <Card containerStyle={{ borderRadius: 15 }}>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <FontAwesome
                name="shopping-cart"
                size={20}
                style={{ color: "#F6BB0A", marginRight: 50 }}
              />

              <Text style={styles.coachnameh3}>My Cart</Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {cartTotal !== null && cartTotal !== undefined ? (
                <LinearGradient
                  colors={["orangered", "orangered"]}
                  start={{ x: 0.3, y: 0.2 }}
                  end={{ x: 0.6, y: 0.8 }}
                  style={{
                    borderRadius: 10,
                    height: 50,
                    paddingHorizontal: 20,
                    paddingVertical: 5,
                    fontSize: 12,
                    marginVertical: 10,
                  }}
                >
                  <TouchableOpacity onPress={toggleDialog2}>
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
                          fontSize: 15,
                          fontWeight: "bold",
                          color: "white",
                        }}
                      >
                        Proceed to Buy All:{" ₹ " + cartTotal}
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <Dialog isVisible={visible2} onBackdropPress={toggleDialog2}>
                    <Dialog.Title title="Buy Now" />
                    <Text>Purchase by paying online or cash on delivery.</Text>
                    <Dialog.Actions>
                      <Dialog.Button
                        title="Pay Online 💳"
                        onPress={() => {
                          //  setModalVisible(true);
                          //  setPaymentDone(false);

                          navigation.navigate("ProductPay1", {
                            iUserId: user.uid,
                            product_amount: cartTotal,
                          });
                        }}
                      />
                      <Dialog.Button
                        title="Cash On Delivery 🏠"
                        onPress={() => orderCod1()}
                      />
                    </Dialog.Actions>
                  </Dialog>
                </LinearGradient>
              ) : (
                <Text></Text>
              )}
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
                        <Dialog
                          isVisible={visible1}
                          onBackdropPress={toggleDialog1}
                        >
                          <Dialog.Title title="Buy Now" />
                          <Text>
                            Purchase by paying online or cash on delivery.
                          </Text>
                          <Dialog.Actions>
                            <Dialog.Button
                              title="Pay Online 💳"
                              onPress={() => {
                                navigation.navigate("ProductPay", {
                                  iUserId: user.uid,
                                  product_id: item.product_id,
                                  quantity: item.quantity,
                                });
                              }}
                            />
                            <Dialog.Button
                              title="Cash On Delivery 🏠"
                              onPress={() =>
                                orderCod(
                                  item.product_id,
                                  item.quantity,
                                  item.iCartId
                                )
                              }
                            />
                          </Dialog.Actions>
                        </Dialog>

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
                                  onPress={toggleDialog1}
                                  // onPress={() => {
                                  //   navigation.navigate("ProductPay", {
                                  //     iUserId: user.uid,
                                  //     product_id: item.product_id,
                                  //     quantity: item.quantity,
                                  //   });
                                  // }}
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
