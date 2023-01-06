import React, { useContext, useEffect, useState } from "react";
import { Switch, StyleSheet, View, Text } from "react-native";
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NativeBaseProvider } from "native-base";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import Icon from 'react-native-vector-icons/FontAwesome5';
import Settings from '../screens/Settings/Settings';
import Register from "../screens/RegisterScreen/Register";
import Login from "../screens/LoginScreen/Login";
import { AuthContext } from "../context/AuthProvider";
import CustomDrawer from "../components/CustomDrawer/CustomDrawer";
import UserProfile from "../screens/UserProfile/UserProfile";
import ProfileStack from "./ProfileStack";
import MapScreen from "../screens/MapScreen/MapScreen";
import HomeStack from "./HomeStack";
import ReservationScreen from "../screens/ReservationScreen/ReservationScreen";
import Reservation from "../screens/ReservationScreen/Reservation";

function DrawerNav() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const Drawer = createDrawerNavigator();
  const { isLoading, userToken } = useContext(AuthContext);

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: '#EFB600',
        drawerActiveTintColor: 'black',
        drawerInactiveTintColor: '#f7f9fc',
        headerTintColor: 'white',
        drawerStyle: {
          backgroundColor: '#242526'
        },
        headerStyle: {
          backgroundColor: '#1A1D24',
          shadowOffset: {
            width: 3,
            height: 5,
          },
          shadowColor: 'black',
              shadowOpacity: 1,
              shadowRadius: 3.84,
              elevation: 15,
        },
        
        headerTitleStyle: {
          color: '#e4ebf7'
        },
        drawerLabelStyle: {
          fontFamily: 'Roboto-Medium',
          fontSize: 15,
        },
      }}>
      <Drawer.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerTitle: "Menu Główne",
          title: "Menu Główne",
        }}
      />
      <Drawer.Screen
        name="Profil"
        component={ProfileStack}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          headerTitle: "Ustawienia",
          title: "Ustawienia",
        }}
      />
      <Drawer.Screen
        name="Mapa"
        component={MapScreen}
      />
      <Drawer.Screen
        name="Twoja rezerwacja"
        component={Reservation}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNav;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
