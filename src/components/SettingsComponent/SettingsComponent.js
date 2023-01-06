import React, { useContext } from 'react';
import { Center, Heading, Container, Text, Divider, HStack, VStack, Switch, Button } from "native-base";
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { View } from "react-native";
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { AuthContext } from '../../context/AuthProvider';

const Settings = ({ settingsOptions }) => {
    const { autoReservation, notifications } = useContext(AuthContext)

    return (
        <ScrollView style={{ backgroundColor: '#262829' }}>
            {settingsOptions.map(({ id, title, subTitle, onPress, icon, switcher }) => (
                <TouchableOpacity key={title} onPress={onPress}>
                    <View style={{
                        paddingHorizontal: 20,
                        paddingBottom: 20,
                        paddingTop: 20
                    }}>
                        <HStack>
                            <FontAwesome5Icon name={icon}
                                size={25}
                                color="white"
                                style={{ marginRight: 10 }} />
                            <Text style={{
                                fontSize: 17,
                                color: 'white',
                                fontFamily: 'Roboto-Medium',
                                fontWeight: '300',
                                textAlign: 'center',
                                textAlignVertical: 'center'
                            }}>
                                {title}
                            </Text>
                            {id === 2 ?
                                <FontAwesome5Icon name={switcher && id === 2 && autoReservation ? "check" : "ban"}
                                    size={20}
                                    color={switcher && autoReservation && id === 2 ? "lightgreen" : "red"}
                                    style={{
                                        position: 'absolute',
                                        right: 0,
                                    }}
                                /> :
                                id === 3 ?
                                    <FontAwesome5Icon name={switcher && id === 3 && notifications ? "check" : "ban"}
                                        size={20}
                                        color={switcher && notifications && id === 3 ? "lightgreen" : "red"}
                                        style={{
                                            position: 'absolute',
                                            right: 0,
                                        }}
                                    /> :
                                    <FontAwesome5Icon name={"chevron-right"}
                                        size={20}
                                        color={"white"}
                                        style={{
                                            position: 'absolute',
                                            right: 0,
                                        }}
                                    />}
                        </HStack>
                    </View>
                    <Divider bg="#515357" thickness="2" />
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

export default Settings;