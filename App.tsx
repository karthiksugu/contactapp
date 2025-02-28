import React, { useEffect } from 'react';
import { PermissionsAndroid, Platform, Alert, Linking } from 'react-native';
import { Provider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';
import ThemeContent from './src/Themes';
import StackNavigator from './src/Navigation/StackNavigator';
import Store from './src/Redux/store';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

function App(): JSX.Element {
  useEffect(() => {
    handleContactsPermission();
  }, []);

  // Function to check contacts permission
  const checkContactsPermission = async () => {
    if (Platform.OS === 'android') {
      return await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_CONTACTS);
    } else {
      const result = await check(PERMISSIONS.IOS.CONTACTS);
      return result === RESULTS.GRANTED;
    }
  };

  // Function to request contacts permission
  const requestContactsPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title: 'Contacts Permission',
            message: 'This app requires access to your contacts.',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (error) {
        console.log('Permission request error:', error);
        return false;
      }
    } else {
      const permission = await request(PERMISSIONS.IOS.CONTACTS);
      return permission === RESULTS.GRANTED;
    }
  };

  // Function to handle permission flow
  const handleContactsPermission = async () => {
    const hasPermission = await checkContactsPermission();
    
    if (hasPermission) {
      console.log('Permission already granted');
    } else {
      console.log('Requesting permission...');
      const permissionGranted = await requestContactsPermission();

      if (!permissionGranted) {
        Alert.alert(
          'Permission Required',
          'You need to allow access to contacts in settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => Linking.openSettings() }
          ]
        );
      }
    }
  };

  return (
      <PaperProvider>
        <ThemeContent>
          <StackNavigator />
        </ThemeContent>
      </PaperProvider>
  );
}

export default App;
