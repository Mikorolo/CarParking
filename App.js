import React from "react";
import { StatusBar } from "react-native";
import { NativeBaseProvider, ToastProvider } from "native-base";
import AuthProvider from "./src/context/AuthProvider";
import NavRoot from "./src/Navigation/NavRoot";
import { useFonts } from "expo-font";
import { Provider as PaperProvider } from 'react-native-paper';
import * as Notifications from "expo-notifications";
Notifications.setNotificationHandler({
  handleNotification: async () => {
  return {
  shouldShowAlert: true
  }}
  })

function App() {
  const [loaded] = useFonts({
    'Roboto-Medium': require('./assets/fonts/roboto/Roboto-Medium.ttf'),
    'Roboto-Regular': require('./assets/fonts/roboto/Roboto-Regular.ttf'),
    'Roboto-MediumItalic': require('./assets/fonts/roboto/Roboto-MediumItalic.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <NativeBaseProvider>
        <ToastProvider>
          <PaperProvider>
            <NavRoot />
          </PaperProvider>
        </ToastProvider>
      </NativeBaseProvider>
    </AuthProvider>
  );
}

export default App;
