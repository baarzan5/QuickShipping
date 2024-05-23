import { createContext, useReducer, useEffect, useContext } from "react";
import { ADDRESS_ACTIONS } from "../actions/addressActions";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const AddressContext = createContext();

const addressInitialState = {
  loading: true,
  address: [],
  error: null,
};

function addressReducer(state, action) {
  switch (action.type) {
    case ADDRESS_ACTIONS.SET_LOADING:
      return {
        ...state,
      };

    case ADDRESS_ACTIONS.SET_ADDRESS:
      return {
        loading: false,
        address: action.payload,
      };

    case ADDRESS_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}

export function AddressProvider({ children }) {
  const [state, dispatch] = useReducer(addressReducer, addressInitialState);

  const getUserAddress = async (userEmail) => {
    try {
      const userAddressCollection = collection(
        db,
        `users/${userEmail}/address`
      );
      onSnapshot(
        query(userAddressCollection, orderBy("addedAt", "desc")),
        (snapshot) => {
          const address = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          dispatch({ type: ADDRESS_ACTIONS.SET_ADDRESS, payload: address });
        }
      );
    } catch (error) {
      dispatch({ type: ADDRESS_ACTIONS.SET_ERROR, payload: error.message });
      console.error(error.message);
    }
  };

  const addAddress = async (userEmail, addressData) => {
    try {
      const userAddressCollection = collection(
        db,
        `users/${userEmail}/address`
      );
      await addDoc(userAddressCollection, addressData);
    } catch (error) {
      dispatch({ type: ADDRESS_ACTIONS.SET_ERROR, payload: error.message });
      console.error(error.message);
    }
  };

  const contextData = {
    state,
    dispatch,
    loading: state.loading,
    error: state.error,
    getUserAddress,
    address: state.address,
    addAddress,
  };
  return (
    <AddressContext.Provider value={contextData}>
      {children}
    </AddressContext.Provider>
  );
}

export function useAddress() {
  return useContext(AddressContext);
}
