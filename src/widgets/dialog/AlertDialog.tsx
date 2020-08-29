import React, { memo, useCallback } from 'react';
import { StyleSheet, Text, View } from "react-native";
import { MARGIN_H } from "common/dimens";
import { ICON_NAME } from 'common/icon_name';
import { fontStyles } from "common/styles";
import Dialog, { DialogProps } from "./Dialog";
import OpacityButton from 'widgets/button/OpacityButton';
import GradientButton from 'widgets/button/GradientButton';
import VectorIcon from 'widgets/vector_icons/VectorIcon';
import { isBlank } from 'Helpers';

export enum AlertDialogTypes {
  SUCCESS,
  ERROR,
  INFO,
  WARNING
}

export enum AlertOptionsButtonTypes {
  ACTIVE,
  CANCEL,
  DESTRUCTOR,
}

export enum AlertPriority {
  LOW,
  NORMAL,
  HIGH,
}

export interface AlertDialogProps extends DialogProps {
  type?: AlertDialogTypes;
}

export type AlertOptionButton = {
  label: string;
  style?: AlertOptionsButtonTypes;
  onPress?: () => void;
};
export type AlertOptions = {
  id?: string;
  type?: AlertDialogTypes;
  priority?: AlertPriority;
  contentView?: JSX.Element;
  dismissTouchOutSide?: boolean;
  title?: string | null | undefined;
  children?: any,
  message?: string | null | undefined;
  buttons?: AlertOptionButton[] | null | undefined;
};

const AlertDialog = memo((props: AlertDialogProps) => {
  const {
    type = AlertDialogTypes.INFO,
    children,
    dismissTouchOutSide = false,
    ...restProp
  } = props;
  let _iconView;
  _iconView = <View/>;
  return (
    <Dialog
      {...restProp}
      dismissTouchOutSide={dismissTouchOutSide}
      contentContainerStyle={styles.contentContainerStyle}>
      <GradientButton
        style={styles.topIconContainer}
        disabled={true}>
        {_iconView}
      </GradientButton>
      {children}
    </Dialog>
  );
});

