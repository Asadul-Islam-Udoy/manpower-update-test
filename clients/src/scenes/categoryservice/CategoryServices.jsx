import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { StoreBookingCardAction } from "../../action/auth_user/ServicesBookingCartAction";
import {
  getCategoryServiceAction,
  getParentServiceCategoryAction,
} from "../../action/auth_user/ServicesAction";
import { Localhost } from "../../action/host/HostConnection";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Lodder from "../../components/lodder/Lodder";
import PreviewIcon from "@mui/icons-material/Preview";
import { motion } from "framer-motion";
const CategoryService = () => {
  const { id } = useParams();
  const { name } = useParams();
  const { lodding, error, ServiceCategoryservicesList } = useSelector(
    (state) => state.serviceCategoryState
  );
  const { CategoryservicesList } = useSelector(
    (state) => state.serviceCategoryState
  );
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [gender, setGender] = useState("");
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
    navigate("/worker/list");
  };

  useEffect(() => {
    dispatch(getCategoryServiceAction(id));
  }, [dispatch, id]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  useEffect(() => {
    dispatch(getParentServiceCategoryAction());
  }, [dispatch]);
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
      {lodding ? (
        <Lodder />
      ) : (
        <div
          style={{ backgroundColor: "#436da7ss" }}
          className="min-h-[300px] overflow-hidden bg-[#edf3ff]"
        >
          {" "}
          <div className="flex items-center flex-col justify-center  w-[100%] mt-20 ">
            <div className="flex flex-col items-center justify-center py-3 mt-7">
              <h1 className="md:text-5xl text-4xl text-center p-2 text-[#25a267] font-serif">
                Our Suite of Services Solutions
              </h1>
              <p className=" block w-[75%] text-center text-gray-400">
                Our comprehensive family of brands address the complex workforce
                challenges organizations face today, from contingent and
                permanent staffing to talent management, outsourcing, and talent
                development. We deliver the solutions that drive your business
                forward.
              </p>
            </div>
          </div>
          <div className=" p-4 bg-white"></div>
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
          {ServiceCategoryservicesList?.length > 0 ? (
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
                    <h3 className="p-1 text-black  font-bold">
                      Search By Job Id
                    </h3>
                    <input className="p-2 border border-orange-400 outline-none w-full" />
                  </div>
                  <div className="mt-3 w-full pb-1 ">
                    <h3 className="p-1 text-black  font-bold">
                      Search By Job Name
                    </h3>
                    <input className="p-2 border border-orange-400 outline-none w-full" />
                  </div>
                  <div className="mt-3 w-full pb-1 ">
                    <h3 className="pb-2 text-black font-bold ">
                      Search By Category
                    </h3>
                    <div className="pb-2 ml-1">
                      <fieldset className="flex gap-7 mt-2 flex-col ml-1">
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
              <div className="col-span-4 h-[100vh] overflow-x-auto ">
                {ServiceCategoryservicesList !== undefined ? (
                  <>
                    <div className="max-w-screen-xl px-4 mx-auto">
                      <div className="flex flex-col w-full p-1 mt-3 ">
                        {" "}
                        <div className="text-center p-4 w-full bg-[#25a267] text-white border-b-[1px] rounded-sm">
                          <h1 className="font-serif text-2xl " key={name}>
                            {name}
                          </h1>
                        </div>
                      </div>

                      <div>
                        <div class="grid grid-cols-1 m-3 md:grid-cols-4 gap-4">
                          {ServiceCategoryservicesList.map((service) => (
                            <div
                              class={`${
                                cart.some((item) => item._id === service?._id)
                                  ? "border p-0 mt-3 opacity-45 rounded-md shadow-lg"
                                  : ""
                              }`}
                            >
                              {cart.some(
                                (item) => item._id === service?._id
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
                                  onClick={() => deleteHandler(service)}
                                >
                                  <span>x</span>
                                </div>
                              )}
                              <div class="flex rounded-md h-full p-2 flex-col border-[0.3px] border-blue-400 text-gray-800 shadow-lg hover:shadow-xl hover:shadow-green-200 duration-400">
                                <Link
                                  to={
                                    Localhost +
                                    `/images/services/${service.image}`
                                  }
                                >
                                  <div className="flex overflow-hidden transition-all rounded-md">
                                    <img
                                      src={
                                        Localhost +
                                        `/images/services/${service.image}`
                                      }
                                      alt="product image"
                                      className="transition-all max-h-[200px] bg-cover w-full duration-1000 ease-linear rounded-md hover:scale-110"
                                    />
                                  </div>
                                </Link>
                                <div class="flex items-center my-2">
                                  <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full  bg-[#25a267] text-white flex-shrink-0">
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
                                    {service.name}
                                  </h2>
                                </div>

                                <div class="flex flex-col justify-between flex-grow">
                                  <p class="leading-relaxed text-base text-gray-500 line-clamp-2">
                                    {service.description.substring(0, 90)}
                                  </p>
                                  <div className="flex justify-between w-full py-0 space-x-4">
                                    <Link
                                      to={`/service/details/${service?._id}`}
                                      className="inline-flex items-center justify-center w-full p-2 mt-3 text-gray-500 transition-all ease-linear border border-[#25a267] rounded-sm hover:bg-[#25a267] hover:text-white duration-700 font-bold"
                                    >
                                      View Details
                                    </Link>
                                    <button
                                      onClick={() => handleBookService(service)}
                                      class="inline-flex items-center justify-center w-full p-2 mt-3 text-gray-500 transition-all ease-linear border border-[#25a267] rounded-sm hover:bg-[#25a267] hover:text-white duration-700 font-bold"
                                    >
                                      {cart.some(
                                        (item) => item._id === service?._id
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
                              <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                                {cart.length}
                              </div>
                            </button>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div>
                    <h1 className="pb-64 text-5xl font-bold text-center text-red-700">
                      Empty
                    </h1>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-48 bg-white-300">
              <h1 className="pb-3 text-5xl font-bold text-center text-red-700">
                Empty
              </h1>
              <button
                onClick={() => navigate(-1)}
                className="p-2 pl-8 pr-8 bg-gray-300 rounded-sm hover:bg-red-200"
              >
                <ArrowBackIcon style={{ fontSize: "12px" }} />
                back
              </button>
            </div>
          )}
        </div>
      )}

      <Footer />
    </>
  );
};

export default CategoryService;
