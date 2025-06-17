import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import ramanaviitems from '../ramaconstkeeper/ramanaviitems';
import useRamaNaviKeeper from './Ramahelper';
import { navi } from '../ramaconstkeeper/ramastyles';

const Ramanavigation: React.FC = () => {
    const { ramanaviitem, manageRamanaviitems } = useRamaNaviKeeper();

    return (
        <View style={navi.container}>

            {
                ramanaviitems.map((naviitem, i) => (
                    <TouchableOpacity
                        key={i}
                        style={[navi.button, ramanaviitem === naviitem.item && {backgroundColor: '#DC0912'}]}
                        onPress={() => manageRamanaviitems(naviitem.item)}
                    >
                        <Image
                            source={naviitem.icon}
                            style={navi.icon}
                        />
                        <Text style={navi.text}>{naviitem.text}</Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    );
};

export default Ramanavigation;