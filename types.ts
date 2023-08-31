export interface Theme {
    mode: 'dark' | 'light' | string;
    BACKGROUND_COLOR: string;
    TEXT_COLOR: string;
    BUTTON_TEXT_COLOR: string;
    PRIMARY_BUTTON_COLOR: string;
    SHADOW_COLOR: string;
    DONE_COLOR: string;
    DANGER: string;
    SECONDARY_BUTTON_COLOR: string;
    STATUS_BAR: string;
    ASCENT: string;
}

export type PLAN =
    | 'Unlimited Welcome'
    | 'Unlimited Plus'
    | 'Unlimited Ultimate';
