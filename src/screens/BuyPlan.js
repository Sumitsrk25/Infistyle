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
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { Avatar } from "@rneui/base";
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
import Slider2 from "../../assets/img/20200210140222.webp";
import Slider3 from "../../assets/img/20200210140222.webp";

const BuyPlan = ({ navigation, route }) => {
  const { iCategoryId } = route.params;
  const { sCategory } = route.params;

  const [myData, setMyData] = useState([]);
  const [user, setUser] = useState({});
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const month = " / month";
  const rs = " ₹ ";

  const getUserData = () => {
    axios
      .get("https://engistack.com/infistyle_reactapp/productall.php", {
        params: {
          iCategoryId: iCategoryId,
        },
      })
      //   .get("https://engistack.com/infistyle_reactapp/productall.php")
      .then((json) => setMyData(json.data))
      .finally(() => setIsLoaded(true));
  };

  useEffect(() => getUserData(), []);

  const signupUser = (product_id) => {
    try {
      onPress: async () => {
        const { data } = await axios.post(
          "https://engistack.com/infistyle_reactapp/add_cart.php",
          {
            product_id: product_id,
            uid: user.uid,
          }
        );

        console.log(data);

        if (data.status == "success") {
          //Alert.alert("Challenge Accepted");
          ToastAndroid.show("Product Added to Cart !", ToastAndroid.LONG);

          //navigation.navigate("Home");
        } else {
          Alert.alert("Sorry !! Product Not Added");
        }
      };
    } catch (err) {
      console.log(err);
    }
  };

  const handleRefresh = async () => {
    console.log("function is calling");

    setIsRefreshing(true);

    // setTimeout(() => {
    //   setIsRefreshing(false);
    //   //   console.log("function is ending");
    // }, 2000);
    console.log("function is ending");
  };

  // render the students cards
  const showCatData = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          marginBottom: moderateScale(10),
        }}
      >
        <View style={{ marginRight: 0 }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ProductDetail", {
                product_id: item.product_id,
              })
            }
          >
            <Card containerStyle={{ height: 350 }}>
              <View style={{ width: 140 }}>
                <Card.Image
                  style={{ width: "100%", height: 200 }}
                  source={{
                    uri: item.prod_pic1,
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
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
              </View>
              <Text style={styles.categoryText}>{item.product_name}</Text>
              <Text style={styles.categoryText}>Tshirts</Text>
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
                  onPress={() => signupUser(item.product_id)}
                >
                  <View style={{ display: "flex", flexDirection: "row" }}>
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
              onPress={() =>
                navigation.navigate("ProductDetail", {
                  product_id: item.product_id,
                })
              }
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
      </View>
    );
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
                height: 200,
                marginTop: -100,
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

                marginTop: -100,
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
                    marginBottom: 20,
                    marginTop: 10,

                    marginHorizontal: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  },
                ]}
              >
                INFISTYLE
                {"\n"} Choose Your Style
              </Text>
            </View>
          </View>

          <View style={{ marginVertical: moderateScale(-40) }}>
            <Image
              style={{
                width: "100%",
                height: 150,
                marginTop: 20,
                marginBottom: 50,
                borderRadius: 1,
                alignSelf: "center",
                zIndex: 5,
              }}
              resizeMode="contain"
              source={Slider2}
            />
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
            {sCategory} COLLECTION
            {/* <Text style={{ fontSize: 20 }}>Email = {user.uid}</Text> */}
          </Text>

          <FlatList
            keyExtractor={(item) => item.iCategoryId}
            data={myData}
            renderItem={showCatData}
            numColumns={2}
          />
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

export default BuyPlan;
