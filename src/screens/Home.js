import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { Header, Icon, Card, Button } from "@rneui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { useNavigation, StackActions } from "@react-navigation/native";
import BackgroundImg from "../../assets/img/bgimg22.jpg";
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
import { ImageSlider } from "react-native-image-slider-banner";
import { Avatar } from "@rneui/base";
import Slider1 from "../../assets/img/Oversized_Homepaged.webp";
import CoachesCard from "./CoachesCard";
import Header2 from "../component/Header2";

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [myData, setMyData] = useState([]);
  const [myData1, setMyData1] = useState([]);
  const [myData2, setMyData2] = useState([]);
  const [user, setUser] = useState({});

  const findUser = async () => {
    const result = await AsyncStorage.getItem("user_data");
    console.log(result);
    setUser(JSON.parse(result));
  };
  useEffect(() => {
    findUser();
  }, []);

  const navigation = useNavigation();
  const getUserData = () => {
    axios
      .get("https://engistack.com/infistyle_reactapp/categorydata.php")
      //   .get("https://engistack.com/infistyle_reactapp/productall.php")
      .then((json) => setMyData(json.data))
      .finally(() => setIsLoaded(true));
  };

  const getProductTop = () => {
    axios
      .get("https://engistack.com/infistyle_reactapp/producttop.php", {})
      .then((json) => setMyData1(json.data))
      .finally(() => setIsLoaded(true));
  };

  const getProductNew = () => {
    axios
      .get("https://engistack.com/infistyle_reactapp/productnew.php", {})
      .then((json) => setMyData2(json.data))
      .finally(() => setIsLoaded(true));
  };

  // useEffect(() => getUserData(), []);
  // useEffect(() => getProductTop(), []);
  // useEffect(() => getProductTop(), []);

  useEffect(() => {
    getUserData();
    getProductTop();
    getProductNew();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loginUser = async (itemid) => {
    navigation.dispatch(
      // StackActions.replace("Home")  // Replace Login Page with Home Page , means redirect to Hoem Screen if Login
      navigation.navigate("BuyPlan")
    );
  };

  // render the students cards
  const showCatData = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          marginBottom: moderateScale(10),
          paddingHorizontal: moderateScale(5),
        }}
      >
        <View>
          {/* <TouchableOpacity onPress={() => loginUser(item.product_id)}> */}

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("BuyPlan", {
                iCategoryId: item.iCategoryId,
                sCategory: item.sCategory,
              })
            }
          >
            <View
              style={{
                display: "flex",
                width: 182,
                paddingHorizontal: 0,
                borderRadius: 10,
              }}
            >
              {/* <Text>{item.iCategoryId}</Text> */}
              <Card.Image
                style={{ width: "100%", height: 200 }}
                source={{
                  uri: item.sCategoryimage,
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaProvider style={styles.container}>
      {/* <SafeAreaProvider style={styles.container} source={BackgroundImg}> */}
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isLoaded ? (
          <ScrollView>
            <Header2 />

            {/* <View style={styles.customInputContainer}>
              <TextInput placeholder="Search" placeholderTextColor={"grey"} />
              <TouchableOpacity
                style={{ marginTop: moderateScale(10) }}
                onPress={() => loginUser()}
              >
                <FontAwesome
                  name="search"
                  size={20}
                  style={{ color: "#F6BB0A" }}
                />
              </TouchableOpacity>
            </View> */}

            <View
              style={{
                width: "100%",

                marginBottom: 20,

                alignSelf: "center",
                marginTop: moderateScale(10),
              }}
            >
              <ImageSlider
                data={[
                  {
                    img: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Web-banner1.jpg?format=webp&w=1500&dpr=1.3",
                  },
                  {
                    img: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/B99_Homepage-Banner_5_gyuQOiA.jpg?format=webp&w=1500&dpr=1.3",
                  },
                  {
                    img: "https://prod-img.thesouledstore.com/public/theSoul/uploads/themes/8914320230110194745.jpg?format=webp&w=1500&dpr=1.3",
                  },
                ]}
                caroselImageStyle={{
                  height: 200,

                  borderRadius: 10,
                }}
                autoPlay={false}
                preview={false}
                showIndicator={true}
                onItemChanged={(item) => console.log("item", item)}
                closeIconColor="#fff"
                timer={10000}
                indicatorContainerStyle={{ bottom: -15 }}
              ></ImageSlider>
            </View>

            <Text
              style={[
                styles.heading,
                {
                  marginVertical: moderateScale(10),
                  textAlign: "left",
                  marginHorizontal: moderateScale(20),
                },
              ]}
            >
              CATEGORIES
              {/* <Text style={{ fontSize: 20 }}>Email = {user.uid}</Text> */}
            </Text>

            <FlatList
              keyExtractor={(item) => item.iCategoryId}
              data={myData}
              renderItem={showCatData}
              numColumns={2}
            />

            <Text
              style={[
                styles.heading,
                {
                  marginTop: moderateScale(10),
                  textAlign: "left",
                  marginHorizontal: moderateScale(20),
                },
              ]}
            >
              NEW ARRIVALS
              {/* <Text style={{ fontSize: 20 }}>Email = {user.uid}</Text> */}
            </Text>

            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  marginBottom: moderateScale(10),
                  marginLeft: moderateScale(15),
                }}
              >
                <FlatList
                  horizontal
                  data={myData2}
                  renderItem={({ item }) => {
                    if (item.prod_stock == 0) {
                      //do something
                    } else {
                      return (
                        <View
                          style={{
                            marginRight: 0,
                            flexDirection: "row",
                            flex: 1,
                          }}
                        >
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate("ProductDetail", {
                                product_id: item.product_id,
                              })
                            }
                          >
                            <Card
                              containerStyle={{
                                height: 300,
                                marginLeft: -5,
                                borderRadius: 5,
                              }}
                            >
                              <View style={{ width: 140 }}>
                                <Card.Image
                                  style={{ width: "100%", height: 200 }}
                                  source={{
                                    uri: `https://engistack.com/infistyle_reactapp/infipanel/admin/image/${item.prod_pic1}`,
                                  }}
                                />
                              </View>
                              <View
                                style={{
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Text
                                  style={{
                                    fontSize: 12,
                                    fontWeight: "500",
                                    paddingTop: 10,
                                  }}
                                >
                                  {" ₹ " + item.product_amount}
                                </Text>
                                {/* <Text style={styles.categoryText}>
                                {item.product_name}
                              </Text> */}
                              </View>

                              <Text
                                style={{
                                  textAlign: "left",
                                  fontSize: 12,
                                  fontWeight: "500",
                                }}
                              >
                                {" "}
                                {item.product_name}
                              </Text>
                              <View
                                style={{
                                  flexDirection: "row",
                                  justifyContent: "center",
                                  marginTop: 10,
                                }}
                              >
                                {/* <TouchableOpacity
                                style={{
                                  borderWidth: 1,
                                  borderRadius: 10,
                                  borderColor: "grey",
                                  fontSize: 12,
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
                                    name="shopping-cart"
                                    type="Feather"
                                    color="black"
                                    size={12}
                                    containerStyle={{}}
                                  />
                                  <Text
                                    style={{
                                      padding: 7,
                                      paddingTop: 10,
                                      fontSize: 12,
                                    }}
                                  >
                                    Add to Cart
                                  </Text>
                                </View>
                              </TouchableOpacity> */}
                              </View>
                            </Card>
                            <TouchableOpacity
                              style={{
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                                backgroundColor: "#fff",
                                elevation: 5,
                                position: "absolute",
                                top: 20,
                                right: 25,
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <Image
                                source={require("../../assets/img/eye.png")}
                                style={{
                                  width: 24,
                                  height: 24,
                                }}
                              />
                            </TouchableOpacity>
                          </TouchableOpacity>
                        </View>
                      );
                    }
                  }}
                />
              </View>
            </ScrollView>

            <Text
              style={[
                styles.heading,
                {
                  marginTop: moderateScale(20),
                  textAlign: "left",
                  marginHorizontal: moderateScale(20),
                },
              ]}
            >
              TOP SELLING
              {/* <Text style={{ fontSize: 20 }}>Email = {user.uid}</Text> */}
            </Text>

            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{ marginBottom: 150 }}
            >
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  marginBottom: moderateScale(10),
                  marginLeft: moderateScale(15),
                }}
              >
                <FlatList
                  horizontal
                  data={myData1}
                  renderItem={({ item }) => {
                    if (item.prod_stock == 0) {
                      //do something
                    } else {
                      return (
                        <View
                          style={{
                            marginRight: 0,
                            flexDirection: "row",
                            flex: 1,
                          }}
                        >
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate("ProductDetail", {
                                product_id: item.product_id,
                              })
                            }
                          >
                            <Card
                              containerStyle={{
                                height: 300,
                                marginLeft: -5,
                                borderRadius: 5,
                              }}
                            >
                              <View style={{ width: 140 }}>
                                <Card.Image
                                  style={{ width: "100%", height: 200 }}
                                  source={{
                                    uri: `https://engistack.com/infistyle_reactapp/infipanel/admin/image/${item.prod_pic1}`,
                                  }}
                                />
                              </View>
                              <View
                                style={{
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Text
                                  style={{
                                    fontSize: 12,
                                    fontWeight: "500",
                                    paddingTop: 10,
                                  }}
                                >
                                  {" ₹ " + item.product_amount}
                                </Text>
                                {/* <Text style={styles.categoryText}>
                                  {item.product_name}
                                </Text> */}
                              </View>

                              <Text
                                style={{
                                  textAlign: "left",
                                  fontSize: 12,
                                  fontWeight: "500",
                                }}
                              >
                                {" "}
                                {item.product_name}
                              </Text>
                              <View
                                style={{
                                  flexDirection: "row",
                                  justifyContent: "center",
                                  marginTop: 10,
                                }}
                              >
                                {/* <TouchableOpacity
                                  style={{
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    borderColor: "grey",
                                    fontSize: 12,
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
                                      name="shopping-cart"
                                      type="Feather"
                                      color="black"
                                      size={12}
                                      containerStyle={{}}
                                    />
                                    <Text
                                      style={{
                                        padding: 7,
                                        paddingTop: 10,
                                        fontSize: 12,
                                      }}
                                    >
                                      Add to Cart
                                    </Text>
                                  </View>
                                </TouchableOpacity> */}
                              </View>
                            </Card>
                            <TouchableOpacity
                              style={{
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                                backgroundColor: "#fff",
                                elevation: 5,
                                position: "absolute",
                                top: 20,
                                right: 25,
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <Image
                                source={require("../../assets/img/eye.png")}
                                style={{
                                  width: 24,
                                  height: 24,
                                }}
                              />
                            </TouchableOpacity>
                          </TouchableOpacity>
                        </View>
                      );
                    }
                  }}
                />
              </View>
            </ScrollView>

            {/* <View
              style={{
                display: "flex",
                marginBottom: 30,
                paddingHorizontal: 20,
                marginTop: 30,
              }}
            >
              <Card.Image
                style={{ padding: 0, width: "100%" }}
                source={{
                  uri: "https://img.udaan.com/v1/f_auto,q_auto:eco,w_1600/u/merchandising/t1md9od81xeezy4ispip.jpg",
                }}
              />
            </View> */}

            {/* <Text
              style={[
                styles.heading,
                {
                  textAlign: "left",
                  marginHorizontal: moderateScale(20),
                },
              ]}
            >
              CELEBRITY CLOSETS
         
            </Text> */}

            {/* <View
              style={{
                display: "flex",
                marginBottom: 10,
                paddingHorizontal: 20,
                marginTop: 30,
              }}
            >
              <Card.Image
                style={{ padding: 0, width: "100%" }}
                source={{
                  uri: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Homepage_Banner_hardik_1.jpg?format=webp&w=1500&dpr=1.3",
                }}
              />
            </View> */}
            {/* 
            <View style={{ display: "flex", marginBottom: 120 }}>
              <Card>
                <Card.Image
                  style={{ padding: 0, width: "100%" }}
                  source={{
                    uri: "https://cdn.shopify.com/s/files/1/0337/9413/0052/files/customer-reviews-web.jpg?v=1671084256&width=2000",
                  }}
                />
              </Card>
            </View> */}

            {/* <Text
              style={[
                styles.heading,
                {
                  textAlign: "left",
                  marginHorizontal: moderateScale(20),
                },
              ]}
            >
              CELEBRITY CLOSETS
            </Text> */}

            {/* <View
              style={{
                display: "flex",
                marginBottom: 10,
                paddingHorizontal: 20,
                marginTop: 30,
              }}
            >
              <Card.Image
                style={{ padding: 0, width: "100%" }}
                source={{
                  uri: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Homepage_Banner_hardik_1.jpg?format=webp&w=1500&dpr=1.3",
                }}
              />
            </View> */}
          </ScrollView>
        ) : (
          <View>
            <ActivityIndicator size="large" color="#00ff00" />
            <Text style={styles.indicatorText}>Loading Styles...</Text>
          </View>
        )}
      </View>
    </SafeAreaProvider>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6fbf6",
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: "20@msr",
    width: "100%",
    paddingVertical: "15@msr",
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
    marginTop: "5@msr",
  },
  subheaderText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
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
  categoryText: {
    marginLeft: "3@msr",
    marginTop: "10@msr",
    fontSize: 12,
    textAlign: "center",
    fontWeight: "500",
  },
  coachname: {
    marginVertical: "20@msr",
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

export default Home;
