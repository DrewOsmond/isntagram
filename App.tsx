import react, { useState } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as firebase from "@firebase/app";
import firebaseConfig from "./firebaseConfig";

if (firebase.getApps().length === 0) {
  firebase.initializeApp(firebaseConfig);
}

import LandingScreen from "./src/screens/landing/Landing";
import RegisterScreen from "./src/screens/register/Register";
import LoginScreen from "./src/screens/login/Login";
const Stack = createStackNavigator();

export default function App() {
  return <AppNavigation />;
}

function AppNavigation() {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen
            name="Landing"
            component={LandingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <View>
        <Text>loading...</Text>
      </View>
    );
  }
}
