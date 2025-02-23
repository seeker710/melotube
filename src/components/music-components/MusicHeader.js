import { StyleSheet, Text, View } from "react-native";
import { capitalCase } from "change-case";
// import constants
import { COLORS } from "../../constants/colors";

const MusicHeader = ({ headerText, subHeaderText = "" }) => {
    // this MusicHeader is used by both Music and Podcasts screen
    return (
        <View style={styles.headerContainer}>
            {
                subHeaderText && <Text style={styles.subHeaderText}>{subHeaderText.toUpperCase()}</Text>
            }
            <Text style={styles.headerText}>{capitalCase(headerText)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        marginBottom: 22,
    },
    subHeaderText: {
        color: COLORS.SUB_HEADER_TEXT_COLOR,
        fontSize: 12,
        fontWeight: "500",
        overflow: "hidden",
        textAlign: "left",
        textAlignVertical: "center",
        textTransform: "uppercase",
    },
    headerText: {
        color: COLORS.FOCUSED_TEXT_COLOR,
        fontSize: 20,
        fontWeight: "700",
        overflow: "hidden",
        textAlign: "left",
        textAlignVertical: "center",
        textTransform: "capitalize",
    },
});

export default MusicHeader;
