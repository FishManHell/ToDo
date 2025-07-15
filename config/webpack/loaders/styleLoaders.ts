import MiniCssExtractPlugin from 'mini-css-extract-plugin'

export const styleLoaders = (isDev: boolean) => {

    const cssLoader = {
        test: /\.css$/i,
        use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader'
        ],
    }

    const scssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
                loader: "css-loader",
                options: {
                    modules: {
                        auto: (resPath: string) => /\.module\./.test(resPath),
                        namedExport: false,
                        exportLocalsConvention: 'asIs',
                        localIdentName: isDev
                            ? '[path][name]__[local]--[hash:base64:5]'
                            : '[hash:base64:8]'
                    },
                }
            },
            "sass-loader",
        ],
    }

    return {cssLoader, scssLoader}
}