import react, { useState, useEffect } from "react";
import { View, Text, Button, NativeTouchEvent } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useAppSelector, useAppDispatch } from "./src/redux/hooks";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { restoreUser } from "./src/redux/reducers/session";

import LandingScreen from "./src/screens/landing/Landing";
import RegisterScreen from "./src/screens/register/Register";
import LoginScreen from "./src/screens/login/Login";
import { logoutUser } from "./src/redux/reducers/session";
type onPressEvent = React.BaseSyntheticEvent<NativeTouchEvent>;
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    </NavigationContainer>
  );
}

function AppNavigation() {
  const [loaded, setLoaded] = useState(true);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.session);

  useEffect(() => {
    dispatch(restoreUser())
      .then(() => setLoaded(true))
      .catch(() => setLoaded(true));
  }, []);

  const handleLogout = (e: onPressEvent) => {
    e.preventDefault();
    dispatch(logoutUser());
  };

  if (loaded && user) {
    return (
      <View style={{ paddingTop: 250 }}>
        <Button title="logout" onPress={(e) => handleLogout(e)} />
      </View>
    );
  } else if (loaded && !user) {
    return (
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen
          name="Landing"
          component={LandingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    );
  } else {
    return (
      <View>
        <Text>loading...</Text>
      </View>
    );
  }
}
