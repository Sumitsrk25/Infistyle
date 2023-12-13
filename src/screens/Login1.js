import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import BackgroundImg from "../../assets/img/8d1fe8151496153.630d3a08be217.png";
import Ionicon from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { useNavigation, StackActions } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
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

  const loginUser = async () => {
    try {
      console.log("email :", email);
      console.log("password :", password);

      const { data } = await axios.post(
        "http://192.168.0.109/react_native/api/login.php",
        {
          email: email,
          password: password,
        }
      );

      console.log(data);

      const userData = {
        email: data.data.email,
        uid: data.data.id,
        uname: data.data.uname,
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
        Alert.alert("User Not Found");
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
            Login
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

            {/* <TouchableOpacity style={styles.loginButton}
                                     onPress={() => setIsSubmit(true)} >
                    
                        <Text style={{color:'#fff',fontWeight:'bold',fontSize: 17}}>Login</Text>
                    </TouchableOpacity> */}

            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => loginUser()}
            >
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 17 }}>
                Login
              </Text>
            </TouchableOpacity>

            <Text style={{ color: "#fff", textAlign: "center", fontSize: 15 }}>
              or
            </Text>

            <TouchableOpacity
              style={[
                styles.loginButton,
                {
                  backgroundColor: "#fff",
                  flexDirection: "row",
                  padding: 10,
                  justifyContent: "space-around",
                },
              ]}
            >
              <Image
                source={{
                  uri: "https://play-lh.googleusercontent.com/6UgEjh8Xuts4nwdWzTnWH8QtLuHqRMUB7dp24JYVE2xcYzq4HA8hFfcAbU-R-PC_9uA1",
                }}
                style={{ height: 30, width: 30 }}
              />
              <Text
                style={{ color: "black", fontWeight: "bold", fontSize: 17 }}
              >
                Continue with Google
              </Text>
            </TouchableOpacity>

            <View style={{ flexDirection: "row" }}>
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 17 }}
              >
                Dont' Have an Account ?
              </Text>

              <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                <Text
                  style={{
                    color: "#02C38E",
                    fontWeight: "bold",
                    fontSize: 17,
                    paddingLeft: 10,
                  }}
                >
                  Signup ?
                </Text>
              </TouchableOpacity>
            </View>

            <View>
              <Text
                style={{
                  color: "#02C38E",
                  fontWeight: "bold",
                  fontSize: 17,
                  paddingTop: 10,
                }}
              >
                {" "}
                Forgot your Password ?
              </Text>
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
  customPassContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  loginButton: {
    backgroundColor: "#02C38E",
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 10,
  },
});

export default Login;
