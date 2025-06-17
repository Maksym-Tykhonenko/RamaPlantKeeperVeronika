import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from "react-native";
import { shared, form, info } from "../ramaconstkeeper/ramastyles";
import { trash, edit, plantIcon } from "../ramaconstkeeper/ramaiconskeeper";


const Ramajournaliteminfo = ({ item }) => {
    const navigation = useNavigation();

    const deleteJournalItem = async () => {
        Alert.alert(
            "Delete Journal entry",
            `Are you sure you want to delete "${item.title}"?`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const stored = await AsyncStorage.getItem("myGrowthJournal");
                            const list = stored ? JSON.parse(stored) : [];
                            const updatedList = list.filter(p => p.id !== item.id);
                            await AsyncStorage.setItem("myGrowthJournal", JSON.stringify(updatedList));
                            navigation.goBack();
                        } catch (error) {
                            Alert.alert("Hmmm", "Failed to delete the journal item.");
                        }
                    }
                }
            ]
        );
    };

    return (
        <View style={shared.container}>

            <TouchableOpacity
                onPress={deleteJournalItem}
            >
                <Image source={trash} style={info.trash} />
            </TouchableOpacity>

            <ScrollView style={{ width: '100%' }}>
                
                <Image
                    source={{ uri: item.cover }}
                    style={info.cover}
                />

                <View style={[shared.row, {flexWrap: 'wrap'}]}>
                    {
                        item.tags.map((tag, j) => (
                            <View
                                key={j}
                                style={[
                                    form.condButton,
                                    { backgroundColor: '#E8BB08' }
                                ]}
                            >
                                <Image
                                    source={plantIcon}
                                    style={[form.plantIcon, {tintColor: '#fff'}]}
                                />
                                <Text style={[form.condButtonText, {color: '#fff'}]}>{tag}</Text>
                            </View>
                        ))
                    }
                </View>

                <Text style={info.title}>{item.title}</Text>

                <View style={info.greyBox}>
                    <Text style={info.greBoxText}>
                        In your possession:
                         {Math.floor((new Date().getTime() - new Date(item.date).getTime()) / (1000 * 60 * 60 * 24))}
                        days
                    </Text>
                </View>

                <Text style={info.label}>Changelog</Text>
                <View style={{height: 150}}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {
                            item.changelog((log, j) => (
                                <View style={{marginRight: 8}}>
                                    <Image
                                        source={{ uri: log.progressCover }}
                                        style={info.smallCover}
                                    />
                                    <Text style={info.text}>{log.changeDate}</Text>
                                </View>
                            ))
                        }
                    </ScrollView>
                </View>

                <View style={{height: 100}} />
            </ScrollView>

            <TouchableOpacity
                style={shared.addButton}
                onPress={() => navigation.navigate('Ramaaddjournalitem', { item })}
            >
                <Image source={edit} style={shared.addIcon} />
            </TouchableOpacity>

        </View>
    )
};

export default Ramajournaliteminfo;