import React, { useState} from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, TouchableOpacity, Image, ScrollView, Alert, TextInput, Switch } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import { form, shared } from "../ramaconstkeeper/ramastyles";
import { plus, notificiations } from "../ramaconstkeeper/ramaiconskeeper"
import { format } from 'date-fns';


const Ramaaddreminder = ({ item }) => {
    const navigation = useNavigation();
    const [cover, setCover] = useState(item ? item.cover : null);
    const [title, setTitle] = useState(item ? item.title : null);
    const [plant, setPlant] = useState(item ? item.plant : null);
    const [frequency, setFrequency] = useState(item ? item.frequency : null);
    const [notification, setNotification] = useState(item ? item.notification : true);

    const timeParser = (str) => {
        if (!str) return new Date();

        if (typeof input === 'string') {
            const [time, modifier] = input.split(' ');
            let [hours, minutes] = time.split(':').map(Number);
            if (modifier === 'PM' && hours < 12) hours += 12;
            if (modifier === 'AM' && hours === 12) hours = 0;
            const date = new Date();
            date.setHours(hours, minutes, 0);
            return date;
        }

        return new Date(str);
    };

    const [time, setTime] = useState(item ? timeParser(item.time) : new Date());

    const coverHandler = async () => {
        const result = await launchImageLibrary({ mediaType: 'photo', quality: 0.8 });
        if (!result.didCancel && result.assets && result.assets[0]) {
            setCover(result.assets[0].uri);
        }
    };

    const reminderSetter = async () => {
        if (!title || !plant || !frequency) {
            Alert.alert("Missing fields", "Please fill in the title, plant, and frequency.");
            return;
        }
            
        const formattedTime = format(time, 'h:mm a');

        const reminder = {
            id: item?.id || Date.now().toString(),
            title,
            plant,
            frequency,
            cover,
            time: formattedTime,
            notification
        };

        try {
            const stored = await AsyncStorage.getItem('myReminders');
            const reminderList = stored ? JSON.parse(stored) : [];

            const updated = item
                ? reminderList.map(r => r.id === item.id ? reminder : r)
                : [...reminderList, reminder];

            await AsyncStorage.setItem('myReminders', JSON.stringify(updated));
            navigation.navigate('Ramacustomreminders');
        } catch (err) {
            Alert.alert("Save error", "Failed to save the reminder. Please try again.");
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

                <Text style={form.label}>Plant</Text>
                <TextInput
                    style={form.input}
                    value={plant}
                    onChangeText={setPlant}
                    placeholder="Enter the plant species"
                    placeholderTextColor='#B8B8B8'
                />

                <Text style={form.label}>Execution frequencies</Text>
                <View style={[shared.row, { flexWrap: 'wrap' }]}>
                    {
                        ['Daily', 'Weekly', 'Monthly'].map((freq, i) => (
                            <TouchableOpacity
                                key={i}
                                style={[
                                    form.condButton,
                                    freq === frequency && { backgroundColor: '#E8BB08' }
                                ]}
                                onPress={() => setFrequency(freq)}
                            >
                                <Text
                                    style={[
                                        form.condButtonText
                                    ]}
                                >
                                    {freq}
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>

                <View style={[shared.row, {justifyContent: 'space-between', alignItems: 'center', marginVertical: 24}]}>
                    <View style={[shared.row, {width: 'content', alignItems: 'center'}]}>
                        <Image
                            source={notificiations}
                            style={form.notifIcon}
                        />
                        <Text style={[form.label, {marginBottom: 0}]}>Notifications</Text>
                    </View>
                    <Switch
                        value={notification}
                        onValueChange={setNotification}
                        thumbColor={notification ? "#fff" : "#888"}
                        trackColor={{ false: "#ccc", true: "#E8BB08" }}
                    />
                </View>

                <Text style={form.label}>Time</Text>
                <DateTimePicker 
                    value={time} 
                    mode="time" 
                    display="spinner" 
                    themeVariant="dark"
                    onChange={(event, selectedDate) => {
                        if (selectedDate) setTime(selectedDate);
                    }} 
                    style={{alignSelf: 'center', width: '100%', height: 200}}
                />

                <TouchableOpacity
                    style={form.saveButton}
                    onPress={reminderSetter}
                >
                    <Text style={form.saveButtonText}>Add</Text>
                </TouchableOpacity>

                <View style={{height: 100}} />
            </ScrollView>

        </View>
    )
};

export default Ramaaddreminder;