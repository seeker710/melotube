import { useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, { Easing, Extrapolation, interpolate, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import LinearGradient from "react-native-linear-gradient";
// import constants
import { COLORS } from "../../constants/colors";
import { DIMENSIONS } from "../../constants/dimensions";

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

                        {/* animation stuff */ }
                        const scaleXSharedValue = useSharedValue(isFocused ? 1 : 0);
                        const scaleXAnimation = useAnimatedStyle(() => {
                            'worklet';
                            return {
                                transform: [{
                                    scaleX: scaleXSharedValue.value,
                                }]
                            }
                        });
                        const fontAnimation = useAnimatedStyle(() => {
                            'worklet';
                            return {
                                color: isFocused ? COLORS.FOCUSED_TEXT_COLOR : COLORS.UNFOCUSED_TEXT_COLOR,
                                fontWeight: isFocused ? "700" : "500",
                                transform: [{
                                    scale: interpolate(scaleXSharedValue.value, [1, 0], [1, (3 / 4)], Extrapolation.CLAMP),
                                }],
                            };
                        });
                        useEffect(() => {
                            scaleXSharedValue.set(() => withTiming(isFocused ? 1 : 0, {
                                duration: 300,
                                easing: Easing.linear,
                            }));
                        }, [state.index]);

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
                                        <Animated.Text style={[styles.label, fontAnimation]}>
                                            {label}
                                        </Animated.Text>
                                    </View>
                                    <Animated.View style={[styles.underline, scaleXAnimation]} />
                                </View>
                            </Pressable>
                        );
                    })
                }
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    tabBarContainer: {
        borderBottomColor: COLORS.BORDER_COLOR,
        borderBottomWidth: DIMENSIONS.WIDTH_BORDER,
        flexDirection: "row",
        alignContent: "center",
        overflow: "hidden",
        paddingBottom: 12,
        paddingHorizontal: 32,
        paddingTop: 16 + DIMENSIONS.HEIGHT_STATUS_BAR,
    },
    // styles for each nav item/container
    navItem: {
        // no styling
    },
    // styles for each tab item label/text container
    labelContainer: {
        display: "flex",
        justifyContent: "center",
        height: 32,
    },
    label: {
        fontSize: 24,
        transformOrigin: "center",
    },
    underline: {
        backgroundColor: COLORS.PRIMARY_COLOR,
        borderRadius: 2,
        height: 2,
        transformOrigin: "center",
        width: "100%",
    },
});

export default TopTabBar;
