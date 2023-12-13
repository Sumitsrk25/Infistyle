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
import { Header, Icon, Card, Button } from "@rneui/themed";
import { Avatar } from "@rneui/base";

const CoachesCard = (props) => {
  return (
    <Card>
      <View style={{ display: "flex", width: 200 }}>
        <Card.Image
          style={{ padding: 0, width: "100%" }}
          source={{
            uri: props.imgSrc,
          }}
        />
        <Card.Title style={styles.coachname}>{props.textData}</Card.Title>

        <Card.Title style={styles.coachcategory}>{props.textData1}</Card.Title>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ textAlign: "center", marginRight: 5 }}>
            Ratings: {props.rating}
          </Text>

          <Avatar
            size={14}
            rounded
            icon={{ name: "star", type: "font-awesome" }}
            containerStyle={{ backgroundColor: "#E7AB2B" }}
          />
        </View>
      </View>
    </Card>
  );
};

export default CoachesCard;

const styles = StyleSheet.create({
  coachname: {
    marginTop: 10,
    fontSize: 20,
    color: "#02C38E",
  },
  coachcategory: {
    fontSize: 14,
  },
  coachrating: {
    fontSize: 14,
  },
});
