import { Image, StyleSheet, View } from "react-native";
import Animated, { clamp, Extrapolation, interpolate, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
// import components
// import constants
import { COLORS } from "../../constants/colors";
import { DIMENSIONS, SNAP_BOTTOM, SNAP_TOP } from "../../constants/dimensions";
import { STYLES } from "../../constants/styles";
// import hooks
import useKeyboardVisible from "../../hooks/useKeyboardVisibile";
import { snapPoints } from "../../utils/animation";

const config = {
    damping: 13,
    mass: 1,
    stiffness: 110,
    restSpeedThreshold: 0.1,
    restDisplacementThreshold: 0.1,
};

const SlidingBottom = ({ translationY }) => {

    // check if keyboard is visible or not
    const isKeyboardVisible = useKeyboardVisible();

    // animation stuff
    const prevTranslationY = useSharedValue(SNAP_BOTTOM);
    const translationYAnimation = useAnimatedStyle(() => {
        'worklet';
        return {
            transform: [
                { translateY: translationY.value },
            ]
        };
    });
    const dimensionAnimation = useAnimatedStyle(() => {
        'worklet';
        return {
            height: interpolate(translationY.value, [SNAP_TOP, SNAP_BOTTOM], [DIMENSIONS.WIDTH_SCREEN * 0.8, 48], Extrapolation.CLAMP),
            width: interpolate(translationY.value, [SNAP_TOP, SNAP_BOTTOM], [DIMENSIONS.WIDTH_SCREEN * 0.8, 48], Extrapolation.CLAMP),
        };
    });
    const paddingAnimation = useAnimatedStyle(() => {
        'worklet';
        return {
            paddingHorizontal: interpolate(translationY.value, [SNAP_TOP, SNAP_BOTTOM], [DIMENSIONS.WIDTH_SCREEN * 0.1, 18], Extrapolation.CLAMP),
            paddingTop: interpolate(translationY.value, [SNAP_TOP, SNAP_BOTTOM], [100, 4], Extrapolation.CLAMP),
        };
    });

    // gesture stuff
    const pan = Gesture.Pan()
        .minDistance(1)
        .onBegin(() => {
            prevTranslationY.value = translationY.value;
        })
        .onUpdate((event) => {
            translationY.value = clamp(
                prevTranslationY.value + event.translationY,
                SNAP_TOP,
                SNAP_BOTTOM
            );
        })
        .onEnd((event) => {
            translationY.value = withSpring(
                snapPoints(
                    clamp(
                        prevTranslationY.value + event.translationY,
                        SNAP_TOP,
                        SNAP_BOTTOM
                    ),
                    event.velocityY,
                    [SNAP_TOP, SNAP_BOTTOM]
                ),
                config
            );
        })
        .runOnJS(true);

    return (
        <GestureDetector gesture={pan}>
            <Animated.View style={[styles.slidingContainer, translationYAnimation, isKeyboardVisible && { display: "none" }]}>
                <Animated.View style={[paddingAnimation, { paddingVertical: 4, paddingHorizontal: 14 }]}>
                    <Animated.View style={[dimensionAnimation, { height: 48, width: 48, borderRadius: 6, elevation: 1, overflow: "hidden", backgroundColor: "red" }]}>
                    </Animated.View>
                </Animated.View>
            </Animated.View>
        </GestureDetector>
    );
}

const styles = StyleSheet.create({
    slidingContainer: {
        backgroundColor: COLORS.PLAYER_BACKGROUND_COLOR,
        height: DIMENSIONS.HEIGHT_WINDOW + DIMENSIONS.HEIGHT_STATUS_BAR,
        width: "100%",
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: DIMENSIONS.Z_INDEX_SLIDING_BOTTOM,
    },
});

export default SlidingBottom;
