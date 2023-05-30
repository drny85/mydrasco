export const mobilePlusHomeRewards = (
    totalLines: number,
    hasFios: boolean,
    isWelcome: boolean,
    internetSpeed: '200' | '400' | 'gig' | '2gig'
) => {
    if (totalLines === 0 || !hasFios) return 0;

    switch (true) {
        case isWelcome && hasFios:
            return 5;
        case hasFios && internetSpeed === 'gig' && !isWelcome:
            return 10;
        case hasFios && internetSpeed === '400':
            return 5;
        case hasFios && internetSpeed === '200':
            return 5;

        default:
            return 0;
    }
};

export const bonusOfferDiscount = (
    hasFios: boolean,
    bonus: number,
    totalLines: number
) => {
    if (totalLines === 0 || !hasFios) return 0;

    if (hasFios) {
        return bonus;
    } else {
        return 0;
    }
};
