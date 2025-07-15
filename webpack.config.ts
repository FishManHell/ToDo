import {resolve} from 'path';
import {BuildPaths, Env} from "./config/webpack/types";
import {BuildConfigurations} from "./config/webpack/BuildConfigurations";

export default (env: Env) => {
    const {mode: envMode, port: envPort} = env

    const mode = envMode || 'development';
    const isDev = mode === 'development';
    const port = envPort || 3000;

    const paths: BuildPaths = {
        html: resolve(__dirname, 'public', 'index.html'),
        entry: resolve(__dirname, 'src', 'index.tsx'),
        build: resolve(__dirname, 'build'),
        src: resolve(__dirname, 'src')
    }

    return BuildConfigurations({mode, isDev, port, paths, project: 'frontend'})
}