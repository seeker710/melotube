import { useState } from "react";
import { FlatList, View } from "react-native";
// import components
import MusicRow from "../components/music/MusicRow";
// import constants
import { STYLES } from "../constants/styles";
// import fake data
import { musicData } from "../data/data1";

const Music = () => {

    // setting fake data in state, later actual data will be fetched from backend
    const [myData, _] = useState(musicData);
    const myArrayData = Object.entries(myData);

    return (
        <View style={STYLES.MAIN_CONTAINER}>
            <FlatList
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                data={myArrayData}
                renderItem={({ item, index }) => <MusicRow title={item[0]} songs={item[1]} index={index} />}
                initialNumToRender={3}
                keyExtractor={(_, index) => index.toString()}
                /**
                 * @description padding to show last item in list, as it is hidden by mini player
                 */
                ListFooterComponent={<View style={{ paddingBottom: 128 }} />}
            />
        </View>
    );
}

export default Music;
