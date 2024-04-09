import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  ImageBackground,
  BackHandler,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import BackgroundImg from "../../assets/img/loginscreen.webp";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { useNavigation, StackActions } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SwitchSelector from "react-native-switch-selector";
import Login from "./Login";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");

  const navigation = useNavigation();

  const signupUser = async () => {
    try {
      if (!name.trim()) {
        alert("Please Enter Name");
        return;
      }

      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!emailRegex.test(email)) {
        //Alert.alert("Valid Email", "Email is valid.");
        alert("Please Enter Valid Email");
        return false;
      }
      //Check for the Email TextInput
      // else if (!email.trim()) {
      //   alert("Please Enter Email");
      //   return false;
      // }
      // else {
      //   Alert.alert("Invalid Email", "Please enter a valid email.");
      // }

      if (!mobile.trim()) {
        alert("Please enter your Mobile No");
        return;
      }

      if (!password.trim()) {
        alert("Please Enter Password");
        return;
      }

      console.log("email :", email);
      console.log("password :", password);
      console.log("mobile :", mobile);

      console.log("name :", name);
      // formData.append('photo', { uri: localUri, name: filename, type });
      // formData.append('email,',email)

      const { data } = await axios.post(
        "https://engistack.com/infistyle_reactapp/signup.php",
        {
          email: email,
          password: password,

          name: name,
          mobile: mobile,
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
        Alert.alert("User Login Successfully");
        const user = { email: email };
        await AsyncStorage.setItem("user", JSON.stringify(user));
        await AsyncStorage.setItem("user_data", JSON.stringify(userData));
        await AsyncStorage.setItem("isUserLogin", "true");

        navigation.dispatch(
          // StackActions.replace("Home")  // Replace Login Page with Home Page , means redirect to Hoem Screen if Login
          StackActions.replace("BottomNavigator", {
            myName: `${data.data.uname}`,
            myId: `${data.data.uid}`,
          })
        );
      } else if (data.status == "exist") {
        Alert.alert("Email Id Already Exist");
      }
    } catch (err) {
      console.log(err);
      Alert.alert("Plz Try Again ! User Not Created");
    }
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  const backAction = () => {
    navigation.navigate(Login);
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
          <Text
            style={{
              color: "#fff",
              fontSize: 38,
              fontWeight: "bold",
              marginBottom: 50,
            }}
          >
            Signup
          </Text>
        </View>

        <View style={styles.formBottomContainer}>
          <View style={styles.formBottomSubContainer}>
            <View style={styles.customInputContainer}>
              <Text>Full Name</Text>
              <TextInput
                placeholder="Enter Your Full Name"
                placeholderTextColor={"grey"}
                onChangeText={(text) => setName(text)}
              />
            </View>

            <View style={styles.customInputContainer}>
              <Text>Email</Text>
              <TextInput
                placeholder="Enter Your Email"
                placeholderTextColor={"grey"}
                onChangeText={(text) => setEmail(text)}
              />
            </View>

            <View style={styles.customInputContainer}>
              <Text>Mobile No</Text>
              <TextInput
                placeholder="Enter Your Mobile No"
                placeholderTextColor={"grey"}
                onChangeText={(text) => setMobile(text)}
              />
            </View>

            <View style={styles.customInputContainer}>
              <Text>Password</Text>
              <View style={styles.customPassContainer}>
                <TextInput
                  placeholder="Enter Your Password"
                  placeholderTextColor={"grey"}
                  secureTextEntry={isPasswordVisible ? false : true}
                  onChangeText={(text) => setPassword(text)}
                />

                <TouchableOpacity
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  <FontAwesome
                    name={isPasswordVisible ? "eye-slash" : "eye"}
                    size={20}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* <View style={styles.customInputContainer}>
              <Text>Weight (kgs)</Text>
              <TextInput
                placeholder="Enter Your Weight in kgs"
                placeholderTextColor={"grey"}
                onChangeText={(text) => setWeight(text)}
              />
            </View> */}

            {/* <View>
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
            </View> */}
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
                    color: "white",
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
    height: "90%",
    width: "100%",
  },
  formTopContainer: {
    flex: 1,
    // backgroundColor:"red",
    justifyContent: "space-between",
    padding: 10,
    marginLeft: 10,
    marginBottom: 0,
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
  customPassContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  loginButton: {
    backgroundColor: "#02C38E",
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 20,
  },
});

export default Signup;
