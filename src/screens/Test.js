import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  refreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { RefreshControl } from "react-native";

const Test = () => {
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [dataList, setDataList] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {
    fetchApiData();
    return () => {};
  }, []);

  const fetchApiData = async () => {
    try {
      const response = await axios.get(
        // "https://jsonplaceholder.typicode.com/posts"
        `https://jsonplaceholder.typicode.com/users/${pageNo}/todos`
      );
      // console.log(response.data);
      setDataList(response.data);
    } catch (err) {}
  };

  const handleRefresh = async () => {
    // console.log("function is calling");

    setIsRefreshing(true);

    setPageNo(pageNo + 1); //Page No Getting Incremented on Every Refresh

    await fetchApiData(); // await means till it dowsnt get data it will not execute function below it

    setIsRefreshing(false);

    // setTimeout(() => {
    //   setIsRefreshing(false);
    //   //   console.log("function is ending");
    // }, 2000);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => handleRefresh()}
          />
        }
      >
        {dataList.map((ls, i) => {
          return (
            <Text key={i} style={{ marginHorizontal: 7, marginVertical: 10 }}>
              Id = {ls.id} Title = {ls.title}
            </Text>
          );
        })}
        <Text>Pull down to see RefreshControl indicator</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Test;
