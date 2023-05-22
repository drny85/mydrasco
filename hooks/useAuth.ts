import { useEffect, useState } from 'react';
import { auth } from '../firebase';

import { useAppDispatch } from '../redux/hooks/reduxHooks';
import { setUser } from '../redux/authSlide';

export const useAuth = () => {
    const [loading, setLoading] = useState(true);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const auhtListener = async () => {
            try {
                auth.onAuthStateChanged(async (user) => {
                    if (user) {
                        dispatch(
                            setUser({
                                id: user.uid,
                                email: user.email!,
                                emailVerified: user.emailVerified,
                                lastLogin: new Date().toISOString(),
                            })
                        );
                    } else {
                        dispatch(setUser(null));
                    }
                });
            } catch (error) {
                console.log(error);
                dispatch(setUser(null));
            } finally {
                setLoading(false);
            }
        };

        auhtListener();

        return () => {
            auhtListener();
        };
    }, [auth]);

    return { loading };
};
