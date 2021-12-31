import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import firebase from "@firebase/app";

// const firebaseConfig = {
//   apiKey: "AIzaSyBZFy352HG68NgWIvq5Qd5w2wReNx5jGjM",
//   authDomain: "isntagram-23f77.firebaseapp.com",
//   projectId: "isntagram-23f77",
//   storageBucket: "isntagram-23f77.appspot.com",
//   messagingSenderId: "831791431090",
//   appId: "1:831791431090:web:06f8805002e036f3b038ab",
//   measurementId: "G-0W2ZZQL3VX",
// };
// firebase.auth().createUserWithEmailAndPassword(email, passowrd);

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
