import { AntDesign } from "@expo/vector-icons";
import {
  Image,
  View,
  Platform,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useAppSelector } from "../../redux/hooks";

export default function UploadImage({ image, setImage }: any) {
  const { user } = useAppSelector((state) => state.session);
  const addImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      // const form = new FormData();
      // form.append("photo", {
      //   //@ts-ignore
      //   name: `${user?.username}-${new Date()}`,
      //   uri: result.uri,
      //   type: `image/jpg`,
      // });

      setImage(result.uri);
    }
  };

  return (
    <View style={imageUploaderStyles.container}>
      {image && (
        <Image
          source={{
            uri: image,
          }}
          style={{ width: 200, height: 200 }}
        />
      )}

      <View style={imageUploaderStyles.uploadBtnContainer}>
        <TouchableOpacity
          onPress={addImage}
          style={imageUploaderStyles.uploadBtn}
        >
          <Text>{image ? "Edit" : "Upload"} Image</Text>
          <AntDesign name="camera" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const imageUploaderStyles = StyleSheet.create({
  container: {
    elevation: 2,
    height: 200,
    width: 200,
    backgroundColor: "#efefef",
    position: "relative",
    borderRadius: 999,
    overflow: "hidden",
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "lightgrey",
    width: "100%",
    height: "25%",
  },
  uploadBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
