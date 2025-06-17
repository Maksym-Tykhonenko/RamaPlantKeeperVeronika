import React, { useState} from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, TouchableOpacity, Image, ScrollView, Alert, TextInput } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import { form, shared } from "../ramaconstkeeper/ramastyles";
import { plus } from "../ramaconstkeeper/ramaiconskeeper"


const Ramaaddjournalitem = ({ item }) => {
    const navigation = useNavigation();
    const [cover, setCover] = useState(item ? item.cover : null);
    const [progressCover, setProgressCover] = useState(null);
    const [title, setTitle] = useState(item ? item.title : null);
    const [tags, setTags] = useState(item ? item.tags : []);

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

    const handleChangeDateInput = (text) => {
        let formatted = text.replace(/\D/g, '');

        if (formatted.length > 2) {
            formatted = formatted.slice(0, 2) + '/' + formatted.slice(2);
        }
        if (formatted.length > 5) {
            formatted = formatted.slice(0, 5) + '/' + formatted.slice(5, 9);
        }
        if (formatted.length > 10) {
            formatted = formatted.slice(0, 10);
        }

        setChangeDate(formatted);

        if (formatted.length === 10) {
            const parts = formatted.split('/');
            if (parts.length === 3) {
                const [dd, mm, yyyy] = parts;
                const day = parseInt(dd, 10);
                const month = parseInt(mm, 10);
                const year = yyyy;

                if (
                    dd.length === 2 &&
                    mm.length === 2 &&
                    yyyy.length === 4 &&
                    day > 0 &&
                    day <= 31 &&
                    month > 0 &&
                    month <= 12 &&
                    year.startsWith('20')
                ) {
                    return;
                } else {
                    Alert.alert("Invalid Date", "Please enter a valid date in dd/mm/yyyy format.");
                }
            }
        }
    };

    const [date, setDate] = useState(item ? dateParser(item.date) : new Date());
    const [changeDate, setChangeDate] = useState('');
    
    const coverHandler = async () => {
        const result = await launchImageLibrary({ mediaType: 'photo', quality: 0.8 });
        if (!result.didCancel && result.assets && result.assets[0]) {
            setCover(result.assets[0].uri);
        }
    };

    const progressCoverHandler = async () => {
        const result = await launchImageLibrary({ mediaType: 'photo', quality: 0.8 });
        if (!result.didCancel && result.assets && result.assets[0]) {
            setProgressCover(result.assets[0].uri);
        }
    };

    const saveJournalItemUpdate = async () => {
        if (!title || !cover || !progressCover || !changeDate || tags.length === 0) {
            Alert.alert("Missing fields", "Please fill in all fields.");
            return;
        }

        const newEntry = {
            progressCover,
            changeDate: changeDate,
        };

        const formatDateToDDMMYYYY = (date) => {
            const dd = String(date.getDate()).padStart(2, '0');
            const mm = String(date.getMonth() + 1).padStart(2, '0');
            const yyyy = date.getFullYear();
            return `${dd}.${mm}.${yyyy}`;
        };

        const journalItem = {
            id: item?.id || Date.now().toString(),
            title,
            tags,
            cover,
            date: formatDateToDDMMYYYY(date),
            changelog: item ? [...(item.changelog || []), newEntry] : [newEntry],
        };

        try {
            const stored = await AsyncStorage.getItem('myGrowthJournal');
            const journalList = stored ? JSON.parse(stored) : [];

            const updated = item
                ? journalList.map(j => j.id === item.id ? journalItem : j)
                : [...journalList, journalItem];

            await AsyncStorage.setItem('myGrowthJournal', JSON.stringify(updated));
            navigation.navigate('Ramagrowthjournal');
        } catch (err) {
            Alert.alert("Save error", "Failed to save the growth journal entry. Try again.");
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

                <Text style={form.label}>Cover</Text>
                <TouchableOpacity
                    style={[form.coverButton, {width: 120, height: 120}]}
                    onPress={progressCoverHandler}
                >
                    <Image
                        source={progressCover ? { uri: progressCover } : plus}
                        style={[progressCover ? form.cover : form.plusIcon, !progressCover && {tintColor: '#DC0912'}]}
                    />
                </TouchableOpacity>

                <Text style={form.label}>Date of change:</Text>
                <TextInput
                    style={form.input}
                    value={changeDate}
                    onChangeText={handleChangeDateInput}
                    placeholder="_/_/____"
                    keyboardType="number-pad"
                    placeholderTextColor='#B8B8B8'
                />

                <Text style={form.label}>Planting date</Text>
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

                <Text style={form.label}>Tags</Text>
                <View style={[shared.row, { flexWrap: 'wrap' }]}>
                    {
                        ['survived the disease', 'bloomed', 'transplanted'].map((t, i) => (
                            <TouchableOpacity
                                key={i}
                                style={[
                                    form.condButton,
                                    tags.some((tg) => tg === t) && { backgroundColor: '#22A700' },
                                    {width: 'content', paddingHorizontal: 16}
                                ]}
                                onPress={() =>
                                    tags.some(tg => tg === t)
                                    ? setTags(tags.filter(tg => tg !== t))
                                    : setTags([...tags, t])
                                }
                            >
                                <Text
                                    style={[
                                        form.condButtonText,
                                        tags.some((tg) => tg === t) && { color: '#fff' }
                                    ]}
                                >
                                    {t}
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>

                <TouchableOpacity
                    style={form.saveButton}
                    onPress={saveJournalItemUpdate}
                >
                    <Text style={form.saveButtonText}>Continue</Text>
                </TouchableOpacity>

                <View style={{height: 100}} />
            </ScrollView>

        </View>
    )
};

export default Ramaaddjournalitem;