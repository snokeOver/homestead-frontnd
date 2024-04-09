import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import auth from "../services/firebaseConfig.js";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateProfileInfo = (user, data) => {
    setLoading(true);
    return updateProfile(user, data);
  };

  useEffect(() => {
    setLoading(true);
    const unSubscribe = onAuthStateChanged(auth, (currUser) => {
      if (currUser) {
        setUser(currUser.user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
      return () => unSubscribe();
    });
  }, []);

  const authInfo = { user, loading, registerUser, updateProfileInfo };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
