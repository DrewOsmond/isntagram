import React, { FC } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

//fix later once I can figure out how to type check navigation
export default function Landing({ navigation }: any) {
  return (
    <View style={styles.changeNameLater}>
      <Button
        title="Register"
        onPress={() => navigation.navigate("Register")}
      />
      <Button title="Login" onPress={() => navigation.navigate("Login")} />
    </View>
  );
}

const styles = StyleSheet.create({
  changeNameLater: {
    flex: 1,
    justifyContent: "center",
  },
});
