import React, {memo, useCallback, useMemo} from "react";
import {FlatList, ScrollViewProps, StyleSheet, Text} from 'react-native';
import {Set} from 'immutable';
import { fontStyles, FontNormal } from "common/styles";
import SelectionRow from "./SelectionRow";

interface LabelRowItemProps {
    style?: any,
    data?: any,
    label: string | null | undefined,
    labelNumberOfLines?: number,
    labelTextStyle?: any,
    isSelected: boolean,
    contentContainerStyle?: any,
    onPress?: (data: any) => void
}

const LabelRowItem = memo((props: LabelRowItemProps) => {
    const {
        style,
        data,
        label,
        labelNumberOfLines,
        labelTextStyle,
        isSelected,
        contentContainerStyle,
        onPress
    } = props;
    let _labelStyle = [FontNormal, {color: '#313131', fontSize: 14, lineHeight: 24}, labelTextStyle];
    if (isSelected) {
        _labelStyle = [FontNormal, {color: '#313131', fontSize: 14, lineHeight: 24}, labelTextStyle,
            fontStyles.fontWeightBold];
    }
    return (<SelectionRow
        style={style}
        contentContainerStyle={contentContainerStyle}
        isSelected={isSelected}
        data={data}
        onPress={onPress}
    >
        <Text
            style={_labelStyle}
            numberOfLines={labelNumberOfLines}
        >
            {label || ''}
        </Text>
    </SelectionRow>);
});

interface LabelDescriptionRowItemProps {
    style?: any,
    data?: any,
    label: string | null | undefined,
    description?: string | null | undefined,
    labelNumberOfLines?: number,
    descriptionNumberOfLines?: number,
    labelTextStyle?: any,
    isSelected: boolean,
    contentContainerStyle?: any,
    onPress?: (data: any) => void
}

const LabelDescriptionRowItem = memo(({
                                          style,
                                          data,
                                          label,
                                          description,
                                          labelNumberOfLines,
                                          descriptionNumberOfLines,
                                          labelTextStyle,
                                          isSelected,
                                          contentContainerStyle,
                                          onPress
                                      }: LabelDescriptionRowItemProps) => {
    return (<SelectionRow
        style={style}
        contentContainerStyle={contentContainerStyle}
        isSelected={isSelected}
        data={data}
        onPress={onPress}
    >
        <Text
            style={[fontStyles.robotoStyle, {color: '#313131', fontSize: 14, lineHeight: 24}, labelTextStyle,
                fontStyles.fontWeightBold]}
            numberOfLines={labelNumberOfLines}
        >
            {label || ''}
        </Text>
        <Text
            style={[fontStyles.robotoStyle, {color: '#313131', fontSize: 14, lineHeight: 24}, labelTextStyle]}
            numberOfLines={descriptionNumberOfLines}
        >
            {description || ''}
        </Text>
    </SelectionRow>);
});

export interface SelectionListProps<V> {
    data: V[] | null | undefined,
    rowContainerStyle?: any,
    labelTextStyle?: any,
    multiple?: boolean,
    selections: string[] | any | null | undefined,
    rowContentContainerStyle?: any,
    rowHeight?: number,
    labelNumberOfLines?: number,
    descriptionNumberOfLines?: number,
    getItemKey: (item: V, index: number) => string,
    getItemLabel: (item: V, index: number) => string | null | undefined,
    getItemDescription?: (item: V, index: number) => string | null | undefined,
    onChangeSelections: (selections: string[]) => void,
}

const SelectionList = (<V extends object>({
                                              style,
                                              data,
                                              rowContainerStyle = styles.rowContainerStyle,
                                              rowContentContainerStyle,
                                              labelTextStyle,
                                              selections,
                                              multiple = false,
                                              labelNumberOfLines = 1,
                                              descriptionNumberOfLines = 3,
                                              keyboardDismissMode = 'on-drag',
                                              rowHeight,
                                              getItemLabel,
                                              getItemDescription,
                                              getItemKey,
                                              onChangeSelections,
                                          }: SelectionListProps<V> & ScrollViewProps) => {
    const _selectionSet = useMemo(() => {
        return Set<string>(selections || []);
    }, [selections]);
    const _onRowPress = useCallback((_itemKey) => {
        let _result: string[] | null | undefined;
        if (multiple) {
            if (!_selectionSet.has(_itemKey)) {
                _result = _selectionSet.add(_itemKey).toArray();
            } else {
                _result = _selectionSet.delete(_itemKey).toArray();
            }
        } else {
            if (!_selectionSet.has(_itemKey)) {
                _result = [_itemKey];
            } else {
                return;
            }
        }
        onChangeSelections && onChangeSelections(_result || []);
    }, [_selectionSet, multiple, onChangeSelections]);
    const _keyExtractor = useCallback((item, index) => {
        return getItemKey(item, index) + '';
    }, [getItemKey]);
    const _getItemLayout = rowHeight ? useCallback((item, index) => {
        return {length: rowHeight, offset: rowHeight * index, index}
    }, [rowHeight]) : undefined;
    const _renderItem = useCallback(({item, index}) => {
        const _itemKey = getItemKey(item, index);
        const _label = getItemLabel(item, index);
        const _isSelect = _selectionSet.has(_itemKey);
        if (getItemDescription) {
            const _description = getItemDescription(item, index);
            return (<LabelDescriptionRowItem
                style={rowHeight ? [rowContainerStyle, {height: rowHeight}] : rowContainerStyle}
                contentContainerStyle={rowContentContainerStyle}
                labelTextStyle={labelTextStyle}
                labelNumberOfLines={labelNumberOfLines}
                isSelected={_isSelect}
                data={_itemKey}
                label={_label}
                description={_description}
                onPress={_onRowPress}
            />);
        }
        return (<LabelRowItem
            style={rowHeight ? [rowContainerStyle, {height: rowHeight}] : rowContainerStyle}
            contentContainerStyle={rowContentContainerStyle}
            labelTextStyle={labelTextStyle}
            labelNumberOfLines={labelNumberOfLines}
            isSelected={_isSelect}
            data={_itemKey}
            label={_label}
            onPress={_onRowPress}
        />);
    }, [labelNumberOfLines, _selectionSet, getItemKey, getItemLabel, getItemDescription, rowHeight]);
    return (<FlatList
        style={style}
        keyboardDismissMode={keyboardDismissMode}
        data={data}
        extraData={_selectionSet}
        keyExtractor={_keyExtractor}
        getItemLayout={_getItemLayout}
        renderItem={_renderItem}
    />);
});
const styles = StyleSheet.create({
    rowContainerStyle: {
        minHeight: 40,
    },
});
export default SelectionList;
