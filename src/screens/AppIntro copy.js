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

const AppIntro = () => {
  const [showRealApp, setshowRealApp] = useState(false);

  const onDone = () => {
    setshowRealApp(true);
  };

  const onSkip = () => {
    setshowRealApp(true);
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
        <Text style={styles.introTitleStyle}>{item.title}</Text>

        <Image style={styles.introImageStyle} source={item.image} />

        <Text style={styles.introTitleStyle}>{item.title}</Text>
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
          onDone={onDone}
          onSkip={onSkip}
          showSkipButton={true}
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
  introTitleStyle: {
    fontSize: 25,
    color: "black",
    textAlign: "center",
    marginBottom: 16,
    fontWeight: "bold",
  },
  introImageStyle: {
    width: 300,
    height: 300,
  },

  introTextStyle: {
    fontSize: 18,
    color: "black",
    textAlign: "center",
    paddingVertical: 30,
  },
});

const slides = [
  {
    key: "s1",
    text: "Best Recharge offers",
    title: "Mobile Recharge",
    image: {
      uri: "https://engistack.com/infistyle_reactapp/images/undraw_Healthy_lifestyle_re_ifwg.png",
    },
    backgroundColor: "white",
  },
  {
    key: "s2",
    title: "Flight Booking",
    text: "Upto 25% off on Domestic Flights",
    image: {
      uri: "https://engistack.com/infistyle_reactapp/images/undraw_Healthy_lifestyle_re_ifwg.png",
    },
    backgroundColor: "#febe29",
  },
  {
    key: "s3",
    title: "Great Offers",
    text: "Enjoy Great offers on our all services",
    image: {
      uri: "https://raw.githubusercontent.com/tranhonghan/images/main/intro_discount.png",
    },
    backgroundColor: "#22bcb5",
  },
  {
    key: "s4",
    title: "Best Deals",
    text: " Best Deals on all our services",
    image: {
      uri: "https://raw.githubusercontent.com/tranhonghan/images/main/intro_best_deals.png",
    },
    backgroundColor: "#3395ff",
  },
  {
    key: "s5",
    title: "Bus Booking",
    text: "Enjoy Travelling on Bus with flat 100% off",
    image: {
      uri: "https://raw.githubusercontent.com/tranhonghan/images/main/intro_bus_ticket_booking.png",
    },
    backgroundColor: "#f6437b",
  },
  {
    key: "s6",
    title: "Train Booking",
    text: " 10% off on first Train booking",
    image: {
      uri: "https://raw.githubusercontent.com/tranhonghan/images/main/intro_train_ticket_booking.png",
    },
    backgroundColor: "#febe29",
  },
];
