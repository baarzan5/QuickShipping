import { createContext, useReducer, useEffect, useContext } from "react";
import { PRODUCTSACTIONS } from "../actions/productsActions";
import { addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const ProductsContext = createContext();

const productsInitialState = {
  loading: true,
  products: [],
  error: null,
};

function productsReducer(state, action) {
  switch (action.type) {
    case PRODUCTSACTIONS.SET_LOADING:
      return {
        ...state,
      };

    case PRODUCTSACTIONS.SET_PRODUCTS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };

    case PRODUCTSACTIONS.SET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

export function ProductsProvider({ children }) {
  const [state, dispatch] = useReducer(productsReducer, productsInitialState);

  const getProducts = async () => {
    try {
      const productsCollection = collection(db, "products");
      onSnapshot(
        query(productsCollection, orderBy("createdAt", "desc")),
        (snapshot) => {
          const products = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          dispatch({ type: PRODUCTSACTIONS.SET_PRODUCTS, payload: products });
        }
      );
    } catch (error) {
      dispatch({ type: PRODUCTSACTIONS.SET_ERROR, payload: error.message });
      console.error(error.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const addProduct = async (productData) => {
    try {
        const productsCollection = collection(db, "products");
        await addDoc(productsCollection, productData);
    } catch (error) {
      dispatch({ type: PRODUCTSACTIONS.SET_ERROR, payload: error.message });
      console.error(error.message);
    }
  };

  const contextData = {
    loading: state.loading,
    products: state.products,
    error: state.error,
    addProduct,
    state,
    dispatch,
  };
  return (
    <ProductsContext.Provider value={contextData}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductsContext);
}
