import {BuildOptions} from "./types";
import type {Configuration} from "webpack";
import {buildDevServer} from "./buildDevServer";
import {buildPlugins} from "./buildPlugins";
import {buildLoaders} from "./buildLoaders";
import {buildResolvers} from "./buildResolvers";

export const BuildConfigurations = (options: BuildOptions): Configuration => {
    const {mode, paths: {entry, build: path}, isDev} = options;
    const devtool = isDev ? 'inline-source-map' : undefined;

    const devServer = isDev ? buildDevServer(options) : undefined;
    const plugins = buildPlugins(options);
    const rules = buildLoaders(options);
    const resolve = buildResolvers(options);

    return {
        entry,
        mode,
        devtool,
        devServer,
        plugins,
        output: {
            filename: "[name].[contenthash].js",
            path,
            clean: true,
            publicPath: '/'
        },
        module: {rules},
        resolve,
    }
}