import React, { useState } from "react";
import { View, Button, TextInput, NativeTouchEvent } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

type onPressEvent = React.BaseSyntheticEvent<NativeTouchEvent>;

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = (e: onPressEvent) => {
    e.preventDefault();
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        console.log(userCredentials);
        // const user = userCredentials.user;
        // console.log(user);
      })
      .catch((error) => console.log(error));
  };

  return (
    <View>
      <TextInput
        placeholder="username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        placeholder="email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
      />
      <TextInput
        placeholder="confirm password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
      />

      <Button title="Sign Up" onPress={(e) => handleSignup(e)} />
    </View>
  );
}
