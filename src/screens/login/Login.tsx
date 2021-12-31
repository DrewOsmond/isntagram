import React, { useState } from "react";
import { View, TextInput, NativeTouchEvent, Button } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

type onPressEvent = React.BaseSyntheticEvent<NativeTouchEvent>;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: onPressEvent) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log(user);
      })
      .catch((error) => console.log(error));
  };

  return (
    <View>
      <TextInput
        placeholder="email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
      />

      <Button title="login" onPress={(e) => handleLogin(e)} />
    </View>
  );
}
