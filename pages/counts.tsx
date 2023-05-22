import moment from 'moment';
import { useEffect, useState } from 'react';
import MainContainer from '../components/MainContainer';
import { db } from '../firebase';
import { AppUser } from '../redux/authSlide';

const Counts = () => {
    const [users, setUsers] = useState<AppUser[]>([]);

    useEffect(() => {
        const sub = db
            .collection('users')
            .orderBy('lastLogin', 'desc')
            .onSnapshot((u) =>
                setUsers(
                    u.docs
                        .map(
                            (doc) => ({ id: doc.id, ...doc.data() } as AppUser)
                        )
                        .sort((a, b) => (a.lastLogin! > b.lastLogin! ? 0 : 1))
                )
            );
        return sub;
    }, []);

    if (users.length === 0) return null;
    return (
        <MainContainer>
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
            >
                <h3 style={{ textAlign: 'center', margin: '12px' }}>
                    Users ({users.length})
                </h3>
                <div
                    className="counts"
                    // style={{
                    //     display: 'inline-grid',
                    //     gridTemplateColumns: '1fr 1fr 1fr',
                    //     gap: '1rem',
                    // }}
                >
                    {users
                        .sort((a, b) => (a.lastLogin! < b.lastLogin! ? 1 : 0))
                        .map((user) => (
                            <div
                                key={user.id}
                                style={{
                                    padding: '12px',
                                    boxShadow: '12px 8px 6px rgba(0,0,0,0.124)',
                                    maxWidth: '720px',
                                    width: '100%',
                                    borderRadius: '12px',
                                }}
                            >
                                <p>ID: {user.id}</p>
                                <p style={{ padding: '12px 0px' }}>
                                    Email: {user.email}
                                </p>
                                <p>
                                    Verified:{' '}
                                    {user.emailVerified ? 'Yes' : 'No'}
                                </p>

                                <p style={{ padding: '12px 0px' }}>
                                    Last Login:{' '}
                                    {moment(user.lastLogin).format('lll')}
                                </p>
                                <p>
                                    Created At:{' '}
                                    {moment(user.createdAt).format('lll')}
                                </p>
                            </div>
                        ))}
                </div>
            </div>
        </MainContainer>
    );
};

export default Counts;
