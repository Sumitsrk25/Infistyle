import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Button,
  Image,
} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { useNavigation } from "@react-navigation/native";

const AppIntro = () => {
  const [showRealApp, setshowRealApp] = useState(false);
  const navigation = useNavigation();
  const onDone = () => {
    navigation.navigate("Login");
  };

  const onSkip = () => {
    setshowRealApp(true);
  };

  const _renderNextButton = () => {
    return <View style={styles.buttonCircle}></View>;
  };

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: "center",
          justifyContent: "space-around",
          paddingBottom: 100,
        }}
      >
        <Text style={styles.introBrandStyle}>INFISTYLE</Text>
        <Image style={styles.introImageStyle} source={item.image} />
        <Text style={styles.introTitleStyle}>{item.title}</Text>
        <Text style={styles.introTextStyle}>{item.text}</Text>
      </View>
    );
  };
  return (
    <>
      {showRealApp ? (
        <SafeAreaView style={styles.container}>
          <View style={styles.container}>
            <Text style={styles.titleStyle}>
              React Native App Intro Slider using AppIntroSlider
            </Text>
            <Text style={styles.paragraphStyle}>
              This will be your screen when you click Skip from any slide or
              Done button at last
            </Text>
            <Button
              title="Show Intro Slider again"
              onPress={() => setshowRealApp(false)}
            />
          </View>
        </SafeAreaView>
      ) : (
        <AppIntroSlider
          data={slides}
          renderItem={renderItem}
          activeDotStyle={{ width: 40, backgroundColor: "#f9a826" }}
          dotStyle={{ width: 40, backgroundColor: "#F2F1F6" }}
          //   renderDoneButton={() => _renderNextButton()}
          onDone={onDone}
          doneLabel={"Get Started"}
          onSkip={onSkip}
          showSkipButton={false}
          bottomButton
        />
      )}
    </>
  );
};

export default AppIntro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 10,
    justifyContent: "center",
  },
  titleStyle: {
    padding: 10,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: "black",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  introTitleStyle: {
    fontSize: 25,
    color: "black",
    textAlign: "center",

    fontWeight: "bold",
  },
  introBrandStyle: {
    fontSize: 34,
    letterSpacing: 5,
    color: "black",
    textAlign: "center",
    marginTop: 100,
    fontWeight: "bold",
  },
  introImageStyle: {
    width: 300,
    height: 300,
  },

  introTextStyle: {
    fontSize: 20,
    color: "black",
    textAlign: "center",
    paddingVertical: 30,
    paddingHorizontal: 10,
    fontWeight: "bold",
  },
});

const slides = [
  {
    key: "s1",
    text: "Welcome to INFISTYLE !! WE ARE FOR ALL SHOP OWNERS",
    title: " Best Shop Online",
    image: {
      uri: "https://engistack.com/infistyle_reactapp/images/undraw_web_shopping_re_owap.png",
    },
    backgroundColor: "white",
  },
  {
    key: "s2",
    title: "Experience for You",
    text: "WorldClass Place to fulfill all your shopping needs",
    image: {
      uri: "https://engistack.com/infistyle_reactapp/images/undraw_Shopping_re_hdd9.png",
    },
    backgroundColor: "white",
  },
  {
    key: "s3",
    title: "One App",
    text: "One App For All",
    image: {
      uri: "https://engistack.com/infistyle_reactapp/images/undraw_Golden_gate_bridge_re_e8tc.png",
    },
    backgroundColor: "white",
  },
  {
    key: "s4",
    title: "Best Deals ",
    text: "Get Best Deals and Rewards ",
    image: {
      uri: "https://engistack.com/infistyle_reactapp/images/undraw_Window_shopping_re_0kbm.png",
    },
    backgroundColor: "white",
  },
  {
    key: "s5",
    title: "Let's Get Started",
    text: "Join a strong revolution that builds you great",
    image: {
      uri: "https://engistack.com/infistyle_reactapp/images/undraw_Order_confirmed_re_g0if.png",
    },
    backgroundColor: "white",
  },
];
