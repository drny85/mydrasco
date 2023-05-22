import 'styled-components';
import { CSSObject, CSSProp } from 'styled-components';
// and extend them!
declare module 'styled-components' {
    export interface DefaultTheme {
        mode: 'dark' | 'light';
        BACKGROUND_COLOR: string;
        TEXT_COLOR: string;
        BUTTON_TEXT_COLOR: string;
        PRIMARY_BUTTON_COLOR: string;
        SHADOW_COLOR: string;
        CARD_BACKGROUND: string;
        DANGER: string;
        DONE_COLOR: string;
        SECONDARY_BUTTON_COLOR: string;
        STATUS_BAR: string;
        ASCENT: string;
    }
}

declare module 'react' {
    interface Attributes {
        css?: CSSProp | CSSObject;
    }
}
