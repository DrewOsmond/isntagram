import React, { useState } from "react";
import { View, TextInput, NativeTouchEvent, Button } from "react-native";
import { useAppDispatch } from "../../redux/hooks";
import { loginUser } from "../../redux/reducers/session";

type onPressEvent = React.BaseSyntheticEvent<NativeTouchEvent>;

export default function Login() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: onPressEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
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
