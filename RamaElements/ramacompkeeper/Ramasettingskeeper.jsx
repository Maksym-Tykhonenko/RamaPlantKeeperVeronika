// change links
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, TouchableOpacity, Image, Linking, Switch, Alert } from "react-native";
import { shared, element, form, heading } from "../ramaconstkeeper/ramastyles";
import { ramadecor } from "../ramaconstkeeper/ramaimageskeeper";
import React, { useState, useEffect } from "react";
import { backarrow, notificiations, terms, policy } from "../ramaconstkeeper/ramaiconskeeper";

const NOTIFY_TYPE_KEY = 'notifyType';
const NOTIFY_SWITCH_KEY = 'notificationEnabled';

const Ramasettingskeeper = () => {
    const [notifyType, setNotifyType] = useState("sound");
    const [notification, setNotification] = useState(true);

    useEffect(() => {
        const loadSettings = async () => {
            try {
                const savedType = await AsyncStorage.getItem(NOTIFY_TYPE_KEY);
                const savedSwitch = await AsyncStorage.getItem(NOTIFY_SWITCH_KEY);

                if (savedType) setNotifyType(savedType);
                if (savedSwitch !== null) setNotification(savedSwitch === 'true');
            } catch (error) {
                Alert.alert('Hmmm', 'Failed to load settings');
            }
        };
        loadSettings();
    }, []);

    const storeNotifyType = async (type) => {
        try {
            setNotifyType(type);
            await AsyncStorage.setItem(NOTIFY_TYPE_KEY, type);
        } catch (error) {
            Alert.alert('Hmmm', 'Failed to save notification type');
        }
    };

    const toggleNotification = async (value) => {
        try {
            setNotification(value);
            await AsyncStorage.setItem(NOTIFY_SWITCH_KEY, value.toString());
        } catch (error) {
            Alert.alert('Hmmm', 'Failed to save notification toggle');
        }
    };

    const showRamaTerms = () => {
        Linking.openURL("https://yourappdomain.com/terms").catch(err =>
            Alert.alert('Hmmm', 'Failed to open Terms of Use')
        );
    };

    const showRamaPP = () => {
        Linking.openURL("https://yourappdomain.com/privacy").catch(err =>
            Alert.alert('Hmmm', 'Failed to open Privacy Policy')
        );
    };

    return (
        <View style={shared.container}>

            <Image source={ramadecor} style={[shared.ramadecor, {position: 'static', alignSelf: 'center', marginBottom: 10}]} />

            <Text style={element.title}>Notification Type</Text>

            <View style={[shared.row, {justifyContent: 'space-between', backgroundColor: '#DBA30E', padding: 4, borderRadius: 100, marginTop: 10, marginBottom: 24}]}>
                {
                    ['sound', 'no sound', 'banner only'].map((type, i) => (
                        <TouchableOpacity
                            key={i}
                            style={[notifyType === type && { backgroundColor: '#E8BB08'}, {width: '33%', padding: 11, borderRadius: 100, justifyContent: 'center', alignItems: 'center'}]}
                            onPress={() => storeNotifyType(type)}
                        >
                            <Text style={form.condButtonText}>{type}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>

            <View style={[shared.row, {justifyContent: 'space-between', alignItems: 'center', paddingVertical: 20, borderBottomColor: 'rgba(153, 153, 153, 0.25)', borderBottomWidth: 1}]}>
                <View style={[shared.row, {width: 'content', alignItems: 'center'}]}>
                    <Image
                        source={notificiations}
                        style={form.notifIcon}
                    />
                    <Text style={[element.title, {marginBottom: 0}]}>Notifications</Text>
                </View>
                <Switch
                    value={notification}
                    onValueChange={toggleNotification}
                    thumbColor={notification ? "#fff" : "#888"}
                    trackColor={{ false: "#ccc", true: "#E8BB08" }}
                />
            </View>

            <TouchableOpacity
                style={[
                    shared.row,
                    { justifyContent: 'space-between', alignItems: 'center', paddingVertical: 20, borderBottomColor: 'rgba(153, 153, 153, 0.25)', borderBottomWidth: 1 }
                ]}
                onPress={showRamaTerms}
            >
                <View style={[shared.row, {width: 'content', alignItems: 'center'}]}>
                    <Image
                        source={terms}
                        style={form.notifIcon}
                    />
                    <Text style={[element.title, {marginBottom: 0}]}>Terms of use</Text>
                </View>
                <Image source={backarrow} style={[heading.backArrow, {transform: [{ rotate: '180deg'} ]}]} />
            </TouchableOpacity>
            
            <TouchableOpacity
                style={[
                    shared.row,
                    { justifyContent: 'space-between', alignItems: 'center', paddingVertical: 20, borderBottomColor: 'rgba(153, 153, 153, 0.25)', borderBottomWidth: 1 }
                ]}
                onPress={showRamaPP}
            >
                <View style={[shared.row, {width: 'content', alignItems: 'center'}]}>
                    <Image
                        source={policy}
                        style={form.notifIcon}
                    />
                    <Text style={[element.title, {marginBottom: 0}]}>Privacy Policy</Text>
                </View>
                <Image source={backarrow} style={[heading.backArrow, {transform: [{ rotate: '180deg'} ]}]} />
            </TouchableOpacity>

        </View>
    )
};

export default Ramasettingskeeper;