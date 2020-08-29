import {Platform, StyleSheet} from 'react-native';
import {
    NAVIGATION_BAR_PADDING_H,
    NAVIGATION_BUTTON_ICON_MARGIN_RIGHT,
    SAFE_AREA_BOTTOM_HEIGHT
} from "./dimens";
import {TEXT_BLACK_PRIMARY} from "./colors";

export const FontNormalName = 'Roboto'

export const FontNormal = Platform.select({
    android: {
        fontFamily: `${FontNormalName}-Regular`
    },
    ios: {
        fontFamily: FontNormalName,
        fontWeight: 'normal'
    }
});

export const FontBold = Platform.select({
    android: {
        fontFamily: `${FontNormalName}-Bold`
    },
    ios: {
        fontFamily: FontNormalName,
        fontWeight: 'bold'
    }
});

export const Font800 = Platform.select({
    android: {
        fontFamily: `${FontNormalName}-ExtraBold`
    },
    ios: {
        fontFamily: FontNormalName,
        fontWeight: '800'
    }
});

export const Font600 = Platform.select({
    android: {
        fontFamily: `${FontNormalName}-SemiBold`
    },
    ios: {
        fontFamily: FontNormalName,
        fontWeight: '600'
    }
});

export const Font600Italic = Platform.select({
    android: {
        fontFamily: `${FontNormalName}-SemiBoldItalic`
    },
    ios: {
        fontFamily: FontNormalName,
        fontStyle: 'italic',
        fontWeight: '600'
    }
});

export const Font500 = Platform.select({
    android: {
        fontFamily: `${FontNormalName}-SemiBold`
    },
    ios: {
        fontFamily: FontNormalName,
        fontWeight: '500'
    }
});

export const Font500Italic = Platform.select({
    android: {
        fontFamily: `${FontNormalName}-SemiBold`
    },
    ios: {
        fontFamily: FontNormalName,
        fontStyle: 'italic',
        fontWeight: '500'
    }
});


export const Font300 = Platform.select({
    android: {
        fontFamily: `${FontNormalName}-Light`
    },
    ios: {
        fontFamily: FontNormalName,
        fontWeight: '300'
    }
});

export const FontItalic = Platform.select({
    android: {
        fontFamily: `${FontNormalName}-LightItalic`
    },
    ios: {
        fontFamily: FontNormalName,
        fontStyle: 'italic'
    }
});

export const FontBoldItalic = Platform.select({
    android: {
        fontFamily: `${FontNormalName}-BoldItalic`
    },
    ios: {
        fontFamily: FontNormalName,
        fontWeight: 'bold',
        fontStyle: 'italic'
    }
});

