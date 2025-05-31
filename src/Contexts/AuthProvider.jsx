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
import { toast } from "react-toastify";

export const AuthContext = createContext(null);
const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setLoading(false);
      toast.success("Account created successfully!");
      return userCredential.user;
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
      throw error;
    }
  };

  const signInUser = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      toast.success("Login successful!");
      return userCredential.user;
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
      throw error;
    }
  };

  const signInGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      setLoading(false);
      toast.success("Logged in with Google!");
      return result.user;
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
      throw error;
    }
  };

  const signOutUser = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email)
      .then(() => {
        setLoading(false);
        toast.success("Password reset email sent!");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
        throw error;
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const AuthInfo = {
    loading,
    user,
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
