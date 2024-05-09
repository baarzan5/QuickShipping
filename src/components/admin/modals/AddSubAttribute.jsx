import React, { useState } from "react";
import { hideScrollBar } from "../../../hooks/hideScrollBar";
import { useProperties } from "../../../context/PropertiesContext";
import { IoCloseOutline } from "react-icons/io5";

const AddSubAttribute = ({
  showAddSubAttributeModal,
  setShowAddSubAttributeModal,
  attribute,
}) => {
  const { addSubAttribute, dispatch } = useProperties();
  const [subAttributeName, setSubAttributeName] = useState("");

  hideScrollBar(showAddSubAttributeModal);

  const handleAddSubAttribute = async (e) => {
    e.preventDefault();

    try {
      if (subAttributeName.trim() == "") {
        return alert("Please write sub attribute name");
      } else {
        const subAttributeData = {
          subAttributeName,
          createdAt: new Date(),
        };

        await addSubAttribute(attribute.id, subAttributeData);
        alert(`${subAttributeName} sub attribute added successfully!`);
        setShowAddSubAttributeModal(false);
      }
    } catch (error) {
      dispatch({ type: PROPERTIESACTIONS.SET_ERROR, payload: error.message });
      console.error(error.message);
    }
  };

  return (
    <div
      onClick={() => setShowAddSubAttributeModal(!showAddSubAttributeModal)}
      className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 h-screen w-full bg-black/50 backdrop-blur-sm"
      style={{ zIndex: 3 }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[215px] rounded-md bg-white flex flex-col items-center gap-4 p-1"
      >
        <div className="flex justify-between items-center w-full">
          <span></span>
          <h3 className="text-lg font-semibold">Add sub attribute</h3>
          <button
            title="Close"
            onClick={() =>
              setShowAddSubAttributeModal(!showAddSubAttributeModal)
            }
            className="hover:bg-[#969393]/25 rounded-full p-1 transform transition-all ease-in-out duration-100 active:scale-95"
          >
            <IoCloseOutline size={25} />
          </button>
        </div>

        <p>
          Now you add sub attribute for{" "}
          <strong>{attribute.attributeName}</strong> attribute
        </p>

        <form
          onSubmit={handleAddSubAttribute}
          className="flex flex-col justify-center items-center gap-3"
        >
          <input
            type="text"
            placeholder="Sub Attribute Name"
            value={subAttributeName}
            onChange={(e) => setSubAttributeName(e.target.value)}
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

export default AddSubAttribute;
