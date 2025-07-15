export type Mode = 'production' | 'development'

export interface Env {
    mode: Mode;
    port: number;
}

export interface BuildPaths {
    html: string;
    build: string;
    entry: string;
    src: string
}

export interface BuildOptions {
    mode: Mode;
    paths: BuildPaths;
    isDev: boolean;
    port: number;
    project: string
}