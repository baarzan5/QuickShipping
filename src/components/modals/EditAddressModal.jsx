import React, { useState } from "react";
import { hideScrollBar } from "../../hooks/hideScrollBar";
import { IoCloseOutline } from "react-icons/io5";
import Select from "react-select";
import { useLocations } from "../../context/LocationsContext";

const EditAddressModal = ({
  showEditAddressModal,
  setShowEditAddressModal,
  userEmail,
  addressInfo,
}) => {
  hideScrollBar(showEditAddressModal);

  const { countries, getCities, cities } = useLocations();
  const [country, setCountry] = useState(addressInfo.country.countryName);
  const [city, setCity] = useState(addressInfo.city.cityName);
  const [address, setAddress] = useState(addressInfo.address);
  const [phoneNumber, setPhoneNumber] = useState(addressInfo.phoneNumber);

  return (
    <div
      className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-full h-screen bg-black/50 backdrop-blur-sm"
      onClick={() => setShowEditAddressModal(!showEditAddressModal)}
      style={{ zIndex: 999 }}
    >
      <div
        className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-white rounded-md flex flex-col justify-start items-start gap-2 p-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center w-full px-2">
          <span></span>
          <h3 className="text-lg font-semibold">
            دەستکاری کردنی ناونیشانی نوێ
          </h3>
          <button
            title="داخستن"
            onClick={() => setShowEditAddressModal(!showEditAddressModal)}
            className="hover:bg-[#969393]/25 rounded-full p-1 active:scale-95 transform transition-all duration-100 ease-in-out"
          >
            <IoCloseOutline size={23} />
          </button>
        </div>

        <div className="flex flex-col justify-start items-start gap-3 w-full px-2">
          <div className="flex flex-row-reverse justify-between items-center w-full gap-2">
            <p className="">وڵات</p>

            <Select
              options={
                countries
                  ? countries.map((country) => ({
                      value: country?.id,
                      label: country?.countryName,
                    }))
                  : []
              }
              value={
                country
                  ? { value: country?.id, label: country?.countryName }
                  : null
              }
              onChange={handleCountryChange}
              placeholder="وڵات هەلبژێرە"
              className="w-full text-right"
            />
          </div>

          <div className="flex flex-row-reverse justify-between items-center w-full gap-2">
            <p>شار</p>

            <Select
              options={
                cities
                  ? cities.map((city) => ({
                      value: city.id,
                      label: city.cityName,
                    }))
                  : []
              }
              value={city ? { value: city.id, label: city.cityName } : null}
              onChange={handleCityChange}
              placeholder="شار هەلبژێرە"
              className="w-full text-right"
            />
          </div>

          <div className="flex flex-row-reverse justify-between items-center w-full gap-2">
            <p>ناونیشان</p>

            <input
              type="text"
              placeholder="ناونیشان"
              className="w-full border border-[#e4e4e5] rounded-md p-2 text-right"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="flex flex-row-reverse justify-between items-center w-full gap-2">
            <p>ژ.مۆبایل</p>

            <input
              type="number"
              placeholder="ژ.مۆبایل"
              min={0}
              className="w-full border border-[#e4e4e5] rounded-md p-2 text-right"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <button
            // onClick={handleAddAddress}
            className="bg-[#FF6F00] w-[350px] text-black rounded-md p-2 transform transition-all duration-100 ease-in-out hover:text-white active:scale-95"
          >
            زیادکردن
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAddressModal;
