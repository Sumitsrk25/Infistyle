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
  Modal,
  Alert,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Header, Icon, Card, Tile, Input } from "@rneui/themed";
import { Button } from "@rneui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { RefreshControl } from "react-native";
import Header2 from "../component/Header2";
import { LinearGradient } from "expo-linear-gradient";
import WebView from "react-native-webview";
import { Strings } from "../constants";

const ProductDetail = ({ route, navigation }) => {
  const { product_id } = route.params;
  const [isLoaded, setIsLoaded] = useState(true);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [myData, setMyData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isPaymentDone, setPaymentDone] = React.useState(false);

  const [user, setUser] = useState({});

  const findUser = async () => {
    const result = await AsyncStorage.getItem("user_data");
    console.log(result);
    setUser(JSON.parse(result));
  };
  useEffect(() => {
    findUser();
  }, []);

  useEffect(() => {
    getUserData();
  }, [product_id]);
  const getUserData = () => {
    axios
      .get("https://engistack.com/infistyle_reactapp/product.php", {
        params: {
          product_id: product_id,
        },
      })
      .then((json) => setMyData(json.data))
      .finally(() => setIsLoaded(false));
  };

  const signupUser = async () => {
    try {
      const { data } = await axios.post(
        "https://engistack.com/infistyle_reactapp/add_cart.php",
        {
          product_id: product_id,
          uid: user.uid,
        }
      );

      console.log(data);
      const userData = {
        email: data.data.product_id,
        uid: data.data.iUserId,

        // email: data.data.email,
        // uid: data.data.id,
        // uname: data.data.uname,
      };

      if (data.status == "success") {
        //Alert.alert("Challenge Accepted");
        ToastAndroid.show("Product Added to Cart !", ToastAndroid.LONG);

        navigation.navigate("Cart");
      } else {
        Alert.alert("Sorry !! Product Not Added");
      }
    } catch (err) {
      console.log(err);
    }
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
    <SafeAreaProvider style={styles.container}>
      <View
        style={{
          flex: 1,
        }}
      >
        <Header2 />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={() => handleRefresh()}
            />
          }
        >
          {/* <Text
              style={[
                styles.heading,
                { marginVertical: 10, textAlign: "left", marginHorizontal: 20 },
              ]}
            >
              Personal Information
            </Text> */}
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
                  body: `iUserId=${user.uid}&ProductId=${product_id}`,
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
                    navigation.navigate("ProductDetail");
                  }}
                />
              )}
            </View>
          </Modal>
          <View>
            <FlatList
              data={myData}
              renderItem={({ item }) => {
                return (
                  <>
                    <View style={styles.container}>
                      <ScrollView>
                        <View
                          style={{
                            height: "100%",
                            width: "100%",
                          }}
                        >
                          <Image
                            style={{ width: "100%", height: 500 }}
                            source={{
                              uri: item.prod_pic1,
                            }}
                          />
                          <View
                            style={{ marginHorizontal: -15, marginTop: -20 }}
                          >
                            <Card>
                              <View
                                style={{
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  marginBottom: 20,
                                }}
                              >
                                <Text
                                  style={{
                                    fontWeight: "bold",
                                    fontSize: 20,
                                    color: "#58595B",
                                  }}
                                >
                                  {item.product_name}
                                </Text>
                                <Text
                                  style={{
                                    fontWeight: "500",

                                    fontWeight: "bold",
                                    fontSize: 18,
                                    color: "black",
                                  }}
                                >
                                  {" ₹ " + item.product_amount}
                                </Text>
                              </View>

                              <Text
                                style={[
                                  styles.categoryText,
                                  { marginBottom: 20 },
                                ]}
                              >
                                All Weather Tshirts
                              </Text>
                            </Card>
                          </View>

                          <View style={{ marginHorizontal: -15 }}>
                            <Card>
                              <View>
                                <Text
                                  style={{
                                    fontWeight: "bold",
                                    fontSize: 16,
                                    color: "#58595B",
                                    marginVertical: 10,
                                  }}
                                >
                                  Product Details
                                </Text>
                              </View>
                              <View style={{ marginVertical: 10 }}>
                                <Text
                                  style={{
                                    color: "#58595B",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Material & Care:
                                </Text>
                                <Text style={{ color: "#433F40" }}>
                                  100% Polyster
                                </Text>
                              </View>

                              <View style={{ marginVertical: 10 }}>
                                <Text
                                  style={{
                                    color: "#58595B",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Country of Origin:
                                </Text>
                                <Text style={{ color: "#433F40" }}>India </Text>
                              </View>

                              <View style={{ marginVertical: 10 }}>
                                <Text
                                  style={{
                                    color: "#58595B",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Manufactured & Sold By:
                                </Text>
                                <Text style={{ color: "#433F40" }}>
                                  The InfiStyle Pvt. Ltd. 224, NIBM Road,{"\n"}
                                  Kondwa Pune - 11
                                  {"\n"}
                                  connect@infistyle.com
                                </Text>
                              </View>
                            </Card>
                          </View>

                          <View style={{ marginHorizontal: -15 }}>
                            <Card>
                              <View>
                                <Text
                                  style={{
                                    fontWeight: "bold",
                                    fontSize: 16,
                                    color: "#58595B",
                                    marginVertical: 10,
                                  }}
                                >
                                  Product Description
                                </Text>
                              </View>
                              <View style={{ marginVertical: 10 }}>
                                <Text style={{ color: "#433F40" }}>
                                  {item.product_desc}
                                </Text>
                              </View>
                            </Card>
                          </View>
                        </View>
                      </ScrollView>
                    </View>
                  </>
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
            flexDirection: "row",
          }}
        >
          <Button
            title="Add To Cart"
            icon={{
              name: "shopping-cart",
              type: "Feather",
              size: 15,
              color: "black",
            }}
            iconLeft
            iconContainerStyle={{ marginLeft: 10 }}
            buttonStyle={{
              backgroundColor: "white",

              marginHorizontal: 5,
              padding: 10,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: "grey",
            }}
            containerStyle={{
              width: "50%",
            }}
            titleStyle={{ color: "black" }}
            onPress={() => signupUser()}
          />
          <Button
            onPress={() => {
              setModalVisible(true);
              setPaymentDone(false);
            }}
            title="Buy Now"
            buttonStyle={{
              backgroundColor: "orangered",
              borderWidth: 2,
              borderColor: "white",
              borderRadius: 10,
              marginHorizontal: 5,
              padding: 10,
            }}
            containerStyle={{
              width: "50%",
            }}
            titleStyle={{ fontWeight: "bold" }}
          />
        </View>

        {/* <View
          style={{
            backgroundColor: "#fff",
            paddingVertical: 20,
            paddingHorizontal: 25,
            zIndex: 3,
            elevation: 50,
            flexDirection: "row",
          }}
        >
          <Button
            onPress={() => {
              setModalVisible(true);
              setPaymentDone(false);
            }}
            title="Buy Now"
            icon={{
              name: "shopping-bag",
              type: "Feather",
              size: 15,
              color: "white",
            }}
            iconLeft
            buttonStyle={{
              backgroundColor: "orangered",
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
            ViewComponent={LinearGradient} // Don't forget this!
            linearGradientProps={{
              colors: ["#40afea", "#d63ba1"],
              start: { x: 0, y: 0.5 },
              end: { x: 1, y: 0.5 },
            }}
          />
        </View> */}
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6fbf6",
  },
  formContainer: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  formTopContainer: {
    flex: 1,
    // backgroundColor:"red",
    justifyContent: "space-between",
    paddingTop: 30,
    paddingLeft: 10,
    paddingRight: 10,

    marginLeft: 0,
  },
});

export default ProductDetail;
