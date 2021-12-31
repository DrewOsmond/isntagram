import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import { initializeApp } from "firebase/app";
// import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import firebase from "@firebase/app";
import firebaseConfig from "./firebaseConfig";
console.log(firebase);
if (firebase.getApps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

import LandingScreen from "./src/screens/landing/Landing";
import RegisterScreen from "./src/screens/register/Register";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen
          name="Landing"
          component={LandingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
