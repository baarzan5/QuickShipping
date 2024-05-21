import { createContext, useReducer, useEffect, useContext } from "react";
import { ORDERSACTIONS } from "../actions/ordersActions";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const OrdersContext = createContext();

const ordersInitialState = {
  loading: true,
  productOrders: [],
  balanceOrders: [],
  error: null,
};

function ordersReducer(state, action) {
  switch (action.type) {
    case ORDERSACTIONS.SET_LOADING:
      return {
        ...state,
      };

    case ORDERSACTIONS.SET_PRODUCT_ORDERS:
      return {
        loading: false,
        productOrders: action.payload,
        ...state,
      };

    case ORDERSACTIONS.SET_BALANCE_ORDERS:
      return {
        loading: false,
        balanceOrders: action.payload,
        ...state,
      };

    case ORDERSACTIONS.SET_ERROR:
      return {
        loading: false,
        error: action.payload,
        ...state,
      };

    default:
      return state;
  }
}

export function OrdersProvider({ children }) {
  const [state, dispatch] = useReducer(ordersReducer, ordersInitialState);

  const handleOrder = async (orderData) => {
    try {
      const ordersCollection = collection(db, "orders");
      await addDoc(ordersCollection, orderData);
    } catch (error) {
      dispatch({ type: ORDERSACTIONS.SET_ERROR, payload: error.message });
      console.error(error.message);
    }
  };

  const contextData = {
    state,
    dispatch,
    productOrders: state.productOrders,
    balanceOrders: state.balanceOrders,
    error: state.error,
    handleOrder,
  };
  return (
    <OrdersContext.Provider value={contextData}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrdersContext);
}
