import React, { useState } from "react";
import { View, Button, TextInput, NativeTouchEvent } from "react-native";
import { registerUser } from "../../redux/reducers/session";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

type onPressEvent = React.BaseSyntheticEvent<NativeTouchEvent>;

export default function Register() {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = (e: onPressEvent) => {
    e.preventDefault();
    dispatch(registerUser({ username, email, password }));
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
