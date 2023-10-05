import { ThemeContext } from "@/core";
import { useContext } from "react";

const useTheme = () => useContext(ThemeContext);

export default useTheme;
