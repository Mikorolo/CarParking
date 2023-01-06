import axios from 'axios';
import { FormControl, Input, VStack, View, Link, HStack } from 'native-base';
import React, { useContext, useState } from 'react';
import { Dimensions, SafeAreaView, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { AuthContext } from '../../context/AuthProvider';

const Login = ({ navigation }) => {
    const { login, fetchUserDetails, fetchUserPhoto } = useContext(AuthContext);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    return (
        <View height={"full"} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#1B1F2D' }}>
            <Text style={{ color: "#71767D", position: 'absolute', top: Dimensions.get("screen").height / 5, fontFamily: 'Roboto-Medium', fontSize: 25}}>Witaj z powrotem</Text>
            <Text style={{ color: "#71767D", position: 'absolute', top: Dimensions.get("screen").height / 4.1, fontFamily: 'Roboto-Medium', fontSize: 16}}>Zaloguj się aby przejść dalej</Text>
            <View style={{ width: Dimensions.get('window').width - (Dimensions.get('screen').width / 10) }}>
                <VStack>
                    <FormControl style={{ marginVertical: 10 }}
                        isRequired>
                        <TextInput
                            placeholder="Email"
                            style={{
                                backgroundColor: '#333741',
                                borderRadius: 10
                            }}
                            placeholderTextColor="#71767D"
                            theme={{colors: {text: 'white' }}}
                            selectionColor='#EFB600'
                            activeUnderlineColor='#EFB600'
                            right={<TextInput.Icon icon="email" color="gray"/>}
                            type='text'
                            mode='flat'
                            value={email}
                            onChangeText={value =>
                                setEmail(value)}
                        />
                    </FormControl>
                    <FormControl isRequired style={{ marginVertical: 10 }}>
                        <TextInput
                            placeholder="Hasło"
                            theme={{colors: {text: 'white' }}}
                            style={{
                                backgroundColor: '#333741',
                                borderRadius: 10
                            }}
                            placeholderTextColor="#71767D"
                            right={<TextInput.Icon icon="lock" color="gray"/>}
                            mode='flat'
                            selectionColor='#EFB600'
                            activeUnderlineColor='#EFB600'
                            value={password}
                            secureTextEntry={true}
                            onChangeText={value =>
                                setPassword(value)}
                        />
                    </FormControl>
                    <Button onPress={async () => { await login(email, password); await fetchUserDetails() }}
                        style={{ marginTop: 15, height: Dimensions.get('screen').height / 18, display: 'flex', justifyContent: 'center', borderRadius: 10 }}
                        mode='contained'
                        color='#EFB600'
                    >
                        <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 14, fontWeight: 'bold', textAlignVertical: 'center' }}>Zaloguj się</Text>
                    </Button>
                </VStack>
            </View>
            <View style={{
                position: 'absolute',
                bottom: 15
            }}>
                <Text style={{ color: 'white', fontFamily: 'Roboto-Medium', fontSize: 14, fontWeight: 'bold', textAlignVertical: 'center' }}>Nie masz konta?</Text>
                <Link onPress={() => navigation.navigate('Register')} style={{ fontFamily: 'Roboto-Medium', fontSize: 14, fontWeight: 'bold', justifyContent: 'center' }} _text={{
                    color: "#EFB600"
                }}>
                    Zarejestruj się
                </Link>
            </View>
        </View>
    );
};

export default Login;