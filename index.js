/**
 * @format
 */
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import * as React from "react";
import { Provider } from "react-redux";
import configStore from "./src/store/config_store";
import LoginScreen from "./src/screen/login_screen";
import SignUpScreen from "./src/screen/sign_up_screen";
import HomeScreen from "./src/screen/home/home_screen";
import ChatScreen from "./src/screen/chat/chat_screen";

const store = configStore();

const Stack = createNativeStackNavigator();

const RootComponent = function () {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="HomeScreen"
          screenOptions={{ headerShown: false, headerTransparent: true }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => RootComponent);