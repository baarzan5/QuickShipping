import { createContext, useReducer, useEffect, useContext } from "react";
import { PROPERTIESACTIONS } from "../actions/propertiesActions";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const PropertiesContext = createContext();

const propertiesIntialState = {
  colors: [],
  attributes: [],
  subAttributes: [],
  error: null,
};

function propertiesReducer(state, action) {
  switch (action.type) {
    case PROPERTIESACTIONS.SET_COLORS:
      return {
        ...state,
        colors: action.payload,
      };

    case PROPERTIESACTIONS.SET_ATTRIBUTES:
      return {
        ...state,
        attributes: action.payload,
      };

    case PROPERTIESACTIONS.SET_SUB_ATTRIBUTES:
      return {
        ...state,
        subAttributes: action.payload,
      };

    case PROPERTIESACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}

export function PropertiesProvider({ children }) {
  const [state, dispatch] = useReducer(
    propertiesReducer,
    propertiesIntialState
  );

  const getColors = async () => {
    try {
      const colorsCollection = collection(db, "colors");
      onSnapshot(
        query(colorsCollection, orderBy("createdAt", "desc")),
        (snapshot) => {
          const colors = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          dispatch({ type: PROPERTIESACTIONS.SET_COLORS, payload: colors });
        }
      );
    } catch (error) {
      dispatch({ type: PROPERTIESACTIONS.SET_ERROR, payload: error.message });
      console.error(error.message);
    }
  };

  const getAttributes = async () => {
    try {
      const attributesCollection = collection(db, "attributes");
      onSnapshot(
        query(attributesCollection, orderBy("createdAt", "desc")),
        (snapshot) => {
          const attributes = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          dispatch({
            type: PROPERTIESACTIONS.SET_ATTRIBUTES,
            payload: attributes,
          });
        }
      );
    } catch (error) {
      dispatch({ type: PROPERTIESACTIONS.SET_ERROR, payload: error.message });
      console.error(error.message);
    }
  };

  useEffect(() => {
    getColors();
    getAttributes();
  }, []);

  const getSubAttributes = async (attributeId) => {
    try {
      const subAttributesCollection = collection(
        db,
        `attributes/${attributeId}/subAttributes`
      );
      onSnapshot(
        query(subAttributesCollection, orderBy("createdAt", "desc")),
        (snapshot) => {
          const subAttributes = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          dispatch({
            type: PROPERTIESACTIONS.SET_SUB_ATTRIBUTES,
            payload: subAttributes,
          });
        }
      );
    } catch (error) {
      dispatch({ type: PROPERTIESACTIONS.SET_ERROR, payload: error.message });
      console.error(error.message);
    }
  };

  const addColor = async (colorData) => {
    try {
      const colorsCollection = collection(db, `colors`);
      await addDoc(colorsCollection, colorData);
    } catch (error) {
      dispatch({ type: PROPERTIESACTIONS.SET_ERROR, payload: error.message });
      console.error(error.message);
    }
  };

  const deleteColor = async (color) => {
    try {
      const colorDoc = doc(db, "colors", color.id);
      await deleteDoc(colorDoc, color.id);
      alert(`${color.colorName} color deleted successfully!`);
    } catch (error) {
      dispatch({ type: PROPERTIESACTIONS.SET_ERROR, payload: error.message });
      console.error(error.message);
    }
  };

  const addAttribute = async (attributeData) => {
    try {
      const attributesCollection = collection(db, "attributes");
      await addDoc(attributesCollection, attributeData);
    } catch (error) {
      dispatch({ type: PROPERTIESACTIONS.SET_ERROR, payload: error.message });
      console.error(error.message);
    }
  };

  const deleteAttribute = async (attribute) => {
    try {
      const attributeDoc = doc(db, "attributes", attribute.id);
      await deleteDoc(attributeDoc, attribute.id);
      alert(`${attribute.attributeName} attribute deleted successfully!`);
    } catch (error) {
      dispatch({ type: PROPERTIESACTIONS.SET_ERROR, payload: error.message });
      console.error(error.message);
    }
  };

  const addSubAttribute = async (attributeId, subAttributeData) => {
    try {
      const subAttributesCollection = collection(
        db,
        `attributes/${attributeId}/subAttributes`
      );
      await addDoc(subAttributesCollection, subAttributeData);
    } catch (error) {
      dispatch({ type: PROPERTIESACTIONS.SET_ERROR, payload: error.message });
      console.error(error.message);
    }
  };

  const deleteSubAttribute = async (attributeId, subAttribute) => {
    try {
      const subAttributeDoc = doc(
        db,
        `attributes/${attributeId}/subAttributes/${subAttribute.id}`
      );
      await deleteDoc(subAttributeDoc, subAttribute.id);
      alert(
        `${subAttribute.subAttributeName} sub attribute deleted successfully!`
      );
    } catch (error) {
      dispatch({ type: PROPERTIESACTIONS.SET_ERROR, payload: error.message });
      console.error(error.message);
    }
  };

  const contextData = {
    colors: state.colors,
    attributes: state.attributes,
    error: state.error,
    getSubAttributes,
    subAttributes: state.subAttributes,
    addColor,
    deleteColor,
    addAttribute,
    deleteAttribute,
    addSubAttribute,
    deleteSubAttribute,
    state,
    dispatch,
  };
  return (
    <PropertiesContext.Provider value={contextData}>
      {children}
    </PropertiesContext.Provider>
  );
}

export function useProperties() {
  return useContext(PropertiesContext);
}
