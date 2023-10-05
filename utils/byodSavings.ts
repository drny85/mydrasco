import {
    PLUS_BYOD_VALUE,
    ULTIMATE_BYOD_VALUE,
    WELCOME_BYOD_VALUE,
} from '../constant';
import { Line } from '../redux/wirelessSlide';

export const byodSavings = (lines: Line[]): number =>
    lines
        .map((line) =>
            line.byod && line.name === 'Unlimited Ultimate'
                ? { discount: ULTIMATE_BYOD_VALUE }
                : line.byod && line.name === 'Unlimited Plus'
                ? { discount: PLUS_BYOD_VALUE }
                : line.byod && line.name === 'Unlimited Welcome'
                ? { discount: WELCOME_BYOD_VALUE }
                : { discount: 0 }
        )
        .reduce((acc, line) => acc + line.discount, 0);
