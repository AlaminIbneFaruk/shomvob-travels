import {createContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { auth } from '../Firebase/firebase.init.js';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

export const AuthContext = createContext(null);
const provider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const createUser=(email,password)=>{
    setLoading(true);
    return createUserWithEmailAndPassword(auth,email,password)
  }
  const signInUser=(email,password)=>{
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
  }
  const signInGoogle=()=>{
    setLoading(true);
    return signInWithPopup(auth, provider);
  }
  const signOutUser=()=>{
    alert("Are you sure to logout?");
    setLoading(true);
    return signOut(auth);
  }
  useEffect(() => {
    const unsubscribe=onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return ( ) => {
      unsubscribe();
    }
  }, []);
  const AuthInfo={
    loading,
    user,
    createUser,
    signInUser,
    signOutUser,
    signInGoogle,
  }
  return (
    <AuthContext.Provider value={AuthInfo}>
      {children}
    </AuthContext.Provider >
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
