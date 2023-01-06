import React from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Unauthorized = ({navigation}) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#262829',
      }}>
      <View style={{marginTop: Dimensions.get('window').height / 20}}>
        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontWeight: 'bold',
            fontSize: 30,
            color: '#f5f8fa',
            textAlign: 'center',
            marginTop: 25
          }}>
          WITAJ W APLIKACJI CAR PARKING
        </Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={require('../../assets/images/car.png')}
          style={{
            resizeMode: 'contain',
            width: 350,
            height: 350
          }}
        />
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: '#f27e02',
          padding: 20,
          width: '90%',
          borderRadius: 10,
          marginBottom: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        onPress={() => navigation.navigate('Login')}>
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            textAlign: 'center',
            fontWeight: 'bold',
            fontFamily: 'Roboto-MediumItalic',
          }}>
          Logowanie
        </Text>
        <MaterialIcons name="arrow-forward-ios" size={22} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: '#f27e02',
          padding: 20,
          width: '90%',
          borderRadius: 10,
          marginBottom: 50,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        onPress={() => navigation.navigate('Register')}>
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            textAlign: 'center',
            fontWeight: 'bold',
            fontFamily: 'Roboto-MediumItalic',
          }}>
          Rejestracja
        </Text>
        <MaterialIcons name="arrow-forward-ios" size={22} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Unauthorized;