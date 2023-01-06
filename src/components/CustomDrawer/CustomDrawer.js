import React, { useContext } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList
} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { AuthContext } from '../../context/AuthProvider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Avatar, Image } from 'native-base';

const CustomDrawer = ({ ...props }) => {
  const { logout, userInfo, image } = useContext(AuthContext);
  const insets = useSafeAreaInsets();
  const imageFallback = require("../../assets/images/profile.jpg");
  //console.log("image: " + image)

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: '#8200d6', paddingTop: insets.top }}>
        <ImageBackground
          source={require('../../assets/images/profile-bg.jpeg')}
          style={{ padding: 20 }}
          alt=""
        >
          {image !== 'data:image/jpg;base64,' ?
            <Image
              source={{ uri: image }}
              style={{ height: 80, width: 80, borderRadius: 40, marginBottom: 10 }}
              accessibilityLabel="Profile picture"
              alt=""
            /> :
            <Avatar
              bg="transparent"
              style={{ height: 80, width: 80, borderRadius: 40, marginBottom: 10 }}
              source={
                require('../../assets/images/profile_fallback.jpeg')
              }>
              PFP
            </Avatar>}
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontFamily: 'Roboto-Medium',
              marginBottom: 5,
            }}>
            {userInfo?.email}
          </Text>
          {userInfo?.carBrand ?
            <View style={{ flexDirection: 'row' }}>
              <FontAwesome5
                name="car"
                size={14}
                color="#fff"
                style={{ marginTop: 2 }}
              />
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Roboto-Regular',
                  marginLeft: 5,
                }}>
                {userInfo?.carBrand}
              </Text>
            </View>
            : null}
        </ImageBackground>
        <View style={{ flex: 1, backgroundColor: '#242526', paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 10, borderTopWidth: 1, borderTopColor: '#44474a' }}>
        <TouchableOpacity onPress={() => { logout() }} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="exit-outline" size={22} color="white" />
            <Text
              style={{
                fontSize: 15,
                color: 'white',
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}>
              Wyloguj
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
