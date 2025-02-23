import { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
// import components
import SongInfo from "./SongInfo";
// import constants
import { COLORS } from "../../constants/colors";
import { DIMENSIONS } from "../../constants/dimensions";
import { STYLES } from "../../constants/styles";

const SongItem = ({ displaySmall = false, songData }) => {

    // state for saving the subtitle
    const [actualSubtitle, setActualSubtitle] = useState("");
    const { image, title, subtitle, more_info } = songData || {};
    const { firstname, artistMap: { artists } = {} } = more_info;

    // generate subtitle from song data
    useEffect(() => {
        if (subtitle)
            return setActualSubtitle(subtitle);
        if (firstname)
            return setActualSubtitle(firstname);
        if (!artists || typeof artists === "undefined")
            return;
        const artistString = [...new Set(artists.map(item => item.name))].join(", ");
        return setActualSubtitle(artistString);
    }, [subtitle, firstname, artists]);

    return (
        <View style={[styles.songItemContainer, displaySmall && { width: DIMENSIONS.WIDTH_WINDOW * 0.3 }]}>
            {/* this view contains the image */}
            <View style={styles.imageContainer}>
                <Image source={{ uri: more_info?.square_image || image }} style={STYLES.THUMBNAIL} />
            </View>
            {/* this view contains the text */}
            <SongInfo title={title} subtitle={actualSubtitle} />
        </View>
    );
}

const styles = StyleSheet.create({
    songItemContainer: {
        borderWidth: 0,
        paddingRight: 18,
        width: DIMENSIONS.WIDTH_WINDOW * 0.42, // each box is occupying 42% of overall width
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
});

export default SongItem;
