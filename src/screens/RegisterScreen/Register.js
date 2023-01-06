import React, { useState } from 'react';
import axios from 'axios';
import { FormControl, Input, VStack, View, HStack, Text, Link } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, TextInput } from 'react-native-paper';
import { Dimensions } from 'react-native';


const Register = ({ navigation }) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [plateNumber, setPlateNumber] = useState(null);

    const handleSubmit = async () => {
        try {
            await axios.post("http://192.168.1.49:8080/auth/register", {
                email,
                password,
                plateNumber
            }).then((response) => {
                if (response.status == 200) {
                    navigation.navigate("Login");
                }
            })
        }
        catch (e) {
            console.log(e.error)
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1B1F2D' }}>
            <Text style={{ color: "#71767D", lineHeight: 30, position: 'absolute', top: Dimensions.get("screen").height / 7, fontFamily: 'Roboto-Medium', fontSize: 25}}>Utwórz nowe konto</Text>
            <View style={{ width: Dimensions.get('window').width - (Dimensions.get('screen').width / 10) }}>
                <VStack>
                    <FormControl isRequired style={{ marginVertical: 10 }}>
                        <TextInput
                            placeholder="E-mail"
                            style={{
                                backgroundColor: '#333741',
                                borderRadius: 10
                            }}
                            theme={{colors: {text: 'white' }}}
                            placeholderTextColor="#71767D"
                            selectionColor='#EFB600'
                            activeUnderlineColor='#EFB600'
                            right={<TextInput.Icon icon="email" color="gray"/>}
                            value={email}
                            onChangeText={value =>
                                setEmail(value)
                            }
                        />
                    </FormControl>
                    <FormControl isRequired style={{ marginVertical: 10 }}>
                        <TextInput
                            placeholder="Hasło"
                            value={password}
                            style={{
                                backgroundColor: '#333741',
                                borderRadius: 10
                            }}
                            placeholderTextColor="#71767D"
                            theme={{colors: {text: 'white' }}}
                            selectionColor='#EFB600'
                            activeUnderlineColor='#EFB600'
                            right={<TextInput.Icon icon="lock" color="gray"/>}
                            secureTextEntry={true}
                            onChangeText={value =>
                                setPassword(value)
                            } />
                    </FormControl>
                    <FormControl isRequired style={{ marginVertical: 10 }}>
                        <TextInput
                            placeholder="Numer rejestracyjny"
                            style={{
                                backgroundColor: '#333741',
                                borderRadius: 10
                            }}
                            placeholderTextColor="#71767D"
                            theme={{colors: {text: 'white' }}}
                            right={<TextInput.Icon icon="car" color="gray"/>}
                            value={plateNumber}
                            mode="flat"
                            selectionColor='#EFB600'
                            activeUnderlineColor='#EFB600'
                            onChangeText={value =>
                                setPlateNumber(value)
                            }
                        />
                    </FormControl>
                    <Button
                        onPress={handleSubmit}
                        style={{ marginTop: 15, height: Dimensions.get('screen').height / 18, display: 'flex', justifyContent: 'center', borderRadius: 10 }}
                        mode='contained'
                        color='#EFB600'
                    >
                        <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 14, fontWeight: 'bold', textAlignVertical: 'center' }}>Utwórz konto</Text>
                    </Button>
                </VStack>
            </View>
            <View style={{
                position: 'absolute',
                bottom: 15
            }}>
                <Text style={{ color: 'white', fontFamily: 'Roboto-Medium', fontSize: 14, fontWeight: 'bold', textAlignVertical: 'center' }}>Masz już konto?</Text>
                <Link onPress={() => navigation.navigate('Login')} style={{ fontFamily: 'Roboto-Medium', fontSize: 14, fontWeight: 'bold', justifyContent: 'center' }} _text={{
                    color: "#EFB600"
                }}>
                    Zaloguj się
                </Link>
            </View>
        </SafeAreaView>
    );
};

export default Register;