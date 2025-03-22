import { Image, StyleSheet, View } from "react-native";
import Animated, { clamp, Easing, Extrapolation, interpolate, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
// import constants
import { COLORS } from "../../constants/colors";
import { DIMENSIONS, SNAP_BOTTOM, SNAP_TOP } from "../../constants/dimensions";
// import hooks
import useKeyboardVisible from "../../hooks/useKeyboardVisibile";
import { snapPoints } from "../../utils/animation";

const SlidingBottom = ({ translationY }) => {

    // check if keyboard is visible or not
    const isKeyboardVisible = useKeyboardVisible();

    // animation stuff
    const prevTranslationY = useSharedValue(SNAP_BOTTOM);
    const slidingAnimation = useAnimatedStyle(() => {
        'worklet';
        return {
            transform: [{
                translateY: translationY.value,
            }]
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
            translationY.value = withTiming(
                snapPoints(
                    clamp(
                        prevTranslationY.value + event.translationY,
                        SNAP_TOP,
                        SNAP_BOTTOM
                    ),
                    event.velocityY,
                    [SNAP_TOP, SNAP_BOTTOM]
                ), {
                    duration: 300,
                    easing: Easing.linear,
                }
            )
        })
        .runOnJS(true);

    return (
        <GestureDetector gesture={pan}>
            <Animated.View style={[styles.slidingContainer, slidingAnimation, isKeyboardVisible && { display: "none" }]}>
                {/* Top half of player screen */}
                
            </Animated.View>
        </GestureDetector>
    );
};

const styles = StyleSheet.create({
    slidingContainer: {
        backgroundColor: COLORS.PLAYER_BACKGROUND_COLOR,
        height: DIMENSIONS.HEIGHT_WINDOW + DIMENSIONS.HEIGHT_STATUS_BAR,
        width: "100%",
        position: "absolute",
        zIndex: DIMENSIONS.Z_INDEX_1,
    },
});

export default SlidingBottom;
