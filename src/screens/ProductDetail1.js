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
import { Header, Icon, Card, Tile, Input, Button } from "@rneui/themed";

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
              uri: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1674455643_2017557.jpg?format=webp&w=480&dpr=1.3",
            }}
          />

          <View style={{ marginHorizontal: -15, marginTop: -20 }}>
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
                    color: "black",
                  }}
                >
                  {" ₹ " + 1299}
                </Text>
              </View>

              <Text style={[styles.categoryText, { marginBottom: 20 }]}>
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
                <Text style={{ color: "#58595B", fontWeight: "bold" }}>
                  Material & Care:
                </Text>
                <Text style={{ color: "#433F40" }}>100% Polyster</Text>
              </View>

              <View style={{ marginVertical: 10 }}>
                <Text style={{ color: "#58595B", fontWeight: "bold" }}>
                  Country of Origin:
                </Text>
                <Text style={{ color: "#433F40" }}>India </Text>
              </View>

              <View style={{ marginVertical: 10 }}>
                <Text style={{ color: "#58595B", fontWeight: "bold" }}>
                  Manufactured & Sold By:
                </Text>
                <Text style={{ color: "#433F40" }}>
                  The InfiStyle Pvt. Ltd. 224, NIBM Road,{"\n"}Kondwa Pune - 11
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
                  The symbol of fury and justice for Wakanda has risen. The
                  Black Panther legacy goes on. Wakanda forever!
                </Text>
              </View>

              <View style={{ marginVertical: 10 }}>
                <Text style={{ color: "#433F40" }}>India </Text>
              </View>

              <View style={{ marginVertical: 10 }}>
                <Text style={{ color: "#433F40" }}>
                  Official Licensed Liverpool Football Club Men Oversized
                  T-shirt.
                </Text>
              </View>
              <View style={{ marginVertical: 10 }}>
                <Text style={{ color: "#433F40" }}>
                  The reigning EPL champions are a one-of-a-kind team. Show some
                  love to your favourite team with this cool oversized t-shirt.
                </Text>
              </View>

              <View style={{ marginVertical: 10 }}>
                <Text style={{ color: "#433F40" }}>
                  Shop for official Liverpool FC merchandise online in India,
                  available exclusively at The Souled Store.
                </Text>
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
        />
        <Button
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
