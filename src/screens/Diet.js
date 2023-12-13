import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { Header, Icon, Card, Button, Badge, Divider } from "@rneui/themed";
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
import Header2 from "../component/Header2";

const Diet = () => {
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
          <Header2 />

          <View style={styles.customInputContainer}>
            <TextInput
              placeholder="Enter Your Email"
              placeholderTextColor={"grey"}
            />
            <TouchableOpacity style={{ marginTop: moderateScale(10) }}>
              <FontAwesome
                name="search"
                size={20}
                style={{ color: "#F6BB0A" }}
              />
            </TouchableOpacity>
          </View>

          <Card containerStyle={{ borderRadius: 15 }}>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <FontAwesome
                name="lightbulb"
                size={20}
                style={{ color: "#F6BB0A", marginRight: 50 }}
              />

              <Card.Title style={styles.coachnameh3}>
                Your free plan is ready!
              </Card.Title>
            </View>
            <Text
              style={{
                textAlign: "left",
                marginLeft: 60,
                marginRight: 40,
                marginTop: -10,
                fontSize: 13,
              }}
            >
              Try it now by tapping on any nutrition plan below
            </Text>
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
                  Breakfast
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
                  (412.8 KCal)
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
                      size={50}
                      source={{
                        uri: "https://s3-ap-south-1.amazonaws.com/fooddata.image/16978_FT_D6D1C9BA-2888-4E40-823C-A9A897AC57ED_1635397967.jpeg",
                      }}
                      title="Bj"
                      containerStyle={{ backgroundColor: "grey" }}
                    />
                  </View>
                  <View>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <Text
                        style={{
                          fontFamily: "regular",
                          fontSize: 16,
                          marginLeft: 20,
                          marginRight: 10,
                          fontWeight: "700",
                        }}
                      >
                        Milk
                      </Text>
                      <Icon
                        name="dot-circle-o"
                        type="font-awesome"
                        color="green"
                        size={18}
                        onPress={() => console.log("hello")}
                      />
                    </View>
                    <View style={styles.vertical}>
                      <Text>150 ml</Text>
                      <Divider
                        orientation="vertical"
                        style={{ marginHorizontal: 10 }}
                      />
                      <Text> 88.5Kcal</Text>
                    </View>

                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                        marginLeft: 10,
                      }}
                    >
                      <Badge
                        value=" P: 4.5g "
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
                        value=" C: 7.5g "
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
                        value=" F: 4.5g "
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

              <View style={styles.horizontal}>
                <Divider />
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
                      size={50}
                      source={{
                        uri: "https://s3-ap-south-1.amazonaws.com/fooddata.image/16978_FT_F37F3A41-3CB1-4F5E-AA59-15C7CD1544AD_1632141172.jpeg",
                      }}
                      title="Bj"
                      containerStyle={{ backgroundColor: "grey" }}
                    />
                  </View>
                  <View>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <Text
                        style={{
                          fontFamily: "regular",
                          fontSize: 16,
                          marginLeft: 20,
                          marginRight: 10,
                          fontWeight: "700",
                        }}
                      >
                        Chicken
                      </Text>
                      <Icon
                        name="dot-circle-o"
                        type="font-awesome"
                        color="#f50"
                        size={18}
                        onPress={() => console.log("hello")}
                      />
                    </View>
                    <View style={styles.vertical}>
                      <Text>150 ml</Text>
                      <Divider
                        orientation="vertical"
                        style={{ marginHorizontal: 10 }}
                      />
                      <Text> 88.5Kcal</Text>
                    </View>

                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                        marginLeft: 10,
                      }}
                    >
                      <Badge
                        value=" P: 4.5g "
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
                        value=" C: 7.5g "
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
                        value=" F: 4.5g "
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

              <View style={styles.horizontal}>
                <Divider />
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
                      size={50}
                      source={{
                        uri: "https://s3-ap-south-1.amazonaws.com/fooddata.image/10525.jpg",
                      }}
                      title="Bj"
                      containerStyle={{ backgroundColor: "grey" }}
                    />
                  </View>
                  <View>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <Text
                        style={{
                          fontFamily: "regular",
                          fontSize: 16,
                          marginLeft: 20,
                          marginRight: 10,
                          fontWeight: "700",
                        }}
                      >
                        Coconut Chutney
                      </Text>
                      <Icon
                        name="dot-circle-o"
                        type="font-awesome"
                        color="green"
                        size={18}
                        onPress={() => console.log("hello")}
                      />
                    </View>
                    <View style={styles.vertical}>
                      <Text>150 ml</Text>
                      <Divider
                        orientation="vertical"
                        style={{ marginHorizontal: 10 }}
                      />
                      <Text> 88.5Kcal</Text>
                    </View>

                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                        marginLeft: 10,
                      }}
                    >
                      <Badge
                        value=" P: 4.5g "
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
                        value=" C: 7.5g "
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
                        value=" F: 4.5g "
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

              <View style={styles.horizontal}>
                <Divider />
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
                  Lunch
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
                  (412.8 KCal)
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
                      size={50}
                      source={{
                        uri: "https://s3-ap-south-1.amazonaws.com/fooddata.image/16978_FT_D6D1C9BA-2888-4E40-823C-A9A897AC57ED_1635397967.jpeg",
                      }}
                      title="Bj"
                      containerStyle={{ backgroundColor: "grey" }}
                    />
                  </View>
                  <View>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <Text
                        style={{
                          fontFamily: "regular",
                          fontSize: 16,
                          marginLeft: 20,
                          marginRight: 10,
                          fontWeight: "700",
                        }}
                      >
                        Milk
                      </Text>
                      <Icon
                        name="dot-circle-o"
                        type="font-awesome"
                        color="green"
                        size={18}
                        onPress={() => console.log("hello")}
                      />
                    </View>
                    <View style={styles.vertical}>
                      <Text>150 ml</Text>
                      <Divider
                        orientation="vertical"
                        style={{ marginHorizontal: 10 }}
                      />
                      <Text> 88.5Kcal</Text>
                    </View>

                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                        marginLeft: 10,
                      }}
                    >
                      <Badge
                        value=" P: 4.5g "
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
                        value=" C: 7.5g "
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
                        value=" F: 4.5g "
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

              <View style={styles.horizontal}>
                <Divider />
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
                      size={50}
                      source={{
                        uri: "https://s3-ap-south-1.amazonaws.com/fooddata.image/16978_FT_F37F3A41-3CB1-4F5E-AA59-15C7CD1544AD_1632141172.jpeg",
                      }}
                      title="Bj"
                      containerStyle={{ backgroundColor: "grey" }}
                    />
                  </View>
                  <View>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <Text
                        style={{
                          fontFamily: "regular",
                          fontSize: 16,
                          marginLeft: 20,
                          marginRight: 10,
                          fontWeight: "700",
                        }}
                      >
                        Chicken
                      </Text>
                      <Icon
                        name="dot-circle-o"
                        type="font-awesome"
                        color="#f50"
                        size={18}
                        onPress={() => console.log("hello")}
                      />
                    </View>
                    <View style={styles.vertical}>
                      <Text>150 ml</Text>
                      <Divider
                        orientation="vertical"
                        style={{ marginHorizontal: 10 }}
                      />
                      <Text> 88.5Kcal</Text>
                    </View>

                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                        marginLeft: 10,
                      }}
                    >
                      <Badge
                        value=" P: 4.5g "
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
                        value=" C: 7.5g "
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
                        value=" F: 4.5g "
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

              <View style={styles.horizontal}>
                <Divider />
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
                      size={50}
                      source={{
                        uri: "https://s3-ap-south-1.amazonaws.com/fooddata.image/10525.jpg",
                      }}
                      title="Bj"
                      containerStyle={{ backgroundColor: "grey" }}
                    />
                  </View>
                  <View>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <Text
                        style={{
                          fontFamily: "regular",
                          fontSize: 16,
                          marginLeft: 20,
                          marginRight: 10,
                          fontWeight: "700",
                        }}
                      >
                        Coconut Chutney
                      </Text>
                      <Icon
                        name="dot-circle-o"
                        type="font-awesome"
                        color="green"
                        size={18}
                        onPress={() => console.log("hello")}
                      />
                    </View>
                    <View style={styles.vertical}>
                      <Text>150 ml</Text>
                      <Divider
                        orientation="vertical"
                        style={{ marginHorizontal: 10 }}
                      />
                      <Text> 88.5Kcal</Text>
                    </View>

                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                        marginLeft: 10,
                      }}
                    >
                      <Badge
                        value=" P: 4.5g "
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
                        value=" C: 7.5g "
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
                        value=" F: 4.5g "
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

              <View style={styles.horizontal}>
                <Divider />
              </View>
            </View>
          </Card>
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

export default Diet;
