interface SvgrComponent
  extends React.StatelessComponent<React.SVGAttributes<SVGElement>> {}

declare module '*.svg' {
  const value: SvgrComponent;
  export default value;
}

declare module '@styled-system/css' {
  const css: any;
  export default css;
}

declare namespace jest {
  interface Matchers<R> {
    toBeInaccessible():void;
    toHaveAccessibleName(name: string): void;
    toHaveAccessibleDescription(name: string): void;
  }
}
