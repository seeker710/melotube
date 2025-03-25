import { Image, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from "react-native-reanimated";
import { capitalCase } from "change-case";
// import constants
import { COLORS } from "../../constants/colors";
import { DIMENSIONS, SNAP_BOTTOM, SNAP_TOP } from "../../constants/dimensions";
import { STYLES } from "../../constants/styles";
// import icons
import PauseIcon from "../../../assets/icons/pause.svg";
import PlayIcon from "../../../assets/icons/play.svg";

const MiniPlayer = ({ translateYSV }) => {

    const ICON_SIZE_34 = 34;
    // animation stuff
    const slidingAnimation = useAnimatedStyle(() => {
        'worklet';
        // 68 <- 12 (header marginTop) + 16 (header paddingBottom) + 40 (dropButton height) - 8 ({miniPlayerHeight - thumbnailHeight}/2) + 2 (minorAdjustment)
        var topValue = DIMENSIONS.HEIGHT_STATUS_BAR + 62;
        return {
            transform: [{
                translateY: interpolate(translateYSV.value, [SNAP_TOP, SNAP_BOTTOM], [0, -topValue], Extrapolation.CLAMP),
            }, {
                // as the other screens have padding of 20 and this screen has 28, we are just adjusting by -8 i.e. shifting to left
                translateX: interpolate(translateYSV.value, [SNAP_TOP, SNAP_BOTTOM], [0, -8], Extrapolation.CLAMP),
            }]
        };
    });

    const scaleAnimation = useAnimatedStyle(() => {
        'worklet';
        var scaleUp = (DIMENSIONS.WIDTH_WINDOW - 56) / 48;
        return {
            transform: [{
                scale: interpolate(translateYSV.value, [SNAP_TOP, SNAP_BOTTOM], [scaleUp, 1], Extrapolation.CLAMP),
            }]
        };
    });

    const fadeUpAnimation = useAnimatedStyle(() => {
        'worklet';
        return {
            opacity: interpolate(translateYSV.value, [SNAP_BOTTOM, (2 * SNAP_BOTTOM / 3)], [1, 0], Extrapolation.CLAMP),
        };
    });

    const press = () => {
        console.log("tap here");
    }

    return (
        <Animated.View style={[styles.thumbnailContainer, slidingAnimation]}>
            <Animated.View style={[styles.imageContainer, scaleAnimation]}>
                <Image source={{ uri: "https://lh3.googleusercontent.com/bJksi9-eR3JAjIYce3fLz3NMX-lNvU-xhQXRrPLfFTqeN58sJLr-m5dzeFVI0qvTy_r-eQcUaYemz2iKgw" }} style={STYLES.THUMBNAIL} />
            </Animated.View>
            <Animated.View style={[styles.playerContainer, fadeUpAnimation]}>
                {/* this view contains text */}
                <View style={styles.textContainer}>
                    <Text numberOfLines={1} style={styles.titleText}>{capitalCase("Lorem, ipsum.")}</Text>
                    <Text numberOfLines={1} style={styles.subtitleText}>{capitalCase("Lorem ipsum dolor sit.")}</Text>
                </View>
                {/* this view contains Play/Pause icon */}
                <TouchableHighlight underlayColor={COLORS.TOUCH_FEEDBACK_COLOR} onPress={press} style={styles.iconContainer}>
                    <PlayIcon height={ICON_SIZE_34} width={ICON_SIZE_34} fill={COLORS.FOCUSED_TEXT_COLOR} />
                </TouchableHighlight>
            </Animated.View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    thumbnailContainer: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        aspectRatio: 1,
    },
    imageContainer: {
        backgroundColor: COLORS.CAROUSEL_BACKGROUND_COLOR,
        borderRadius: 2,
        height: 48,
        width: 48,
        overflow: "hidden",
        transformOrigin: "left top",
        zIndex: DIMENSIONS.Z_INDEX_2,
        elevation: 3,
    },
    playerContainer: {
        display: "flex",
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: 48,
        marginRight: -26, // padding of SlidingBottom is 28 & other page is 20, so adjustment of -8 * 2 is done, SlidingBottom is shifting 8 towards left
        marginLeft: 12,
    },
    textContainer: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
    },
    titleText: {
        color: COLORS.FOCUSED_TEXT_COLOR,
        fontSize: 14,
        fontWeight: "500",
        lineHeight: 14 * 1.4,
        overflow: "hidden",
        textAlign: "left",
        textAlignVertical: "center",
        textTransform: "capitalize",
    },
    subtitleText: {
        color: COLORS.UNFOCUSED_TEXT_COLOR,
        fontSize: 12,
        fontWeight: "400",
        lineHeight: 12 * 1.4,
        overflow: "hidden",
        textAlign: "left",
        textAlignVertical: "center",
        textTransform: "capitalize",
    },
    iconContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        width: 40,
        borderRadius: "100%",
    },
});

export default MiniPlayer;