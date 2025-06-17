import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { heading } from "../ramaconstkeeper/ramastyles";
import { backarrow } from "../ramaconstkeeper/ramaiconskeeper";

const Ramaheading = ({ text, back }) => {
    const navigation = useNavigation();

    return (
        <View style={heading.container}>
            {back && (
                <TouchableOpacity
                    style={{marginRight: 8}}
                    onPress={() => navigation.goBack()}>
                    <Image
                        source={backarrow}
                        style={heading.backArrow} />
                </TouchableOpacity>
            )}
            {
                text && (
                    <Text
                        style={[
                            heading.text,
                            {
                                fontSize: back ? 20 : 24,
                                fontWeight: back ? '500' : '600'
                            }
                        ]}
                    >
                        {text}
                    </Text>
                )
            }
        </View>
    )
};

export default Ramaheading;