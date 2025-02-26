import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { auth } from "../Firebase/firebase.init.js";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";

export const AuthContext = createContext(null);
const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null); // State for JWT token

  const createUser = async (email, password) => {
    setLoading(true);
    try {
      // Create user with Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send request to backend to register the user and get JWT
      const response = await fetch('YOUR_API_ENDPOINT/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          uid: user.uid, // Optionally send the user ID
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to register user');
      }

      const data = await response.json();
      setToken(data.token); // Set JWT token

      setLoading(false);
      return user;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const signOutUser = () => {
    alert("Are you sure to logout?");
    setLoading(true);
    return signOut(auth);
  };

  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email)
      .then(() => {
        setLoading(false);
        return "Password reset email sent!";
      })
      .catch((error) => {
        setLoading(false);
        throw error;
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const AuthInfo = {
    loading,
    user,
    token, // Include token in context
    createUser,
    signInUser,
    signOutUser,
    signInGoogle,
    resetPassword,
  };

  return <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
