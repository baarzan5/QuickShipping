import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useProperties } from "../../context/PropertiesContext";
import { IoIosAdd, IoMdArrowBack } from "react-icons/io";
import { RiDeleteBin4Line } from "react-icons/ri";
import DeleteModal from "../../components/admin/modals/DeleteModal";
import DeleteAttributeModal from "../../components/admin/modals/DeleteAttributeModal";
import AddSubAttribute from "../../components/admin/modals/AddSubAttribute";

const AttributePage = () => {
  const { user } = useAuth();
  const { attributeSlug } = useParams();
  const {
    attributes,
    getSubAttributes,
    subAttributes,
    deleteAttribute,
    deleteSubAttribute,
  } = useProperties();
  const [attribute, setAttribute] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddSubAttributeModal, setShowAddSubAttributeModal] =
    useState(false);

  const getAttribute = () => {
    const foundAttribute = attributes.find(
      (attribute) => attribute.attributeSlug == attributeSlug
    );
    // console.log({foundAttribute});
    setAttribute(foundAttribute);
  };

  useEffect(() => {
    getAttribute();
  }, [attributes, attributeSlug]);

  useEffect(() => {
    if (attribute) {
      getSubAttributes(attribute.id);
    }
  }, [attribute, subAttributes]);

  return (
    <>
      {user ? (
        <>
          {user.isAdmin ? (
            <>
              {attribute ? (
                <div className="flex flex-col justify-center items-center gap-10">
                  <header className="sticky top-0 left-0 w-full h-12 mainShadow flex justify-between items-center px-2">
                    <button
                      onClick={() => history.back()}
                      className="hover:bg-[#969393]/25 rounded-full p-1 active:scale-95 transform transition-all ease-in-out duration-100"
                    >
                      <IoMdArrowBack size={25} />
                    </button>
                    <h3 className="text-lg font-semibold">
                      {attribute.attributeName}
                    </h3>
                    <div className="flex justify-center items-center gap-2">
                      <button
                        onClick={() =>
                          setShowAddSubAttributeModal(!showAddSubAttributeModal)
                        }
                        className="flex justify-center items-center gap-0.5 p-2 hover:bg-[#969393]/25 rounded-md transform transition-all ease-in-out duration-100 active:scale-95"
                      >
                        <IoIosAdd size={25} />
                        Add sub attribute
                      </button>

                      <button
                        onClick={() => setShowDeleteModal(!showDeleteModal)}
                        className="flex justify-center items-center gap-0.5 p-2 bg-red-600 text-white hover:bg-red-700 rounded-md transform transition-all ease-in-out duration-100 active:scale-95"
                      >
                        <RiDeleteBin4Line size={25} />
                        Delete attribute
                      </button>
                    </div>
                  </header>

                  {showAddSubAttributeModal && (
                    <AddSubAttribute
                      showAddSubAttributeModal={showAddSubAttributeModal}
                      setShowAddSubAttributeModal={setShowAddSubAttributeModal}
                      attribute={attribute}
                    />
                  )}

                  {showDeleteModal && (
                    <DeleteAttributeModal
                      showDeleteModal={showDeleteModal}
                      setShowDeleteModal={setShowDeleteModal}
                      attribute={attribute}
                      deleteFunction={deleteAttribute}
                    />
                  )}

                  <div className="flex">
                    {subAttributes.length > 0 ? (
                      <div className="flex justify-center items-center gap-5">
                        {subAttributes.map((subAttribute, index) => (
                          <div
                            key={index}
                            className="relative flex justify-center items-center w-[150px] p-3 border border-[#969393]/25 rounded-md"
                          >
                            {subAttribute.subAttributeName}

                            <button
                              onClick={() =>
                                deleteSubAttribute(attribute.id, subAttribute)
                              }
                              className="absolute top-0 left-0 p-1 flex justify-center items-center gap-0.5 bg-red-600 text-white hover:bg-red-700 rounded-full transform transition-all ease-in-out duration-100 active:scale-95"
                            >
                              <RiDeleteBin4Line size={25} />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <>No added sub attributes yet</>
                    )}
                  </div>
                </div>
              ) : (
                <>Attribute not found</>
              )}
            </>
          ) : (
            <>404</>
          )}
        </>
      ) : (
        <>Loading...</>
      )}
    </>
  );
};

export default AttributePage;
