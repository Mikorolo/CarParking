import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, View } from 'native-base';
import React, {useContext} from 'react';
import { ActivityIndicator } from 'react-native';
import { AuthContext } from '../context/AuthProvider';
import AuthStack from './AuthStack';
import DrawerNav from './DrawerNav';

const NavRoot = () => {
    const { isLoading, userToken, userInfo } = useContext(AuthContext);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={'large'} />
            </View>
        )
    }

    return (
        <NavigationContainer>
            <StatusBar translucent={true} hidden={true} />
            {userToken && userInfo?.email ?
                <DrawerNav /> :
                <AuthStack />
            }
        </NavigationContainer>
    );
};

export default NavRoot;