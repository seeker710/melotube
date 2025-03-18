import { StyleSheet, Text, View } from "react-native";
import { capitalCase } from "change-case";
// import constants
import { COLORS } from "../../constants/colors";
import { DIMENSIONS } from "../../constants/dimensions";
// import icons
import PlayIcon from "../../../assets/mini-player/play.svg";
import PauseIcon from "../../../assets/mini-player/pause.svg";

const MiniPlayer = () => {
    return (
        <>
            <View style={styles.textContainer}>
                <Text numberOfLines={1} style={styles.titleText}>{capitalCase("Ho Tum Mere Ho")}</Text>
                <Text numberOfLines={1} style={styles.subtitleText}>{capitalCase("Anuv Jain - Jo Tum Mere Ho")}</Text>
            </View>
            <View style={styles.iconContainer}>
                {/* <PlayIcon height={DIMENSIONS.ICON_SIZE_34} width={DIMENSIONS.ICON_SIZE_34} fill={COLORS.FOCUSED_TEXT_COLOR} /> */}
                <PauseIcon height={DIMENSIONS.ICON_SIZE_34} width={DIMENSIONS.ICON_SIZE_34} fill={COLORS.FOCUSED_TEXT_COLOR} />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    mpContainer: {
        // display: "flex",
        // flexDirection: "row",
        /**
         * @see SlidingBottom.js - paddingAnimation 
         * here we subtracting the padding top and bottom for placement of element
         */
        // height: (DIMENSIONS.HEIGHT_MINI_PLAYER - 2 * 4),
    },
    textContainer: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "flex-start",
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
        alignSelf: "center",
    },
});

export default MiniPlayer;
