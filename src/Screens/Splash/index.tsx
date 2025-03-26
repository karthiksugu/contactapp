


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
    const isItemInCart = cartItems.some(cartItem => cartItem.product_id === item.product_id);
  
    if (isItemInCart) {
      Alert.alert("Already in Cart");
    } else {
    dispatch(addToCart({ ...item, quantity: 1 }));
      Alert.alert("Item Added", "The item has been added to your cart.");
    }
  };


  const renderItem = (item) => {
    return (
      <View style={styles.card}>


        <Image
          source={{ uri: item?.item?.image }} // Replace with your image URL
          style={styles.image}
        />


        <Text style={styles.title}>{item?.item?.product_name}</Text>

        <View style={styles.rating}>
          <Text style={styles.ratingText}>4.3</Text>
          <Icon name="star" size={16} color="#FFD700" />
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>₹{item?.item?.product_price}</Text>

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
          <Text style={[styles.headerText, { color: theme.textColor1 }]}>Online Store</Text>
        </View>


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
    gap: 20,
    paddingVertical: 25,
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