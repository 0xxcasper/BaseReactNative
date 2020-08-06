import React, {memo} from 'react';
import {StyleSheet, View,} from 'react-native';
import GradientButton, {GradientButtonProps} from "../base_button/GradientButton";
import {MARGIN_H} from "../../common/dimens";
import VectorIcon, {GradientVectorIcon} from "../vector_icons/VectorIcon";
import { ICON_NAME } from '../../common/icon_name';
import { RED_NOTIFY } from '../../common/colors';

export interface SelectionRowProps {
    style?: any,
    data?: any,
    reverseRow?: boolean,
    contentContainerStyle?: any,
    children: Element,
    isSelected: boolean,
    checkIconSize?: number,
}

const SelectionRow = memo(({
                               style,
                               data,
                               reverseRow = false,
                               contentContainerStyle,
                               children,
                               isSelected = false,
                               checkIconSize = 17,
                               gradientColors = ['#CE1F1F', '#FF350B', '#FF350B'],
                               gradientLocations = [0, 1, 1],
                               onPress
                           }: SelectionRowProps & GradientButtonProps) => {
    let _checkIcon;
    if (isSelected) {
        _checkIcon = (<VectorIcon
            name={ICON_NAME.ICON_CHECK_CIRCLE_FILL}
            color={RED_NOTIFY}
            size={checkIconSize}
        />)
    }
    return (<GradientButton
        style={[style, reverseRow ? styles.reverseContainer : styles.container]}
        isGradient={isSelected}
        gradientOpacity={isSelected ? 0.05 : 1}
        gradientColors={gradientColors}
        gradientLocations={gradientLocations}
        data={data}
        onPress={onPress}
    >
        <View
            style={[styles.contentContainerStyle, contentContainerStyle]}
        >
            {children}
        </View>
        <View
            style={{width: checkIconSize, height: checkIconSize, marginLeft: MARGIN_H}}
        >
            {_checkIcon}
        </View>
    </GradientButton>)
});
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    reverseContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    contentContainerStyle: {
        flex: 1,
    }
});
export default SelectionRow;
