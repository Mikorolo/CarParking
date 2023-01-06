import { View, ScrollView, VStack, Image, Container, Toast, Avatar } from 'native-base';
import React, { useContext, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../context/AuthProvider';
import CustomProfileText from './CustomProfileText';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { ToastAlert } from '../../components/ToastAlert/ToastAlert';

const UserProfile = ({ navigation }) => {
    const { userInfo, image, fetchUserPhoto, userToken } = useContext(AuthContext);
    //const [loading, setLoading] = useState(false);

    const [photoShow, setPhotoShow] = React.useState(null);

    const takePhotoAndUpload = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });

        if (result.cancelled) {
            return;
        }

        let localUri = result.uri;
        setPhotoShow(localUri);
        let filename = localUri.split('/').pop();

        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        let formData = new FormData();
        formData.append('multipartFile', { uri: localUri, name: filename, type: 'image/jpg' });
        try {
            await axios.patch('http://192.168.1.49:8080/updatePhoto', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + userToken
                },
            })
            await fetchUserPhoto();
            Toast.show({
                render: ({
                    id
                }) => {
                    return <ToastAlert id={id} title="Pomyślnie zmieniono zdjęcie" variant="top-accent" description="" status="success" />;
                }
            })
        }
        catch (e) {
            console.log("Błąd user profile")
        }
    }

    const handleUpdate = () => {
        return (
            <Button
                style={{
                    marginTop: 10,
                    backgroundColor: '#EFB600'
                }}
                onPress={() => navigation.navigate("UpdateProfile")}
            >
                <Text style={{
                    color: 'black', fontFamily: 'Roboto-Medium',
                    fontSize: 14
                }}>
                    Edycja profilu
                </Text>
            </Button>
        )
    }

    return (
        <ScrollView style={{ backgroundColor: '#262829' }}>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Container>
                    <VStack>
                        <View>
                            <TouchableOpacity onPress={takePhotoAndUpload}>
                                {image !== 'data:image/jpg;base64,' ?
                                    <Image
                                        source={{ uri: image }}
                                        style={{
                                            height: 180,
                                            width: 180,
                                            borderRadius: 100,
                                            marginBottom: 5,
                                            marginTop: 20,
                                            justifyContent: 'center'
                                        }}
                                        alt="r"
                                    /> :
                                    <Avatar
                                        bg="transparent"
                                        style={{
                                            height: 180,
                                            width: 180,
                                            borderRadius: 100,
                                            marginBottom: 5,
                                            marginTop: 20,
                                            justifyContent: 'center'
                                        }}
                                        source={
                                            require('../../assets/images/profile_fallback.jpeg')
                                        }>
                                        PFP
                                    </Avatar>}
                                <MaterialIcons name="edit" size={28} color="black"
                                    style={{
                                        position: 'absolute',
                                        bottom: 10,
                                        right: 20,
                                        backgroundColor: '#404142',
                                        color: 'whitesmoke',
                                        borderRadius: 20,
                                        width: 40,
                                        height: 40,
                                        textAlign: 'center',
                                        textAlignVertical: 'center'
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                        {userInfo?.email ? <CustomProfileText userInfo={userInfo?.email} title="E-mail:" /> : null}
                        {userInfo?.name ? <CustomProfileText userInfo={userInfo.name} title="Imię:" /> : null}
                        {userInfo?.lastname ? <CustomProfileText userInfo={userInfo.lastname} title="Nazwisko:" /> : null}
                        {userInfo?.username ? <CustomProfileText userInfo={userInfo.username} title="Nazwa użytkownika:" /> : null}
                        {userInfo?.carBrand ? <CustomProfileText userInfo={userInfo.carBrand} title="Marka samochodu:" /> : null}
                        {userInfo?.plateNumber ? <CustomProfileText userInfo={userInfo.plateNumber} title="Numer rejestracyjny:" /> : null}
                        {handleUpdate()}
                        {/* <Button onPress={() => {console.log("pfp: " + image);}}>A</Button> */}
                    </VStack>
                </Container>
            </View>
        </ScrollView>
    );
};

export default UserProfile;