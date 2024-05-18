import { Dimensions } from "react-native";
const {width, height} = Dimensions.get('window');

export const COLORS = {
    primary: "#252c4a",
    secondary: '#5bd9ff',
    accent: '#5bd9ff',
    
    success: '#00C851',
    error: '#ff4444',

    black: "#171717",
    white: "#FFFFFF",
    background: "#252c4a"
}


export const SIZES = {
    base: 10,
    width,
    height
}