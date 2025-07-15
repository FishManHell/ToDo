import {ResolveOptions} from "webpack";
import {BuildOptions} from "./types";

export function buildResolvers({paths: {src}}: BuildOptions): ResolveOptions {
    return {
        extensions: ['.tsx', '.ts', '.js'],
        preferAbsolute: true,
        modules: [src, 'node_modules'],
        mainFiles: ['index'],
        alias: {}
    }
}