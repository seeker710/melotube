import { Image, StyleSheet, View } from "react-native";
import Color from "color";
// import components
import SongInfo from "./SongInfo";
// import constants
import { COLORS } from "../../constants/colors";
import { DIMENSIONS } from "../../constants/dimensions";
import { STYLES } from "../../constants/styles";

const ArtistItem = ({ artistData }) => {

    const { image, title, subtitle, more_info: { color } = {} } = artistData || {};

    return (
        <View style={styles.artistItemContainer}>
            {/* this view contains the image */}
            {/* for radio as music content, background color of image conatiner is changed */}
            <View style={[styles.imageContainer, color && { backgroundColor: Color(color).lightness(90).hex() }]}>
                <View style={styles.circularImageContainer}>
                    <Image source={{ uri: image }} style={STYLES.THUMBNAIL} />
                </View>
            </View>
            {/* this view contains the text */}
            <SongInfo centerText={true} title={title} subtitle={subtitle} />
        </View>

    );
}

const styles = StyleSheet.create({
    artistItemContainer: {
        borderWidth: 0,
        paddingRight: 18,
        width: DIMENSIONS.WIDTH_WINDOW * 0.42, // each box is occupying 42% of overall width
    },
    imageContainer: {
        aspectRatio: 1, // defining width and height so that conatiner doesn't collapse if thumbnail doesn't appear
        backgroundColor: COLORS.CAROUSEL_BACKGROUND_COLOR,
        borderRadius: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 8,
        overflow: "hidden",
        width: "100%",
        elevation: 3,
    },
    circularImageContainer: {
        aspectRatio: 1,
        borderRadius: 9999,
        overflow: "hidden",
        width: "85%",
    },
});

export default ArtistItem;
