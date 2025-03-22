import { StyleSheet, Text, View } from "react-native";
// import constants
import { COLORS } from "../../constants/colors";

const SongInfo = ({ centerText = false, title, subtitle = "" }) => {
    return (
        <View style={styles.textContainer}>
            <Text numberOfLines={1} style={[styles.titleText, centerText && { textAlign: "center" }]}>{title}</Text>
            <Text numberOfLines={1} style={[styles.subtitleText, centerText && { textAlign: "center" }, !subtitle && { display: "none" }]}>{subtitle}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    textContainer: {
        width: "100%",
        textAlign: "center",
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
        lineHeight: 12 * 1.4,
        overflow: "hidden",
        textAlign: "left",
        textAlignVertical: "center",
        textTransform: "capitalize",
    },
});

export default SongInfo;
