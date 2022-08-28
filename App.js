import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContextProvider } from './src/contexts/AuthContext';
import {NavigationContainer} from '@react-navigation/native';
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <AppNavigator />
    </NavigationContainer>
    </AuthContextProvider>
  )
}

const styles = StyleSheet.create({})