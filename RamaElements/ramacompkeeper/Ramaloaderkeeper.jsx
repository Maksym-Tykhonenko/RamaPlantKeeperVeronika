import React, { useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Animated } from "react-native";
import { shared } from "../ramaconstkeeper/ramastyles";
import { ramalogo } from "../ramaconstkeeper/ramaimageskeeper";


const Ramaloaderkeeper = () => {
    const navigation = useNavigation();
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
        }).start(() => {
            setTimeout(() => {
                navigation.navigate("Ramacustomplants");
            }, 500);
        });
    }, [fadeAnim]);

    return (
        <View style={[shared.container, {alignItems: 'center', justifyContent: 'center'}]}>

            <Animated.Image
                source={ramalogo}
                style={[
                    shared.logo,
                    { opacity: fadeAnim }
                ]}
            />

        </View>
    )
};

export default Ramaloaderkeeper;