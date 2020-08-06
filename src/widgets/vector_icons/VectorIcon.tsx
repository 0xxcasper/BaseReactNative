import React, { memo } from 'react';
import { View, Platform, Image } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import LinearGradient from 'react-native-linear-gradient'
import MaskedView from '@react-native-community/masked-view'
import { NAVIGATION_BUTTON_ICON_SIZE } from "common/dimens";
import { createIconSetFromFontello } from 'react-native-vector-icons';
// @ts-ignore
import fontelloConfig from './config';
import { retry } from 'redux-saga/effects';

const fontName = Platform.OS === 'android' ? 'Carbro-Custom' : undefined;
const CBIcon = createIconSetFromFontello(fontelloConfig, fontName);

interface VectorIconProps {
    family?: string,
    name: any,
    size?: number,
    color?: any,
    style?: any
}


const VectorIcon = memo(({name, size = NAVIGATION_BUTTON_ICON_SIZE, color, style }: VectorIconProps) => {
    let Provider = CBIcon;
    let _name = ''
    if(name) {
        if(name.icon_name) {
            _name = name.icon_name
        } else {
            _name = name
        }
    }
    if(name && name.isImage) {
        return(
            <Image
                resizeMode={"contain"}
                style={[{width: size, height: size, tintColor: color}, style]}
                source={name.icon_name}/>
        )
    }
    const _family = name.family ? name.family : "CBIcon"
    switch (_family) {
        case 'Entypo':
            Provider = Entypo;
            break;
        case 'AntDesign':
            Provider = AntDesign;
            break;
        case 'EvilIcons':
            Provider = EvilIcons;
            break;
        case 'Feather':
            Provider = Feather;
            break;
        case 'FontAwesome':
            Provider = FontAwesome;
            break;
        case 'FontAwesome5':
            // @ts-ignore
            Provider = FontAwesome5;
            break;
        case 'FontAwesome5Pro':
            // @ts-ignore
            Provider = FontAwesome5Pro;
            break;
        case 'Fontisto':
            Provider = Fontisto;
            break;
        case 'Foundation':
            Provider = Foundation;
            break;
        case 'Ionicons':
            Provider = Ionicons;
            break;
        case 'MaterialCommunityIcons':
            Provider = MaterialCommunityIcons;
            break;
        case 'MaterialIcons':
            Provider = MaterialIcons;
            break;
        case 'Octicons':
            Provider = Octicons;
            break;
        case 'SimpleLineIcons':
            Provider = SimpleLineIcons;
            break;
    }
    return (<Provider
        name={_name}
        size={size}
        color={color}
        style={style}
    />);
});

export default VectorIcon;

interface GradientVectorIconProps {
    family?: string,
    name: string,
    size?: number,
    gradientColors?: any[],
    gradientLocations?: any[]
}

export const GradientVectorIcon = memo(({
    family = 'CBIcon',
    gradientColors = ['#CE1F1F', '#FF350B'],
    gradientLocations = [0, 0.1],
    name,
    size = NAVIGATION_BUTTON_ICON_SIZE,
}: GradientVectorIconProps) => {
    return (
        <View
            style={{ width: size, height: size }}
        >
            <MaskedView
                style={{ flex: 1, flexDirection: 'row', height: size, backgroundColor: 'green' }}
                maskElement={
                    <View
                        style={{
                            backgroundColor: 'transparent',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <VectorIcon
                            family={family}
                            name={name}
                            size={size}
                        />
                    </View>
                }>
                <LinearGradient
                    colors={gradientColors}
                    locations={gradientLocations}
                    style={{ flex: 1 }}
                />
            </MaskedView>
        </View>
    )
});
