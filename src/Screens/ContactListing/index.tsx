import React, { useEffect, useState, useCallback } from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Platform,
  PermissionsAndroid,
  Alert,
  FlatList,
  TextInput,
  ActivityIndicator,
  Pressable
} from 'react-native';
import { useTheme } from '../../Themes';
import Contacts from 'react-native-contacts';
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';

interface Contact {
  name: string;
  phoneNumbers: string[];
}

const PAGE_SIZE = 20;

const ContactsScreen: React.FC = ({navigation}) => {
  const theme = useTheme();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const checkContactsPermission = async () => {
    if (Platform.OS === 'android') {
      return await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_CONTACTS);
    } else {
      const result = await check(PERMISSIONS.IOS.CONTACTS);
      return result === RESULTS.GRANTED;
    }
  };

  const getContacts = async () => {
    console.log("Checking permission before fetching contacts...");
    const hasPermission = await checkContactsPermission();
  
    if (hasPermission) {
      try {
        console.log("Fetching contacts...");
        const contactsList = await Contacts.getAll();
  
        const filteredContacts = contactsList
          .map((contact) => {
            const uniqueNumbers = new Map();
  
            contact.phoneNumbers.forEach((phone) => {
              const normalizedNumber = phone.number.replace(/\D/g, "");
              if (!uniqueNumbers.has(normalizedNumber)) {
                uniqueNumbers.set(normalizedNumber, phone.number);
              }
            });
  
            return {
              name: contact.displayName,
              phoneNumbers: Array.from(uniqueNumbers.values()), 
            };
          })
          .filter((contact) => contact.phoneNumbers.length > 0) 
          .sort((a, b) => a.name.localeCompare(b.name));
  
        setContacts(filteredContacts);
        setFilteredContacts(filteredContacts.slice(0, PAGE_SIZE));
        setLoading(false);
      } catch (error) {
        console.log("Error fetching contacts:", error);
        setLoading(false);
      }
    } else {
      console.log("Permission not granted, cannot fetch contacts.");
      Alert.alert(
        "Permission Required",
        "Contacts permission is required to fetch contacts.",
        [{ text: "OK" }]
      );
    }
  };
  
  
  
  
  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text.trim() === '') {
      setFilteredContacts(contacts.slice(0, PAGE_SIZE));
    } else {
      const filtered = contacts.filter(contact =>
        contact.name.toLowerCase().includes(text.toLowerCase()) ||
        contact.phoneNumbers.some(num => num.includes(text))
      );
      setFilteredContacts(filtered);
    }
  };

  const loadMoreContacts = useCallback(() => {
    if (loadingMore || filteredContacts.length >= contacts.length) return;

    setLoadingMore(true);
    const nextPage = page + 1;
    setTimeout(() => {
      setFilteredContacts(prev => [...prev, ...contacts.slice(prev.length, nextPage * PAGE_SIZE)]);
      setPage(nextPage);
      setLoadingMore(false);
    }, 500); // Simulate API delay
  }, [page, contacts, filteredContacts, loadingMore]);

  const renderItem = useCallback(({ item }: { item: Contact }) => {
    const firstLetter = item.name ? item.name.charAt(0).toUpperCase() : "+91";
  
    return (
      <Pressable 
        onPress={() => navigation.navigate("ContactDetailScreen", { contact: item })} 
        style={styles.contactItem}
      >
        <View style={styles.profileImage}>
          <Text style={styles.imageText}>{firstLetter}</Text>
        </View>
        <Text style={[styles.contactName, { color: theme.text }]}>
          {item.name || "+91"}
        </Text>
      </Pressable>
    );
  }, [navigation, theme]);
  
  

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <SafeAreaView style={[styles.safeAreaContainer, { backgroundColor: theme.background }]}>
      <StatusBar hidden={false} barStyle="light-content" backgroundColor="transparent" translucent={true} />
      <View style={[styles.contentContainer, { backgroundColor: theme.background }]}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Contacts..."
          placeholderTextColor={'grey'}
          value={searchText}
          onChangeText={handleSearch}
        />

      <Pressable
       onPress={() => navigation.navigate("ContactDetailScreen", { contact: null })} 
       style={styles.searchInput1}>
        <Text style={{fontSize:16,color:'black'}}> Add New Contact</Text>
      </Pressable>

        {loading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : (
          <FlatList
            data={filteredContacts}
            keyExtractor={(item, index) => `${item.name}-${index}`}
            renderItem={renderItem}
            onEndReached={loadMoreContacts}
            onEndReachedThreshold={0.5}
            ListFooterComponent={loadingMore ? <ActivityIndicator size="small" color="blue" /> : null}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ContactsScreen;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    marginTop: 35,
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    color:'grey',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingLeft: 10,
  },
  searchInput1: {
    height: 40,
    borderColor: '#ccc',
    color:'grey',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
   justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#9dc2b7'
  },
  contactItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    flexDirection:'row',
    alignItems: 'center',
    gap:10
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  phoneNumber: {
    fontSize: 14,
    color: '#555',
  },
  profileImage: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageText: {
    fontSize: 20,
    color: 'white',
  },
});
