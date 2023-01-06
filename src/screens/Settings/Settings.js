import React, { useContext } from 'react';
import { parseIconFromClassName } from 'react-native-fontawesome';
import SettingsComponent from '../../components/SettingsComponent/SettingsComponent';
import { AuthContext } from '../../context/AuthProvider';

const Settings = ({ navigation }) => {
    const { logout, setAutoReservation, autoReservation, notifications, setNotifications } = useContext(AuthContext);

    const settingsOptions = [
        {
            id: 1,
            icon: "user",
            switcher: false,
            title: "Mój profil",
            subTitle: "Zarządzanie profilem użytkownika",
            onPress: () => {
                navigation.navigate("Profil", { screen: "UserProfile" })
            }
        },
        {
            id: 2,
            icon: "parking",
            switcher: true,
            title: "Rezerwuj automatycznie",
            subTitle: "Automatyczna rezerwacja losowo przydzielonego miejsca na podstawie lokalizacji GPS",
            onPress: () => { autoReservation ? setAutoReservation(false) : setAutoReservation(true) }
        },
        {
            id: 3,
            icon: "bell",
            switcher: true,
            title: "Włącz powiadomienia",
            subTitle: "Włączanie powiadomień o rezerwacji miejsca",
            onPress: () => { notifications ? setNotifications(false) : setNotifications(true) }
        },
        {
            id: 4,
            icon: "step-backward",
            switcher: false,
            title: "Wyloguj",
            subTitle: "",
            onPress: () => { logout() }
        }
    ]

    return (
        <SettingsComponent settingsOptions={settingsOptions} />
    );
};

export default Settings;