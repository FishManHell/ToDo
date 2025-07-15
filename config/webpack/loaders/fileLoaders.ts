export const fileLoaders = () => {
    return {
        test: /\.pdf$/,
        type: 'asset/resource',
        generator: {
            filename: 'downloads/[name][ext]',
        },
    }
}