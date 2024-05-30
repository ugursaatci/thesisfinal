import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import ResultScreen from './ResultScreen';
import LoginPage from './LoginPage';
import CorporateSignupPage from './CorporateSignupPage';
import InvidualSignupPage from './InvidualSignupPage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Result" component={ResultScreen} />
        <Stack.Screen name="CorporateSignup" component={CorporateSignupPage} />
        <Stack.Screen name="InvidualSignup" component={InvidualSignupPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
