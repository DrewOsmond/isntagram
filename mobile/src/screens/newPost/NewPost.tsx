import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import UploadImage from "../../components/uploadImage/UploadImage";

export default function NewPost() {
  const [image, setImage] = useState(null);
  console.log(image);
  return (
    <View style={styles.container}>
      <UploadImage image={image} setImage={setImage} />

      <Text style={{ marginVertical: 20, fontSize: 16 }}>
        Welcome, FuzzySid
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 50,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
