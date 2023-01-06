import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment/min/moment-with-locales'
import { Button, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const ReservationScreen = ({ route, navigation }) => {
    const { id } = route.params;
    const [details, setDetails] = useState({});
    moment.locale('pl')

    useEffect(() => {
        const fetchReservationDetails = async () => {
            try {
                let token = await AsyncStorage.getItem('userToken');
                const res = await axios.get("http://192.168.1.49:8080/GetById", {
                    params: {
                        id: id
                    },
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                })
                setDetails(res?.data);
                console.log(details)
                console.log("id: " + id)
            }
            catch (e) {
                console.log(e.message)
            }
        }
        fetchReservationDetails();
    }, [])

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#262829' }}>
            <VStack style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                <FontAwesome5Icon name="parking"
                    size={80}
                    color="#095be8"
                    style={{ marginTop: 2, marginBottom: 10 }} />
                <Text style={{
                    color: 'black', fontFamily: 'Roboto-Medium',
                    fontSize: 18
                }}>
                    Numer miejsca: 
                </Text>
                <Text style={{
                    color: 'black', fontFamily: 'Roboto-Medium',
                    fontSize: 18
                }}>
                    {id} 
                </Text>
                <Text style={{
                    color: 'black', fontFamily: 'Roboto-Medium',
                    fontSize: 18
                }}>
                    Piętro: 
                </Text>
                <Text style={{
                    color: 'black', fontFamily: 'Roboto-Medium',
                    fontSize: 18
                }}>
                    {details?.floor} 
                </Text>
                <Text style={{
                    color: 'black', fontFamily: 'Roboto-Medium',
                    fontSize: 18
                }}>
                    Sektor:
                </Text>
                <Text style={{
                    color: 'black', fontFamily: 'Roboto-Medium',
                    fontSize: 18
                }}>
                    {details?.sector}
                </Text>
                <Text style={{
                    color: 'black', fontFamily: 'Roboto-Medium',
                    fontSize: 18
                }}>
                    Godzina rezerwacji:
                </Text>
                <Text style={{
                    color: 'black', fontFamily: 'Roboto-Medium',
                    fontSize: 18
                }}>
                    {details?.reservationDate ? moment(details?.reservationDate).format('LTS') : "To miejsce jest wolne"}
                </Text>
            </VStack>
            <Button
                style={{ marginTop: 10 }}
                onPress={() =>
                    navigation.goBack()
                }>
                <Text style={{
                    color: 'white', fontFamily: 'Roboto-Medium',
                    fontSize: 14
                }}>
                    Powrót
                </Text>
            </Button>
        </View>
    );
};

export default ReservationScreen;