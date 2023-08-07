import { createContext, useEffect, useState } from "react";
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";

export const AuthContext = createContext()

const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()
const githubProvider = new GithubAuthProvider()

const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, loggedUser => {
            console.log('Current Auth Status: ', loggedUser);
            setUser(loggedUser)
            setLoading(false)
        })
        return () => {
            unsubscribe()
        }
    })

    const userSignUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const userProfileUpdate = (userName, userProfilePhoto) => {
        return updateProfile(auth.currentUser, { displayName: userName, photoURL: userProfilePhoto })
    }

    const userSignIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const userGoogleSignIn = () => {
        return signInWithPopup(auth, googleProvider)
    }

    const userGithubSignIn = () => {
        return signInWithPopup(auth, githubProvider)
    }

    const userLogOut = () => {
        return signOut(auth)
    }

    const authInfo = {
        loading,
        user,
        userSignUp,
        userProfileUpdate,
        userSignIn,
        userGoogleSignIn,
        userGithubSignIn,
        userLogOut
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;