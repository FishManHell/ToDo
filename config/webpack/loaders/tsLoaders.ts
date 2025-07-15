export const tsLoaders = () => {
    return {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    }
}