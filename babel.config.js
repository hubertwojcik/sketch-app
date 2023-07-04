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
                        "@constants": "./constants",
                        "@assets": "./assets"
                    }
                }
            ],
            require.resolve("expo-router/babel")
        ]
    };
};
