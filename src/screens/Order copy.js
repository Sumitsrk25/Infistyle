import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import {
  Header,
  Icon,
  Card,
  Button,
  Badge,
  Divider,
  Tab,
  TabView,
  Text,
} from "@rneui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import FontAwesome from "react-native-vector-icons/FontAwesome5";

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
import { Avatar } from "@rneui/base";
import Slider1 from "../../assets/img/slider1.png";
import CoachesCard from "./CoachesCard";
import Header3 from "../component/Header3";

const Order = () => {
  const [index, setIndex] = React.useState(0);
  return (
    <SafeAreaProvider style={styles.container}>
      <View
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
        }}
      >
        <ScrollView>
          <Header3 />

          <Tab
            value={index}
            onChange={(e) => setIndex(e)}
            indicatorStyle={{
              backgroundColor: "white",
              height: 3,
            }}
            variant="primary"
          >
            <Tab.Item
              title="Recent"
              titleStyle={{ fontSize: 12 }}
              icon={{ name: "timer", type: "ionicon", color: "white" }}
            />
            <Tab.Item
              title="favorite"
              titleStyle={{ fontSize: 12 }}
              icon={{ name: "heart", type: "ionicon", color: "white" }}
            />
            <Tab.Item
              title="cart"
              titleStyle={{ fontSize: 12 }}
              icon={{ name: "cart", type: "ionicon", color: "white" }}
            />
          </Tab>

          <TabView value={index} onChange={setIndex} animationType="spring">
            <TabView.Item style={{ backgroundColor: "red", width: "100%" }}>
              <Text h1 style="marginTop: 100">
                Recent
              </Text>
            </TabView.Item>
            <TabView.Item style={{ backgroundColor: "blue", width: "100%" }}>
              <Text h1>Favorite</Text>
            </TabView.Item>
            <TabView.Item style={{ backgroundColor: "green", width: "100%" }}>
              <Text h1>Cart</Text>
            </TabView.Item>
          </TabView>

          <View style={{ marginBottom: 100 }}>
            <Card containerStyle={{ borderRadius: 15 }}>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <FontAwesome
                  name="shopping-cart"
                  size={20}
                  style={{ color: "#F6BB0A", marginRight: 50 }}
                />

                <Text style={styles.coachnameh3}>Order History</Text>
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
                  >
                    Delivered
                  </Text>
                  <Text
                    style={{
                      textAlign: "left",
                      fontSize: 14,
                      fontWeight: "400",
                      marginLeft: 20,
                      marginTop: -8,
                    }}
                  >
                    (6 Items)
                  </Text>
                </View>

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
                          uri: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1674455643_2017557.jpg?format=webp&w=480&dpr=1.3",
                        }}
                        title="Bj"
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
                          Solid Red T-Shirt
                        </Text>
                        <Icon
                          name="check"
                          type="font-awesome"
                          color="green"
                          size={18}
                          onPress={() => console.log("hello")}
                        />
                      </View>
                      <View style={styles.vertical}>
                        <Text>6 Items</Text>
                        <Divider
                          orientation="vertical"
                          style={{ marginHorizontal: 10 }}
                        />
                        <Text> 2 days ago</Text>
                      </View>

                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          marginLeft: 10,
                        }}
                      >
                        <Badge
                          value="1st April 2023 "
                          status="grey5"
                          textStyle={{
                            fontWeight: "bold",
                            fontSize: 10,
                            color: "black",
                          }}
                          badgeStyle={{
                            borderRadius: 5,
                          }}
                          containerStyle={{
                            marginHorizontal: 10,
                          }}
                        />
                        <Badge
                          value="Delivered "
                          status="grey5"
                          textStyle={{
                            fontWeight: "bold",
                            fontSize: 10,
                            color: "black",
                          }}
                          badgeStyle={{
                            borderRadius: 5,
                          }}
                          containerStyle={{
                            marginHorizontal: 10,
                          }}
                        />
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      marginRight: 10,
                    }}
                  ></View>
                </View>
              </View>
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
                  >
                    Processing
                  </Text>
                  <Text
                    style={{
                      textAlign: "left",
                      fontSize: 14,
                      fontWeight: "400",
                      marginLeft: 20,
                      marginTop: -8,
                    }}
                  >
                    (12 Items)
                  </Text>
                </View>

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
                          uri: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1677925711_9331734.jpg?format=webp&w=480&dpr=1.3",
                        }}
                        title="Bj"
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
                          Superman: Logo
                        </Text>
                        <Icon
                          name="check"
                          type="font-awesome"
                          color="orange"
                          size={18}
                          onPress={() => console.log("hello")}
                        />
                      </View>
                      <View style={styles.vertical}>
                        <Text>12 Items</Text>
                        <Divider
                          orientation="vertical"
                          style={{ marginHorizontal: 10 }}
                        />
                        <Text> 1 days ago</Text>
                      </View>

                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          marginLeft: 10,
                        }}
                      >
                        <Badge
                          value="2nd April 2023 "
                          status="grey5"
                          textStyle={{
                            fontWeight: "bold",
                            fontSize: 10,
                            color: "black",
                          }}
                          badgeStyle={{
                            borderRadius: 5,
                          }}
                          containerStyle={{
                            marginHorizontal: 10,
                          }}
                        />
                        <Badge
                          value="Processing "
                          status="grey5"
                          textStyle={{
                            fontWeight: "bold",
                            fontSize: 10,
                            color: "black",
                          }}
                          badgeStyle={{
                            borderRadius: 5,
                          }}
                          containerStyle={{
                            marginHorizontal: 10,
                          }}
                        />
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      marginRight: 10,
                    }}
                  ></View>
                </View>
              </View>
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
                  >
                    Shipping
                  </Text>
                  <Text
                    style={{
                      textAlign: "left",
                      fontSize: 14,
                      fontWeight: "400",
                      marginLeft: 20,
                      marginTop: -8,
                    }}
                  >
                    (20 Items)
                  </Text>
                </View>

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
                          uri: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1663569993_3035765.jpg?format=webp&w=480&dpr=1.3",
                        }}
                        title="Bj"
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
                          Garfield
                        </Text>
                        <Icon
                          name="check"
                          type="font-awesome"
                          color="green"
                          size={18}
                          onPress={() => console.log("hello")}
                        />
                      </View>
                      <View style={styles.vertical}>
                        <Text>12 Items</Text>
                        <Divider
                          orientation="vertical"
                          style={{ marginHorizontal: 10 }}
                        />
                        <Text> 3 days ago</Text>
                      </View>

                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          marginLeft: 10,
                        }}
                      >
                        <Badge
                          value="2nd April 2023 "
                          status="grey5"
                          textStyle={{
                            fontWeight: "bold",
                            fontSize: 10,
                            color: "black",
                          }}
                          badgeStyle={{
                            borderRadius: 5,
                          }}
                          containerStyle={{
                            marginHorizontal: 10,
                          }}
                        />
                        <Badge
                          value="Shipping "
                          status="grey5"
                          textStyle={{
                            fontWeight: "bold",
                            fontSize: 10,
                            color: "black",
                          }}
                          badgeStyle={{
                            borderRadius: 5,
                          }}
                          containerStyle={{
                            marginHorizontal: 10,
                          }}
                        />
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      marginRight: 10,
                    }}
                  ></View>
                </View>
              </View>
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
                  >
                    Delivered
                  </Text>
                  <Text
                    style={{
                      textAlign: "left",
                      fontSize: 14,
                      fontWeight: "400",
                      marginLeft: 20,
                      marginTop: -8,
                    }}
                  >
                    (20 Items)
                  </Text>
                </View>

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
                          uri: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1663569684_4684702.jpg?format=webp&w=480&dpr=1.3",
                        }}
                        title="Bj"
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
                          The Simpsons
                        </Text>
                        <Icon
                          name="check"
                          type="font-awesome"
                          color="green"
                          size={18}
                          onPress={() => console.log("hello")}
                        />
                      </View>
                      <View style={styles.vertical}>
                        <Text>40 Items</Text>
                        <Divider
                          orientation="vertical"
                          style={{ marginHorizontal: 10 }}
                        />
                        <Text> 2 days ago</Text>
                      </View>

                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          marginLeft: 10,
                        }}
                      >
                        <Badge
                          value="2nd April 2023 "
                          status="grey5"
                          textStyle={{
                            fontWeight: "bold",
                            fontSize: 10,
                            color: "black",
                          }}
                          badgeStyle={{
                            borderRadius: 5,
                          }}
                          containerStyle={{
                            marginHorizontal: 10,
                          }}
                        />
                        <Badge
                          value="Delivered "
                          status="grey5"
                          textStyle={{
                            fontWeight: "bold",
                            fontSize: 10,
                            color: "black",
                          }}
                          badgeStyle={{
                            borderRadius: 5,
                          }}
                          containerStyle={{
                            marginHorizontal: 10,
                          }}
                        />
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      marginRight: 10,
                    }}
                  ></View>
                </View>
              </View>
            </Card>
          </View>
        </ScrollView>
      </View>
    </SafeAreaProvider>
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
});

export default Order;
