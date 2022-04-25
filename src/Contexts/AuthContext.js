import React, { useContext, useState, useEffect } from "react";
import { authenticate } from "../firebase";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const login = (email, password) => {
    return authenticate.signInWithEmailAndPassword(email, password);
  };

  const resetPassword = (email) => {
    return authenticate.sendPasswordResetEmail(email);
  };

  const updateEmail = (email) => {
    currentUser.updateEmail(email);
  };

  const updatePassword = (password) => {
    currentUser.updatePassword(password);
  };

  useEffect(() => {
    const unsubscribe = authenticate.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
