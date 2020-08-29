import React, {memo, useCallback, useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import OpacityButton from "widgets/button/OpacityButton";
import {useDispatch} from "react-redux";
import {pushAction} from "actions/navigationActions";
import {ROUTE_USER} from "navigation/routeNames";
import {requestHomeBannerAction} from "actions/homeActions";
import {useSetLoading} from "contexts/appContext";
import {useHomeBanners} from "hooks/homeHooks";
import {commonStyles} from "common/styles";
import {FlatList} from "react-native-gesture-handler";
import {SAFE_AREA_BOTTOM_HEIGHT} from "common/dimens";

interface HomeRouteProps {

}

const HomeRoute = memo(({}: HomeRouteProps) => {
    const dispatch      = useDispatch()
    const setLoading    = useSetLoading()
    const _homeBanners  = useHomeBanners()

    useEffect(() => {
        setLoading(true)
        dispatch(requestHomeBannerAction(() => {
            setLoading(false)
        }, () => {
            setLoading(false)
        }))
    }, [])

    const _onButtonPress = useCallback(() => {
        dispatch(pushAction(ROUTE_USER))
    }, [])

    const _renderHomeBanner = useCallback(({ item }) => {
        console.log('_homeBanners', item.imageThumb)

        return(
            <Image
                style={{ width: 200, height: 100 }}
                source={{uri: item.imageThumb}}/>
        )
    }, [])

    return (
        <View style={styles.container}>
            <OpacityButton
                style={styles.buttonStyle}
                onPress={_onButtonPress}>
                <Text style={styles.labelStyle}>HOME</Text>
            </OpacityButton>
            <FlatList
                style={{ marginBottom: SAFE_AREA_BOTTOM_HEIGHT }}
                data={_homeBanners}
                renderItem={_renderHomeBanner}/>
        </View>
    );
})

const styles = StyleSheet.create({
    container: {
        ...commonStyles.fillFullCenterAll,
        backgroundColor: '#2c3e50',
    },
    buttonStyle: {
        width: 140,
        height: 60,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8
    },
    labelStyle: {
        fontSize: 18,
        fontWeight: "bold"
    }
});

export default HomeRoute;
