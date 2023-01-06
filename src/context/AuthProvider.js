import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Alert, HStack, Text, Toast, useToast, VStack } from 'native-base';
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { ToastAlert } from '../components/ToastAlert/ToastAlert';

export const AuthContext = createContext();

const AuthProvider = ({ children, navigation }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [autoReservation, setAutoReservation] = useState(false);
    const [notifications, setNotifications] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState({});
    const [image, setImage] = useState("https://as2.ftcdn.net/v2/jpg/01/31/87/13/1000_F_131871374_GBgE0Ua0PXGtOvwS9W29bTG3EB1ylaJs.jpg");

    const login = (email, password) => {
        setIsLoading(true);
        axios.post('http://192.168.1.49:8080/auth/login', {
            email,
            password
        })
            .then(res => {
                let userInfo = res.data;
                setUserToken(userInfo.jwt)
                AsyncStorage.setItem('userToken', userInfo.jwt)
                Toast.show({
                    render: ({
                        id
                    }) => {
                        return <ToastAlert id={id} title="Pomyślnie zalogowano" variant="top-accent" description="" status="success" />;
                    }
                })
            })
            .catch(e => {
                Toast.show({
                    render: ({
                        id
                    }) => {
                        return <ToastAlert id={id} title="Złe dane logowania" variant="top-accent" description="" status="danger" />;
                    }
                })
            })
        setIsLoading(false);
    }

    const logout = () => {
        setIsLoading(true);
        setUserToken(null);
        AsyncStorage.removeItem('userToken');
        setIsLoading(false);
    }

    const isLoggedIn = useCallback(async () => {
        try {
            setIsLoading(true);
            let userToken = await AsyncStorage.getItem('userToken');
            setUserToken(userToken);
            setIsLoading(false);
        }
        catch (e) {
            console.log("IsLoggedError: " + e.message)
        }
    }, [])

    const fetchUserDetails = useCallback(async () => {
        try {
            let userToken = await AsyncStorage.getItem('userToken');
            const res = await axios.get('http://192.168.1.49:8080/info',
                {
                    headers: {
                        "Authorization": "Bearer " + userToken
                    }
                });
            setUserInfo(res?.data);
        }
        catch (e) {
            console.log(e.message)
        }
    }, [])


    const fetchUserPhoto = useCallback(async () => {
        if (!userInfo?.email) return;
        try {
            const res = await axios.get(`http://192.168.1.49:8080/userPhoto/${userInfo?.email}`, {
                responseType: 'blob'
            })
            let base64data
            var blob = new Blob([res.data], { type: "image/jpg" })
            const fileReaderInstance = new FileReader();
            fileReaderInstance.readAsDataURL(blob);
            fileReaderInstance.onload = () => {
                base64data = fileReaderInstance.result;
                setImage(base64data)
            }
        }
        catch (e) {
            console.log(e.message)
        }
    }, [userInfo?.email, image])

    useEffect(() => {
        isLoggedIn();
        fetchUserDetails();
        fetchUserPhoto();
    }, [isLoggedIn, fetchUserDetails, fetchUserPhoto])

    return (
        <AuthContext.Provider
            value={{
                login,
                logout,
                isLoading,
                userToken,
                userInfo,
                image,
                setUserInfo,
                fetchUserDetails,
                fetchUserPhoto,
                autoReservation,
                setAutoReservation,
                notifications,
                setNotifications
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;