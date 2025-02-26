import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import PreviewIcon from "@mui/icons-material/Preview";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  RemoveCardBeforeWorkerAction,
  StoreBookingCardAction,
} from "../../action/auth_user/ServicesBookingCartAction";
import {
  getCategoryBasicServiceAction,
  getParentServiceCategoryAction,
} from "../../action/auth_user/ServicesAction";
import { Localhost } from "../../action/host/HostConnection";
import Lodder from "../../components/lodder/Lodder";
import AcUnitIcon from "@mui/icons-material/AcUnit";
const GetService = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [gender, setGender] = useState("");

  const { error, lodding, servicesList } = useSelector(
    (state) => state.serviceListState
  );

  const { CategoryservicesList } = useSelector(
    (state) => state.serviceCategoryState
  );

  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteHandler = (serviceid) => {
    const filter = cart?.filter((i) => i._id !== serviceid._id);
    setCart(filter);
  };

  const handleBookService = (serviceid) => {
    if (!cart?.some((item) => item._id === serviceid._id)) {
      setCart((pre) => [...pre, serviceid]);
    }
  };
  const handleYourService = () => {
    dispatch(StoreBookingCardAction(cart));
    dispatch(RemoveCardBeforeWorkerAction());
    navigate("/worker/list");
  };

  const params = window.location.search.split("?")[1];
  useEffect(() => {
    if (params) {
      dispatch(getCategoryBasicServiceAction(params));
    } else {
      dispatch(getCategoryBasicServiceAction());
    }
  }, [dispatch, params]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    dispatch(getParentServiceCategoryAction());
  }, [dispatch]);
  return (
    <>
      <Header />
      {/* sidebar start*/}
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
              <h3 className="pb-2 text-black font-bold ">Search By Category</h3>
              <div className="pb-2 ml-1">
                <fieldset className="flex gap-7 mt-2 flex-col ml-1">
                  {CategoryservicesList?.map((i, index) => (
                    <div key={index} className="relative flex items-center">
                      <input
                        className="w-4 h-4 transition-colors bg-white border-2 rounded-full appearance-none cursor-pointer peer border-slate-500 checked:border-emerald-500 checked:bg-emerald-500 checked:hover:border-emerald-600 checked:hover:bg-emerald-600 focus:outline-none checked:focus:border-emerald-700 checked:focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50"
                        type="radio"
                        value="huey"
                        id="huey"
                        name="drone"
                        // to={`/category/basic/services/${i._id}/${i.category_name}`}
                        onClick={(e) => setGender(i.category_name)}
                      />
                      <label
                        className="pl-2 cursor-pointer text-slate-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400"
                        for="huey"
                      >
                        {i.category_name}
                      </label>
                      <svg
                        className="absolute left-0 w-4 h-4 transition-all duration-300 scale-50 opacity-0 pointer-events-none fill-white peer-checked:scale-100 peer-checked:opacity-100 peer-disabled:cursor-not-allowed"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-labelledby="title-1 description-1"
                        role="graphics-symbol"
                      >
                        <title id="title-1">{i.category_name}</title>
                        <desc id="description-1">
                          Circle shape to indicate whether the radio input is
                          checked or not.
                        </desc>
                        <circle cx="8" cy="8" r="4" />
                      </svg>
                    </div>
                  ))}
                </fieldset>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      {/* sidebar end */}
      <div className="min-h-[300px] overflow-hidden bg-[#edf3ff] text-gray-700 pb-4">
        <div className="flex items-center flex-col justify-center  w-[100%] mt-20 ">
          <div className=" md:w-[55%] w-[100%] mt-7 flex items-center flex-col py-3 justify-center ">
            <h1 className="md:text-5xl text-4xl text-[#25a267] text-center p-2 font-serif">
              Our Suite of Services Solutions
            </h1>
            <p className=" block  w-[75%] text-center">
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
                    <h3 className="p-1 text-black font-bold">
                      Search By Job Id
                    </h3>
                    <input className="p-2 border border-orange-400 outline-none w-full" />
                  </div>
                  <div className="mt-3 w-full pb-1 ">
                    <h3 className="p-1 text-black font-bold">
                      Search By Job Name
                    </h3>
                    <input className="p-2 border border-orange-400 outline-none w-full" />
                  </div>
                  <div className="mt-3 w-full pb-1 ">
                    <h3 className="pb-2 text-black font-bold ">
                      Search By Category
                    </h3>
                    <div className="pb-2 ml-1">
                      <fieldset className="flex mt-2 gap-7 flex-col ml-1">
                        {CategoryservicesList?.map((i, index) => (
                          <div
                            key={index}
                            className="relative flex items-center"
                          >
                            <input
                              className="w-4 h-4 transition-colors bg-white border-2 rounded-full appearance-none cursor-pointer peer border-slate-500 checked:border-emerald-500 checked:bg-emerald-500 checked:hover:border-emerald-600 checked:hover:bg-emerald-600 focus:outline-none checked:focus:border-emerald-700 checked:focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50"
                              type="radio"
                              value="huey"
                              id="huey"
                              name="drone"
                              // to={`/category/basic/services/${i._id}/${i.category_name}`}
                              onClick={(e) => setGender(i.category_name)}
                            />
                            <label
                              className="pl-2 cursor-pointer text-slate-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400"
                              for="huey"
                            >
                              {i.category_name}
                            </label>
                            <svg
                              className="absolute left-0 w-4 h-4 transition-all duration-300 scale-50 opacity-0 pointer-events-none fill-white peer-checked:scale-100 peer-checked:opacity-100 peer-disabled:cursor-not-allowed"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-labelledby="title-1 description-1"
                              role="graphics-symbol"
                            >
                              <title id="title-1">{i.category_name}</title>
                              <desc id="description-1">
                                Circle shape to indicate whether the radio input
                                is checked or not.
                              </desc>
                              <circle cx="8" cy="8" r="4" />
                            </svg>
                          </div>
                        ))}
                      </fieldset>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-4 h-[100vh] overflow-x-auto">
                {servicesList[0]?.map((category) => (
                  <div className="max-w-screen-xl px-4 mx-auto">
                    <div className="flex flex-col w-full p-1 mt-3 ">
                      <div className="text-center p-4 w-full bg-[#25a267] text-white border-b-[1px] rounded-sm">
                        {" "}
                        <h1 className="font-serif text-2xl " key={category}>
                          {category?.category_name}
                        </h1>
                      </div>
                      <div className="flex items-start justify-start px-0 py-3 space-x-4">
                        {category?.children[0].map((child) => (
                          <Link
                            to={`/category/basic/services/${child._id}/${child.category_name}`}
                            className="flex items-center justify-center px-5 py-2 border duration-700 border-[#25a267] hover:bg-[#25a267] hover:text-white rounded-md"
                          >
                            <div className="flex items-center justify-center space-x-2">
                              <AcUnitIcon className="" />
                              <span>{child?.category_name}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {category?.children[1]
                        // .filter((service) => service.category === category)
                        .map((service) => (
                          <div
                            class={`${
                              cart.some(
                                (item) => item._id === service?.ele?._id
                              )
                                ? "border p-0 mt-3 opacity-45 rounded-md shadow-lg"
                                : ""
                            }`}
                          >
                            {cart.some(
                              (item) => item._id === service?.ele?._id
                            ) && (
                              <div
                                style={{
                                  color: "red",
                                  cursor: "pointer",
                                  backgroundColor: "white",
                                  width: "10%",
                                  borderBottomRightRadius: "20%",
                                  textAlign: "center",
                                }}
                                onClick={() => deleteHandler(service.ele)}
                              >
                                <span>x</span>
                              </div>
                            )}
                            <div class="flex rounded-md h-full bg-transparent p-3 flex-col border-[0.3px] border-green-400 shadow-lg hover:shadow-xl hover:shadow-green-200 duration-400">
                              <Link
                                to={
                                  Localhost +
                                  `/images/services/${service.ele.image}`
                                }
                              >
                                <div className="flex overflow-hidden transition-all rounded-md">
                                  <img
                                    src={
                                      Localhost +
                                      `/images/services/${service.ele.image}`
                                    }
                                    alt="product image"
                                    className="transition-all max-h-[200px] bg-cover w-full duration-1000 ease-linear rounded-md hover:scale-110"
                                  />
                                </div>
                              </Link>
                              <div class="flex items-center my-2">
                                <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-[#25a267] bg-[#25a267] text-white flex-shrink-0">
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
                                <h2 class="text-lg font-medium truncate">
                                  {service.ele.name}
                                </h2>
                              </div>
                              <div class="flex flex-col justify-between flex-grow">
                                <p class="leading-relaxed text-base text-gray-500 line-clamp-2">
                                  {service.ele.description.substring(0, 90)}
                                </p>
                                <div className="flex justify-between w-full space-x-4">
                                  <Link
                                    to={`/service/details/${service.ele._id}`}
                                    className="inline-flex items-center justify-center w-full p-2 mt-3 text-gray-500 transition-all ease-linear border border-[#25a267] rounded-sm hover:bg-[#25a267] hover:text-white duration-700 font-bold"
                                  >
                                    View Details
                                  </Link>
                                  <button
                                    onClick={() =>
                                      handleBookService(service.ele)
                                    }
                                    className="inline-flex items-center justify-center w-full p-2 mt-3 text-gray-500 transition-all ease-linear border border-[#25a267] rounded-sm hover:bg-[#25a267] hover:text-white duration-700 font-bold"
                                  >
                                    {cart.some(
                                      (item) => item._id === service.ele._id
                                    )
                                      ? "Service Booked"
                                      : "Book Service"}
                                  </button>
                                </div>
                                <div className="w-full"></div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                    <div>
                      {cart.length > 0 ? (
                        <button
                          onClick={handleYourService}
                          type="button"
                          class="fixed left-[49%] top-[100px]   md:top-[55%] md:left-[86%] inline-flex items-center px-5 py-3 text- font-serif text-center text-white bg-[#25a267] border rounded-md hover:bg-blue-800 focus:outline-none"
                        >
                          <span class="sr-only">Notifications</span>
                          Add To Service
                          <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 ">
                            {cart.length}
                          </div>
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default GetService;
