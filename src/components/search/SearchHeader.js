import { capitalCase } from "change-case";
import { Pressable, StyleSheet, Text, View } from "react-native";
// import constants
import { COLORS } from "../../constants/colors";

const SearchHeader = ({ headerText, seeAllText, onPress }) => {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{capitalCase(headerText)}</Text>
            <Pressable onPress={onPress}>
                <Text style={styles.seeAllText}>{capitalCase(seeAllText)}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        marginBottom: 22,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignContent: "center",
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
    seeAllText: {
        color: COLORS.PRIMARY_COLOR,
        fontSize: 14,
        marginTop: 2,
        overflow: "hidden",
        textAlign: "right",
        textAlignVertical: "center",
        textTransform: "capitalize",
    },
});

export default SearchHeader;
