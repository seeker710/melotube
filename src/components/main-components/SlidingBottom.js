import { Image, StyleSheet, View } from "react-native";
import Animated, { clamp, Extrapolation, interpolate, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
// import icons
import KeyboardArrowDown from "../../../assets/mini-player/keyboard_arrow_down.svg";
import ViewMore from "../../../assets/view-more/view_more.svg";
// import components
import MiniPlayer from "../player-component/MiniPlayer";
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
            transform: [{
                translateY: translationY.value,
            }]
        };
    });

    const translateDown = (DIMENSIONS.HEIGHT_SCREEN / 8) - 6;
    const translateAnimation = useAnimatedStyle(() => {
        'worklet';
        return {
            transform: [{
                translateY: interpolate(translationY.value, [SNAP_TOP, SNAP_BOTTOM], [0, -translateDown], Extrapolation.CLAMP),
            }]
        };
    });
    const scaleUp = (DIMENSIONS.WIDTH_SCREEN - 2 * 18) / 48;
    const scaleAnimation = useAnimatedStyle(() => {
        'worklet';
        return {
            transform: [{
                scale: interpolate(translationY.value, [SNAP_TOP, SNAP_BOTTOM], [scaleUp, 1], Extrapolation.CLAMP),
            }],
        };
    });
    const testTranslate = useAnimatedStyle(() => {
        'worklet';
        return {
            transform: [{
                translateY: interpolate(translationY.value, [SNAP_TOP, SNAP_BOTTOM], [-100, 0], Extrapolation.CLAMP)
            }]
        };
    })

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
                <View style={{ marginHorizontal: 18, marginTop: DIMENSIONS.HEIGHT_SCREEN / 8 }}>
                    <Animated.View style={[translateAnimation, {  }]}>
                    <View style={styles.imageContainer}>
                        {/* <Image source={{ uri: "https://lh3.googleusercontent.com/I7N7aaBK0qhf1WPucGBsYR3sOTZLeai5YNe9y2pRCMTsu3XQ8ELNRXkynrb_Mi3w8iebfxmsc05uWrjntg=w544-h544-l90-rj" }} style={STYLES.THUMBNAIL} /> */}
                        <View style={{ display: "flex", flexDirection: "row", flexWrap: "nowrap"}}>
                            <Animated.View style={[scaleAnimation, { backgroundColor: "red", height: 48, width: 48, borderRadius: 4, marginRight: 12, transformOrigin: 'left top', zIndex: 2 }]} />
                            <MiniPlayer />
                        </View>
                        <Animated.View style={[testTranslate, {display: "flex", flexDirection: "row", justifyContent: "space-between" }]}>
                            <KeyboardArrowDown height={22} width={22} fill={"black"} />
                            <ViewMore height={22} width={22} fill={"black"} />
                        </Animated.View>
                    </View>
                    </Animated.View>
                </View>
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
        zIndex: DIMENSIONS.Z_INDEX_SLIDING_BOTTOM,
    },
    imageContainer: {
        aspectRatio: 1,
        backgroundColor: COLORS.CAROUSEL_BACKGROUND_COLOR,
        overflow: "hidden",
        transformOrigin: "top left",
        width: "100%",
        overflow: "visible",
    },
});

export default SlidingBottom;
