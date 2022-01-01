import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    titleColor?: string;
    textColor?: string;
    bgColor?: string;
  }
  export interface LightMode {
    titleColor: string;
    textColor: string;
    bgColor: string;
  }
  export interface DarkMode {
    titleColor: string;
    textColor: string;
    bgColor: string;
  }
}
