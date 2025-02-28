/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable no-return-assign */
/* eslint-disable keyword-spacing */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */



import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigationRef } from './RootNavigator';
import SplashScreen from "../Screens/Splash";
import LoginScreen from '../Screens/ContactListing';
import ContactDetailScreen from '../Screens/ContactDetail';


export type RootStackParamList = {
    SplashScreen: any ;
    LoginScreen:any;
    ContactDetailScreen:any;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator: React.FC  = () =>{
    const routeNameRef = React.createRef();
    const [currentRootName, setCurrentRootName] = React.useState('SplashScreen')


    return(
        <NavigationContainer
        ref={navigationRef}
        onReady={() => routeNameRef.current = navigationRef.current.getCurrentRoute().name}
        onStateChange={() => {
            const currentRouteName = navigationRef.current.getCurrentRoute().name
            setCurrentRootName(currentRouteName)
        }}
        >
            <Stack.Navigator screenOptions={{headerShown:false,gestureEnabled:false}}>
                <Stack.Screen name='SplashScreen' component={SplashScreen}/>
                <Stack.Screen name ='LoginScreen' component={LoginScreen}/>
                <Stack.Screen name="ContactDetailScreen" component={ContactDetailScreen}/>

                
            </Stack.Navigator>

        </NavigationContainer>
    )
}
export default StackNavigator;