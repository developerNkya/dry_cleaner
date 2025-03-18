import React, { useState } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Block, Text, Input, Button } from 'galio-framework';
import { Header, Icon } from '../components';
import { nowTheme } from '../constants';

const { width } = Dimensions.get('screen');

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Add your login logic here
        navigation.navigate('App');
    };

    return ( <
        Block flex style = { styles.container } >
        <
        Header transparent white title = "Welcome Back"
        navigation = { navigation }
        scene = {
            {}
        }
        /> <
        Block flex style = { styles.content } >
        <
        Block middle >
        <
        Text color = { nowTheme.COLORS.PRIMARY }
        size = { 28 } >
        Sign in to
        continue <
        /Text> < /
        Block >

        <
        Block width = { width * 0.8 }
        style = { styles.inputContainer } >
        <
        Input borderless placeholder = "Email"
        iconContent = { <
            Icon
            size = { 16 }
            color = { nowTheme.COLORS.ICON }
            name = "ic_mail_24x24"
            family = "NowExtra" /
            >
        }
        value = { email }
        onChangeText = { setEmail }
        />

        <
        Input borderless placeholder = "Password"
        password viewPass iconContent = { <
            Icon
            size = { 16 }
            color = { nowTheme.COLORS.ICON }
            name = "ic_lock_24x24"
            family = "NowExtra" /
            >
        }
        value = { password }
        onChangeText = { setPassword }
        />

        <
        Button round color = { nowTheme.COLORS.PRIMARY }
        style = { styles.button }
        onPress = { handleLogin } >
        Sign In <
        /Button>

        <
        Block middle >
        <
        TouchableOpacity onPress = {
            () => navigation.navigate('Account')
        } >
        <
        Text color = { nowTheme.COLORS.PRIMARY }
        size = { 16 } >
        Don 't have an account? Sign Up < /
        Text > <
        /TouchableOpacity> < /
        Block > <
        /Block> < /
        Block > <
        /Block>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: nowTheme.COLORS.WHITE,
    },
    content: {
        padding: 20,
    },
    inputContainer: {
        marginTop: 40,
    },
    button: {
        marginTop: 20,
        marginBottom: 20,
    },
});