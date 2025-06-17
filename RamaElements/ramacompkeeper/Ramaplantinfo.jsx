import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from "react-native";
import { shared, form, info } from "../ramaconstkeeper/ramastyles";
import { trash, edit, plantIcon } from "../ramaconstkeeper/ramaiconskeeper";


const Ramaplantinfo = ({ item }) => {
    const navigation = useNavigation();

    const deletePlantItem = async () => {
        Alert.alert(
            "Delete Plant",
            `Are you sure you want to delete "${item.title}"?`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const stored = await AsyncStorage.getItem("myPlants");
                            const list = stored ? JSON.parse(stored) : [];
                            const updatedList = list.filter(p => p.id !== item.id);
                            await AsyncStorage.setItem("myPlants", JSON.stringify(updatedList));
                            navigation.goBack();
                        } catch (error) {
                            Alert.alert("Hmmm", "Failed to delete the plant.");
                        }
                    }
                }
            ]
        );
    };

    return (
        <View style={shared.container}>

            <TouchableOpacity
                onPress={deletePlantItem}
            >
                <Image source={trash} style={info.trash} />
            </TouchableOpacity>

            <ScrollView style={{ width: '100%' }}>
                
                <Image
                    source={{ uri: item.cover }}
                    style={info.cover}
                />

                <View
                    style={[
                        form.condButton,
                        {
                            backgroundColor: item.plantCondition === 'Healthy' ? '#22A700' : '#E8BB08',
                            maxWidth: 125,
                            justifyContent: 'center',
                            marginBottom: 16
                        }
                    ]}
                >
                    <Image
                        source={plantIcon}
                        style={[form.plantIcon, {tintColor: '#fff'}]}
                    />
                    <Text style={[form.condButtonText, {color: '#fff'}]}>{item.plantCondition}</Text>
                </View>

                <Text style={info.title}>{item.title}</Text>

                <Text style={info.label}>📌 Type:</Text>
                <Text style={info.text}>{item.species}</Text>

                <Text style={info.label}>📅 Planting date:</Text>
                <Text style={info.text}>{item.date}</Text>

                <Text style={info.label}>Care instructions</Text>
                <Text style={info.text}>{item.careInstructions}</Text>

                <Text style={info.label}>Description</Text>
                <Text style={info.text}>{item.description}</Text>

                <View style={{height: 100}} />
            </ScrollView>

            <TouchableOpacity
                style={shared.addButton}
                onPress={() => navigation.navigate('Ramaaddplant', { item })}
            >
                <Image source={edit} style={shared.addIcon} />
            </TouchableOpacity>

        </View>
    )
};

export default Ramaplantinfo;