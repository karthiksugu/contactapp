/* eslint-disable @typescript-eslint/no-unused-vars */
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


import React, { useEffect, useState, useRef } from 'react';
import { Text, View, StyleSheet, Dimensions, StatusBar} from 'react-native';
import { useTheme } from '../../Themes';


const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  navigation: any;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation}) => {
  const theme = useTheme()

useEffect(()=>{
  setTimeout(() => {
   navigation.replace('LoginScreen')
  }, 1000);
},[])
 
  return (
<>
<StatusBar hidden={false} barStyle='light-content' backgroundColor={'transparent'} translucent={true} />
  <View style={[styles.safeAreaContainer,{backgroundColor:theme.background}]}>
   <Text style={[styles.logo,{color:theme.text}]}>Contacts</Text>
  </View>
</>
  
)
}

export default SplashScreen;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'red'
    
  },
 logo:{
  fontSize:54,
  fontWeight:'800' ,
  lineHeight:81,
  
  
 }
})