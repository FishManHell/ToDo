export function bableLoaders(isDev: boolean) {
    return {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            options: {
                presets: ['@babel/preset-env'],
                plugins: [
                    [
                        "i18next-extract",
                        {
                            locales: ["ru", "en"],
                            keyAsDefaultMessage: true
                        },
                    ],
                    isDev && require.resolve('react-refresh/babel')
                ].filter(Boolean)
            }
        }
    }
}