module.exports = function (api) {
    api.cache(true);
    return {
        presets: ["babel-preset-expo"],
        plugins: [
            [
                "module-resolver",
                {
                    alias: {
                        "@components": "./components",
                        "@stores": "./stores",
                        "@hooks": "./hooks",
                        "@models": "./models",
                        "@constants": "./constants",
                        "@context": "./context",
                        "@assets": "./assets",
                        "@types": "./types",
                        "@utils": "./utils"
                    }
                }
            ],
            require.resolve("expo-router/babel"),
            "react-native-reanimated/plugin"
        ]
    };
};
