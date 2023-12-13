import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import BackgroundImg from "../../assets/img/loginscreen.webp";
import Ionicon from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { useNavigation, StackActions } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Header, Icon, Card, Tile, Input } from "@rneui/themed";

const ProductDetail = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //
  const navigation = useNavigation();

  const [isSubmit, setIsSubmit] = useState(false);
  //   useEffect(() => {

  //     const authenticate = async() => {
  //       axios.post("http://192.168.0.109/react_native/api/login.php",
  //       JSON.stringify({
  //         email: email,
  //         password: password,

  //       })
  //       ).then((response) => {
  //         console.log(response.data);
  //         setIsSubmit(false);
  //         if (data.status == 'success'){
  //         Alert.alert(`Thank You`);
  //         }
  //         else{
  //             Alert.alert(`Not FOund`);
  //         }
  //         //Navigate the User
  //       }).catch((err) => {
  //         console.log(err);
  //       });
  //     };
  //     if (isSubmit) authenticate();
  //   }, [isSubmit]);

  return (
    <View style={styles.container}>
      <View style={styles.topBackgroundImgContainer}>
        <Image
          source={{
            uri: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1674455643_2017557.jpg?format=webp&w=480&dpr=1.3",
          }}
          style={styles.backgroundImg}
          resizeMode="contain"
        />
      </View>

      <View style={styles.bottomBackgroundImgContainer}>
        <View style={{ marginHorizontal: -15 }}>
          <Card>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  color: "#58595B",
                }}
              >
                Solids: Red Tshirt
              </Text>
              <Text
                style={{
                  fontWeight: "500",

                  fontWeight: "bold",
                  fontSize: 18,
                  color: "#58595B",
                }}
              >
                {" ₹ " + 1299}
              </Text>
            </View>

            <Text style={styles.categoryText}>Tshirts</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 10,
              }}
            >
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: "grey",
                  fontSize: 12,
                }}
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
              </TouchableOpacity>
            </View>
          </Card>
        </View>

        <View style={{ marginHorizontal: -15 }}>
          <Card>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  color: "#58595B",
                }}
              >
                Solids: Red Tshirt
              </Text>
              <Text
                style={{
                  fontWeight: "500",

                  fontWeight: "bold",
                  fontSize: 18,
                  color: "#58595B",
                }}
              >
                {" ₹ " + 1299}
              </Text>
            </View>

            <Text style={styles.categoryText}>Tshirts</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 10,
              }}
            >
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: "grey",
                  fontSize: 12,
                }}
              ></TouchableOpacity>
            </View>
          </Card>
        </View>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.formTopContainer}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Icon
              raised
              name="long-arrow-left"
              type="font-awesome"
              color="black"
              size={20}
              containerStyle={{ marginTop: 30 }}
              onPress={() => navigation.goBack()}
            />
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <Icon
                raised
                name="heart"
                type="font-awesome"
                color="black"
                size={20}
                containerStyle={{ marginTop: 30 }}
              />
              <Icon
                raised
                name="shopping-bag"
                type="font-awesome"
                color="black"
                size={20}
                containerStyle={{ marginTop: 30 }}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6fbf6",
  },
  topBackgroundImgContainer: {
    flex: 1.5,
    alignItems: "flex-end",
  },
  backgroundImg: {
    height: "100%",
    width: "100%",

    flex: 1,
  },
  bottomBackgroundImgContainer: {
    flex: 1,
    // backgroundColor:"green",
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
  formBottomContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  formBottomSubContainer: {
    backgroundColor: "red",
    // height: '95%',
    width: "95%",
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.5)",
    padding: 20,
  },
  customInputContainer: {
    marginvertical: 1,
    borderWidth: 2,
    borderColor: "#02C38E",
    height: 60,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default ProductDetail;
