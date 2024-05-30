import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginPage = () => {
    // State variables for username and password
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

     // Handle login function
    const handleLogin = async () => {
        const user = { username, password };
    
        try {
            // Retrieve stored token from AsyncStorage
            const token = await AsyncStorage.getItem('userToken');
             // Make a POST request to the login endpoint
            const response = await fetch('http://192.168.1.13:8089/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, 
                },
                body: JSON.stringify(user),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
    
            if (data.token) {
                // Successful login
                console.log('Login successful!');
                // Store the token and username in AsyncStorage
                await AsyncStorage.setItem('userToken', data.token);
                await AsyncStorage.setItem('username', username);
                // Navigate to the Home screen
                navigation.navigate('Home');
                console.log(data)
            } else {
                // Invalid username or password
                console.log('Invalid username or password');
            }
        } catch (error) {
            // Log any errors
            console.error('Error:', error);
        }
    };
    
    // Handle signup navigation
    const handleSignup = () => {
        navigation.navigate('InvidualSignup');
    };

    return (
        <View style={styles.container}>
            <View style={styles.pageWrapper}>
                <View style={styles.contentWrapper}>
                    <View style={styles.row}>
                        <View style={styles.col}>
                            <View style={styles.form}>
                                <Text style={styles.title}>Let's Start!</Text>
                                <Text style={styles.subtitle}>Sign in To Continue</Text>
                                <View style={styles.formGroup}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Username"
                                        autoCapitalize="none"
                                        onChangeText={setUsername}
                                        value={username}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Password"
                                        secureTextEntry={true}
                                        onChangeText={setPassword}
                                        value={password}
                                    />
                                    <TouchableOpacity style={styles.forgotPassword}>
                                        <Text style={styles.forgotPasswordText}>Forgot Password</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                                        <Text style={styles.loginButtonText}>Login</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.loginButton} onPress={handleSignup}>
                                        <Text style={styles.loginButtonText}>Sign Up</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    pageWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentWrapper: {
        width: '100%',
    },
    row: {
        flexDirection: 'row',
    },
    col: {
        flex: 1,
        alignItems: 'center',
    },
    form: {
        backgroundColor: '#fff',
        width: '80%',
        borderRadius: 10,
        padding: 20,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        color: 'grey',
        marginBottom: 20,
        textAlign: 'center',
    },
    formGroup: {
        width: '100%',
    },
    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 15,
        alignItems: 'center',
    },
    checkboxLabel: {
        marginLeft: 8,
        fontSize: 16,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
    },
    forgotPasswordText: {
        color: '#9c27b0',
    },
    loginButton: {
        backgroundColor: '#f06292',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 10,
    },
    loginButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default LoginPage;
