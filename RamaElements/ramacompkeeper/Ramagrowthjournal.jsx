import React, { useState, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from "react-native";
import { shared, element } from "../ramaconstkeeper/ramastyles";
import { ramaplantsnone } from "../ramaconstkeeper/ramaimageskeeper";
import { plus } from "../ramaconstkeeper/ramaiconskeeper";


const Ramagrowthjournal = () => {
    const navigation = useNavigation();
    const [growthJournal, setGrowthJournal] = useState([]);

    const loadReminders = async () => {
        try {
            const stored = await AsyncStorage.getItem("myGrowthJournal");
            const parsed = stored ? JSON.parse(stored) : [];
            setGrowthJournal(parsed);
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
                growthJournal.length > 0 ? (
                    <ScrollView style={{ width: '100%' }}>
                        {
                            growthJournal.map((item, j) => (
                                <View
                                    key={j}
                                    style={element.container}
                                >
                                    <Image
                                        source={{ uri: item.cover }}
                                        style={element.cover}
                                    />
                                    <View style={{ width: '60%' }}>
                                        
                                        <Text style={[element.title, {marginBottom: 8}]} numberOfLines={1} ellipsizeMode="tail">{item.title}</Text>

                                        <Text style={[element.text, {marginBlock: 38}]}>
                                            In your possession:
                                            {Math.floor((new Date().getTime() - new Date(item.date).getTime()) / (1000 * 60 * 60 * 24))}
                                            days
                                        </Text>

                                        <TouchableOpacity
                                            style={element.readButton}
                                            onPress={() => navigation.navigate('Ramajournaliteminfo', { item })}
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
                            source={ramaplantsnone}
                            style={shared.ramadecor}
                        />
                )
            }

            <TouchableOpacity
                style={shared.addButton}
                onPress={() => navigation.navigate('Ramaaddjournalitem')}
            >
                <Image source={plus} style={shared.addIcon} />
            </TouchableOpacity>

        </View>
    )
};

export default Ramagrowthjournal;