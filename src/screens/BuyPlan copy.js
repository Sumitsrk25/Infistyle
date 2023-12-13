import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";

import { Header, Icon, Card, Tile, Input } from "@rneui/themed";
import { Button, Badge } from "@rneui/themed";
import CoachImage from "../../assets/img/coach1.jpg";
import { SafeAreaProvider } from "react-native-safe-area-context";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { Avatar } from "@rneui/base";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BuyPlan = ({ navigation, route }) => {
  const { iCategoryId } = route.params;

  const [user, setUser] = useState({});

  const findUser = async () => {
    const result = await AsyncStorage.getItem("user_data");
    console.log(result);
    setUser(JSON.parse(result));
  };

  useEffect(() => {
    findUser();
  }, []);

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
        <ScrollView>
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
            <Text
              style={[
                styles.heading,
                {
                  marginTop: -100,
                  textAlign: "center",
                  color: "white",
                  marginBottom: 20,
                },
              ]}
            >
              Subscription Detail
            </Text>

            <Card containerStyle={{ borderRadius: 30 }}>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 20,
                }}
              >
                <Card.Title style={styles.plannameh1}>
                  Caterory Id Params {iCategoryId}
                  Category = {user.sCategory}
                  {"\n"} 12 Week Transformation Package
                  <Text style={styles.mainHeader}>
                    {"\n"} Id = {user.iCategoryId}🙌
                    {"\n"} UserId = {user.iUserId}🙌
                  </Text>
                </Card.Title>
                <Button
                  title="₹ 1999 / month"
                  buttonStyle={{
                    backgroundColor: "#252525",
                    borderWidth: 2,
                    borderColor: "white",
                    borderRadius: 10,
                    marginHorizontal: 5,
                  }}
                  containerStyle={{
                    width: "100%",
                  }}
                  titleStyle={{ fontWeight: "bold" }}
                />
              </View>

              <Card.Title style={styles.plannameh3}>
                Fitness and Nutrition Coaching
              </Card.Title>
              <Text
                style={{
                  textAlign: "left",
                  textDecorationLine: "underline",
                  fontWeight: "600",
                }}
              >
                Includes :
              </Text>
              <View style={{ marginTop: 20 }}>
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 10,
                  }}
                >
                  <Icon
                    name="check-circle"
                    type="font-awesome"
                    color="green"
                    size={16}
                    style={{
                      justifyContent: "flex-start",
                      paddingTop: 4,
                      marginRight: 10,
                    }}
                  />
                  <Text style={{ flex: 1, paddingLeft: 5 }}>
                    Internationally Certified Coaches
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 10,
                  }}
                >
                  <Icon
                    name="check-circle"
                    type="font-awesome"
                    color="green"
                    size={16}
                    style={{
                      justifyContent: "flex-start",
                      paddingTop: 4,
                      marginRight: 10,
                    }}
                  />
                  <Text style={{ flex: 1, paddingLeft: 5 }}>
                    Personalized Nutrition & Training Consultation for 2 people:
                    This includes diet plans, training programs, and complete
                    guidance for the duration of the package
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 10,
                  }}
                >
                  <Icon
                    name="check-circle"
                    type="font-awesome"
                    color="green"
                    size={16}
                    style={{
                      justifyContent: "flex-start",
                      paddingTop: 4,
                      marginRight: 10,
                    }}
                  />
                  <Text style={{ flex: 1, paddingLeft: 5 }}>
                    Weekly Monitoring: Fix in-depth weekly calls at your
                    convenience to discuss your progress and receive course
                    corrections, if needed
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 10,
                  }}
                >
                  <Icon
                    name="check-circle"
                    type="font-awesome"
                    color="green"
                    size={16}
                    style={{
                      justifyContent: "flex-start",
                      paddingTop: 4,
                      marginRight: 10,
                    }}
                  />
                  <Text style={{ flex: 1, paddingLeft: 5 }}>
                    Continuous Support: Your Coach is just a phone call or
                    message away (Note: Sundays closed).
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  justifyContent: "space-evenly",
                  marginTop: 10,
                  marginBottom: 20,
                }}
              ></View>

              {/* <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                }}
              >
                 <Button
                  title="Book"
                  buttonStyle={{
                    backgroundColor: "black",
                    borderWidth: 2,
                    borderColor: "white",
                    borderRadius: 10,
                    marginHorizontal: 5,
                  }}
                  containerStyle={{
                    width: "50%",

                    marginVertical: 10,
                  }}
                  titleStyle={{ fontWeight: "bold" }}
                /> 
              </View> */}
            </Card>
          </View>
        </ScrollView>
        <View
          style={{
            backgroundColor: "#fff",
            paddingVertical: 20,
            paddingHorizontal: 25,
            zIndex: 3,
            elevation: 10,
          }}
        >
          <Button
            title="Proceed"
            buttonStyle={{
              backgroundColor: "#E7AB2B",
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
    textAlign: "left",
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
