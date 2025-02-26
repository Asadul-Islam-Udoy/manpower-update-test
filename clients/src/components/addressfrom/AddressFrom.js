import React, { useState } from "react";
import { AddressInfoBookingCardAction } from "../../action/auth_user/ServicesBookingCartAction";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import BadgeIcon from "@mui/icons-material/Badge";
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessIcon from '@mui/icons-material/Business';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { toast } from "react-toastify";
const ServiceForm = ({timeKey ,timeSchedule, startwork}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if(timeSchedule==null){
     return toast.warn('your working time is required!');
    }
    if(timeKey==''){
      return toast.warn('your working time key is required!')
    }
    if(startwork==''){
      return toast.warn('your work start time is required!')
    }
    const obj = {
      name,
      phone,
      area,
      state,
      city,
      address,
    };
    dispatch(AddressInfoBookingCardAction(obj));
    navigate("/service/booking/details");
  };

  return (
    <div className="p-4 md:-mt-0 -mt-[60px]">
      <div className="w-full p-6 mx-auto bg-transparent bg-white border">
        <h1 className="mb-2 italic text-2xl -mt-3 font-bold text-center text-orange-400">
          Your Information
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="name"
              className="mb-1 font-serif block text-base font-medium text-[#07074D]"
            > 
              {/* Full Name <sup>*</sup> */}
            </label>
            <div className="flex border-[0.5px]   items-center justify-center">
            <BadgeIcon style={{color:'white'}} />
            <input
              type="text"
              name="name"
              required
              id="name"
              placeholder="Enter your full name..."
              className="w-full px-1 py-2 font-sans text-base text-black bg-transparent outline-none focus:shadow-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            </div>
          </div>

          <div className="mb-5">
            <label
              htmlFor="phone"
              className="mb-3 font-serif block text-base font-medium text-[#07074D]"
            >
              {/* Phone Number<sup>*</sup> */}
            </label>
            <div className="flex border-[1px] items-center justify-center">
              <PhoneIcon style={{color:'white'}} />
              <input
                type="text"
                name="phone"
                required
                id="phone"
                placeholder="Enter your phone number..."
                className="w-full px-1 py-2 font-sans text-base text-black bg-transparent outline-none "
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-5">
            <div className="mb-5">
              <label
                htmlFor="state"
                className="mb-3 font-serif block text-base font-medium text-[#07074D]"
              >
                {/* Address<sup>*</sup> */}
              </label>
              <div className="flex border-[1px]  items-center justify-center">
              
              <AccountBalanceIcon style={{color:'white'}} />
              <input
                type="text"
                required
                name="state"
                id="state"
                placeholder="Enter your address..."
                className="w-full px-1 py-2 font-sans text-base text-black bg-transparent outline-none "
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              </div>
            </div>
          </div>
          <div className="mb-5">
            <label
              htmlFor="area"
              className="mb-3 block font-serif text-base font-medium text-[#07074D]"
            >
              {/* Area<sup>*</sup> */}
            </label>
            <div className="flex border-[1px]  items-center justify-center">
            
            < AddHomeWorkIcon style={{color:'white'}} />
            <input
              type="text"
              required
              name="area"
              id="area"
              placeholder="Enter your area..."
              className="w-full px-1 py-2 font-sans text-base text-black bg-transparent outline-none "
              value={area}
              onChange={(e) => setArea(e.target.value)}
            />
            </div>
          </div>
          <div className="mb-5">
            <label
              htmlFor="area"
              className="mb-3 block text-base font-serif font-medium text-[#07074D]"
            >
              {/* State<sup>*</sup> */}
            </label>
           <div className="flex border-[1px]  items-center justify-center">
            <AddBusinessIcon style={{color:'white'}} />
            <input
              type="text"
              required
              name="state"
              id="state"
              placeholder="Enter your state..."
              className="w-full px-1 py-2 font-sans text-base text-black bg-transparent outline-none "
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
            </div>
          </div>

          <div className="mb-5">
            <label
              htmlFor="city"
              className="mb-3 block text-base font-sans font-medium text-[#07074D]"
            >
              {/* City<sup>*</sup> */}
            </label>
            <div className="flex border-[1px] items-center justify-center">
            <BusinessIcon style={{color:'white'}} />
            <input
              type="text"
              name="city"
              required
              id="city"
              placeholder="Enter your city..."
              className="w-full px-1 py-2 font-seri  text-base text-black bg-transparent outline-none "
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center w-full p-2 mt-3 text-white transition-all ease-linear border border-[#25a267] rounded-sm bg-[#25a267] hover:text-gray-500 hover:bg-white duration-700 font-bold"
          >
            Book Service
          </button>
        </form>
      </div>
    </div>
  );
};

export default ServiceForm;
