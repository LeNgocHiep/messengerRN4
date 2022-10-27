/**
 * @format
 */
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  HeaderBackButton,
} from "@react-navigation/native-stack";
import { AppRegistry } from "react-native";
import App from "./src/App";
import { name as appName } from "./app.json";
import * as React from "react";
import { Provider } from "react-redux";
import { View, Text } from "react-native";
import configStore from "./src/store/config_store";
import LoginScreen from "./src/screen/login_screen";
import SignUpScreen from "./src/screen/sign_up_screen";
// import { RealmProvider } from "./src/database/database_manager";

const store = configStore();

const Stack = createNativeStackNavigator();

const RootComponent = function () {
  // if (!RealmProvider) {
  //   return null;
  // }
  return (
    <Provider store={store}>
      {/* <RealmProvider> */}
        <NavigationContainer>
          {/* <Stack.Navigator initialRouteName="Detail">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detail" component={DetailsScreen} />
      </Stack.Navigator> */}
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{ headerShown: true, headerTransparent: true }}
          >
            <Stack.Screen name="Home" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      {/* </RealmProvider> */}
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => RootComponent);
