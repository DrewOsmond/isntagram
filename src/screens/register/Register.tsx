import React, { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";

type onPressEvent = React.MouseEvent<HTMLButtonElement>;

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = (e: onPressEvent) => {
    e.preventDefault();
    // const signupInfo = { password, username, email };
    // if (email.length < 1 || username.length < 1 || password.length < 1) {
    //   return setErrors(["username, email, or password must not be blank."]);
    // }
    // if (password !== confirmPassword) {
    //   return setErrors(["passwords do not match"]);
    // }
    // if (
    //   !email
    //     .toLowerCase()
    //     .match(
    //       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    //     )
    // ) {
    //   return setErrors(["must use a valid email address"]);
    // }
    // dispatch(registerUser(signupInfo));
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

      <Button title="Sign Up" onPress={() => "wee"} />
    </View>
  );
}
