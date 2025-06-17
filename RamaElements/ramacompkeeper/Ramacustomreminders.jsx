import React, { useState, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from "react-native";
import { shared, element, form } from "../ramaconstkeeper/ramastyles";
import { ramaremindersnone } from "../ramaconstkeeper/ramaimageskeeper";
import { plus, notificiations } from "../ramaconstkeeper/ramaiconskeeper";


const Ramacustomreminders = () => {
    const navigation = useNavigation();
    const [myReminders, setMyReminders] = useState([]);

    const loadReminders = async () => {
        try {
            const stored = await AsyncStorage.getItem("myReminders");
            const parsed = stored ? JSON.parse(stored) : [];
            setMyReminders(parsed);
        } catch (error) {
            Alert.alert("Hmmm", "Failed to load your reminders.");
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadReminders();
        }, [])
    );

    return (
        <View style={shared.container}>

            {
                myReminders.length > 0 ? (
                    <ScrollView style={{ width: '100%' }}>
                        {
                            myReminders.map((item, j) => (
                                <View
                                    key={j}
                                    style={element.container}
                                >
                                    <Image
                                        source={{ uri: item.cover }}
                                        style={element.cover}
                                    />
                                    <View style={{ width: '60%' }}>
                                        
                                        <View style={[shared.row, {justifyContent: 'space-between'}]}>
                                            <Text style={[element.title, {width: '80%'}]} ellipsizeMode="tail">{item.title}</Text>
                                            {
                                                item.notification && (
                                                    <Image
                                                        source={notificiations}
                                                        style={form.notifIcon}
                                                    />
                                                )
                                            }
                                        </View>

                                        <Text style={[element.text, {marginBottom: 8}]}>{item.frequency}</Text>

                                        <TouchableOpacity
                                            style={element.readButton}
                                            onPress={() => navigation.navigate('Ramareminderinfo', { item })}
                                        >
                                            <Text style={element.readButtonText}>Read more</Text>
                                        </TouchableOpacity>

                                    </View>
                                </View>
                            ))
                        }
                        <View style={{height: 200}} />
                    </ScrollView>
                ) : (
                        <Image
                            source={ramaremindersnone}
                            style={shared.ramadecor}
                        />
                )
            }

            <TouchableOpacity
                style={shared.addButton}
                onPress={() => navigation.navigate('Ramaaddreminder')}
            >
                <Image source={plus} style={shared.addIcon} />
            </TouchableOpacity>

        </View>
    )
};

export default Ramacustomreminders;