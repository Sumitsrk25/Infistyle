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
import { Dropdown } from "react-native-element-dropdown";
import { ImageSlider } from "react-native-image-slider-banner";

const ProductPay = ({ route, navigation }) => {
  const { product_amount } = route.params;

  const { iUserId } = route.params;
  const [isLoaded, setIsLoaded] = useState(true);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [myData, setMyData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isPaymentDone, setPaymentDone] = React.useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState("1"); // Set the default value to '1' or any other minimum value

  const [user, setUser] = useState({});

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
    setModalVisible(true);
  }, []);

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

    if (url === Strings.PAYMENT_END_FLOW2) {
      setModalVisible(false);
      Alert.alert("Hurrey 🎉 Payment Successful !! .");
      navigation.navigate("Orders");
    } else if (url === Strings.PAYMENT_SUCCESS2) {
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
              }
              setModalVisible(!modalVisible);
              navigation.navigate("Home");
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
                javaScriptCanOpenWindowsAutomatically={true}
                javaScriptEnabled={true}
                source={{
                  // uri: "https://engistack.com/infistyle_reactapp/pay.php",
                  uri: "https://engistack.com/infistyle_reactapp/payment/razorpayall/form.php",
                  method: "POST",
                  body: `iUserId=${iUserId}&ProductAmt=${product_amount}`,
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
                    navigation.navigate("Orders");
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
                                img: item.prod_pic1,
                              },
                              {
                                img: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/B99_Homepage-Banner_5_gyuQOiA.jpg?format=webp&w=1500&dpr=1.3",
                              },
                              {
                                img: "https://prod-img.thesouledstore.com/public/theSoul/uploads/themes/8914320230110194745.jpg?format=webp&w=1500&dpr=1.3",
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

export default ProductPay;
