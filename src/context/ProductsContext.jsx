import { createContext, useReducer, useEffect, useContext } from "react";
import { PRODUCTSACTIONS } from "../actions/productsActions";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const ProductsContext = createContext();

const productsInitialState = {
  loading: true,
  products: [],
  error: null,
  wishLists: [],
  cart: [],
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

    case PRODUCTSACTIONS.SET_WISH_LIST:
      return {
        ...state,
        loading: false,
        wishLists: action.payload,
      };

    case PRODUCTSACTIONS.SET_CART:
      return {
        ...state,
        loading: false,
        cart: action.payload,
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

  const deleteProduct = async (product) => {
    try {
      const productDoc = doc(db, "products", product.id);
      await deleteDoc(productDoc, product.id);
      alert(`${product.productName} product deleted successfully`);
      return (window.location.href = "/admin/products");
    } catch (error) {
      dispatch({ type: PRODUCTSACTIONS.SET_ERROR, payload: error.message });
      console.error(error.message);
    }
  };

  const toggleWishListAndCart = async (collectionName, product) => {
    try {
      const collectionSnapshot = await getDocs(collectionName);
      const isExists = collectionSnapshot.docs.find(
        (doc) => doc.data().product.id == product.id
      );

      if (isExists) {
        await deleteDoc(doc(collectionName, isExists.id));
        console.log("PRODUCT DELETED");
      } else {
        await addDoc(collectionName, {
          product,
          addedAt: new Date(),
        });
        console.log("PRODUCT ADDED");
      }
    } catch (error) {
      dispatch({ type: PRODUCTSACTIONS.SET_ERROR, payload: error.message });
      console.error(error.message);
    }
  };

  const handleWishList = async (user, product) => {
    try {
      const wishListsCollection = collection(
        db,
        `users/${user.email}/wishLists`
      );
      await toggleWishListAndCart(wishListsCollection, product);
    } catch (error) {
      dispatch({ type: PRODUCTSACTIONS.SET_ERROR, payload: error.message });
      console.error(error.message);
    }
  };

  const handleCart = async (user, product) => {
    try {
      const cartCollection = collection(db, `users/${user.email}/cart`);
      await toggleWishListAndCart(cartCollection, product);
    } catch (error) {
      dispatch({ type: PRODUCTSACTIONS.SET_ERROR, payload: error.message });
      console.error(error.message);
    }
  };

  const getUserWishLists = async (user) => {
    try {
      const wishListsCollection = collection(
        db,
        `users/${user.email}/wishLists`
      );
      onSnapshot(
        query(wishListsCollection, orderBy("addedAt", "desc")),
        (snapshot) => {
          const wishLists = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          dispatch({ type: PRODUCTSACTIONS.SET_WISH_LIST, payload: wishLists });
        }
      );
    } catch (error) {
      dispatch({ type: PRODUCTSACTIONS.SET_ERROR, payload: error.message });
      console.error(error.message);
    }
  };

  const getUserCart = async (user) => {
    try {
      const cartCollection = collection(db, `users/${user.email}/cart`);
      onSnapshot(
        query(cartCollection, orderBy("addedAt", "desc")),
        (snapshot) => {
          const cart = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          dispatch({ type: PRODUCTSACTIONS.SET_CART, payload: cart });
        }
      );
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
    deleteProduct,
    handleWishList,
    handleCart,
    getUserWishLists,
    getUserCart,
    wishLists: state.wishLists,
    cart: state.cart,
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
