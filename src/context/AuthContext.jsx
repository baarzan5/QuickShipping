import { createContext, useReducer, useEffect, useContext } from "react";
import { AUTHACTIONS } from "../actions/authActions";
import { auth, db } from "../firebase/firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const authInitialState = {
  loading: true,
  user: null,
  error: null,
  users: [],
};

function authReducer(state, action) {
  switch (action.type) {
    case AUTHACTIONS.SET_LOADING:
      return {
        ...state,
      };

    case AUTHACTIONS.SET_USER:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case AUTHACTIONS.SET_LOGIN:
    case AUTHACTIONS.SET_SIGN_UP:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case AUTHACTIONS.SET_USERS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    case AUTHACTIONS.SET_LOGOUT:
      return { ...state, loading: false, payload: action.payload };

    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, authInitialState);
  const navigate = useNavigate();

  const getUserOnLoad = async () => {
    try {
      auth.onAuthStateChanged(async (currentUser) => {
        if (currentUser) {
          const userDoc = doc(db, "users", currentUser.email);
          const userSnapshot = await getDoc(userDoc);

          if (userSnapshot.exists()) {
            currentUser = userSnapshot.data();
            dispatch({ type: AUTHACTIONS.SET_USER, payload: currentUser });
          } else {
            dispatch({ type: AUTHACTIONS.SET_USER, payload: null });
          }
        }
      });
    } catch (error) {
      dispatch({ type: AUTHACTIONS.SET_ERROR, payload: error.message });
      console.error(error.message);
    }
  };

  const getUsers = async () => {
    try {
      const usersCollection = collection(db, "users");
      onSnapshot(
        query(usersCollection, orderBy("createdAt", "desc")),
        (snapshot) => {
          const users = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          dispatch({ type: AUTHACTIONS.SET_USERS, payload: users });
        }
      );
    } catch (error) {
      dispatch({ type: AUTHACTIONS.SET_ERROR, payload: error.message });
      console.error(error.message);
    }
  };

  useEffect(() => {
    getUserOnLoad();
    getUsers();
  }, []);

  const signUpUser = async (userData) => {
    try {
      const userDoc = doc(db, "users", userData.email);
      const userSnapshot = await getDoc(userDoc);

      if (!userSnapshot.exists()) {
        await createUserWithEmailAndPassword(
          auth,
          userData.email,
          userData.password
        );

        await setDoc(userDoc, userData);
        navigate("/");
      } else {
        alert("ئەم بەکارهێنەرە پێشتر هەبووە");
      }
    } catch (error) {
      dispatch({ type: AUTHACTIONS.SET_ERROR, payload: error.message });
      console.error(error.message);
    }
  };

  const loginUser = async (userData) => {
    try {
      const userDoc = doc(db, "users", userData.email);
      const userSnapshot = await getDoc(userDoc);

      if (userSnapshot.exists()) {
        await signInWithEmailAndPassword(
          auth,
          userData.email,
          userData.password
        );

        await updateDoc(userDoc, {
          lastLogin: new Date(),
        });
        navigate("/");
      } else {
        alert("ئەم بەکارهێنەرە بوونی نییە");
      }
    } catch (error) {
      dispatch({ type: AUTHACTIONS.SET_ERROR, payload: error.message });
      console.error(error.message);
    }
  };

  const forgotPassword = async (email) => {
    try {
      const userDoc = doc(db, "users", email);
      const userSnapshot = await getDoc(userDoc);

      if (userSnapshot.exists()) {
        await sendPasswordResetEmail(auth, email);
        alert("بەستەری ڕێستکردنەوەی وشەی نهێنی بۆ ئیمەیڵەکەت نێردرا");
      } else {
        alert("ئەم ئیمەیڵە بوونی نییە");
      }
    } catch (error) {
      dispatch({ type: AUTHACTIONS.SET_ERROR, payload: error.message });
      console.error(error.message);
    }
  };

  const createUserProfileWithSocialMediaIfNotExists = async (user) => {
    try {
      const userDoc = doc(db, "users", user.email);
      const userSnapshot = await getDoc(userDoc);

      if (!userSnapshot.exists()) {
        await setDoc(userDoc, {
          email: user.email,
          fullName: user.displayName,
          phoneNumber: user.phoneNumber,
          userImageURL: user.photoURL,
          userMoney: 0,
          userMoneySpent: 0,
          isAdmin: false,
          createdAt: new Date(),
          lastLogin: new Date(),
        });
        navigate("/");
      } else {
        await updateDoc(userDoc, {
          lastLogin: new Date(),
        });
      }
    } catch (error) {
      dispatch({ type: AUTHACTIONS.SET_ERROR, payload: error.message });
      console.error(error.message);
    }
  };

  const googleSignIn = async () => {
    try {
      const googleProvider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      await createUserProfileWithSocialMediaIfNotExists(user);
    } catch (error) {
      dispatch({ type: AUTHACTIONS.SET_ERROR, payload: error.message });
      console.error(error.message);
    }
  };

  const facebookSignIn = async () => {
    try {
      const facebookProvider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;
      await createUserProfileWithSocialMediaIfNotExists(user);
    } catch (error) {
      dispatch({ type: AUTHACTIONS.SET_ERROR, payload: error.message });
      console.error(error.message);
    }
  };

  const logOutUser = async () => {
    try {
      await signOut(auth);
      dispatch({ type: AUTHACTIONS.SET_LOGOUT, payload: null });
      navigate("/");
    } catch (error) {
      dispatch({ type: AUTHACTIONS.SET_ERROR, payload: error.message });
      console.error(error.message);
    }
  };

  const contextData = {
    state,
    dispatch,
    loading: state.loading,
    user: state.user,
    error: state.error,
    users: state.users,
    signUpUser,
    loginUser,
    forgotPassword,
    googleSignIn,
    facebookSignIn,
    logOutUser,
  };
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
