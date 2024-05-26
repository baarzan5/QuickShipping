import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import AddAddressModal from "../components/modals/AddAddressModal";
import { useLocations } from "../context/LocationsContext";

const AddressPage = () => {
  const { user } = useAuth();
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const { getUserAddress, address, countries, getCountries } = useLocations();

  useEffect(() => {
    if (user) {
      getUserAddress(user.email);
    }
  }, [user]);

  useEffect(() => {
    getCountries();
  }, [countries]);

  return (
    <div>
      {user ? (
        <div className="pt-[30px]">
          <div className="flex flex-col justify-end items-end w-[95%] p-2 rounded-md mainShadow mx-auto">
            <div className="flex flex-row-reverse justify-between items-center w-full px-2 pb-1.5 border-b border-b-[#e4e4e5]">
              <h2 className="text-xl font-semibold">ناونیشانەکانم</h2>
              <button
                onClick={() => setShowAddAddressModal(!showAddAddressModal)}
                className="bg-[#FF6F00] text-black rounded-md p-2 transform transition-all duration-100 ease-in-out hover:text-white active:scale-95"
              >
                زیادکردنی ناونیشانی نوێ
              </button>

              {showAddAddressModal && (
                <AddAddressModal
                  showAddAddressModal={showAddAddressModal}
                  setShowAddAddressModal={setShowAddAddressModal}
                  userEmail={user?.email}
                  countries={countries}
                />
              )}
            </div>

            <div className="flex flex-row-reverse flex-wrap justify-end items-end gap-4 p-2">
              {address.map((address, index) => (
                <div
                  key={index}
                  className="w-[250px] p-2 border border-[#e4e4e5] rounded-md flex flex-col justify-end items-end gap-2.5"
                >
                  <div className="flex flex-row-reverse gap-2">
                    <strong>: وڵات</strong>
                    <p>{address.country.countryName}</p>
                  </div>

                  <div className="flex flex-row-reverse gap-2">
                    <strong>: شار</strong>
                    <p>{address.city.cityName}</p>
                  </div>

                  <div className="flex flex-row-reverse gap-2">
                    <strong>: ناونیشان</strong>
                    <p>{address.address}</p>
                  </div>

                  <div className="flex flex-row-reverse gap-2">
                    <strong>: ژ.مۆبایل</strong>
                    <p>{address.phoneNumber}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
};

export default AddressPage;
