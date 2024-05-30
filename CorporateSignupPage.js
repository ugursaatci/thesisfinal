import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const CorporateSignupPage = () => {
    // State variables for form fields
    const [marketName, setMarketName] = useState('');
    const [branchNumber, setBranchNumber] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    // Fetch data from AsyncStorage on component mount
    useEffect(() => {
        const fetchAsyncStorageData = async () => {
            const fetchedMarketName = await AsyncStorage.getItem('marketName');
            const fetchedBranchNumber = await AsyncStorage.getItem('branchNumber');
            const fetchedPassword = await AsyncStorage.getItem('password');

            console.log('Fetched Data:', {
                fetchedMarketName,
                fetchedBranchNumber,
                fetchedPassword
            });

            setMarketName(fetchedMarketName || '');
            setBranchNumber(fetchedBranchNumber || '');
            setPassword(fetchedPassword || '');
        };

        fetchAsyncStorageData();
    }, []);

    // Handle signup function
    const handleSignup = async () => {
        console.log('Market Name:', marketName);
        console.log('Branch Number:', branchNumber);
        console.log('Password:', password);

        // Check if all fields are filled
        if (marketName !== '' && branchNumber !== '' && password !== '') {
            try {
                const user = { marketName, branchNumber, password };
                console.log(user);

                // Make a POST request to the signup endpoint
                const response = await fetch("http://192.168.1.13:8089/corporate/user", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(user)
                });

                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }

                const data = await response.json();
                console.log('Success:', data);
                Alert.alert('Registration Successful', 'Your registration was successful.');
                // Store token in AsyncStorage
                await AsyncStorage.setItem('userToken', data.token);
                navigation.navigate('LoginPage'); 
            } catch (error) {
                // Log any errors and show an alert
                console.error('Error:', error);
                Alert.alert('Registration Failed', `An error occurred during registration: ${error.message}`);
            }
        } else {
            // Alert if any field is empty
            Alert.alert('Sign Up Error!', 'You Must Fill the Required Areas!');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.pageWrapper}>
                <View style={styles.contentWrapper}>
                    <View style={styles.row}>
                        <View style={styles.col}>
                            <View style={styles.form}>
                                <Text style={styles.title}>Corporate Sign Up</Text>
                                <Text style={styles.subtitle}>Create an Account</Text>
                                <View style={styles.formGroup}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Market Name"
                                        autoCapitalize="none"
                                        onChangeText={setMarketName}
                                        value={marketName}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Branch Number"
                                        autoCapitalize="none"
                                        onChangeText={setBranchNumber}
                                        value={branchNumber}
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

export default CorporateSignupPage;
