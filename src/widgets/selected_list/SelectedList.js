import React, { memo, useCallback, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { Map } from 'immutable'
import OpacityButton from "widgets/button/OpacityButton";

const SelectedList = memo(({
    data,
    selected,
    onSelected
}) => {

    const [selectedMap, setSelectedMap] = useState(new Map());

    useEffect(() => {
        const { keyItem } = selected
        const newSelected = new Map(selectedMap);
        newSelected.set(keyItem, !selectedMap.get(keyItem));
        setSelectedMap(newSelected)
    }, [selected])

    const _onSelected = useCallback((_itemSelected) => {
        onSelected && onSelected(_itemSelected)
    }, [onSelected, selectedMap])

    const _renderItem = useCallback((_item, index) => {
        const _isSelected = _item.keyItem === selected.keyItem
        return (
            <OpacityButton
                activeOpacity={0.9}
                onPress={() => _onSelected(_item)}
                key={'selection_list' + index}
                style={[styles.contain_item]}>
                <Text
                    style={[styles.label_style, {
                        opacity: _isSelected ? 1.0 : 0.7
                    }]}
                >
                    {_item.label}
                </Text>
                <DotView isSelected={_isSelected} />
            </OpacityButton>
        )
    }, [selected])

    return (
        <View style={[styles.container]}>
            {
                data.map(_renderItem)
            }
            {/* <FlatList
                horizontal={true}
                data={data}
                renderItem={_renderItem}
                extraData={selected}
            /> */}
        </View >
    )
})

export const DotView = memo(({ isSelected }) => {
    return (
        <View style={[styles.dot_style, {
            backgroundColor: isSelected ? "black" : "transparent"
        }]} />
    )
})

SelectedList.propTypes = {}
const styles = StyleSheet.create({
    container: {
        height: 40,
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: "center",
    },
    label_style: {
        color: "#333333",
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 5
    },
    contain_item: {
        height: "100%",
        justifyContent: 'flex-end',
        alignItems: "center"
    },
    dot_style: {
        width: 4,
        height: 4,
        borderRadius: 2
    }
})

export default SelectedList
