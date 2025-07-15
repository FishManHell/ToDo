export function svgLoaders() {
    return {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    }
}