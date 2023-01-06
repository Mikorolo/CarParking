import { FormControl, HStack } from 'native-base';
import React from 'react';
import { Dimensions } from 'react-native';
import { TextInput } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const CustomFormInput = ({ label, placeholder, value, onChangeText, iconName, helperText, errorMessage, iconColor }) => {
    return (
        <FormControl>
            <FormControl.Label _text={{
                bold: true
            }}>
                {label}:
            </FormControl.Label>
            <HStack style={{justifyContent: 'center', alignItems: 'center'}}>
                <TextInput
                    style={{
                        backgroundColor: '#333741',
                        borderRadius: 10,
                        width: Dimensions.get("screen").width / 1.3
                    }}
                    placeholderTextColor="#71767D"
                    theme={{ colors: { text: 'white' } }}
                    selectionColor='#EFB600'
                    activeUnderlineColor='#EFB600'
                    mode='flat'
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                />
                <MaterialIcons style={{ textAlignVertical: 'center', marginStart: 10 }} name={iconName} size={22} color={iconColor} />
            </HStack>
            <FormControl.HelperText _text={{
                fontSize: 'xs'
            }}>
                {helperText}
            </FormControl.HelperText>
            <FormControl.ErrorMessage _text={{
                fontSize: 'xs'
            }}>
                {errorMessage}
            </FormControl.ErrorMessage>
        </FormControl>
    );
};

export default CustomFormInput;