import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { PROPERTIESACTIONS } from "../../../actions/propertiesActions";
import { useProperties } from "../../../context/PropertiesContext";
import { hideScrollBar } from "../../../hooks/hideScrollBar";

const AddAttributeModal = ({
  showAddAttributeModal,
  setShowAddAttributeModal,
}) => {
  const { addAttribute, dispatch } = useProperties();
  const [attributeName, setAttributeName] = useState("");
  const [attributeSlug, setAttributeSlug] = useState("");

  hideScrollBar(showAddAttributeModal);

  const handleAddAttribute = async (e) => {
    e.preventDefault();

    try {
      if (attributeName.trim() == "") {
        return alert("Please write attribute name");
      } else if (attributeSlug.trim() == "") {
        return alert("Please write attribute slug");
      } else {
        const attributeData = {
          attributeName,
          attributeSlug,
          createdAt: new Date(),
        };

        await addAttribute(attributeData);
        alert(`${attributeName} attribute added successfully!`);
        setShowAddAttributeModal(false);
      }
    } catch (error) {
      dispatch({ type: PROPERTIESACTIONS.SET_ERROR, payload: error.message });
      console.error(error.message);
    }
  };

  return (
    <div
      onClick={() => setShowAddAttributeModal(!showAddAttributeModal)}
      className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 h-screen w-full bg-black/50 backdrop-blur-sm"
      style={{ zIndex: 3 }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[210px] rounded-md bg-white flex flex-col items-center gap-4 p-1"
      >
        <div className="flex justify-between items-center w-full">
          <span></span>
          <h3 className="text-lg font-semibold">Add attribute</h3>
          <button
            title="Close"
            onClick={() => setShowAddAttributeModal(!showAddAttributeModal)}
            className="hover:bg-[#969393]/25 rounded-full p-1 transform transition-all ease-in-out duration-100 active:scale-95"
          >
            <IoCloseOutline size={25} />
          </button>
        </div>

        <form
          onSubmit={handleAddAttribute}
          className="flex flex-col justify-center items-center gap-3"
        >
          <input
            type="text"
            placeholder="Attribute Name"
            value={attributeName}
            onChange={(e) => setAttributeName(e.target.value)}
            className="w-[270px] p-2 border border-[#e4e4e5] rounded-md"
          />

          <input
            type="text"
            placeholder="Attribute Slug"
            value={attributeSlug}
            onChange={(e) => setAttributeSlug(e.target.value)}
            className="w-[270px] p-2 border border-[#e4e4e5] rounded-md"
          />

          <button className="w-[270px] p-2 bg-blue-700 text-white hover:bg-blue-800 rounded-md transform transition-all ease-in-out duration-100 active:scale-95">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAttributeModal;
