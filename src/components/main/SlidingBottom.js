import { StyleSheet, TouchableHighlight, View } from "react-native";
import Animated, { clamp, Easing, Extrapolation, interpolate, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
// import components
import MiniPlayer from "./MiniPlayer";
// import constants
import { COLORS } from "../../constants/colors";
import { DIMENSIONS, SNAP_BOTTOM, SNAP_TOP } from "../../constants/dimensions";
import { STYLES } from "../../constants/styles";
// import hooks
import useKeyboardVisible from "../../hooks/useKeyboardVisibile";
import { snapPoints } from "../../utils/animation";
// import icons
import ArrowDownIcon from "../../../assets/icons/arrow_down.svg";

const SlidingBottom = ({ translateYSV }) => {

    const ICON_SIZE_24 = 24;
    // check if keyboard is visible or not
    const isKeyboardVisible = useKeyboardVisible();

    // animation stuff
    const prevTranslateYSV = useSharedValue(SNAP_BOTTOM);
    const slidingAnimation = useAnimatedStyle(() => {
        'worklet';
        return {
            transform: [{
                translateY: translateYSV.value,
            }]
        };
    });

    // gesture stuff
    const pan = Gesture.Pan()
        .minDistance(1)
        .onBegin(() => {
            prevTranslateYSV.value = translateYSV.value;
        })
        .onUpdate((event) => {
            translateYSV.value = clamp(
                prevTranslateYSV.value + event.translationY,
                SNAP_TOP,
                SNAP_BOTTOM
            );
        })
        .onEnd((event) => {
            translateYSV.value = withTiming(
                snapPoints(
                    clamp(
                        prevTranslateYSV.value + event.translationY,
                        SNAP_TOP,
                        SNAP_BOTTOM
                    ),
                    event.velocityY,
                    [SNAP_TOP, SNAP_BOTTOM]
                ), {
                duration: 300,
                easing: Easing.linear,
            }
            );
            prevTranslateYSV.value = translateYSV.value;
        })
        .runOnJS(true);

    // Top of player screen
    const press = () => {
        translateYSV.value = withTiming(SNAP_BOTTOM, {
            duration: 300,
        });
    }
    const fadeDownAnimation = useAnimatedStyle(() => {
        'worklet';
        return {
            opacity: interpolate(translateYSV.value, [SNAP_TOP, SNAP_BOTTOM / 3], [1, 0], Extrapolation.CLAMP),
        };
    });

    return (
        <GestureDetector gesture={pan} >
            <Animated.View style={[STYLES.MAIN_CONTAINER, styles.slidingContainer, slidingAnimation, isKeyboardVisible && { display: "none" }]}>
                {/* Top of player screen */}
                <Animated.View style={[styles.header, fadeDownAnimation]}>
                    <TouchableHighlight underlayColor={COLORS.TOUCH_FEEDBACK_COLOR} onPress={press} style={styles.dropButton}>
                        <ArrowDownIcon height={ICON_SIZE_24} width={ICON_SIZE_24} fill={COLORS.FOCUSED_TEXT_COLOR} />
                    </TouchableHighlight>
                </Animated.View>
                {/* Middle of Player screen */}
                <MiniPlayer translateYSV={translateYSV} />
                {/* Bottom of Player screen */}
                <></>
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
        paddingHorizontal: 28,
    },
    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: 16,
        marginTop: 12 + DIMENSIONS.HEIGHT_STATUS_BAR,
        marginLeft: -12,
    },
    dropButton: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        width: 40,
        borderRadius: "100%",
    },
});

export default SlidingBottom;
