

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from './RootNavigator';
import HomeScreen from "../Screens/Splash";
import CartScreen from "../Screens/Cart";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; 

export type RootStackParamList = {
    Home: undefined;
    Cart: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();

const BottomTabNavigator: React.FC = () => {
    return (
        <NavigationContainer ref={navigationRef}>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => {
                        let iconName;
                        if (route.name === "Home") {
                            iconName = "home-outline";
                        } else if (route.name === "Cart") {
                            iconName = "cart-outline";
                        }
                        return <Icon name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: "blue",
                    tabBarInactiveTintColor: "gray",
                })}
            >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Cart" component={CartScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default BottomTabNavigator;
