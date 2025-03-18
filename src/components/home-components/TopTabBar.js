import { useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import LinearGradient from "react-native-linear-gradient";
// import constants
import { COLORS } from "../../constants/colors";
import { DIMENSIONS } from "../../constants/dimensions";

const config = {
    damping: 13,
    mass: 1,
    stiffness: 110,
    restSpeedThreshold: 0.1,
    restDisplacementThreshold: 0.1,
};

const TopTabBar = ({ state, descriptors, navigation }) => {
    return (
        // I used gradient, and it worked!!!
        <LinearGradient colors={COLORS.GRADIENT_COLORS}>
            <View style={styles.tabBarContainer}>
                {
                    state.routes.map((route, index) => {
                        const { options } = descriptors[route.key];
                        const label = options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;
                        const isFocused = state.index === index;

                        {/* function for onPress event */ }
                        const onPress = () => {
                            const event = navigation.emit({
                                type: "tabPress",
                                target: route.key,
                            });
                            if (!isFocused && !event.defaultPrevented) {
                                navigation.navigate(route.name, route.params);
                            }
                        }

                        {/* function for onLongPress event */ }
                        const onLongPress = () => {
                            const event = navigation.emit({
                                type: 'tabLongPress',
                                target: route.key,
                            });
                            if (!isFocused && !event.defaultPrevented) {
                                navigation.navigate(route.name, route.params);
                            }
                        }

                        const widthSharedValue = useSharedValue(isFocused ? 1 : 0);
                        const fontSharedValue = useSharedValue(isFocused ? 24 : 18);

                        useEffect(() => {
                            widthSharedValue.value = withSpring(isFocused ? 1 : 0, config);
                            {/* fontSharedValue.value = withSpring(isFocused ? 24 : 18, config); */ }
                            fontSharedValue.value = withTiming(isFocused ? 24 : 18, { duration: 200 });
                        }, [state.index]);

                        const widthAnimation = useAnimatedStyle(() => {
                            'worklet';
                            return {
                                height: isFocused ? 2 : 0,
                                width: `${widthSharedValue.value * 100}%`,
                            };
                        });
                        const fontAnimation = useAnimatedStyle(() => {
                            'worklet';
                            return {
                                color: isFocused ? COLORS.FOCUSED_TEXT_COLOR : COLORS.UNFOCUSED_TEXT_COLOR,
                                fontSize: fontSharedValue.value,
                                fontWeight: isFocused ? "700" : "500",
                            };
                        });

                        return (
                            <Pressable
                                key={index} // we can also use route.key 
                                accessibilityRole="button"
                                accessibilityState={isFocused ? { selected: true } : {}}
                                accessibilityLabel={options.tabBarAccessibilityLabel}
                                testID={options.tabBarTestID}
                                onPress={onPress}
                                onLongPress={onLongPress}
                            >
                                <View style={styles.navItem}>
                                    <View style={styles.labelContainer}>
                                        <Animated.Text style={[fontAnimation]}>
                                            {label}
                                        </Animated.Text>
                                    </View>
                                    <Animated.View style={[styles.underline, widthAnimation]} />
                                </View>
                            </Pressable>
                        );
                    })
                }
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    tabBarContainer: {
        borderBottomColor: COLORS.BORDER_COLOR,
        borderBottomWidth: DIMENSIONS.WIDTH_BORDER,
        flexDirection: "row",
        alignContent: "center",
        overflow: "hidden",
        paddingHorizontal: 22,
        paddingTop: 16 + DIMENSIONS.HEIGHT_STATUS_BAR,
    },
    // styles for each nav item/container
    navItem: {
        paddingBottom: 11,
        paddingHorizontal: 11,
    },
    // styles for each tab item label/text container
    labelContainer: {
        display: "flex",
        justifyContent: "center",
        height: 32,
    },
    underline: {
        backgroundColor: COLORS.PRIMARY_COLOR,
        borderRadius: 2,
        height: 2,
    },
});

export default TopTabBar;
