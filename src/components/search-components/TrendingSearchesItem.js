import { Image, StyleSheet, Text, View } from "react-native";
import { capitalCase } from "change-case";
// import constants
import { COLORS } from "../../constants/colors";
import { DIMENSIONS } from "../../constants/dimensions";
import { STYLES } from "../../constants/styles";
// import icons
import ViewMoreIcon from "../../../assets/view-more/view_more.svg";

const TrendingSearchesItem = ({ searchData }) => {

    // destructure the song data
    const { title, subtitle, image } = searchData;

    return (
        <View style={styles.tsItemContains}>
            {/* this view contains thumbnail */}
            <View style={styles.imageContainer}>
                <Image source={{ uri: image }} style={STYLES.THUMBNAIL} />
            </View>
            {/* this view contains text */}
            <View style={styles.textContainer}>
                <Text numberOfLines={1} style={styles.titleText}>{capitalCase(title)}</Text>
                <Text numberOfLines={1} style={styles.subtitleText}>{capitalCase(subtitle)}</Text>
            </View>
            {/* this view contains view-more icon */}
            <View style={styles.iconContainer}>
                <ViewMoreIcon height={DIMENSIONS.ICON_SIZE_24} width={DIMENSIONS.ICON_SIZE_24} fill={COLORS.UNFOCUSED_TEXT_COLOR} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    tsItemContains: {
        display: "flex",
        flexDirection: "row",
        marginBottom: 22,
        width: "100%",
    },
    imageContainer: {
        backgroundColor: COLORS.CAROUSEL_BACKGROUND_COLOR,
        height: 48,
        width: 48,
        borderRadius: 6,
        marginRight: 16,
        overflow: "hidden",
        elevation: 3,
    },
    textContainer: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-evenly",
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
    }
});

export default TrendingSearchesItem;