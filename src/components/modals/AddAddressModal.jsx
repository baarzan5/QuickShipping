import React, { useState } from "react";
import { hideScrollBar } from "../../hooks/hideScrollBar";
import { IoCloseOutline } from "react-icons/io5";
import Select from "react-select";
import { Countries } from "../../data/Countries";
import { Cities } from "../../data/Cities";
import { useAddress } from "../../context/AddressContext";
import { ADDRESS_ACTIONS } from "../../actions/addressActions";

const AddAddressModal = ({
  showAddAddressModal,
  setShowAddAddressModal,
  user,
}) => {
  hideScrollBar(showAddAddressModal);
  const [country, setCountry] = useState(null);
  const [city, setCity] = useState(null);
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { addAddress, dispatch } = useAddress();

  const handleCountryChange = (selectedOption) => {
    const selectedCountryId = selectedOption.value;
    const country = Countries.find(
      (country) => country.id === selectedCountryId
    );
    setCountry(country);
  };

  const handleCityChange = (selectedOption) => {
    const selectedCityId = selectedOption.value;
    const city = Cities.find((city) => city.id === selectedCityId);
    setCity(city);
  };

  const handleAddAddress = async () => {
    try {
      if (country && city && address.trim() != "" && phoneNumber) {
        const addressData = {
          country,
          city,
          address,
          phoneNumber,
          addedAt: new Date(),
        };
        await addAddress(user?.email, addressData);
        alert("ناونیشانەکەت بەسەرکەوتووی زیادکرا");
        setShowAddAddressModal(false);
      }
    } catch (error) {
      dispatch({ type: ADDRESS_ACTIONS.SET_ERROR, payload: error.message });
      console.error(error.message);
    }
  };

  return (
    <div
      className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-full h-screen bg-black/50 backdrop-blur-sm"
      onClick={() => setShowAddAddressModal(!showAddAddressModal)}
      style={{ zIndex: 999 }}
    >
      <div
        className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-white rounded-md flex flex-col justify-start items-start gap-2 p-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center w-full px-2">
          <span></span>
          <h3 className="text-lg font-semibold">زیادکردنی ناونیشانی نوێ</h3>
          <button
            title="داخستن"
            onClick={() => setShowAddAddressModal(!showAddAddressModal)}
            className="hover:bg-[#969393]/25 rounded-full p-1 active:scale-95 transform transition-all duration-100 ease-in-out"
          >
            <IoCloseOutline size={23} />
          </button>
        </div>

        <div className="flex flex-col justify-start items-start gap-3 w-full px-2">
          <div className="flex flex-row-reverse justify-between items-center w-full gap-2">
            <p className="">وڵات</p>

            <Select
              value={
                country
                  ? { value: country.id, label: country.countryName }
                  : null
              }
              onChange={handleCountryChange}
              options={Countries.map((country) => ({
                value: country.id,
                label: country.countryName,
              }))}
              placeholder="وڵات هەلبژێرە"
              className="w-full text-right"
            />
          </div>

          <div className="flex flex-row-reverse justify-between items-center w-full gap-2">
            <p>شار</p>

            <Select
              value={city ? { value: city.id, label: city.cityName } : null}
              onChange={handleCityChange}
              options={Cities.map((city) => ({
                value: city.id,
                label: city.cityName,
              }))}
              placeholder="شار هەلبژێرە"
              className="w-full text-right"
            />
          </div>

          <div className="flex flex-row-reverse justify-between items-center w-full gap-2">
            <p>ناونیشان</p>

            <input
              type="text"
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
              min={0}
              className="w-full border border-[#e4e4e5] rounded-md p-2 text-right"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <button
            onClick={handleAddAddress}
            className="bg-[#FF6F00] w-[350px] text-black rounded-md p-2 transform transition-all duration-100 ease-in-out hover:text-white active:scale-95"
          >
            زیادکردن
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAddressModal;
