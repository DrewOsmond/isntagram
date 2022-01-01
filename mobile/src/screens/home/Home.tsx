import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Home({ navigation }: any) {
  return (
    <View style={styles.header}>
      <Text>Instagram</Text>
      <View>
        <Text onPress={() => navigation.navigate("New Post")}>new Post</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    height: 30,
    marginTop: 50,
    marginLeft: 25,
    marginRight: 25,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
