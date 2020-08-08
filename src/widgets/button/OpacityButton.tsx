import React, {memo, useCallback} from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';

export interface OpacityButtonProps {
    style?: any,
    data?: any,
    activeOpacity?: number,
    disabled?: boolean,
    onPress?: (data?: any) => void,
    onLongPress?: (data?: any) => void,
    children?: Element,
}

const OpacityButton = memo(({disabled = false, activeOpacity = 0.7, onPress, onLongPress, data, ...restProps}: OpacityButtonProps & TouchableOpacityProps) => {
    const _onPress = useCallback(() => {
        onPress && onPress(data);
    }, [onPress, data]);
    const _onLongPress = useCallback(() => {
        onLongPress && onLongPress(data);
    }, [onLongPress, data]);
    return (<TouchableOpacity
        {...restProps}
        disabled={disabled}
        activeOpacity={activeOpacity}
        onPress={_onPress}
        onLongPress={_onLongPress}
    />);
});
export default OpacityButton;