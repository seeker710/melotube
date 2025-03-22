import { Image, StyleSheet, Text, View } from "react-native";
// import constants
import { COLORS } from "../../constants/colors";
import { STYLES } from "../../constants/styles";
// import icons
import ExplicitIcon from "../../../assets/icons/explicit.svg";

const AllPodcastsItem = ({ allPodcastsData }) => {

    const ICON_SIZE_15 = 15;
    // extracting the data to be rendered
    const { image, title, more_info: { square_image }, explicit_content } = allPodcastsData || {};

    return (
        <View style={styles.allPodcastsContainer}>
            {/* this view contains image */}
            <View style={styles.imageContainer}>
                <Image source={{ uri: square_image || image }} style={STYLES.THUMBNAIL} />
            </View>
            {/* this view contains podcasts info */}
            <View style={styles.textContainer}>
                {/* this view contains explicit icon */}
                {
                    (explicit_content === "1")
                    && <View style={styles.iconContainer}>
                        <ExplicitIcon height={ICON_SIZE_15} width={ICON_SIZE_15} fill={COLORS.FOCUSED_TEXT_COLOR} />
                    </View>
                }
                {/* this view contains podcasts title */}
                <Text numberOfLines={1} style={styles.titleText}>{title}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    allPodcastsContainer: {
        width: "50%",
        marginBottom: 22,
        paddingRight: 18,
    },
    imageContainer: {
        aspectRatio: 1, // defining width and height so that conatiner doesn't collapse if thumbnail doesn't appear
        backgroundColor: COLORS.CAROUSEL_BACKGROUND_COLOR,
        borderRadius: 6,
        marginBottom: 8,
        overflow: "hidden",
        width: "100%",
        elevation: 3,
    },
    textContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        width: "100%",
    },
    iconContainer: {
        marginRight: 3,
        marginTop: 1,
    },
    titleText: {
        color: COLORS.FOCUSED_TEXT_COLOR,
        fontSize: 14,
        fontWeight: "500",
        lineHeight: 14 * 1.4,
        overflow: "hidden",
        textAlignVertical: "center",
        textTransform: "capitalize",
    },
});

export default AllPodcastsItem;
