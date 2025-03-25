import { StyleSheet } from "react-native";

// styles for app
export const STYLES = StyleSheet.create({
    MAIN_CONTAINER: {
        flex: 1,
    },
    SECTION: {
        marginTop: 20,
        marginLeft: 20,
        marginBottom: 12,
    },
    THUMBNAIL: {
        aspectRatio: 1,
        objectFit: "cover",
        resizeMode: "cover",
        verticalAlign: "middle",
        width: "100%",
    },
});
