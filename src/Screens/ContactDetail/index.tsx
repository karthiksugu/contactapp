

import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    FlatList,
    SafeAreaView,
    Pressable,
    TextInput
} from "react-native";
import Contacts from "react-native-contacts";
import { useNavigation } from "@react-navigation/native";
import BackArrowDark from "../../Components/Assets/BackArrowDark";

interface ContactDetailScreenProps {
    route: any;
}

const ContactDetailScreen: React.FC<ContactDetailScreenProps> = ({ route }) => {
    const navigation = useNavigation();
    const { contact } = route.params || {};
    const [contactDetails, setContactDetails] = useState(contact || {});
    const [editedName, setEditedName] = useState(contact?.name || "");
    const [editedPhoneNumbers, setEditedPhoneNumbers] = useState(contact?.phoneNumbers || [""]);
    const [editedEmail, setEditedEmail] = useState(contact?.email || "");

    useEffect(() => {
        if (contact) {
            setContactDetails(contact);
            setEditedName(contact.name);
            setEditedPhoneNumbers([...contact.phoneNumbers]);
            setEditedEmail(contact.email || "");
        }
    }, [contact]);

    const handleSaveContact = () => {
        const newContact = {
            ...contactDetails,
            name: editedName,
            phoneNumbers: editedPhoneNumbers,
            email: editedEmail,
        };

        if (!editedName.trim() || !editedPhoneNumbers[0].trim()) {
            Alert.alert("Error", "Name and at least one phone number are required.");
            return;
        }

        if (contact) {
            setContactDetails(newContact);
            Alert.alert("Contact Updated", "The contact details have been updated.");
        } else {
            const contactToSave = {
                givenName: editedName,
                phoneNumbers: editedPhoneNumbers.map((num) => ({ label: "mobile", number: num })),
                emailAddresses: editedEmail ? [{ label: "home", email: editedEmail }] : [],
            };

            Contacts.addContact(contactToSave, (err) => {
                if (err) {
                    Alert.alert("Error", "Failed to save contact.");
                    return;
                }
                Alert.alert("Success", "Contact has been added.");
                navigation.goBack();
            });
        }
    };

    const handleDeleteContact = () => {
        if (!contact) return;

        Alert.alert(
            "Delete Contact",
            "Are you sure you want to delete this contact?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                        Contacts.deleteContact(contact, () => {
                            Alert.alert("Deleted", "The contact has been deleted.");
                            navigation.goBack();
                        });
                    },
                },
            ]
        );
    };

    return (
        <>
            <SafeAreaView />
            <View style={styles.container}>
                <Pressable onPress={() => navigation.goBack()} style={styles.backArrow}>
                    <BackArrowDark color="#000" gradientColor="#000" />
                </Pressable>

                <View style={{ alignItems: "center", marginBottom: 30 }}>
                    <View style={styles.profileImage}>
                        <Text style={styles.imageText}>
                            {editedName ? editedName.charAt(0).toUpperCase() : "+"}
                        </Text>
                    </View>
                </View>

                {/* Contact Name Input */}
                <TextInput
                    style={styles.input}
                    value={editedName}
                    onChangeText={setEditedName}
                    placeholder="Enter Contact Name"
                    placeholderTextColor="#888"
                />

                <TextInput
                    style={styles.input}
                    value={editedEmail}
                    onChangeText={setEditedEmail}
                    placeholder="Enter Email"
                    placeholderTextColor="#888"
                    keyboardType="email-address"
                />

                <FlatList
                    data={editedPhoneNumbers}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <TextInput
                            style={styles.input}
                            value={item}
                            onChangeText={(text) => {
                                const updatedNumbers = [...editedPhoneNumbers];
                                updatedNumbers[index] = text;
                                setEditedPhoneNumbers(updatedNumbers);
                            }}
                            placeholder="Enter Phone Number"
                            placeholderTextColor="#888"
                            keyboardType="phone-pad"
                        />
                    )}
                />





                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSaveContact}>
                        <Text style={styles.buttonText}>{contact ? "Save" : "Add Contact"}</Text>
                    </TouchableOpacity>

                    {contact && (
                        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDeleteContact}>
                            <Text style={styles.buttonText}>Delete Contact</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </>
    );
};

export default ContactDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginTop: 20,
        backgroundColor: "#fff",
    },
    backArrow: {
        marginTop: 20,
        height: 50,
        width: 50,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#007AFF",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
        marginTop: 20,
    },
    imageText: {
        fontSize: 32,
        color: "#fff",
        fontWeight: "bold",
    },
    input: {
        width: "100%",
        padding: 12,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        fontSize: 18,
        color: "#000",
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: "row",
        marginTop: 20,
    },
    button: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 5,
    },
    saveButton: {
        backgroundColor: "#007AFF",
    },
    deleteButton: {
        backgroundColor: "#FF3B30",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});