export const commonStyles = StyleSheet.create({
    fullFlex: {
        flex: 1,
    },
    fullFlexCenterAll: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    fullFlexStretchItems: {
        flex: 1,
        alignItems: 'stretch'
    },
    fillFull: {
        position: 'absolute',
        backgroundColor: 'transparent',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    fillFullSafeAreaBottom: {
        position: 'absolute',
        backgroundColor: 'transparent',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        paddingBottom: SAFE_AREA_BOTTOM_HEIGHT
    },
    fillFullSafeAreaBottomCenterAll: {
        position: 'absolute',
        backgroundColor: 'transparent',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        paddingBottom: SAFE_AREA_BOTTOM_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center'
    },
    fillFullCenterAll: {
        position: 'absolute',
        backgroundColor: 'transparent',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    centerAll: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    noPaddingMargin: {
        paddingHorizontal: 0,
        paddingVertical: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
        marginHorizontal: 0,
        marginVertical: 0,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0
    },
    headerLeftContainerStyle: {
        paddingHorizontal: 0,
        paddingVertical: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
        marginHorizontal: 0,
        marginVertical: 0,
        marginLeft: 0,
        marginTop: 0,
        marginBottom: 0,
        paddingLeft: NAVIGATION_BAR_PADDING_H,
        marginRight: 0,
    },
    shadow5: {
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    shadow10: {
        shadowColor: 'black',
        shadowOffset: {
            height: 10,
            width: 0,
        },
        shadowOpacity: 0.53,
        shadowRadius: 13.97,
        elevation: 21,
    },
    shadow_blue5: {
        shadowColor: 'rgba(0, 64, 128, 0.8);',
        shadowOffset: {
            height: 0,
            width: 0,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5.0,
        elevation: 5.0,
    },
    shadow_blue2: {
        shadowColor: 'rgba(0, 64, 128, 0.8);',
        shadowOffset: {
            height: 0,
            width: 0,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2.0,
        elevation: 2,
    },
    default_background_color: {
        backgroundColor: "#FBFBFB"
    },
    button_back_default_style: {
        position: 'absolute',
        top: 58,
        left: 20
    },
    button_notification_default_margin_right: {
        marginRight: NAVIGATION_BUTTON_ICON_MARGIN_RIGHT
    },
    shadow2: {
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    row_center: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    row_center_justify_between: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});
export const fontStyles = StyleSheet.create({
    multiStyle: {
        fontSize: 15,
        lineHeight: 19,
        ...FontNormal
    },
    robotoStyle: {
        fontSize: 15,
        lineHeight: 19,
        ...FontNormal
    },
    navigationTitle: {
        fontSize: 17,
        lineHeight: 17,
        color: '#000000',
        ...Font800
    },
    dialogTitle: {
        fontSize: 17,
        lineHeight: 20,
        ...Font600
    },
    h1Text: {
        fontSize: 96,
        letterSpacing: -1.5,
        ...Font300
    },
    h2Text: {
        fontSize: 60,
        letterSpacing: -0.5,
        ...Font300
    },
    h3Text: {
        fontSize: 48,
        letterSpacing: 0,
        ...Font300
    },
    h4Text: {
        fontSize: 34,
        letterSpacing: 0.25,
        ...Font300
    },
    h5Text: {
        fontSize: 24,
        letterSpacing: 0,
        ...Font300
    },
    h6Text: {
        fontSize: 20,
        letterSpacing: 0.15,
        ...Font300
    },
    subtitle1Text: {
        fontSize: 16,
        letterSpacing: 0.15,
        ...Font300
    },
    subtitle2Text: {
        fontSize: 14,
        letterSpacing: 0.1,
        ...Font300
    },
    body1Text: {
        fontSize: 16,
        letterSpacing: 0.5,
        ...Font300
    },
    body2Text: {
        fontSize: 14,
        letterSpacing: 0.25,
        ...Font300
    },
    buttonText: {
        fontSize: 14,
        letterSpacing: 0.75,
        ...Font300
    },
    captionText: {
        fontSize: 12,
        letterSpacing: 0.4,
        ...Font300
    },
    overlineText: {
        fontSize: 10,
        letterSpacing: 1.5,
        ...Font300
    },
    italic1Text: {
        fontSize: 16,
        letterSpacing: 0.5,
        fontStyle: 'italic',
        ...Font300
    },
    italic2Text: {
        fontSize: 14,
        letterSpacing: 0.25,
        fontStyle: 'italic',
        ...Font300
    },
    fontWeightBold: {
        fontWeight: "bold"
    }
});
export const navigationStyles = StyleSheet.create({
    headerTitleStyle: {
        ...FontNormal,
        fontSize: 16,
        lineHeight: 20,
        fontWeight: Platform.select({
            ios: "800",
            android: "bold"
        }),
        color: TEXT_BLACK_PRIMARY
    },
    headerLeftContainerStyle: {
        paddingHorizontal: 0,
        paddingVertical: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
        marginHorizontal: 0,
        marginVertical: 0,
        marginLeft: 0,
        marginTop: 0,
        marginBottom: 0,
        paddingLeft: NAVIGATION_BAR_PADDING_H,
        marginRight: 0,
    },
    headerRightContainerStyle: {
        paddingHorizontal: 0,
        paddingVertical: 0,
        paddingRight: NAVIGATION_BAR_PADDING_H,
        paddingTop: 0,
        paddingBottom: 0,
        marginHorizontal: 0,
        marginVertical: 0,
        marginLeft: 0,
        marginTop: 0,
        marginBottom: 0,
        paddingLeft: 0,
        marginRight: 0,
    },
    tabBarLabelStyle: {
        fontSize: 10,
        lineHeight: 13,
        ...Font600,
    },
    headerWhiteShadow: {
        backgroundColor: "white",
        borderBottomColor: "rgba(207, 207, 207, 0.6)",
        borderBottomWidth: 0.5
    }
});

export const nextButton = StyleSheet.create({
    nextButtonContainer: {
        alignSelf: 'center',
        paddingHorizontal: 50,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 42,
        overflow: 'hidden',
    },
    nextButtonText: {
        ...StyleSheet.flatten(Font600),
        fontSize: 16,
        lineHeight: 19,
        color: 'white',
    }
})

export const headerOptions = {
    headerShown: {
        headerShown: false
    }
}

export const dropdownStyle = {
    rowContainer: {
        paddingVertical: 6,
        paddingLeft: 47,
        paddingRight: 27,
        minHeight: 40
    }
}
