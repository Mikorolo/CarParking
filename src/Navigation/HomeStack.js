import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ReservationScreen from '../screens/ReservationScreen/ReservationScreen';

const HomeStack = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name='HomeScreen'
                component={HomeScreen}
            />
        </Stack.Navigator>
    );
};

export default HomeStack;