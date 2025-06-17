import React, { ReactNode } from 'react';
import { View } from 'react-native';
import Ramanavigation from './Ramanavigation';
import Ramaheading from './Ramaheading';
import { background } from '../ramaconstkeeper/ramastyles';

interface RamabackgroundProps {
    heading?: boolean;
    text: String;
    back?: boolean;
    keeper: ReactNode;
    navi?: boolean;
}

const Ramabackground: React.FC<RamabackgroundProps> = ({ heading, text, back, keeper, navi }) => {
    return (
        <View style={{ flex: 1 }}>
            {heading && (
                <View style={background.heading}>
                    <Ramaheading text={text} back={back} />
                </View>
            )}

            <View style={background.keeper}>{keeper}</View>

            {navi && (
                <View style={background.navi}>
                    <Ramanavigation />
                </View>
            )}  
        </View>
      
    );
};

export default Ramabackground;
