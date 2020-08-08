import React, {memo} from 'react'
import {StyleSheet, View} from 'react-native'

const DrawerContent = memo((props) => {
    return (
        <View style={styles.containerStyle}/>
    )
})
const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: "red",
        width: "100%",
        height: "100%",
        opacity: 0.7
    }
})

export default DrawerContent;
