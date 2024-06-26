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
import { Header, Icon, Card, Tile, Input, Dialog } from "@rneui/themed";
import { Button } from "@rneui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { RefreshControl } from "react-native";
import Header2 from "../component/Header2";
import { LinearGradient } from "expo-linear-gradient";
import WebView from "react-native-webview";
import { Strings } from "../constants";
import { Dropdown } from "react-native-element-dropdown";
import { ImageSlider } from "react-native-image-slider-banner";

const ProductDetail = ({ route, navigation }) => {
  const { product_id } = route.params;
  const [isLoaded, setIsLoaded] = useState(true);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [myData, setMyData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isPaymentDone, setPaymentDone] = React.useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState("1"); // Set the default value to '1' or any other minimum value

  const [visible2, setVisible2] = useState(false);

  const [user, setUser] = useState({});

  const toggleDialog2 = () => {
    setVisible2(!visible2);
  };

  const _renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {/* <Image style={styles.icon} source={require("../../assets/icon.png")} /> */}
      </View>
    );
  };

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
          quantity: selectedQuantity,
        }
      );

      console.log(data);

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

  const orderCod = async () => {
    try {
      const { data } = await axios.post(
        "https://engistack.com/infistyle_reactapp/payment/razorpay/user_orders.php",
        {
          iUserId: user.uid,
          product_id: product_id,
          quantity: selectedQuantity,
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
                          <ImageSlider
                            data={[
                              {
                                img: `https://engistack.com/infistyle_reactapp/infipanel/admin/image/${item.prod_pic1}`,
                              },
                              {
                                img: `https://engistack.com/infistyle_reactapp/infipanel/admin/image/${item.prod_pic2}`,
                              },
                              {
                                img: `https://engistack.com/infistyle_reactapp/infipanel/admin/image/${item.prod_pic3}`,
                              },
                            ]}
                            caroselImageStyle={{
                              height: 500,

                              borderRadius: 10,
                            }}
                            autoPlay={false}
                            preview={true}
                            showIndicator={true}
                            onItemChanged={(item) => console.log("item", item)}
                            closeIconColor="#fff"
                            timer={10000}
                            indicatorContainerStyle={{ bottom: -15 }}
                            previewImageStyle={{ height: 100, width: 100 }}
                          ></ImageSlider>
                          {/* <Image
                            style={{ width: "100%", height: 500 }}
                            source={{
                              uri: item.prod_pic1,
                            }}
                          /> */}
                          <View
                            style={{ marginHorizontal: -15, marginTop: -20 }}
                          >
                            <Card>
                              <View
                                style={{
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  marginBottom: 10,
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
                              <View style={{ marginBottom: 10 }}>
                                <Text
                                  style={{
                                    fontSize: 11,
                                    color: "#58595B",
                                    marginBottom: 4,
                                  }}
                                >
                                  Select Quantity
                                </Text>
                                <Dropdown
                                  style={styles.dropdown}
                                  containerStyle={styles.shadow}
                                  label="Dropdown"
                                  data={Array.from(
                                    { length: item.prod_stock },
                                    (_, i) => ({
                                      label: `${i + 1}`,
                                      value: `${i + 1}`,
                                    })
                                  )}
                                  // Populate dropdown data up to the maximum stock quantity
                                  onSelect={(value) =>
                                    setSelectedQuantity(value)
                                  }
                                  // Handle selection
                                  labelField="label"
                                  valueField="value"
                                  value={selectedQuantity}
                                  onChange={(item) => {
                                    setSelectedQuantity(item.value);
                                    console.log("selected", item);
                                  }}
                                  renderItem={(item) => _renderItem(item)}
                                  textError="Error"
                                />
                              </View>
                              <Text
                                style={[
                                  styles.categoryText,
                                  { marginBottom: 20 },
                                ]}
                              >
                                Size: {item.size}
                              </Text>
                              <Text
                                style={[
                                  styles.categoryText,
                                  { marginBottom: 20 },
                                ]}
                              >
                                {item.sCategory}
                              </Text>
                            </Card>
                          </View>

                          <View style={{ marginHorizontal: -15 }}>
                            <Card>
                              {/* Render the dropdown */}

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
                                <Text style={{ color: "#433F40" }}>
                                  {item.product_desc}
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
            onPress={toggleDialog2}
            // onPress={() => {
            //   //  setModalVisible(true);
            //   //  setPaymentDone(false);

            //   navigation.navigate("ProductPay", {
            //     iUserId: user.uid,
            //     product_id: product_id,
            //     quantity: selectedQuantity,
            //   });
            // }}
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

        <Dialog isVisible={visible2} onBackdropPress={toggleDialog2}>
          <Dialog.Title title="Buy Now" />
          <Text>Purchase by paying online or cash on delivery.</Text>
          <Dialog.Actions>
            <Dialog.Button
              title="Pay Online 💳"
              onPress={() => {
                //  setModalVisible(true);
                //  setPaymentDone(false);

                navigation.navigate("ProductPay", {
                  iUserId: user.uid,
                  product_id: product_id,
                  quantity: selectedQuantity,
                });
              }}
            />
            <Dialog.Button
              title="Cash On Delivery 🏠"
              onPress={() => orderCod()}
            />
          </Dialog.Actions>
        </Dialog>

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
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    customInputContainer: {
      marginVertical: 20,
      borderWidth: 2,
      borderColor: "#F6BB0A",
      height: 60,
      backgroundColor: "#fff",
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginBottom: 10,
      width: 100,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  dropdown: {
    backgroundColor: "white",
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    borderColor: "black",
    borderWidth: 0.5,
    paddingHorizontal: 10,
    width: "100%",
    borderRadius: 50,
  },
  item: {
    paddingVertical: 17,
    paddingHorizontal: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
});

export default ProductDetail;
