import { createContext, useReducer, useEffect, useContext } from "react";
import { ORDERSACTIONS } from "../actions/ordersActions";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const OrdersContext = createContext();

const ordersInitialState = {
  loading: true,
  orders: [],
  error: null,
};

function ordersReducer(state, action) {
  switch (action.type) {
    case ORDERSACTIONS.SET_LOADING:
      return {
        ...state,
      };

    case ORDERSACTIONS.SET_ORDERS:
      return {
        loading: false,
        ...state,
        orders: action.payload,
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

  const getOrders = async () => {
    try {
      const ordersCollection = collection(db, "orders");
      onSnapshot(
        query(ordersCollection, orderBy("orderedAt", "desc")),
        (snapshot) => {
          const orders = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          // console.log({orders});
          dispatch({ type: ORDERSACTIONS.SET_ORDERS, payload: orders });
        }
      );
    } catch (error) {
      dispatch({ type: ORDERSACTIONS.SET_ERROR, payload: error.message });
      console.error(error.message);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const handleOrder = async (orderData, user, totalMoney) => {
    try {
      const ordersCollection = collection(db, "orders");
      await addDoc(ordersCollection, orderData);

      // Update user money and user money spent
      const userDoc = doc(db, "users", user.email);
      await updateDoc(userDoc, {
        userMoney: user?.userMoney - totalMoney,
        userMoneySpent: user?.userMoneySpent + totalMoney,
      });

      // Delete products from cart
      const userCartCollection = collection(db, `users/${user.email}/cart`);
      const userCartSnapshot = await getDocs(userCartCollection);
      userCartSnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
    } catch (error) {
      dispatch({ type: ORDERSACTIONS.SET_ERROR, payload: error.message });
      console.error(error.message);
    }
  };

  const contextData = {
    state,
    dispatch,
    orders: state.orders,
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
