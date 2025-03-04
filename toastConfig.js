/*eslint-disable*/
import React from 'react';
import { BaseToast } from 'react-native-toast-message';

export const toastConfig = {
    success: (props) => (
        <BaseToast
            {...props}
            style={{
                borderLeftColor: '#007A63',
                backgroundColor: '#F0FFF0',
                borderRadius: 10,
                paddingHorizontal: 15,
            }}
            contentContainerStyle={{
                paddingHorizontal: 15,
            }}
            text1Style={{
                fontSize: 18,
                fontFamily: 'montserrat-bold',
                color: '#007A63',
            }}
            text2Style={{
                fontSize: 14,
                fontFamily: 'montserrat-regular',
                color: '#007A63',
            }}
        />
    ),
    error: (props) => (
        <BaseToast
            {...props}
            style={{
                borderLeftColor: '#FF0000',
                backgroundColor: '#FFF0F0',
                borderRadius: 10,
                paddingHorizontal: 15,
            }}
            contentContainerStyle={{
                paddingHorizontal: 15,
            }}
            text1Style={{
                fontSize: 18,
                fontFamily: 'montserrat-bold',
                color: '#FF0000',
            }}
            text2Style={{
                fontSize: 14,
                fontFamily: 'montserrat-regular',
                color: '#FF0000',
            }}
        />
    ),
    info: (props) => (
        <BaseToast
            {...props}
            style={{
                borderLeftColor: '#4A73DA',
                backgroundColor: '#F0F4FF',
                borderRadius: 10,
                paddingHorizontal: 15,
            }}
            contentContainerStyle={{
                paddingHorizontal: 15,
            }}
            text1Style={{
                fontSize: 18,
                fontFamily: 'montserrat-bold',
                color: '#4A73DA',
            }}
            text2Style={{
                fontSize: 14,
                fontFamily: 'montserrat-regular',
                color: '#4A73DA',
            }}
        />
    ),
    warn: (props) => (
        <BaseToast
            {...props}
            style={{
                borderLeftColor: '#FFA500',
                backgroundColor: '#FFFAF0',
                borderRadius: 10,
                paddingHorizontal: 15,
            }}
            contentContainerStyle={{
                paddingHorizontal: 15,
            }}
            text1Style={{
                fontSize: 18,
                fontFamily: 'montserrat-bold',
                color: '#FFA500',
            }}
            text2Style={{
                fontSize: 14,
                fontFamily: 'montserrat-regular',
                color: '#FFA500',
            }}
        />
    ),
};
