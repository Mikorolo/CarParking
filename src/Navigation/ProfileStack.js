import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ReservationScreen from '../screens/ReservationScreen/ReservationScreen';
import UpdateProfileScreen from '../screens/UpdateProfileScreen/UpdateProfileScreen';
import UserProfile from '../screens/UserProfile/UserProfile';

const StackNav = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name='UserProfile'
                component={UserProfile}
            />
            <Stack.Screen
                name="UpdateProfile"
                component={UpdateProfileScreen}
            />
        </Stack.Navigator>
    );
};

export default StackNav;