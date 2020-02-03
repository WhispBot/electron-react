import { colors } from "electron-css";

const darkTheme = {
    Theme: {
        mainColor: colors.white,
        mainBackground: "#111",
        notInUse: colors.gray,
        onHover: "#ffffff2c"
    }
};

const lightTheme = {
    Theme: {
        mainColor: colors.black,
        mainBackground: colors.white,
        notInUse: colors.gray,
        onHover: colors.gray
    }
};

export { darkTheme, lightTheme };
