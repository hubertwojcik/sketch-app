import { ThemeContext } from "@context";
import { useContext } from "react";

const useTheme = () => useContext(ThemeContext);

export default useTheme;
