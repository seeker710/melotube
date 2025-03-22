import { useCallback } from "react";
import { FlatList, View } from "react-native";
// import components
import ArtistItem from "./ArtistItem";
import MusicHeader from "./MusicHeader";
import SongItem from "./SongItem";
// import constants
import { STYLES } from "../../constants/styles";

const MusicRow = ({ title, songs, index }) => {

    const isFirst = index === 0;

    // this function is used to render different carousel items (3x3 rectangular, 2x2 rectangular, circular)
    const renderSongs = useCallback(({ item }) => (
        // check the type of music content is "radio_station"
        (item.type === "radio_station")
            ? <ArtistItem artistData={item} />
            : <SongItem displaySmall={isFirst} songData={item} />
    ), [songs, isFirst]);

    return (
        <View style={STYLES.SECTION}>
            {/* row title */}
            <MusicHeader headerText={title} />
            {/* music row list */}
            <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                data={songs}
                renderItem={renderSongs}
                initialNumToRender={3}
                keyExtractor={(_, index) => index.toString()}
            />
        </View>
    );
}

export default MusicRow;
