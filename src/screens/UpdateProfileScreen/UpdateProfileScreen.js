import axios from 'axios';
import { FormControl, HStack, Image, Input, ScrollView, Text, Toast, View, VStack } from 'native-base';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { Button, TextInput } from 'react-native-paper';
import { Dimensions, SafeAreaView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ToastAlert } from '../../components/ToastAlert/ToastAlert';
import CustomFormInput from '../../components/CustomFormInput/CustomFormInput';
import { TouchableOpacity } from 'react-native-gesture-handler';

const UpdateProfileScreen = ({ navigation }) => {
    const { image, userToken, userInfo, setUserInfo, fetchUserPhoto, fetchUserDetails } = useContext(AuthContext);
    const [username, setUsername] = useState(userInfo?.username);
    const [name, setName] = useState(userInfo?.name);
    const [lastname, setLastName] = useState(userInfo?.lastname);
    const [carBrand, setCarBrand] = useState(userInfo?.carBrand);
    const [disabledRow, setDisabledRow] = useState(0)

    const inputData = [
        { label: "A", placeholder: "A", value: "a", onChangeText: value => setName(value), iconName: 'edit', helperText: "", errorMessage: "", iconColor: "white" },
        { label: "A", placeholder: "A", value: "a", onChangeText: value => setName(value), iconName: 'edit', helperText: "", errorMessage: "", iconColor: "white" },
        { label: "A", placeholder: "A", value: "a", onChangeText: value => setName(value), iconName: 'edit', helperText: "", errorMessage: "", iconColor: "white" },
        { label: "A", placeholder: "A", value: "a", onChangeText: value => setName(value), iconName: 'edit', helperText: "", errorMessage: "", iconColor: "white" },
    ]

    const handleSubmit = async () => {
        try {
            await axios.patch("http://192.168.1.49:8080/updateUser", { username, name, lastname, carBrand }, {
                headers: {
                    'Authorization': 'Bearer ' + userToken
                }
            })
            fetchUserDetails()
                Toast.show({
                    render: ({
                        id
                    }) => {
                        return <ToastAlert id={id} title="Pomyślnie zmieniono dane" variant="top-accent" description="" status="success" />;
                    }
                })
                navigation.goBack();
        }
        catch (e) {
            console.log(e.message);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1B1F2D' }}>
            <View style={{marginTop: 20}}>
            <Text style={{ color: "#71767D", textAlign: 'center', lineHeight: 30, fontFamily: 'Roboto-Medium', fontSize: 25}}>Uzupełnij swój profil</Text>
            <Text style={{ color: "#71767D", marginBottom: 5, textAlign: 'center' ,fontFamily: 'Roboto-Medium', fontSize: 16}}>Wpisz dane które chcesz uzupełnić</Text>
                <FormControl style={{ marginVertical: 10 }}>
                    <FormControl.Label _text={{
                        bold: true
                    }}>
                        Nazwa użytkownika:
                    </FormControl.Label>
                    <HStack>
                        <TextInput
                            style={{
                                backgroundColor: '#333741',
                                borderRadius: 10,
                                width: 300
                            }}
                            placeholderTextColor="#71767D"
                            theme={{ colors: { text: 'white' } }}
                            disabled={disabledRow !== 1}
                            selectionColor='#EFB600'
                            activeUnderlineColor='#EFB600'
                            mode='flat'
                            placeholder="Wprowadź nazwę użytkownika"
                            value={username}
                            onChangeText={value => setUsername(value)}
                        />
                        <TouchableOpacity style={{ marginTop: 10 }} onPress={() => { disabledRow === 1 ? setDisabledRow(0) : setDisabledRow(1); }}>
                            <MaterialIcons style={{ textAlignVertical: 'center', marginStart: 10 }} name={disabledRow === 1 ? "done" : "edit"} size={30} color="#fff" />
                        </TouchableOpacity>
                    </HStack>

                    <FormControl.HelperText _text={{
                        fontSize: 'xs'
                    }}>
                        Nazwa użytkownika powinna zawierać co najmniej 3 znaki
                    </FormControl.HelperText>
                    <FormControl.ErrorMessage _text={{
                        fontSize: 'xs'
                    }}>
                        Wprowadź minumum 3 znaki
                    </FormControl.ErrorMessage>
                </FormControl>
                <FormControl style={{ marginVertical: 10 }}>
                    <FormControl.Label _text={{
                        bold: true
                    }}>
                        Imię:
                    </FormControl.Label>
                    <HStack>
                        <TextInput
                            style={{
                                backgroundColor: '#333741',
                                borderRadius: 10,
                                width: 300
                            }}
                            placeholderTextColor="#71767D"
                            disabled={disabledRow !== 2}
                            theme={{ colors: { text: 'white' } }}
                            selectionColor='#EFB600'
                            activeUnderlineColor='#EFB600'
                            mode='flat'
                            placeholder="Wprowadź imię"
                            value={name}
                            onChangeText={value => setName(value)}
                        />
                        <TouchableOpacity style={{ marginTop: 10 }} onPress={() => { disabledRow === 2 ? setDisabledRow(0) : setDisabledRow(2); }}>
                            <MaterialIcons style={{ textAlignVertical: 'center', marginStart: 10 }} name={disabledRow === 2 ? "done" : "edit"} size={30} color="#fff" />
                        </TouchableOpacity>
                    </HStack>
                </FormControl>
                <FormControl style={{ marginVertical: 10 }}>
                    <FormControl.Label _text={{
                        bold: true
                    }}>
                        Nazwisko:
                    </FormControl.Label>
                    <HStack>
                        <TextInput
                            style={{
                                backgroundColor: '#333741',
                                borderRadius: 10,
                                width: 300
                            }}
                            placeholderTextColor="#71767D"
                            theme={{ colors: { text: 'white' } }}
                            disabled={disabledRow !== 3}
                            selectionColor='#EFB600'
                            activeUnderlineColor='#EFB600'
                            mode='flat'
                            placeholder="Wprowadź nazwisko"
                            value={lastname}
                            onChangeText={value => setLastName(value)}
                        />
                        <TouchableOpacity style={{ marginTop: 10 }} onPress={() => { disabledRow === 3 ? setDisabledRow(0) : setDisabledRow(3); }}>
                            <MaterialIcons style={{ textAlignVertical: 'center', marginStart: 10 }} name={disabledRow === 3 ? "done" : "edit"} size={30} color="#fff" />
                        </TouchableOpacity>
                    </HStack>
                </FormControl>
                <FormControl style={{ marginVertical: 10 }}>
                    <FormControl.Label _text={{
                        bold: true
                    }}>
                        Marka samochodu:
                    </FormControl.Label>
                    <HStack>
                        <TextInput
                            style={{
                                backgroundColor: '#333741',
                                borderRadius: 10,
                                width: 300
                            }}
                            placeholderTextColor="#71767D"
                            theme={{ colors: { text: 'white' } }}
                            disabled={disabledRow !== 4}
                            selectionColor='#EFB600'
                            activeUnderlineColor='#EFB600'
                            mode='flat'
                            placeholder="Wprowadź markę samochodu"
                            value={carBrand}
                            onChangeText={value => setCarBrand(value)}
                        />
                        <TouchableOpacity style={{ marginTop: 10 }} onPress={() => { disabledRow === 4 ? setDisabledRow(0) : setDisabledRow(4); }}>
                            <MaterialIcons style={{ textAlignVertical: 'center', marginStart: 10 }} name={disabledRow === 4 ? "done" : "edit"} size={30} color="#fff" />
                        </TouchableOpacity>
                    </HStack>
                    <FormControl.HelperText _text={{
                        fontSize: 'xs'
                    }}>
                        Marka samochodu powinna zawierać co najmniej 3 znaki
                    </FormControl.HelperText>
                    <FormControl.ErrorMessage _text={{
                        fontSize: 'xs'
                    }}>
                        Wprowadź minumum 3 znaki
                    </FormControl.ErrorMessage>
                </FormControl>
                <Button onPress={handleSubmit}
                    style={{ marginTop: 15, height: Dimensions.get('screen').height / 18, display: 'flex', justifyContent: 'center', borderRadius: 10 }}
                    mode='contained'
                    color='#EFB600'
                >
                    <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 14, fontWeight: 'bold', textAlignVertical: 'center' }}>Zatwierdź</Text>
                </Button>
            </View>
        </SafeAreaView>
    );
};

export default UpdateProfileScreen;