import { ImageBackground, StyleSheet, Text, View } from "react-native";
// import constants
import { COLORS } from "../../constants/colors";
import { DIMENSIONS } from "../../constants/dimensions";
import { STYLES } from "../../constants/styles";

const ChannelItem = ({ channelData }) => {

    // destructuring the channel data
    const { title, image } = channelData;
    // setting the aspect ratio
    const aspectRatio = ((DIMENSIONS.WIDTH_WINDOW / 2) - 18 - 3) / (DIMENSIONS.WIDTH_WINDOW / 4);

    return (
        <View style={styles.channelItemContainer}>
            <ImageBackground source={{ uri: image }} style={[STYLES.THUMBNAIL, { aspectRatio }]}>
                <View style={styles.textContainer}>
                    <Text numberOfLines={1} style={styles.channelText}>{title}</Text>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    channelItemContainer: {
        backgroundColor: COLORS.CAROUSEL_BACKGROUND_COLOR,
        borderRadius: 6,
        height: DIMENSIONS.WIDTH_WINDOW / 4,
        width: (DIMENSIONS.WIDTH_WINDOW / 2) - 18 - 3,
        marginBottom: 6,
        overflow: "hidden",
        elevation: 1,
    },
    textContainer: {
        display: "flex",
        alignItems: "center",
        height: DIMENSIONS.WIDTH_WINDOW / 4,
        paddingTop: 16,
        paddingHorizontal: 4,
    },
    channelText: {
        color: COLORS.CARD_COLOR,
        fontSize: 15,
        lineHeight: 15 * 1.4,
        fontWeight: "600",
        textAlign: "center",
        textAlignVertical: "center",
        textTransform: "capitalize",
    },
});

export default ChannelItem;
