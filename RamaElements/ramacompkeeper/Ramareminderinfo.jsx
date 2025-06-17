import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { shared, form, info } from "../ramaconstkeeper/ramastyles";
import { trash, edit } from "../ramaconstkeeper/ramaiconskeeper";


const Ramareminderinfo = ({ item }) => {
    const navigation = useNavigation();
    const [done, setDone] = useState(false);

    useEffect(() => {
        const loadDoneStatus = async () => {
            try {
                const stored = await AsyncStorage.getItem("myReminders");
                const list = stored ? JSON.parse(stored) : [];
                const match = list.find(r => r.id === item.id);
                setDone(match?.done || false);
            } catch (error) {
                Alert.alert("Oops", "Couldn't load reminder status.");
            }
        };
        loadDoneStatus();
    }, [item.id]);

    const deleteReminderItem = async () => {
        Alert.alert(
            "Delete Reminder",
            `Are you sure you want to delete "${item.title}"?`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const stored = await AsyncStorage.getItem("myReminders");
                            const list = stored ? JSON.parse(stored) : [];
                            const updatedList = list.filter(p => p.id !== item.id);
                            await AsyncStorage.setItem("myReminders", JSON.stringify(updatedList));
                            navigation.goBack();
                        } catch (error) {
                            Alert.alert("Hmmm", "Failed to delete the reminder.");
                        }
                    }
                }
            ]
        );
    };

    const toggleReminderStatus = async () => {
        try {
            const stored = await AsyncStorage.getItem("myReminders");
            const list = stored ? JSON.parse(stored) : [];

            const updatedList = list.map(r => {
                if (r.id === item.id) {
                    return { ...r, done: !done };
                }
                return r;
            });

            await AsyncStorage.setItem("myReminders", JSON.stringify(updatedList));
            setDone(prev => !prev);
        } catch (error) {
            Alert.alert("Hmmm", "Failed to update reminder status.");
        }
    };

    return (
        <View style={shared.container}>

            <TouchableOpacity
                onPress={deleteReminderItem}
            >
                <Image source={trash} style={info.trash} />
            </TouchableOpacity>

            <View style={info.reminderContainer}>

                <Image
                    source={{ uri: item.cover }}
                    style={info.cover}
                />

                <View
                    style={[
                        form.condButton,
                        {
                            backgroundColor: '#FDB938',
                            maxWidth: 70,
                            justifyContent: 'center',
                        }
                    ]}
                >
                    <Text style={[form.condButtonText, {color: '#fff'}]}>{item.frequency}</Text>
                </View>

                <Text style={[info.title, {marginTop: 16, fontWeight: '500'}]}>{item.title}</Text>

                <TouchableOpacity style={[form.saveButton, {backgroundColor: done ? '#2f8f2e' : '#B71F1D', marginTop: 0}]} onPress={toggleReminderStatus}>
                    <Text style={form.saveButtonText}>{done ? 'Done' : 'Mark as done'}</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={shared.addButton}
                onPress={() => navigation.navigate('Ramaaddreminder', { item })}
            >
                <Image source={edit} style={shared.addIcon} />
            </TouchableOpacity>

        </View>
    )
};

export default Ramareminderinfo;