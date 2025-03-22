import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import Main from "./src/Main";

const App = () => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <StatusBar backgroundColor={"transparent"} barStyle="dark-content" translucent />
        <NavigationContainer>
          <Main />
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;
