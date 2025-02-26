import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import PreviewIcon from "@mui/icons-material/Preview";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { FindServiceToWorkersAction } from "../../action/auth_user/UserAction";
import { Localhost } from "../../action/host/HostConnection";
import { StoreBookingWorkerAction } from "../../action/auth_user/ServicesBookingCartAction";
import Lodder from "../../components/lodder/Lodder";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
const WorkerList = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [gender, setGender] = useState("");
  const [serviceId, setServiceId] = useState([]);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cartState);
  const { lodding, error, ServiceWorkers } = useSelector(
    (state) => state.serviceWrokerState
  );

  const deleteHandler = (serviceid) => {
    const filter = cart?.filter((i) => i._id !== serviceid._id);
    setCart(filter);
  };

  const handleWorkerSelect = (worker) => {
    if (cartItems.length <= cart.length) {
      toast.warn("you can select same number of services and workers");
      return;
    }
    toast.success(`${worker.username} Selected successfully !`, {
      position: "top-right",
    });
    if (!cart?.some((item) => item._id === worker._id)) {
      setCart((pre) => [...pre, worker]);
    }
  };

  const handleYourService = () => {
    dispatch(StoreBookingWorkerAction(cart));
    navigate("/service/booking");
  };

  useEffect(() => {
    if (cartItems.length > 0) {
      cartItems.forEach((service) => {
        if (!serviceId.includes(service._id)) {
          setServiceId((pre) => [...pre, service._id]);
        }
      });
    }
  }, [cartItems.length > 0]);

  useEffect(() => {
    dispatch(FindServiceToWorkersAction(serviceId));
  }, [dispatch, serviceId]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <Header />
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isSidebarOpen ? 0 : "-100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed inset-y-0  left-0 z-50 w-72 text-white bg-white shadow-lg"
      >
        <div className="flex flex-col items-center justify-between p-4 border-b border-gray-700">
          <div className="flex  justify-between items-center w-full">
            <img
              src={`${Localhost}/images/logo/manpower_name_logo.png`}
              className="object-cover h-8"
              alt=""
            />
            <button
              onClick={toggleSidebar}
              className="text-gray-500 hover:text-green-400 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="bg-transparent  mt-3">
            <div className=" font-bold text-gray-700 text-[11px] italic  m-2">
              <PreviewIcon /> Showing 4726 jobs
            </div>
            <h2 className="w-full flex items-center justify-center mt-2 font-serif text-[20px] p-1 text-white bg-[#25a267]">
              Advance Filter System
            </h2>
            <div className="mt-3 pb-1 w-full ">
              <h3 className="p-1 font-bold text-black">Search By Job Id</h3>
              <input className="p-2 border border-orange-400 outline-none w-full" />
            </div>
            <div className="mt-3 w-full pb-1 ">
              <h3 className="p-1 font-bold text-black">Search By Job Name</h3>
              <input className="p-2 border border-orange-400 outline-none w-full" />
            </div>
            <div className="mt-3 w-full pb-1 ">
              <h3 className="p-1 font-bold text-black">Search By Gender</h3>
              <div>
                <fieldset className="flex gap-10 ml-1">
                  <div className="relative flex items-center">
                    <input
                      className="w-4 h-4 transition-colors bg-white border-2 rounded-full appearance-none cursor-pointer peer border-slate-500 checked:border-emerald-500 checked:bg-emerald-500 checked:hover:border-emerald-600 checked:hover:bg-emerald-600 focus:outline-none checked:focus:border-emerald-700 checked:focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50"
                      type="radio"
                      value="huey"
                      id="huey"
                      name="drone"
                      onClick={(e) => setGender("All")}
                    />
                    <label
                      className="pl-2 cursor-pointer text-slate-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400"
                      for="huey"
                    >
                      All
                    </label>
                    <svg
                      className="absolute left-0 w-4 h-4 transition-all duration-300 scale-50 opacity-0 pointer-events-none fill-white peer-checked:scale-100 peer-checked:opacity-100 peer-disabled:cursor-not-allowed"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-labelledby="title-1 description-1"
                      role="graphics-symbol"
                    >
                      <title id="title-1">All</title>
                      <desc id="description-1">
                        Circle shape to indicate whether the radio input is
                        checked or not.
                      </desc>
                      <circle cx="8" cy="8" r="4" />
                    </svg>
                  </div>
                  <div className="relative flex items-center">
                    <input
                      className="w-4 h-4 transition-colors bg-white border-2 rounded-full appearance-none cursor-pointer peer border-slate-500 checked:border-emerald-500 checked:bg-emerald-500 checked:hover:border-emerald-600 checked:hover:bg-emerald-600 focus:outline-none checked:focus:border-emerald-700 checked:focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50"
                      type="radio"
                      value="dewey"
                      id="dewey"
                      name="drone"
                      onClick={(e) => setGender("Male")}
                    />
                    <label
                      className="pl-2 cursor-pointer text-slate-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400"
                      for="dewey"
                    >
                      Male
                    </label>
                    <svg
                      className="absolute left-0 w-4 h-4 transition-all duration-300 scale-50 opacity-0 pointer-events-none fill-white peer-checked:scale-100 peer-checked:opacity-100 peer-disabled:cursor-not-allowed"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-labelledby="title-2 description-2"
                      role="graphics-symbol"
                    >
                      <title id="title-2">Female</title>
                      <desc id="description-2">
                        Circle shape to indicate whether the radio input is
                        checked or not.
                      </desc>
                      <circle cx="8" cy="8" r="4" />
                    </svg>
                  </div>
                  <div className="relative flex items-center">
                    <input
                      className="w-4 h-4 transition-colors bg-white border-2 rounded-full appearance-none cursor-pointer peer border-slate-500 checked:border-emerald-500 checked:bg-emerald-500 checked:hover:border-emerald-600 checked:hover:bg-emerald-600 focus:outline-none checked:focus:border-emerald-700 checked:focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50"
                      type="radio"
                      value="louie"
                      id="louie"
                      name="drone"
                      onClick={(e) => setGender("Female")}
                    />
                    <label
                      className="pl-2 cursor-pointer text-slate-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400"
                      for="louie"
                    >
                      Female
                    </label>
                    <svg
                      className="absolute left-0 w-4 h-4 transition-all duration-300 scale-50 opacity-0 pointer-events-none fill-white peer-checked:scale-100 peer-checked:opacity-100 peer-disabled:cursor-not-allowed"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-labelledby="title-3 description-3"
                      role="graphics-symbol"
                    >
                      <title id="title-3">Circle Shape</title>
                      <desc id="description-3">
                        Circle shape to indicate whether the radio input is
                        checked or not.
                      </desc>
                      <circle cx="8" cy="8" r="4" />
                    </svg>
                  </div>
                </fieldset>
              </div>
              <div className="mt-3 w-full pb-1 ">
                <form class="max-w-sm ml-1 mx-auto">
                  <label
                    for="small"
                    className="block p-1 font-bold mb-2 text-sm  text-gray-900 dark:text-white"
                  >
                    Select Division
                  </label>
                  <select
                    id="small"
                    class="block w-full p-2 mb-6 text-sm text-gray-900 border border-orange-400 rounded-sm py-[10px] bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option selected>Choose a division</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option>
                  </select>
                  <label
                    for="default"
                    class="block mb-2 text-sm p-1 font-bold text-gray-900 dark:text-white"
                  >
                    Select District
                  </label>
                  <select
                    id="default"
                    class="bg-gray-50 border  text-gray-900 mb-6 text-sm rounded-sm border-orange-400  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option selected>Choose a District</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option>
                  </select>
                  <label
                    for="default"
                    class="block mb-2 text-sm p-1 font-bold text-gray-900 dark:text-white"
                  >
                    Select Upazila
                  </label>
                  <select
                    id="default"
                    class="bg-gray-50 border border-orange-400 text-gray-900 mb-6 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option selected>Choose a upazila</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option>
                  </select>
                </form>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <div className="min-h-[300px] py-14 overflow-hidden bg-[#edf3ff]">
        <div className="flex items-center flex-col justify-center  w-[100%] md:mt-5 mt-7">
          <div className=" md:w-[50%] py-3 w-[100%] mt-7 flex items-center flex-col justify-center ">
            <h1 className="md:text-5xl text-4xl text-center text-[#25a267] p-2 font-serif">
              Our Suite of Workers Solutions
            </h1>
            <p className="md:w-[50%] w-[75%] text-gray-400 text-center">
              Our comprehensive family of brands address the complex workforce
              challenges organizations face today, from contingent and permanent
              staffing to talent management, outsourcing, and talent
              development. We deliver the solutions that drive your business
              forward.
            </p>
          </div>
        </div>
        <div className="w-full p-4 bg-white"></div>
        {lodding ? (
          <Lodder />
        ) : (
          <>
            <div className=" flex items-center justify-between m-2">
              <div className=" flex items-center md:hidden font-bold ml-4 text-gray-400 text-[16px] p-2 border border-black m-2">
                <PreviewIcon />
                Showing 4726 jobs
              </div>
              <div title="filtering jobs">
                <button
                  onClick={toggleSidebar}
                  type="button"
                  className="inline-flex items-center ml-5 justify-center hover:text-black hover:bg-transparent hover:border hover:border-orange-400 bg-[#25a267] px-8 border  h-9 p-2 text-sm text-white shadow-lg mr-5 rounded-[3px] md:hidden  focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  aria-controls="navbar-cta"
                  aria-expanded={isSidebarOpen ? "true" : "false"}
                >
                  <FilterAltIcon />
                </button>
              </div>
            </div>
            <div className=" md:grid md:grid-cols-5">
              <div className="bg-transparent md:block hidden md:col-span-1 m-3">
                <div className="bg-transparent -mt-5">
                  <div className=" font-bold text-gray-700 text-[11px] italic  m-2">
                    <PreviewIcon /> Showing 4726 jobs
                  </div>
                  <h2 className="w-full flex items-center justify-center mt-2 font-serif text-[20px] p-1 text-white bg-[#25a267]">
                    Advance Filter System
                  </h2>
                  <div className="mt-3 pb-1 w-full ">
                    <h3 className="p-1 text-black  font-bold">Search By Job Id</h3>
                    <input className="p-2 border border-orange-400 outline-none w-full" />
                  </div>
                  <div className="mt-3 w-full pb-1 ">
                    <h3 className="p-1 text-black  font-bold">Search By Job Name</h3>
                    <input className="p-2 border border-orange-400 outline-none w-full" />
                  </div>
                  <div className="mt-3 w-full pb-1 ">
                    <h3 className="p-1 text-black font-bold">Search By Gender</h3>
                    <div>
                      <fieldset className="flex gap-10 ml-1">
                        <div className="relative flex items-center">
                          <input
                            className="w-4 h-4 transition-colors bg-white border-2 rounded-full appearance-none cursor-pointer peer border-slate-500 checked:border-emerald-500 checked:bg-emerald-500 checked:hover:border-emerald-600 checked:hover:bg-emerald-600 focus:outline-none checked:focus:border-emerald-700 checked:focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50"
                            type="radio"
                            value="huey"
                            id="huey"
                            name="drone"
                            onClick={(e) => setGender("All")}
                          />
                          <label
                            className="pl-2 cursor-pointer text-slate-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400"
                            for="huey"
                          >
                            All
                          </label>
                          <svg
                            className="absolute left-0 w-4 h-4 transition-all duration-300 scale-50 opacity-0 pointer-events-none fill-white peer-checked:scale-100 peer-checked:opacity-100 peer-disabled:cursor-not-allowed"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-labelledby="title-1 description-1"
                            role="graphics-symbol"
                          >
                            <title id="title-1">All</title>
                            <desc id="description-1">
                              Circle shape to indicate whether the radio input
                              is checked or not.
                            </desc>
                            <circle cx="8" cy="8" r="4" />
                          </svg>
                        </div>
                        <div className="relative flex items-center">
                          <input
                            className="w-4 h-4 transition-colors bg-white border-2 rounded-full appearance-none cursor-pointer peer border-slate-500 checked:border-emerald-500 checked:bg-emerald-500 checked:hover:border-emerald-600 checked:hover:bg-emerald-600 focus:outline-none checked:focus:border-emerald-700 checked:focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50"
                            type="radio"
                            value="dewey"
                            id="dewey"
                            name="drone"
                            onClick={(e) => setGender("Male")}
                          />
                          <label
                            className="pl-2 cursor-pointer text-slate-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400"
                            for="dewey"
                          >
                            Male
                          </label>
                          <svg
                            className="absolute left-0 w-4 h-4 transition-all duration-300 scale-50 opacity-0 pointer-events-none fill-white peer-checked:scale-100 peer-checked:opacity-100 peer-disabled:cursor-not-allowed"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-labelledby="title-2 description-2"
                            role="graphics-symbol"
                          >
                            <title id="title-2">Female</title>
                            <desc id="description-2">
                              Circle shape to indicate whether the radio input
                              is checked or not.
                            </desc>
                            <circle cx="8" cy="8" r="4" />
                          </svg>
                        </div>
                        <div className="relative flex items-center">
                          <input
                            className="w-4 h-4 transition-colors bg-white border-2 rounded-full appearance-none cursor-pointer peer border-slate-500 checked:border-emerald-500 checked:bg-emerald-500 checked:hover:border-emerald-600 checked:hover:bg-emerald-600 focus:outline-none checked:focus:border-emerald-700 checked:focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50"
                            type="radio"
                            value="louie"
                            id="louie"
                            name="drone"
                            onClick={(e) => setGender("Female")}
                          />
                          <label
                            className="pl-2 cursor-pointer text-slate-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400"
                            for="louie"
                          >
                            Female
                          </label>
                          <svg
                            className="absolute left-0 w-4 h-4 transition-all duration-300 scale-50 opacity-0 pointer-events-none fill-white peer-checked:scale-100 peer-checked:opacity-100 peer-disabled:cursor-not-allowed"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-labelledby="title-3 description-3"
                            role="graphics-symbol"
                          >
                            <title id="title-3">Circle Shape</title>
                            <desc id="description-3">
                              Circle shape to indicate whether the radio input
                              is checked or not.
                            </desc>
                            <circle cx="8" cy="8" r="4" />
                          </svg>
                        </div>
                      </fieldset>
                    </div>
                    <div className="mt-3 w-full pb-1 ">
                      <form class="max-w-sm ml-1 mx-auto">
                        <label
                          for="small"
                          className="block p-1 font-bold mb-2 text-sm  text-gray-900 dark:text-white"
                        >
                          Select Division
                        </label>
                        <select
                          id="small"
                          class="block w-full p-2 mb-6 text-sm text-gray-900 border border-orange-400 rounded-sm py-[10px] bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option selected>Choose a division</option>
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="FR">France</option>
                          <option value="DE">Germany</option>
                        </select>
                        <label
                          for="default"
                          class="block mb-2 text-sm p-1 font-bold text-gray-900 dark:text-white"
                        >
                          Select District
                        </label>
                        <select
                          id="default"
                          class="bg-gray-50 border  text-gray-900 mb-6 text-sm rounded-sm border-orange-400  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option selected>Choose a District</option>
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="FR">France</option>
                          <option value="DE">Germany</option>
                        </select>
                        <label
                          for="default"
                          class="block mb-2 text-sm p-1 font-bold text-gray-900 dark:text-white"
                        >
                          Select Upazila
                        </label>
                        <select
                          id="default"
                          class="bg-gray-50 border border-orange-400 text-gray-900 mb-6 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option selected>Choose a upazila</option>
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="FR">France</option>
                          <option value="DE">Germany</option>
                        </select>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-span-4 h-[100vh] overflow-x-auto ">
                {ServiceWorkers?.length > 0 ? (
                  <>
                    {ServiceWorkers?.map((worker, index) => (
                      <div
                      key={index}
                        class={`p-4 max-w-sm ${
                          cart.some((item) => item?._id === worker?._id)
                            ? "border p-0 mt-3 opacity-45  rounded-md  shadow-lg"
                            : ""
                        }`}
                      >
                        <div class="flex rounded-md w-[300px] h-full bg-white p-8 flex-col border-[0.3px] border-green-400 shadow-md text-gray-800">
                          {cart.some((item) => item?._id === worker?._id) && (
                            <div
                              style={{
                                color: "red",
                                cursor: "pointer",
                                backgroundColor: "white",
                                width: "10%",
                                borderBottomRightRadius: "30%",
                                textAlign: "center",
                              }}
                              onClick={() => deleteHandler(worker)}
                            >
                              <span>x</span>
                            </div>
                          )}
                          <div className="flex justify-center w-full overflow-hidden transition-all rounded-full">
                            {worker.avatar ? (
                              <img
                                width="217"
                                height="200"
                                src={
                                  Localhost + `/images/avatars/${worker.avatar}`
                                }
                                className="transition-all duration-1000 ease-linear border rounded-full hover:scale-110"
                              />
                            ) : (
                              <img
                                src="https://media.istockphoto.com/id/1451587807/vector/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-vector.jpg?s=612x612&w=0&k=20&c=yDJ4ITX1cHMh25Lt1vI1zBn2cAKKAlByHBvPJ8gEiIg="
                                alt="user name"
                                title="user name"
                                width="200"
                                height="200"
                                className="max-w-full rounded-md"
                              />
                            )}
                          </div>
                          <div class="flex flex-col justify-between py-1 flex-grow">
                            <div class="flex items-center   min-w-[250px] mb-3">
                              <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-[#25a267] text-white flex-shrink-0">
                                <svg
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  class="w-5 h-5"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                </svg>
                              </div>
                              <h2 class="text-gray-600 text-lg font-medium">
                                {worker.username}
                              </h2>
                            </div>
                            <div className="flex justify-center w-full py-1 border rounded-full">
                              <Stack spacing={1}>
                                <Rating
                                  name="half-rating"
                                  defaultValue={5}
                                  precision={0.2}
                                />
                              </Stack>
                            </div>
                            <div className="flex justify-between space-x-4">
                              <Link
                                to={`/worker/resume/${worker?.user?._id}`}
                                className="inline-flex items-center justify-center w-full p-2 mt-3 text-gray-500 transition-all ease-linear border border-[#25a267] rounded-sm hover:bg-[#25a267] hover:text-white duration-700 font-bold"
                              >
                                View Profile
                              </Link>
                              <button
                                onClick={() => handleWorkerSelect(worker)}
                                class="inline-flex items-center justify-center w-full p-2 mt-3 text-gray-500 transition-all ease-linear border border-[#25a267] rounded-sm hover:bg-[#25a267] hover:text-white duration-700 font-bold"
                              >
                                {cart.some((item) => item._id === worker?._id)
                                  ? "Worker Booked"
                                  : "Select Worker"}
                              </button>
                            </div>
                            <div className="w-full"></div>
                          </div>
                        </div>
                        <div>
                          {cart.length > 0 ? (
                            <button
                              onClick={handleYourService}
                              type="button"
                              class="fixed left-[49%] top-[100px]   md:top-[55%] md:left-[86%] inline-flex items-center px-5 py-3 text- font-serif text-center text-white bg-blue-600 border rounded-md hover:bg-blue-800 focus:outline-none"
                            >
                              <span class="sr-only">Notifications</span>
                              Add To Workers
                              <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                                {cart.length}
                              </div>
                            </button>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="flex flex-col -mt-16 items-center justify-center p-32 bg-white-300">
                    <h1 className="pb-3 text-5xl font-bold text-center text-red-700">
                      Booking
                    </h1>
                    <p
                      onClick={() => navigate("/service/booking")}
                      className=" w-24 flex items-center justify-center text-blue-600 hover:border-b border-blue-600 cursor-pointer"
                    >
                      Next
                      <ArrowForwardIcon style={{ fontSize: "12px" }} />
                    </p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default WorkerList;
