declare module '*.scss' {
    interface IClassNames {
        [className: string]: string
    }
    const classNames: IClassNames;
    export = classNames;
}

declare module '*.svg';
declare module '*.jpg';
declare module '*.jpeg';

declare module "*.svg" {
    import React from "react";
    const SVG: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
    export default SVG;
}

declare const __IS_DEV__: boolean;
declare const __API_URL__: string;
declare const __PROJECT__: string