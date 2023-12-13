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
import React, { useState } from "react";
import BackgroundImg from "../../assets/img/loginscreen.webp";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { useNavigation, StackActions } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const navigation = useNavigation();

  const signupUser = async () => {
    try {
      console.log("email :", email);
      console.log("password :", password);
      console.log("height :", height);
      console.log("weight :", weight);

      const { data } = await axios.post(
        "https://engistack.com/infistyle_reactapp/signup.php",
        {
          email: email,
          password: password,
          height: height,
          weight: weight,
        }
      );

      console.log(data);
      const userData = {
        email: data.data.sEmailId,
        uid: data.data.iUserId,
        uname: data.data.sName,

        // email: data.data.email,
        // uid: data.data.id,
        // uname: data.data.uname,
      };

      if (data.status == "success") {
        //Alert.alert('User Login Successfully');
        const user = { email: email };
        await AsyncStorage.setItem("user", JSON.stringify(user));
        await AsyncStorage.setItem("user_data", JSON.stringify(userData));
        await AsyncStorage.setItem("isUserLogin", "true");

        navigation.dispatch(
          // StackActions.replace("Home")  // Replace Login Page with Home Page , means redirect to Hoem Screen if Login
          StackActions.replace("BottomNavigator", {
            myName: `${data.data.uname}`,
            myId: `${data.data.id}`,
          })
        );
      } else {
        Alert.alert("User Not Created");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBackgroundImgContainer}>
        <Image
          source={BackgroundImg}
          style={styles.backgroundImg}
          resizeMode="contain"
        />
      </View>
      <View style={styles.bottomBackgroundImgContainer}></View>
      <View style={styles.formContainer}>
        <View style={styles.formTopContainer}>
          <FontAwesome name="angle-left" size={30} color="#fff" />
          <Text style={{ color: "#fff", fontSize: 38, fontWeight: "bold" }}>
            Signup
          </Text>
        </View>

        <View style={styles.formBottomContainer}>
          <View style={styles.formBottomSubContainer}>
            <View style={styles.customInputContainer}>
              <Text>Email</Text>
              <TextInput
                placeholder="Enter Your Email"
                placeholderTextColor={"grey"}
                onChangeText={(text) => setEmail(text)}
              />
            </View>

            <View style={styles.customInputContainer}>
              <Text>Password</Text>
              <TextInput
                placeholder="Enter Your Password"
                placeholderTextColor={"grey"}
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
              />
            </View>

            <View style={styles.customInputContainer}>
              <Text>Height (cms)</Text>
              <TextInput
                placeholder="Enter Your Height in cms"
                placeholderTextColor={"grey"}
                onChangeText={(text) => setHeight(text)}
              />
            </View>

            <View style={styles.customInputContainer}>
              <Text>Weight (kgs)</Text>
              <TextInput
                placeholder="Enter Your Weight in kgs"
                placeholderTextColor={"grey"}
                onChangeText={(text) => setWeight(text)}
              />
            </View>
            <View>
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: 12,
                  marginTop: 20,
                  marginBottom: 20,
                }}
              >
                By selecting Agree and continue below,
                {"\n"} I agree to
                <Text
                  style={{
                    color: "#02C38E",
                    fontWeight: "bold",
                    fontSize: 12,
                  }}
                >
                  {" "}
                  Terms of Service and Privacy Policy
                </Text>
              </Text>
            </View>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => signupUser()}
            >
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 17 }}>
                Agree and Continue
              </Text>
            </TouchableOpacity>

            <Text style={{ color: "#fff", textAlign: "center", fontSize: 15 }}>
              or
            </Text>

            <View style={{ flexDirection: "row" }}>
              <Text
                style={{ color: "black", fontWeight: "bold", fontSize: 17 }}
              >
                Already Have an Account ?
              </Text>

              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text
                  style={{
                    color: "#02C38E",
                    fontWeight: "bold",
                    fontSize: 17,
                    paddingLeft: 10,
                  }}
                >
                  Login ?
                </Text>
              </TouchableOpacity>
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
    backgroundColor: "#050907",
  },
  topBackgroundImgContainer: {
    flex: 1.5,
    alignItems: "flex-end",
  },
  backgroundImg: {
    height: "100%",
    width: "120%",
    marginRight: -15,
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
    padding: 10,
    marginLeft: 10,
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
  loginButton: {
    backgroundColor: "#02C38E",
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 10,
  },
});

export default Signup;
