

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Dimensions, FlatList } from 'react-native';
import { useTheme } from '../../Themes';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch,useSelector } from 'react-redux';
import { addToCart, updateQuantity, selectCart,clearCart } from '../../Redux/CartSlice';
import { useNavigation } from '@react-navigation/native';



const { width, height } = Dimensions.get('window');


const CartScreen = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCart);
    const navigation = useNavigation(); 
    const totalPrice = cartItems.reduce((total, item) => {
        return total + item.product_price * item.quantity;
    }, 0);

    const renderItem = (item) => {
        const product = item.item;
        const cartItem = cartItems.find(cartItem => cartItem.product_id === product.product_id);
        const quantity = cartItem ? cartItem.quantity : 1;

        const handleIncreaseQuantity = () => {
            if (cartItem) {
                dispatch(updateQuantity({ product_id: product.product_id, quantity: quantity + 1 }));
            } else {
                dispatch(addToCart({ ...product, quantity: 1 }));
            }
        };

        const handleDecreaseQuantity = () => {
            if (quantity > 1) {
                dispatch(updateQuantity({ product_id: product.product_id, quantity: quantity - 1 }));
            } else {
                dispatch(updateQuantity({ product_id: product.product_id, quantity: 0 }));
            }
        };

        return (
            <View style={styles.itemRow}>
                <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>{item?.item?.product_name}</Text>
                </View>
                <View style={styles.priceQuantity}>
                    <Text style={styles.price}>Price: ₹ {item?.item?.product_price}</Text>
                    <View style={styles.quantityControls}>
                        <TouchableOpacity onPress={handleDecreaseQuantity}>
                            <Text style={styles.quantityButton}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantity}>{quantity}</Text>
                        <TouchableOpacity onPress={handleIncreaseQuantity}>
                            <Text style={styles.quantityButton}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={[styles.headerText, { color: theme.textColor1 }]}>Cart</Text>
            </View>
            <View style={styles.section}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={styles.sectionTitle}>Cart details</Text>
                    <Text onPress={() => dispatch(clearCart())} style={[styles.sectionTitle, { backgroundColor: '#f0f0f0', color: 'red', padding: 10, borderRadius: 8 }]}>Clear Cart</Text>
                </View>
                <FlatList
                    data={cartItems}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.base_product_id}
                    ListEmptyComponent={<Text style={styles.emptyText}>Your cart is empty</Text>}
                />
                <TouchableOpacity onPress={()=> navigation.navigate('Home')} style={styles.addItemButton}>
                    <Text style={styles.addItemText}>Add another item</Text>
                    <Icon name="plus" size={16} color="#008000" />
                </TouchableOpacity>
            </View>

            <View style={styles.container1}>
                <Text style={styles.title}>Billing details</Text>
                <View style={styles.item}>
                    <Text style={styles.itemLabel}>Item Total</Text>
                    <Text style={styles.itemValue}>₹{totalPrice.toFixed(2)}</Text>
                </View>
            </View>
        </ScrollView>
    );
};


export default CartScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 16,
        marginTop: 20
    },
    container1: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 16,
        marginTop: 10,
        marginBottom: 20
    },
    header: {
        flexDirection: 'row',
        gap:20,
        paddingVertical: 25,
    },
    headerText: {
        fontSize: 18,
        fontWeight: '700',


    },
    section: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#000'

    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'grey'
    },
    itemSubtitle: {
        fontSize: 14,
        color: '#666',
    },
    customizeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    customizeText: {
        color: '#008000',
        marginRight: 4,
    },
    priceQuantity: {
        alignItems: 'flex-end',
    },
    price: {
        fontSize: 16,
        marginBottom: 4,
        color: '#000',
        fontWeight: '500'
    },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        fontSize: 20,
        paddingHorizontal: 12,
        color: '#008000',
    },
    quantity: {
        fontSize: 16,
        paddingHorizontal: 8,
        color: '#008000',
    },
    addItemButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        justifyContent: 'center',
    },
    addItemText: {
        color: '#008000',
        marginRight: 4,
    },
    offerDescription: {
        color: '#666',
        marginBottom: 12,
    },
    appliedOffer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    appliedOfferText: {
        fontSize: 16,
        color: '#000'
    },
    offerAmount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000'
    },
    removeButton: {
        backgroundColor: '#f0f0f0',
        padding: 8,
        borderRadius: 4,
    },
    removeText: {
        color: '#008000',
    },
    viewCouponsButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    viewCouponsText: {
        fontSize: 16,
        fontWeight: '400',
        color: '#000'
    },
    deliverySlotButton: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'grey',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        justifyContent: 'space-between'
    },
    deliverySlotText: {
        fontSize: 16,
        fontWeight: '400',
        color: '#000'
    },
    tipDescription: {
        fontSize: 16,
        fontWeight: '400',
        color: '#000'
    },
    tipButtonText: {
        fontSize: 18,
        fontWeight: '400',
        color: '#000'
    },
    tipButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    tipButton: {
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#EEEEEE',
        paddingHorizontal: 20,
        paddingVertical: 10,
        //marginRight:15,
        marginTop: 10
    },
    tipInput: {
        borderWidth: 1,
        borderColor: '#EEEEEE',
        marginTop: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        fontSize: 14,
        paddingLeft: 10,
        color: '#000'

    },
    saveTipText: {
        color: '#707070',
        fontSize: 14
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color:'#333132'
      },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    itemLabel: {
        fontSize: 16,
        color: '#333',
    },
    itemValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    addProductsText: {
        color: '#008000',
        marginTop: 20,
        marginBottom: 10,
    },
    reviewOrderText: {
        color: '#333',
        marginBottom: 10,
    },
    noteText: {
        color: '#333',
        marginBottom: 5,
    },
    noteBold: {
        fontWeight: 'bold',
    },
    cancellationText: {
        color: '#333',
        marginBottom: 10,
    },
    cancellationPolicyLink: {
        color: '#008080',
        textDecorationLine: 'underline',
    },
    emptyText: { 
        textAlign: "center", 
        marginTop: 20,
         fontSize: 16, 
         color: "#888" ,
         marginBottom:15
        }
})