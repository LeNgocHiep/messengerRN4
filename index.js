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
import Spinner from "react-native-loading-spinner-overlay";
import { useSelector } from "react-redux";

const store = configStore();

const Stack = createNativeStackNavigator();

const LoadingComponent = () => {
  const loadingInfo = useSelector((state) => state.loadingReducer);
  return (
    <NavigationContainer>
      <Spinner
        visible={loadingInfo?.isLoading}
        textContent={loadingInfo?.content}
      />
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false, headerTransparent: true }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const RootComponent = function () {
  return (
    <Provider store={store}>
      <LoadingComponent />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => RootComponent);
