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
import { Text, View, StyleSheet, Dimensions, StatusBar, FlatList, TextInput, Image, ScrollView, TouchableOpacity ,Alert} from 'react-native';
import { useTheme } from '../../Themes';
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from 'react-native-vector-icons/FontAwesome'
import SampleData from '../../Components/Assets/BackendData.json'
import { useDispatch,useSelector } from 'react-redux';
import { addToCart,selectCart  } from '../../Redux/CartSlice';
const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  const theme = useTheme()
  const dispatch = useDispatch();
  const [data, setData] = useState([])
  const [loader, setLoader] = useState(false)
  const [value, setValue] = useState('')
  const [filteredData, setFilteredData] = useState('')
  const cartItems = useSelector(selectCart);
  const filterHeads = ['Recommended', 'Breads', 'Juices', 'Salads']

  const handleAddToCart = (item) => {
    const isItemInCart = cartItems.some(cartItem => cartItem.base_product_id === item.base_product_id);
  
    if (isItemInCart) {
      Alert.alert("Item Already in Cart", "This item is already added to the cart.");
    } else {
    dispatch(addToCart({ ...item, quantity: 1 }));
      Alert.alert("Item Added", "The item has been added to your cart.");
    }
  };


  const renderItem = (item) => {
    return (
      <View style={styles.card}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Best Seller</Text>
        </View>

        <TouchableOpacity style={styles.heartIcon}>
          <Icon name="heart" size={24} color="#008000" />
        </TouchableOpacity>

        <Image
          source={{ uri: item?.item?.product_details?.images[0] }} // Replace with your image URL
          style={styles.image}
        />

        <View style={styles.customizable}>
          <Icon name="sliders" size={16} color="#000" />
          <Text style={styles.customizableText}>Customizable</Text>
        </View>

        <Text style={styles.title}>{item?.item?.label}</Text>

        <View style={styles.rating}>
          <Text style={styles.ratingText}>4.3</Text>
          <Icon name="star" size={16} color="#FFD700" />
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>₹{item?.item?.price}</Text>

          <TouchableOpacity onPress={()=>handleAddToCart(item.item)} style={styles.plusButton}>
            <Text style={styles.plusButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }




  return (
    <>
      <StatusBar hidden={false} barStyle='light-content' backgroundColor={'transparent'} translucent={true} />
      <ScrollView style={[styles.safeAreaContainer, { backgroundColor: theme.backWhite }]}>
        <View style={styles.header}>
          <Feather size={22} name='arrow-left' color={theme.textColor1} />
          <Text style={[styles.headerText, { color: theme.textColor1 }]}>Arabian Delight Restaurant</Text>
        </View>

        <View style={[styles.cardView, { backgroundColor: theme.background }]}>
          <View style={styles.cardView1}>
            <View style={styles.mainImageView}>
              <Image style={{ height: 80, width: 100, borderRadius: 20 }} source={{ uri: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg' }} />
            </View>
            <View style={styles.mainDetailView}>
              <Text style={[styles.restHead, { color: theme.textColor1 }]}>Arabian Delight Restaurant</Text>
              <Text style={[styles.restHead1, { color: theme.textColor1 }]}>4.3  <Entypo size={22} name='star' color={'#FDCC0D'} />  ( 579 Reviews)</Text>
              <Text style={[styles.restHead2, { color: theme.textColor2 }]}>North Indian, South Indian...</Text>
              <Text style={[styles.restHead2, { color: theme.textColor2 }]}>Kazhakootam  |  2 km</Text>

            </View>
          </View>
          <View style={{ flexDirection: 'row', paddingHorizontal: 10, justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={[styles.restHead3, { color: theme.textColor1 }]}>
              <MaterialCommunityIcons size={22} name='bicycle' color={theme.textColor1} /> Delivery in <Text style={[styles.restHead1, { color: theme.textColor1 }]}>30 mins |</Text> Free Delivery</Text>
            <Text style={[styles.restHead3, { color: '#28AF4B', alignItems: 'center' }]}>Address Lane 1<Feather style={{ marginTop: 5 }} name={'chevron-down'} size={18} color={'#28AF4B'} />  </Text>

          </View>

        </View>


        <Text style={[styles.Offertext, { color: theme.textColor1 }]}>Offers Available </Text>

        <View style={[styles.offerCard, { backgroundColor: theme.background }]}>
          <Image style={{ height: 50, width: 50 }} source={require('../../Components/Assets/coins.png')} />
          <View style={{ flex: 1, flexWrap: 'wrap' }}>
            <Text style={[styles.headerText, { color: theme.textColor1 }]}>35% Off  upto ₹ 180</Text>
            <Text style={[styles.restHead1, { color: theme.textColor1, width: '100%', flexWrap: 'wrap' }]}>Use coupon code LILO for orders above ₹ 350</Text>

          </View>

        </View>


        <View style={styles.Inputbox}>
          <TextInput value={value}
            onChangeText={(text) => setValue(text)}
            placeholder='Search...'
            placeholderTextColor={theme.textColor2}
            style={{ color: theme.textColor1, fontSize: 20, width: '90%' }} />
          <Feather name='search' color={theme.textColor1} size={20} />
        </View>


        <FlatList
          data={filterHeads}
          horizontal
          style={{
            height: height * 0.05, // Reduce height
            marginBottom: 10
          }}
          contentContainerStyle={{
            alignItems: 'center', // Align items within the reduced height
            paddingVertical: 5,   // Adjust spacing if needed
          }}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                height: 40,
                padding: 10,
                borderRadius: 20,
                backgroundColor: item === 'Recommended' ? '#D6EFDD' : '#F5F5F5',
                marginRight: 10, // Space between items
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: '600', color: theme.textColor2 }}>
                {item}
              </Text>
            </View>
          )}
        />

        <FlatList
          data={SampleData?.content}
          numColumns={2}
          style={{
            marginBottom: 10
          }}
          contentContainerStyle={{
            alignItems: 'center', // Align items within the reduced height
            paddingVertical: 5,   // Adjust spacing if needed
          }}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />




      




      </ScrollView>
    </>

  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingVertical: 30,
    paddingHorizontal: 20

  },
  header: {
    flexDirection: 'row',
    gap: width * 0.156,
    padding: 25,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',


  },
  cardView: {
    marginVertical: 10,
    borderRadius: 10,
    paddingBottom: 5
  },
  cardView1: {
    flexDirection: 'row',
    paddingTop: 10,


  },
  mainImageView: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,

  },
  mainDetailView: {
    flex: 2.5,
    padding: 10
  },

  restHead: {
    fontSize: 20,
    fontWeight: 'bold'
  },

  restHead1: {
    fontSize: 18,
    fontWeight: 'medium'
  },

  restHead2: {
    fontSize: 18,
    fontWeight: '500'
  },
  restHead3: {
    fontSize: 13,
    fontWeight: '500'
  },

  Offertext: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 10
  },
  offerCard: {

    marginBottom: 10,
    padding: 10,
    flexDirection: 'row',
    borderRadius: 20
  },

  Inputbox: {
    backgroundColor: '#F5F5F5',
    marginVertical: 10,
    borderRadius: 20,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  listView: {
    // backgroundColor:'#fff'
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    margin: 10,
    width: width *0.42,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  badge: {
    backgroundColor: '#90EE90', // Light green
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    position: 'absolute',
    top: 10,
    left: 10,
  },
  badgeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
    marginTop:25
  },
  customizable: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  customizableText: {
    marginLeft: 4,
    color:'grey'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color:'#000'
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingText: {
    marginRight: 4,
    color:'#000'
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color:'#000'
  },
  plusButton: {
    backgroundColor: '#008000', // Green
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusButtonText: {
    color: '#fff',
    fontSize: 24,
  },
});