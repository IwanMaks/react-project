import { useEffect, useState } from 'react';

export const useAuth = (authFirebase) => {
    const [auth, setAuth] = useState(null);

    const authfic = authFirebase();

    const provider = new authFirebase.GoogleAuthProvider();

    const login = () => authfic.signInWithPopup(provider);

    const logOut = () => authfic.signOut()
        .catch(err => console.error(err));

    useEffect(() => {
        authfic.onAuthStateChanged(user => {
            if (user) {
                setAuth(user);
            } else {
                setAuth(null);
            }
        })
    }, [authfic, auth]);

    return { auth, login, logOut };
}