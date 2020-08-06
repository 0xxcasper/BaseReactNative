import React, {memo} from 'react';
import LinearGradient from "react-native-linear-gradient";
import OpacityButton, { OpacityButtonProps } from 'widgets/button/OpacityButton';
import { commonStyles } from 'common/styles';

interface Props {
    style?: any,
    gradientColors?: (string | number)[] | undefined,
    gradientLocations?: number[],
    isGradient?: boolean,
    gradientOpacity?: number,
    start?: { x: number, y: number },
    end?: { x: number, y: number },
    children?: any,
}

export type GradientButtonProps = Props & OpacityButtonProps;

const GradientButton = memo(({
                                 isGradient = true,
                                 gradientColors = ['#CE1F1F', '#FF350B', '#FF350B'],
                                 gradientLocations = [0, 1, 1],
                                 gradientOpacity = 1,
                                 start = {x: 1, y: 0},
                                 end = {x: 0, y: 1},
                                 children,
                                 ...restProps
                             }: GradientButtonProps): JSX.Element => {

    let _gradientLayer;
    if (isGradient) {
        _gradientLayer = (<LinearGradient
            style={[commonStyles.fillFull, {opacity: gradientOpacity}]}
            colors={gradientColors}
            locations={gradientLocations}
            start={start}
            end={end}>

        </LinearGradient>);
    }
    return (
        <OpacityButton
            {...restProps}
        >
            {_gradientLayer}
            {children}
        </OpacityButton>
    )
});
export default GradientButton;
