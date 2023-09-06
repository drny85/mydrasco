import { NON_PREMIUM_BYOD_VALUE, PREMIUM_BYOD_VALUE } from '../constant';
import { Line } from '../redux/wirelessSlide';

export const byodSavings = (lines: Line[]): number =>
    lines
        .map((line) =>
            line.byod &&
            (line.name === 'Unlimited Plus' ||
                line.name === 'Unlimited Ultimate')
                ? { discount: PREMIUM_BYOD_VALUE }
                : line.byod && line.name === 'Unlimited Welcome'
                ? { discount: NON_PREMIUM_BYOD_VALUE }
                : { discount: 0 }
        )
        .reduce((acc, line) => acc + line.discount, 0);
