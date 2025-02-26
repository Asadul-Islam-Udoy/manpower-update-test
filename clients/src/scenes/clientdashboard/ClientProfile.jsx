import React, { useEffect, useState } from "react";
import { BsBagCheck } from "react-icons/bs";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import ClientOrder from "../../components/clientprofile/ClientOrder";
import ClientProfile from "../../components/clientprofile/ClientProfile";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import HomeIcon from "@mui/icons-material/Home";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Localhost } from "../../action/host/HostConnection";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import { getUserAllOwnNotificationAction } from "../../action/auth_admin/NotificationAction";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationClientModal from "../../components/modal/NotificationClientModal";
import { UserlogoutAction } from "../../action/auth_user/UserAction";
const ClientDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [showNotification, setShowNotification] = useState(false);
  const [menuOpen, setMenuOpen] = useState(true);
  const dispatch = useDispatch();
  const { clientInfo, clientProfile } = useSelector(
    (state) => state.userLoginState
  );
  const { allnotification } = useSelector((state) => state.notificationState);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getUserAllOwnNotificationAction());
  }, [dispatch]);

  ///logout method
  const logoutHandler = () => {
    dispatch(UserlogoutAction());
  };

  return (
    <>
      <Header />
      {showNotification && (
        <NotificationClientModal
          newNotifications={allnotification?.newNotifiactions}
          seenNotications={allnotification?.seenNotifications}
        />
      )}
      <div className="min-h-screen overflow-hidden bg-white">
        <div className="flex flex-col max-w-screen-xl py-2 mx-auto md:py-24 md:flex-row ">
          <nav
            className={`flex flex-col mt-20 py-12 md:pt-0 bg-white w-full md:w-64 h-auto md:h-screen px-4 text-gray-900 border  shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset] rounded-md md:mt-[20px] ${
              menuOpen ? "block" : "hidden"
            }  md:block `}
          >
            {clientProfile?.avatar ? (
              <div className="flex flex-col items-center justify-center mt-8">
                <img
                  src={Localhost + `/images/avatars/${clientProfile?.avatar}`}
                  className="w-20 h-20 mx-auto rounded-full border"
                  alt="Client"
                />
                <span className="mt-2 text-md font-sans text-black">
                  {clientProfile?.username || clientProfile?.phone_or_email}
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center mt-8">
                <img
                  src="https://www.pngarts.com/files/3/Avatar-PNG-Download-Image.png"
                  className="w-20 h-20 mx-auto rounded-full"
                  alt="Client"
                />
                <span className="mt-2 text-xl  border font-semibold text-green-400">
                  {clientProfile?.username || clientProfile?.phone_or_email}
                </span>
              </div>
            )}
            <h1 className="text-[32px] font-bold ml-4 text-orange-500">
              Dashboard
            </h1>
            <div className="mt-3 mb-4">
              <ul className="ml-4">
                <li
                  className="flex items-center hover:border border transform px-4 py-2 mb-2 text-gray-400 border-gray-300 rounded-lg cursor-pointer hover:text-black hover:bg-white hover:font-bold"
                  onClick={() => {
                    setActiveTab("profile");
                    setMenuOpen(false);
                  }}
                >
                  <HomeIcon />
                  <Link to={`/user/profile/${clientProfile?.user?._id}`}>
                    <span className="ml-2">Home</span>
                  </Link>
                </li>
                <li
                  className="flex items-center hover:border border transform px-4 py-2 mb-2 text-blue-400 border-gray-300 rounded-lg cursor-pointer hover:text-black hover:hover:bg-white hover:font-bold"
                  onClick={logoutHandler}
                >
                  <LogoutIcon />
                  <Link>
                    <span className="ml-2">Logout</span>
                  </Link>
                </li>
                {/* {clientInfo?.user?._id == id && ( */}
                <li
                  className="flex items-center hover:border border transform px-4 py-2 mb-2 text-blue-400 border-gray-300 rounded-lg cursor-pointer hover:text-black hover:hover:bg-white hover:font-bold"
                  onClick={() => {
                    setActiveTab("order");
                    setMenuOpen(false);
                  }}
                >
                  <BsBagCheck />
                  <span className="ml-4">My Order</span>
                </li>
                <li
                  onClick={() => setShowNotification((pre) => !pre)}
                  className="flex items-center  hover:border border transform px-4 py-2 mb-2 text-blue-400 border-gray-300 rounded-lg cursor-pointer hover:text-black hover:bg-white hover:font-bold"
                >
                  <div className="">
                    {allnotification?.newNotifiactions?.length > 0 && (
                      <>
                        {allnotification?.newNotifiactions?.length < 10 ? (
                          <span className="bg-red-600 flex text-[7px] justify-center items-center -mt-[2px] translate-x-1 text-white h-[11px] w-[11px] rounded-full absolute">
                            {allnotification?.newNotifiactions?.length}
                          </span>
                        ) : (
                          <span className="bg-red-600 flex text-[7px] justify-center items-center -mt-[2px] translate-x-1 text-white h-[11px] w-[11px] rounded-full absolute">
                            9<sup>+</sup>
                          </span>
                        )}
                      </>
                    )}
                    <CircleNotificationsIcon />
                  </div>
                  <p>
                    <span className="">Notification</span>
                  </p>
                </li>
                {/* )} */}
                {clientInfo?.user?._id == id && (
                  <li
                    className="flex items-center px-4 hover:border border transform py-2 mb-2 text-blue-400 border-gray-300 rounded-lg cursor-pointer hover:text-black hover:bg-white hover:font-bold"
                    onClick={() => {
                      setActiveTab("profile");
                      setMenuOpen(false);
                    }}
                  >
                    <ConnectWithoutContactIcon />
                    <Link to="/user/helps">
                      <span className="ml-2">Helps</span>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </nav>

          <div className="flex-1">
            <div className={`flex-1 md:mt-0 ${menuOpen ? "-mt-14" : ""}`}>
              {activeTab === "profile" && <ClientProfile />}
            </div>
            <div className={`flex-1 mt-16 md:mt-0 ${menuOpen ? "mt-14" : ""}`}>
              {activeTab === "order" &&
                clientInfo?.user?.userType == "client" && (
                  <ClientOrder
                    setActiveTab={setActiveTab}
                    setMenuOpen={setMenuOpen}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ClientDashboard;
