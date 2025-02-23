import { Dimensions, StatusBar } from "react-native";

// dimensions for app
export const DIMENSIONS = {
    ICON_SIZE_15: 15,   // AllPodcastsItem.js
    ICON_SIZE_22: 22,   // SearchBar.js
    ICON_SIZE_24: 24,   // TrendingSearchesItem.js
    ICON_SIZE_30: 30,   // BottomTabBar.js
    ICON_SIZE_34: 34,   // MiniPlayer.js 
    HEIGHT_SCREEN: Dimensions.get("screen").height,
    HEIGHT_WINDOW: Dimensions.get("window").height,
    HEIGHT_STATUS_BAR: StatusBar.currentHeight,
    HEIGHT_BOTTOM_TAB_BAR: 54,
    HEIGHT_MINI_PLAYER: 56,
    WIDTH_SCREEN: Dimensions.get("screen").width,
    WIDTH_WINDOW: Dimensions.get("window").width,
    WIDTH_BORDER: 1,
    Z_INDEX_BOTTOM_TAB_BAR: 2,
    Z_INDEX_SLIDING_BOTTOM: 1,
    Z_INDEX_TOP_TAB_BAR: 2,
}

// this value is used in BottomTabBar.js and MiniPlayer.js animations
/**
 * @description snap top = 0, y translation is 0, so render at top of screen
 * @description snap bottom = height(screen) - [height(bottom tab bar) + height(mini player)]
 * @description in react native box-sizing: border-box is used, padding and border are included in height
*/ 
export const SNAP_TOP = 0;
export const SNAP_BOTTOM = (DIMENSIONS.HEIGHT_WINDOW + DIMENSIONS.HEIGHT_STATUS_BAR) - (DIMENSIONS.HEIGHT_BOTTOM_TAB_BAR + DIMENSIONS.HEIGHT_MINI_PLAYER);
