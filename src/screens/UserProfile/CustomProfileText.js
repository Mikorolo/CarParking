import { Text, View } from 'native-base';
import React from 'react';

const CustomProfileText = ({ userInfo, title }) => {
    return (
        <View>
            <Text
                style={{
                    fontFamily: 'Roboto-Medium',
                    fontWeight: 'bold',
                    fontSize: 20,
                    color: 'white',
                    textAlign: 'center',
                    marginTop: 15
                }}>
                {title}
            </Text>
            <Text
            style={{
                textAlign: 'center',
                color: 'white',
                fontFamily: 'Roboto-Regular',
                fontSize: 15,
                marginTop: 2,
                marginBottom: 4
            }}>
                {userInfo}
            </Text>
        </View>
    );
};

export default CustomProfileText;