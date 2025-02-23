import { useState } from "react";
import { StyleSheet, View } from "react-native";
// import components
import MusicHeader from "../music-components/MusicHeader";
import ChannelItem from "./ChannelItem";
// import constants
import { STYLES } from "../../constants/styles";
// import fake data
import { musicData } from "../../data/data1";

const Channel = () => {

    const [myData, _] = useState(musicData.browse_discover);
    const title = "Channel";
    const subTitle = "Explore your genres";

    return (
        <View style={[STYLES.SECTION, { marginRight: 18, marginTop: 0 }]}>
            <MusicHeader headerText={title} subHeaderText={subTitle} />
            {/* here we displaying the channels */}
            <View style={styles.channelContainer}>
                {
                    myData.map((item, index) => <ChannelItem key={index.toString()} channelData={item} />)
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    channelContainer: {
        display: "flex",
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
});

export default Channel;