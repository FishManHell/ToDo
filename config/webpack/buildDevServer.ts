import {BuildOptions} from "./types";
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

export const buildDevServer = ({port}: BuildOptions): DevServerConfiguration => {
    return {
        port,
        historyApiFallback: true,
        open: true,
        hot: true,
    }
}