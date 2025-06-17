import React, { useState, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from "react-native";
import { shared, element} from "../ramaconstkeeper/ramastyles";
import { ramaplantsnone } from "../ramaconstkeeper/ramaimageskeeper";
import { plus, settings } from "../ramaconstkeeper/ramaiconskeeper";


const Ramacustomplants = () => {
    const navigation = useNavigation();
    const [myPlants, setMyPlants] = useState([]);

    const loadPlants = async () => {
        try {
            const stored = await AsyncStorage.getItem("myPlants");
            const parsed = stored ? JSON.parse(stored) : [];
            setMyPlants(parsed);
        } catch (error) {
            Alert.alert("Hmmm", "Failed to load your plants.");
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadPlants();
        }, [])
    );

    return (
        <View style={shared.container}>

            <TouchableOpacity
                style={{ position: 'absolute', top: -50, zIndex: 10, right: 0 }}
                onPress={() => navigation.navigate('Ramasettingskeeper')}
            >
                <Image source={settings} style={{width: 28, height: 28, resizeMode: 'contain'}} />
            </TouchableOpacity>

            {
                myPlants.length > 0 ? (
                    <ScrollView style={{ width: '100%' }}>
                        {
                            myPlants.map((plant, j) => (
                                <View
                                    key={j}
                                    style={element.container}
                                >
                                    <Image
                                        source={{ uri: plant.cover }}
                                        style={element.cover}
                                    />

                                    <View style={{width: '60%'}}>
                                        
                                        <View style={[shared.row, {justifyContent: 'space-between'}]}>
                                            <Text style={[element.title, {width: '50%'}]} ellipsizeMode="tail">{plant.title}</Text>
                                            <View
                                                style={[
                                                    element.tagBox,
                                                    { backgroundColor: plant.plantCondition === 'Healthy' ? '#22A700' : '#E8BB08' }
                                                ]}
                                            >
                                                <Text style={element.tagText}>{plant.plantCondition}</Text>
                                            </View>
                                        </View>

                                        <Text style={element.text}>{plant.species}</Text>

                                        <Text style={element.text}>Planting date: {plant.date}</Text>

                                        <TouchableOpacity
                                            style={element.readButton}
                                            onPress={() => navigation.navigate('Ramaplantinfo', { item: plant })}
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
                onPress={() => navigation.navigate('Ramaaddplant')}
            >
                <Image source={plus} style={shared.addIcon} />
            </TouchableOpacity>

        </View>
    )
};

export default Ramacustomplants;