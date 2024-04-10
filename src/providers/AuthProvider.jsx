import { createContext, useEffect, useState } from "react";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "../services/firebaseConfig.js";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [regiSuccess, setRegiSuccess] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateProfileInfo = (user, data) => {
    // setLoading(true);
    return updateProfile(user, data);
  };

  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };

  // Register with Google
  const googleRegister = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  // Register with Google
  const githubRegister = () => {
    const githubProvider = new GithubAuthProvider();
    return signInWithPopup(auth, githubProvider);
  };

  useEffect(() => {
    setLoading(true);
    const unSubscribe = onAuthStateChanged(auth, (currUser) => {
      if (currUser) {
        setUser(currUser);
        setLoading(false);
        // console.log(currUser);
      } else {
        setUser(null);
        setLoading(false);
        setRegiSuccess(true);
      }
      return () => unSubscribe();
    });
  }, []);

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    logOut,
    registerUser,
    updateProfileInfo,
    signInUser,
    setRegiSuccess,
    regiSuccess,
    googleRegister,
    githubRegister,
    loginSuccess,
    setLoginSuccess,
  };
  // console.log("inside context:", regiSuccess);
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
