import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, NavLink, useNavigate } from "react-router-dom";
import CategoryDropdown from "../categorydropdown/CategoryDropdown";
import { getParentServiceCategoryAction } from "../../action/auth_user/ServicesAction";
import { useDispatch, useSelector } from "react-redux";
// import YoutubeSearchedForIcon from "@mui/icons-material/YoutubeSearchedFor";
import ProfileDropdown from "./ProfileDropdown";
import { toast } from "react-toastify";
import { Localhost } from "../../action/host/HostConnection";
// import { UserlogoutAction } from "../../action/auth_user/UserAction";

const Header = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  // const [keyword, setKeyWord] = useState("");
  // const [dropdwon, setDropdown] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const { lodding, error, CategoryservicesList } = useSelector(
    (state) => state.serviceCategoryState
  );

  const {
    error: userError,
    lodding: userLodding,
    isLogout,
    clientInfo,
  } = useSelector((state) => state.userLoginState);

  useEffect(() => {
    if (userError) {
      toast.error(userError);
    }
    if (isLogout) {
      navigate("/");
    }
    dispatch(getParentServiceCategoryAction());
  }, [dispatch, userError, error, isLogout, navigate, toast]);

  //logout method
  // const logoutHandler = () => {
  //   dispatch(UserlogoutAction());
  //   navigate("/");
  // };




  return (
    <div>
      <nav className="fixed top-0 left-0 right-0 z-50 ">
        <div className="w-full bg-white">
          <div className="flex flex-wrap items-center justify-between w-full max-w-screen-xl px-3 py-3 mx-auto md:w-full mt-100">
            <Link
              to={"/"}
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img
                src={`${Localhost}/images/logo/manpower_name_logo.png`}
                className="h-8"
                alt="logo"
              />
            </Link>
            <div className="flex space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">

            <Link
                  to={
                    clientInfo?.user?.userType == "worker"
                      ? `/apply/worker/my/manpower`
                      : `/login/worker`
                  }
                  className="font-serif text-[#25a267] font-bold duration-75 text-lg cursor-pointer"
                >
                  Apply Workers
                </Link>
                
              <>
                {!clientInfo?.user ? (
                  <div class="flex items-center gap-10 justify-center">
                    {/* {!isSidebarOpen && (
                      <Link
                        to="/login"
                        class="rounded-full -mt-[2px] px-3.5 py-[6px] m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-[#25a267] t text-white"
                      >
                        <span class="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-[#25a267] top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                        <span class="relative  text-[#25a267] transition duration-300 group-hover:text-white ease font-bold">
                          Sign In
                        </span>
                      </Link>
                    )} */}
                  </div>
                ) : (
                  <div>
                    {/* <ProfileDropdown clientInfo={clientInfo} /> */}
                  </div>
                )}
              </>
            
            </div>
              
          </div>
        </div>

        <div className="w-full py-1 pt-2" style={{ background: 'linear-gradient(to right, #1f541e 5%, #523a0c, #bb2a1d)', borderBottom:' 6px solid #463014'}}>
          <div className="flex flex-wrap items-center justify-between w-full max-w-screen-xl p-3 !pt-0 mx-auto md:p-4 sm:pt-0 md:w-full mt-100 md:pb-0">
            
            <div className="flex space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
              <>
                {!clientInfo?.user ? (
                  <div class="flex items-center gap-10 justify-center">
                    {!isSidebarOpen && (
                      <Link
                        to="/login"
                        class="rounded-full uppercase px-3.5 overflow-hidden relative group cursor-pointer"
                      >
                        <span class="absolute transition-all duration-300 origin-center rotate-45 -translate-x-20 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                        <span class="relative transition duration-300 tracking-wide group-hover:text-white ease">
                        Sign In / Register
                        </span>
                      </Link>
                    )}
                  </div>
                ) : (
                  <div>
                    <ProfileDropdown clientInfo={clientInfo} />
                  </div>
                )}
              </>
              <button
                onClick={toggleSidebar}
                type="button"
                className="inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-cta"
                aria-expanded={isSidebarOpen ? "true" : "false"}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
            </div>

            <div
              className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
              id="navbar-cta"
            >
              <ul className="flex flex-col p-4 mt-4 uppercase rounded-lg md:p-0 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-transparent md:dark:bg-transparent dark:border-gray-700">
                <li className="tracking-wide duration-75 border-gray-300 ">
                  <NavLink
                    
                    // href="#"
                    to={"/"}
                    aria-current="page"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="tracking-wide duration-75 border-gray-300 ">
                  <NavLink
                    to={"/about"}
                    
                  >
                    About
                  </NavLink>
                </li>
                <li className="tracking-wide duration-75 border-gray-300 ">
                  <NavLink
                    to={"/all/services"}
                    
                  >
                    Service
                  </NavLink>
                </li>
                <li className="tracking-wide duration-75 border-gray-300 ">
                  <NavLink
                    to={"/contract"}
                    href="#"
                    
                  >
                    Contact
                  </NavLink>
                </li>
                <li className="tracking-wide duration-75 border-gray-300 ">
                  <CategoryDropdown
                    CategoryservicesList={CategoryservicesList}
                  />
                </li>
                
              </ul>
            </div>
             
            
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isSidebarOpen ? 0 : "-100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed inset-y-0 left-0 z-50 w-72  bg-white text-black shadow-lg"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <img
            src={`${Localhost}/images/logo/manpower_name_logo.png`}
            className="object-cover h-8"
            alt=""
          />

          <button
            onClick={toggleSidebar}
            className="text-gray-500 hover:text-green-600 focus:outline-none"
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
        <div className="relative mt-4 mb-0 md:hidden md:w-80">
          <Link
            to={
              clientInfo?.user?.userType == "worker"
                ? `/apply/worker/my/manpower`
                : `/login/worker`
            }
            className="flex items-center justify-center px-2 py-2 font-serif italic text-gray-500 list-none duration-75 border border-green-500 rounded-full shadow-lg cursor-pointer hover:text-orange-600 hover:border-orange-500"
          >
            Apply Workers
          </Link>
        </div>
        <ul className="p-4 space-y-4">
          <li className="text-gray-500 duration-75 hover:border-gray-700">
            <CategoryDropdown CategoryservicesList={CategoryservicesList} />
          </li>
          <li className="duration-75  border-gray-500 hover:border-b-2">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "block py-2 px-3 md:p-0 text-[#25a267] font-extrabold"
                  : "block py-2 px-3 md:p-0 text-gray-500"
              }
              to={"/"}
              aria-current="page"
            >
              Home
            </NavLink>
          </li>
          <li className="duration-75 border-gray-500 hover:border-b-2">
            <NavLink
              to={"/about"}
              className={({ isActive }) =>
                isActive
                  ? "block py-2 px-3 md:p-0 text-[#25a267] font-extrabold"
                  : "block py-2 px-3 md:p-0 text-gray-500"
              }
            >
              About
            </NavLink>
          </li>
          <li className="duration-75 border-gray-500 hover:border-b-2">
            <NavLink
              to={"/all/services"}
              className={({ isActive }) =>
                isActive
                  ? "block py-2 px-3 md:p-0 text-[#25a267] font-extrabold"
                  : "block py-2 px-3 md:p-0 text-gray-500"
              }
            >
              Service
            </NavLink>
          </li>
          <li className="duration-75 border-gray-500 hover:border-b-2">
            <NavLink
              to={"/contract"}
              href="#"
              className={({ isActive }) =>
                isActive
                  ? "block py-2 px-3 md:p-0 text-[#25a267] font-extrabold"
                  : "block py-2 px-3 md:p-0 text-gray-500"
              }
            >
              Contact
            </NavLink>
          </li>
          <div className="flex space-x-3 md:hidden md:order-2 md:space-x-0 rtl:space-x-reverse">
            <>
              {!clientInfo?.user ? (
                <div class="flex items-center gap-10 justify-center">
                  <Link
                    to="/login"
                    class="rounded-full -mt-[2px] px-3.5 py-[6px] m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-[#25a267] t text-white"
                  >
                    <span class="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-[#25a267] top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                    <span class="relative text-[#25a267] transition duration-300 group-hover:text-white ease">
                      Sing In
                    </span>
                  </Link>
                </div>
              ) : (
                <div>
                  <ProfileDropdown clientInfo={clientInfo} />
                </div>
              )}
            </>
          </div>
        </ul>
      </motion.div>

      {/* Overlay to close sidebar when clicked outside */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 z-40 bg-black opacity-50"
        />
      )}

      {/* homepage */}
      {/* <Home /> */}
    </div>
  );
};

export default Header;
