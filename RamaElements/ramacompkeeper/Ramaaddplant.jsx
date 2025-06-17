import React, { useState} from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, TouchableOpacity, Image, ScrollView, Alert, TextInput } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import { form, shared } from "../ramaconstkeeper/ramastyles";
import { plus, plantIcon } from "../ramaconstkeeper/ramaiconskeeper"


const Ramaaddplant = ({ item }) => {
    const navigation = useNavigation();
    const [cover, setCover] = useState(item ? item.cover : null);
    const [title, setTitle] = useState(item ? item.title : null);
    const [species, setSpecies] = useState(item ? item.species : null);
    const [careInstructions, setCareInstructions] = useState(item ? item.careInstructions : null);
    const [description, setDescription] = useState(item ? item.description : null);
    const [plantCondition, setPlantCondition] = useState(item ? item.plantCondition : null);

    const dateParser = (str) => {
        if (!str) return new Date();

        if (typeof str === 'string') {
            const parsed = new Date(str);
            if (!isNaN(parsed.getTime())) return parsed;
            const parts = str.split('.');
            return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
        }

        return new Date(str);
    };

    const [date, setDate] = useState(item ? dateParser(item.date) : new Date());

    const coverHandler = async () => {
        const result = await launchImageLibrary({ mediaType: 'photo', quality: 0.8 });
        if (!result.didCancel && result.assets && result.assets[0]) {
            setCover(result.assets[0].uri);
        }
    };

    const plantSaver = async () => {
        if (!title || !species) {
            Alert.alert("Missing fields", "Please enter the title and species.");
            return;
        }

        const formatDateToDDMMYYYY = (date) => {
            const dd = String(date.getDate()).padStart(2, '0');
            const mm = String(date.getMonth() + 1).padStart(2, '0');
            const yyyy = date.getFullYear();
            return `${dd}.${mm}.${yyyy}`;
        };

        const plant = {
            id: item?.id || Date.now().toString(),
            title,
            species,
            careInstructions,
            description,
            plantCondition,
            cover,
            date: formatDateToDDMMYYYY(date),
        };

        try {
            const stored = await AsyncStorage.getItem('myPlants');
            const plantList = stored ? JSON.parse(stored) : [];
            const updated = item
                ? plantList.map(p => p.id === item.id ? plant : p)
                : [...plantList, plant];
            await AsyncStorage.setItem('myPlants', JSON.stringify(updated));
            navigation.navigate('Ramacustomplants');
        } catch (err) {
            Alert.alert("Save error", "Failed to save the plant. Try again.");
        }
    };

    return (
        <View style={shared.container}>

            <ScrollView style={{ width: '100%' }}>
                
                <Text style={form.label}>Cover</Text>
                <TouchableOpacity
                    style={form.coverButton}
                    onPress={coverHandler}
                >
                    <Image
                        source={cover ? { uri: cover } : plus}
                        style={[cover ? form.cover : form.plusIcon, !cover && {tintColor: '#DC0912'}]}
                    />
                </TouchableOpacity>

                <Text style={form.label}>Title</Text>
                <TextInput
                    style={form.input}
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Enter the title"
                    placeholderTextColor='#B8B8B8'
                />

                <Text style={form.label}>Plant species</Text>
                <TextInput
                    style={form.input}
                    value={species}
                    onChangeText={setSpecies}
                    placeholder="Enter the plant species"
                    placeholderTextColor='#B8B8B8'
                />

                <Text style={form.label}>Care instructions</Text>
                <TextInput
                    style={form.input}
                    value={careInstructions}
                    onChangeText={setCareInstructions}
                    placeholder="Enter the care instructions"
                    placeholderTextColor='#B8B8B8'
                    multiline
                />

                <Text style={form.label}>Description</Text>
                <TextInput
                    style={form.input}
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Enter the description"
                    placeholderTextColor='#B8B8B8'
                    multiline
                />

                <Text style={form.label}>Plant condition</Text>
                <View style={[shared.row, {flexWrap: 'wrap'}]}>
                    {
                        ['Healthy', 'Sluggish', 'Dry'].map((con, i) => (
                            <TouchableOpacity
                                key={i}
                                style={[
                                    form.condButton,
                                    con === plantCondition && { backgroundColor: '#22A700' }
                                ]}
                                onPress={() => setPlantCondition(con)}
                            >
                                <Image
                                    source={plantIcon}
                                    style={[
                                        form.plantIcon,
                                        { tintColor: con === plantCondition ? '#fff' : '#000' }
                                    ]}
                                />
                                <Text
                                    style={[
                                        form.condButtonText,
                                        con === plantCondition && { color: '#fff' }
                                    ]}
                                >
                                    {con}
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>

                <Text style={[form.label, {marginTop: 20}]}>Planting date</Text>
                <DateTimePicker 
                    value={date} 
                    mode="date" 
                    display="spinner" 
                    themeVariant="dark"
                    onChange={(event, selectedDate) => {
                        if (selectedDate) setDate(selectedDate);
                    }} 
                    style={{alignSelf: 'center', width: '100%', height: 200}}
                />

                <TouchableOpacity
                    style={form.saveButton}
                    onPress={plantSaver}
                >
                    <Text style={form.saveButtonText}>Continue</Text>
                </TouchableOpacity>

                <View style={{height: 100}} />
            </ScrollView>

        </View>
    )
};

export default Ramaaddplant;