export type BasicAlertContentViewProps = {
  title?: string | null | undefined;
  message?: string | null | undefined;
  buttons?: AlertOptionButton[] | null | undefined;
  onOptionButtonPress?:
  | ((button: AlertOptionButton | null | undefined) => void)
  | null
  | undefined;
  children?: any
};
export const BasicAlertContentView = memo(
  (props: BasicAlertContentViewProps): JSX.Element => {
    const { title, message, children, buttons, onOptionButtonPress } = props;
    let _titleTextView;
    if (!isBlank(title)) {
      _titleTextView = (
        <Text style={styles.basicAlertTitleTextStyle}>{title}</Text>
      );
    }

    const _onPress = useCallback(() => {
      onOptionButtonPress && onOptionButtonPress(buttons![0])
      buttons![0].onPress && buttons![0].onPress()
    }, []);

    let _messageTextView;
    if (!isBlank(message)) {
      _messageTextView = (
        <Text style={styles.basicAlertMessageTextStyle}>{message}</Text>
      );
    }
    let _buttonViews;
    if (buttons && buttons.length > 0) {
      if (buttons.length === 1) {
        _buttonViews = (
          <View style={styles.basicAlertBottomButtonContainer}>
            <OptionButton
              style={styles.singleButtonContainer}
              optionButton={buttons[0]}
              onOptionButtonPress={onOptionButtonPress}
            />
          </View>
        );
      } else if (buttons.length === 2) {
        _buttonViews = (
          <View style={[styles.basicAlertBottomButtonContainer, { flexDirection: 'column' }]}>
            <OptionButton
              style={[styles.singleButtonContainer, { maxWidth: 200, alignSelf: 'center' }]}
              optionButton={buttons[1]}
              onOptionButtonPress={(onOptionButtonPress)}
            />
            <OpacityButton
              onPress={_onPress}
              style={styles.bottom_button}>
              <Text style={[styles.basicAlertTextButton]}>{buttons[0].label || ''}</Text>
            </OpacityButton>
          </View>
        );
      } else {
        _buttonViews = (
          <View style={styles.basicAlertBottomButtonContainer}>
            {buttons.map((_button, _index) => {
              return (
                <OptionButton
                  key={_index + ''}
                  style={styles.buttonContainer}
                  optionButton={_button}
                  onOptionButtonPress={onOptionButtonPress}
                />
              );
            })}
          </View>
        );
      }
    }
    return (
      <View style={styles.basicAlertContentContainer}>
        {_titleTextView}
        {_messageTextView}
        {children && children}
        {_buttonViews}
      </View>
    );
  },
);
type OptionButtonProps = {
  style?: any;
  optionButton: AlertOptionButton;
  onOptionButtonPress?:
  | ((button: AlertOptionButton | null | undefined) => void)
  | null
  | undefined;
};
const OptionButton = memo((props: OptionButtonProps): JSX.Element | null => {
  const { style, optionButton, onOptionButtonPress } = props;
  const _onPress = useCallback(() => {
    onOptionButtonPress && onOptionButtonPress(optionButton);
    optionButton?.onPress && optionButton?.onPress();
  }, [onOptionButtonPress, optionButton]);
  let _buttonView = null;
  if (optionButton) {
    const { label } = optionButton;
    switch (optionButton.style) {
      case AlertOptionsButtonTypes.CANCEL:
        _buttonView = (
          <GradientButton style={style} onPress={_onPress}>
            <Text style={styles.basicAlertActiveButtonTextStyle}>{label}</Text>
          </GradientButton>
        );
        break;
      case AlertOptionsButtonTypes.DESTRUCTOR:
        _buttonView = (
          <GradientButton style={style} onPress={_onPress}>
            <Text style={styles.basicAlertActiveButtonTextStyle}>{label}</Text>
          </GradientButton>
        );
        break;
      default:
        _buttonView = (
          <GradientButton style={style} onPress={_onPress}>
            <Text style={styles.basicAlertActiveButtonTextStyle}>{label}</Text>
          </GradientButton>
        );
        break;
    }
  }
  return _buttonView;
});

export default AlertDialog;

const styles = StyleSheet.create({
  contentContainerStyle: {
    marginTop: 100,
    paddingTop: 0,
  },
  topIconContainer: {
    marginTop: -37,
    width: 74,
    height: 74,
    borderRadius: 37,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  basicAlertContentContainer: {
    alignItems: 'stretch',
    justifyContent: 'center',
    marginTop: 16,
  },
  basicAlertTitleTextStyle: {
    ...StyleSheet.flatten(fontStyles.robotoStyle),
    alignSelf: 'center',
    fontSize: 17,
    lineHeight: 20,
    color: '#1E1F20',
    marginBottom: 14,
    marginTop: 20
  },
  basicAlertMessageTextStyle: {
    ...StyleSheet.flatten(fontStyles.robotoStyle),
    alignSelf: 'center',
    fontSize: 14,
    lineHeight: 22,
    color: '#333333',
    textAlign: 'center',
  },
  basicAlertBottomButtonContainer: {
    marginTop: 33,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  basicAlertActiveButtonTextStyle: {
    ...StyleSheet.flatten(fontStyles.robotoStyle),
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 19,
    color: 'white',
  },
  singleButtonContainer: {
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  buttonContainer: {
    flex: 1,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginHorizontal: MARGIN_H / 2,
  },
  basicAlertTextButton: {
    fontSize: 14,
    color: '#A1AFC3',
    fontWeight: 'normal',
    marginTop: 15
  },
  bottom_button: {
    width: 100, 
    height: 40, 
    justifyContent: 'center', 
    alignItems: 'center', 
    alignSelf: 'center'
  }
});
