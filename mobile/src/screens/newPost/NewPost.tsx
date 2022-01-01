import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, NativeTouchEvent } from "react-native";
import { createPost } from "../../redux/reducers/post";
import { useAppDispatch } from "../../redux/hooks";
import UploadImage from "../../components/uploadImage/UploadImage";

type onPressEvent = React.BaseSyntheticEvent<NativeTouchEvent>;

export default function NewPost() {
  const dispatch = useAppDispatch();
  const [image, setImage] = useState(null);

  const handleNewPost = (e: onPressEvent) => {
    e.preventDefault();
    if (!image) return;
    dispatch(createPost({ image, content: "test" }));
  };

  return (
    <View style={styles.container}>
      <UploadImage image={image} setImage={setImage} />

      <Text style={{ marginVertical: 20, fontSize: 16 }}>
        Welcome, FuzzySid
      </Text>

      <Button title="create post" onPress={(e) => handleNewPost(e)} />
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
