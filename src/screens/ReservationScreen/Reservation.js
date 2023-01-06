import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import moment from 'moment/min/moment-with-locales'
import { Image, Spinner, VStack } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { AuthContext } from '../../context/AuthProvider';
import * as Location from 'expo-location';
import { isPointWithinRadius } from 'geolib';

const Reservation = ({ navigation }) => {
    const [details, setDetails] = useState({});
    const { userInfo, userToken, fetchUserDetails } = useContext(AuthContext);
    const isFocused = useIsFocused();
    const [loading, setLoading] = useState(false);
    const [canOccupy, setCanOccupy] = useState(false);
    moment.locale('pl')

    const target = {
        latitude: 50.88056283674549,
        longitude: 20.646425580049325
    }

    useEffect(() => {
        const fetchReservationDetails = async () => {
            try {
                setLoading(true);
                let token = await AsyncStorage.getItem('userToken');
                const res = await axios.get("http://192.168.1.49:8080/GetById", {
                    params: {
                        id: userInfo?.spotNumber
                    },
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                })
                setDetails(res?.data);
                let location = await Location.getCurrentPositionAsync({ accuracy: 5 });
                console.log(location)
                isPointWithinRadius(
                    { latitude: location.coords.latitude, longitude: location.coords.longitude },
                    { latitude: target.latitude, longitude: target.longitude}, 200) ?
                    setCanOccupy(true) :
                    setCanOccupy(false);
                setLoading(false);
            }
            catch (e) {
                console.log(e.message)
            }
        }
        fetchUserDetails()
        userInfo?.isReserved ? fetchReservationDetails() : null;
    }, [userInfo?.spotNumber, isFocused, fetchUserDetails])

    const occupySpot = async() => {
        await axios.patch("http://192.168.1.49:8080/OccupySpot", {}, {
            headers: {
                'Authorization': 'Bearer ' + userToken
            },
            params: {
                id: userInfo?.spotNumber
            }
        })
    }

    const handleCancel = async () => {
        try {
            await axios.patch('http://192.168.1.49:8080/CancelReservation', { id: userInfo?.spotNumber }, {
                headers: {
                    'Authorization': 'Bearer ' + userToken
                }
            })
            navigation.navigate('Home', { screen: 'HomeScreen' })
        }
        catch (e) {
            console.log(e.message)
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#262829' }}>
            {loading ?
                <Spinner color="yellow.500" size="lg" /> :
                userInfo?.isReserved ?
                    <VStack style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                        <FontAwesome5Icon name="parking"
                            size={80}
                            color="#095be8"
                            style={{ marginTop: 2, marginBottom: 10 }} />

                        <Text style={{
                            color: 'white', fontFamily: 'Roboto-Medium',
                            fontSize: 18
                        }}>
                            Numer miejsca:
                        </Text>
                        <Text style={{
                            color: 'white', fontFamily: 'Roboto-Medium',
                            fontSize: 18
                        }}>
                            {userInfo?.spotNumber}
                        </Text>
                        <Text style={{
                            color: 'white', fontFamily: 'Roboto-Medium',
                            fontSize: 18
                        }}>
                            Piętro:
                        </Text>
                        <Text style={{
                            color: 'white', fontFamily: 'Roboto-Medium',
                            fontSize: 18
                        }}>
                            {details?.floor}
                        </Text>
                        <Text style={{
                            color: 'white', fontFamily: 'Roboto-Medium',
                            fontSize: 18
                        }}>
                            Sektor:
                        </Text>
                        <Text style={{
                            color: 'white', fontFamily: 'Roboto-Medium',
                            fontSize: 18, marginBottom: 10
                        }}>
                            {details?.sector}
                        </Text>
                        <Text style={{
                            color: 'white', fontFamily: 'Roboto-Medium',
                            fontSize: 18
                        }}>
                            Godzina rezerwacji:
                        </Text>
                        <Text style={{
                            color: 'white', fontFamily: 'Roboto-Medium',
                            fontSize: 18
                        }}>
                            {details?.reservationDate ? moment(details?.reservationDate).format('LTS') : "To miejsce jest wolne"}
                        </Text>
                        {canOccupy ?
                            <Button
                                onPress={() => {occupySpot(); navigation.navigate("Home")}}
                                style={{ marginTop: 20, marginBottom: 10 }}
                                mode='contained'
                                color='#EFB600'
                            >
                                <Text style={{
                                    fontFamily: 'Roboto-Medium',
                                    fontSize: 14,
                                    fontWeight: 'bold',
                                    textAlignVertical: 'center'
                                }}>
                                    Zajmij miejsce
                                </Text>
                            </Button> : null}
                        <Button onPress={() =>
                            handleCancel()
                        }
                            style={{ marginTop: 10 }}
                            mode='contained'
                            color='#EFB600'
                        >
                            <Text style={{
                                fontFamily: 'Roboto-Medium',
                                fontSize: 14,
                                fontWeight: 'bold',
                                textAlignVertical: 'center'
                            }}>
                                Anuluj rezerwację
                            </Text>
                        </Button>
                    </VStack> :
                    <VStack style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                        <Image
                            source={require('../../assets/images/parking.png')}
                            style={{
                                height: 240,
                                width: 350,
                                marginBottom: 20
                            }}
                            alt=""
                        />
                        <Text style={{
                            color: 'white',
                            fontFamily: 'Roboto-Medium',
                            fontSize: 21,
                            marginHorizontal: 35,
                            textAlign: 'center'
                        }}>
                            Obecnie nie masz żadnej rezerwacji
                        </Text>
                        <Text style={{
                            color: 'white',
                            fontFamily: 'Roboto-Medium',
                            fontSize: 14,
                            lineHeight: 25,
                            marginTop: 10,
                            marginHorizontal: 35,
                            textAlign: 'center'
                        }}>
                            Możesz zarezerwować wybrane wolne miejsce na ekranie głównym lub skorzystać z opcji automatycznej rezerwacji
                        </Text>
                    </VStack>}
        </SafeAreaView>
    );
};

export default Reservation;