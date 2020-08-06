import { BlurView } from '@react-native-community/blur';
import React, { memo, useCallback, useRef } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { TEXT_BLACK_PRIMARY } from "common/colors";
import { PADDING_H, PADDING_V } from "common/dimens";
import { ICON_NAME } from 'common/icon_name';
import { commonStyles, FontNormal, fontStyles } from "common/styles";
import VectorIcon from "../vector_icons/VectorIcon";
import GradientButton from 'widgets/button/GradientButton';
import OpacityButton from 'widgets/button/OpacityButton';

export interface DialogProps {
    visible: boolean,
    children?: any,
    onDismiss: () => void,
    contentContainerStyle?: any,
    dismissTouchOutSide?: boolean,
}

const Dialog = memo(({
    visible = false,
    children,
    onDismiss,
    contentContainerStyle,
    dismissTouchOutSide = true,
}: DialogProps): JSX.Element => {

    const _containerRef = useRef(null);
    const _onDismiss = useCallback(() => {
        onDismiss && onDismiss();
    }, [onDismiss]);
    let _touchOutSideButton;
    if (dismissTouchOutSide) {
        _touchOutSideButton = (<OpacityButton
            style={commonStyles.fillFull}
            activeOpacity={1}
            onPress={_onDismiss}
        />)
    }
    // @ts-ignore
    return (<Modal
        visible={visible}
        animated={true}
        animationType={'fade'}
        hardwareAccelerated={true}
        transparent={true}
        onRequestClose={_onDismiss}
    >
        <View
            style={styles.container}
            ref={_containerRef}
        >
            <BlurView
                style={commonStyles.fillFull}
                blurType="light"
                blurAmount={10}
                reducedTransparencyFallbackColor={"white"}
            />
            {_touchOutSideButton}
            <View
                style={[styles.contentContainer, commonStyles.shadow_blue5, contentContainerStyle]}
            >
                {children}
            </View>
        </View>
    </Modal>)
});

export interface DialogTitleHeaderProps {
    style?: any,
    title?: string | null | undefined,
    onCloseButtonPress?: () => void
}

export const DialogTitleHeader = memo((props: DialogTitleHeaderProps): JSX.Element => {
    const {
        style,
        title,
        onCloseButtonPress
    } = props;
    return (<View
        style={[style, styles.headerContainer]}
    >
        <View
            style={styles.headerButtonContainer}
        />
        <Text
            style={[fontStyles.dialogTitle, { color: TEXT_BLACK_PRIMARY }]}
        >
            {title || ''}
        </Text>
        <OpacityButton
            style={styles.headerButtonContainer}
            onPress={onCloseButtonPress}
        >
            <VectorIcon
                name={ICON_NAME.ICON_CLOSE_CIRCLE}
                size={25}
                color={'#D4D4D4'} />
        </OpacityButton>
    </View>);
});

export interface DialogButtonFooterProps {
    style?: any,
    buttonLabel?: string | null | undefined,
    onPress?: () => void
}

export const DialogButtonFooter = memo((props: DialogButtonFooterProps): JSX.Element => {
    const {
        style,
        buttonLabel,
        onPress
    } = props;

    return (<View
        style={[style, styles.footerContainer]}
    >
        <GradientButton
            style={styles.footerButtonContainer}
            onPress={onPress}
        >
            <Text
                style={[styles.label_submit_style]}
            >
                {buttonLabel || ''}
            </Text>
        </GradientButton>
    </View>);
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    contentContainer: {
        marginHorizontal: 24,
        marginVertical: 64,
        paddingHorizontal: PADDING_H,
        paddingVertical: PADDING_V,
        alignItems: 'stretch',
        justifyContent: 'center',
        borderRadius: 18,
        backgroundColor: 'white',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerButtonContainer: {
        width: 25,
        height: 25
    },
    footerContainer: {
        paddingTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footerButtonContainer: {
        height: 36,
        borderRadius: 18,
        overflow: 'hidden',
        paddingHorizontal: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    label_submit_style: {
        ...FontNormal,
        fontSize: 16,
        fontWeight: "500",
        color: "white"
    }
});

export default Dialog;
