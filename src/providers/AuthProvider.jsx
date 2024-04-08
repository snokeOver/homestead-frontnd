import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../services/firebaseConfig.js";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const authInfo = { user, loading };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
