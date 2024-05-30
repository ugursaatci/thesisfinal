import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const InvidualSignupPage = () => {
    // State variables for form fields
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    // Handle signup function
    const handleSignup = async () => {
        console.log('Username:', username);
        console.log('First Name:', firstName);
        console.log('Surname Name:', lastName);
        console.log('Phone Number:', phone);
        console.log('Password:', password);
        const user = { username, firstName, lastName, phone, password };
        // Check if all fields are filled
        if (password !== "" && firstName !== "" && lastName !== "" && phone !== "" && username !== "") {
            console.log(user);
            try {
                // Make a POST request to the signup endpoint
                const response = await fetch("http://192.168.1.13:8089/individual/user", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(user)
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Success:', data);
                Alert.alert('Register Successful', 'Your registration was successful.');
                // Store token in AsyncStorage
                await AsyncStorage.setItem('userToken', data.token);
                navigation.navigate('LoginPage');
            } catch (error) {
                // Log any errors
                console.error('Error:', error);
            }
        } else {
            Alert.alert('Sign Up Error!', 'You Must Fill the Required Areas!');
        }
    };
    // Handle corporate signup navigation
    const handleCorporate = () => {
        navigation.navigate('CorporateSignup');
    }

    

    return (
        <View style={styles.container}>
            <View style={styles.pageWrapper}>
                <View style={styles.contentWrapper}>
                    <View style={styles.row}>
                        <View style={styles.col}>
                            <View style={styles.form}>
                                <Text style={styles.title}>Individual Sign Up</Text>
                                <Text style={styles.subtitle}>Create an Account</Text>
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
                                        placeholder="First Name"
                                        autoCapitalize="none"
                                        onChangeText={setFirstName}
                                        value={firstName}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Surname"
                                        autoCapitalize="none"
                                        onChangeText={setLastName}
                                        value={lastName}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Phone Number"
                                        autoCapitalize="none"
                                        onChangeText={setPhone}
                                        value={phone}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Password"
                                        secureTextEntry={true}
                                        onChangeText={setPassword}
                                        value={password}
                                    />
                                    <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
                                        <Text style={styles.signupButtonText}>Sign Up</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.signupButton} onPress={handleCorporate}>
                                        <Text style={styles.signupButtonText}>Corporate Sign Up</Text>
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
    signupButton: {
        backgroundColor: '#f06292',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 10,
    },
    signupButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default InvidualSignupPage;
