export const isValidEmail = (email: string): boolean => {
    const valid =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            email
        );

    if (valid) {
        if (email && email.split('@')[1] === 'drascosales.com') {
            //VALID

            return true;
        }
    }
    return false;
};
