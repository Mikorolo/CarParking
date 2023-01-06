import { Text, View } from 'native-base';
import React, { createRef, useContext, useEffect, useRef, useState } from 'react';
import { Dimensions } from 'react-native';
import MapView, { Callout, Circle, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { isPointWithinRadius } from 'geolib';
import axios from 'axios';
import { AuthContext } from '../../context/AuthProvider';
import * as Notifications from "expo-notifications";

const MapScreen = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [reservation, setReservation] = useState(false);
    const { height, width } = Dimensions.get('window');
    const [pin, setPin] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
    })
    const LATITUDE_DELTA = 2;
    const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);

    const mapRef = createRef()

    const { userToken, userInfo, fetchUserDetails, autoReservation, notifications } = useContext(AuthContext)

    const target = {
        latitude: 50.88056283674549,
        longitude: 20.646425580049325
    }

    const triggerNotifications = async (spot) => {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Automatycznie zarezerwowano miejsce nr: " + {spot},
                body: "",
                data: { data: "" },
            },
            trigger: { seconds: 1 },
        });
    }

    const makeAutomaticReservation = async() => {
        await axios.patch("http://192.168.1.49:8080/MakeAutomaticReservation", {}, {
            headers: {
                'Authorization': 'Bearer ' + userToken
            }
        }).then(res => setReservation(res.data))
        await fetchUserDetails()
    }

    const handleCenter = async() => {
        mapRef.current.animateCamera({center: {latitude: pin.latitude, longitude: pin.longitude}})
    }

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                await Location.requestBackgroundPermissionsAsync();
                return;
            }

            let location = await Location.getCurrentPositionAsync({timeInterval: 1000, distanceInterval: 50, accuracy: 5});
            
            setPin({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            })
        })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }


    return (
        <View>
            <MapView
                style={{ width: Dimensions.get("window").width, height: Dimensions.get("window").height, justifyContent: 'center', alignItems: 'center' }}
                initialRegion={{
                    latitude: pin.latitude,
                    longitude: pin.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }}
                ref={mapRef}
                showsUserLocation={true}
                zoomControlEnabled={true}
                loadingEnabled={true}
                onUserLocationChange={async (e) => {
                    setPin({
                        latitude: e.nativeEvent.coordinate.latitude,
                        longitude: e.nativeEvent.coordinate.longitude
                    });
                    handleCenter()
                    //console.log(pin) 
                    if(
                        isPointWithinRadius(
                            {latitude: pin.latitude, longitude: pin.longitude},
                            {latitude: target.latitude, longitude: target.longitude},
                            2000
                        ) && !userInfo?.isReserved && autoReservation) {
                            await makeAutomaticReservation();
                            console.log(userInfo?.isReserved);
                            notifications ? await triggerNotifications(reservation?.id) : null;
                        }
                        else {
                            console.log("RES: " + userInfo?.isReserved, "AUTO:" + autoReservation);
                        }
                }}
            >
                <Marker
                    coordinate={pin}
                    draggable={true}
                    onDragStart={(e) => {
                        console.log("Drag start", e.nativeEvent.coordinate)
                    }}
                    onDragEnd={(e) => {
                        console.log("Drag end", e.nativeEvent.coordinate)
                        setPin({
                            latitude: e.nativeEvent.coordinate.latitude,
                            longitude: e.nativeEvent.coordinate.longitude
                        })
                    }}
                >
                    <Callout>
                        <Text>Tu jesteś</Text>
                    </Callout>
                </Marker>
                <Circle
                    center={pin}
                    radius={100}
                    strokeColor="rgba(23, 23, 255, 0.46)"
                    strokeWidth={1}
                    fillColor="rgba(121, 120, 255, 0.4)"
                />
            </MapView>
        </View>
    );
};

export default MapScreen;