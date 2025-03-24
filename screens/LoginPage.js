import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';
import { Block, Text, theme, Button, Toast } from 'galio-framework';
import { Input } from '../components';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { nowTheme } from '../constants';
import { useNavigation } from '@react-navigation/native';
import { loginUser } from '../services/authService'; // Import login function

const { width } = Dimensions.get('screen');

const LoginPage = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false); // For loading indicator
  const navigation = useNavigation();

  // Function to handle login
  const handleLogin = async () => {
    const username = 'test'; // Replace these with actual input values
    const password = 'test'; // Replace with actual password input

    setLoading(true); // Start loading indicator

    try {
      console.log('2');
      // Call the loginUser function from authService
      const response = await loginUser(username, password);
      console.log('2');
      
      if (response === 200) {
        //navigation.navigate('Home');
        Alert.alert('Error', 'Login Successfully');
      } else {
        // If login failed, show an error message
        Alert.alert('Error', 'Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred. Please try again later.');
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  return (
    <Block flex center>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30, width }}>
        <Block flex style={styles.group}>
          <Text size={20} style={styles.title}>Login</Text>

          {/* Username Input */}
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Input
              placeholder="Username"
              shadowless
              iconContent={<Icon size={20} style={{ marginRight: 10 }} color={nowTheme.COLORS.ICON} name="account" />}
            />
          </Block>

          {/* Password Input with Toggle */}
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Input
              placeholder="Password"
              secureTextEntry={!isPasswordVisible}
              shadowless
              iconContent={
                <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                  <Icon size={20} style={{ marginRight: 10 }} color={nowTheme.COLORS.ICON} name={isPasswordVisible ? "eye-off" : "eye"} />
                </TouchableOpacity>
              }
            />
          </Block>

          {/* Login Button */}
          <Block center style={{ marginTop: theme.SIZES.BASE * 2 }}>
            <Button
              color="primary"
              round
              shadowless
              style={styles.loginButton}
              onPress={handleLogin} // Call the handleLogin function when the button is pressed
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" /> // Show loading indicator
              ) : (
                'LOGIN'
              )}
            </Button>
          </Block>

        </Block>
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'montserrat-bold',
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 44,
    textAlign: 'center',
    color: nowTheme.COLORS.HEADER,
    fontSize: 22
  },
  group: {
    paddingTop: theme.SIZES.BASE * 3,
    width: width * 1,
  },
  loginButton: {
    width: width * 0.6,
    height: 50,
  },
});

export default LoginPage;
