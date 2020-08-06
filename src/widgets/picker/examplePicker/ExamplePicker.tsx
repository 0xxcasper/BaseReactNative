import React, { memo, useCallback, useState } from 'react';
import OpacityButton, { OpacityButtonProps } from 'widgets/button/OpacityButton';

export interface ExamplePickerProps extends OpacityButtonProps {
    multiple?: boolean,
    selections: string[] | null | undefined,
    onPress: () => {},
    onLongPress: () => {},
    onSelect: (selections: string[] | null | undefined) => void,
}

const ExamplePicker = memo((props: ExamplePickerProps) => {
    const {
        onPress,
        onLongPress,
        onSelect,
        selections,
        multiple = false,
        ...restProps
    } = props;
    const [visible, setVisible] = useState(false);
    const _onPress = useCallback(() => {
        setVisible(true);
    }, []);
    const _onDismiss = useCallback(() => {
        setVisible(false);
    }, []);
    const _onSelect = useCallback((_selections) => {
        onSelect && onSelect(_selections);
        setVisible(false);
    }, [onSelect]);
    return (<>
        <OpacityButton
            {...restProps}
            onPress={_onPress}
        />
        <ExampleDialog
            visible={visible}
            multiple={multiple}
            selections={selections}
            onDismiss={_onDismiss}
            onSelect={_onSelect}
        />
    </>)
});
export default ExamplePicker;
