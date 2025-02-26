import React, { useEffect, useState } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import ApprovalIcon from "@mui/icons-material/Approval";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import HomeIcon from "@mui/icons-material/Home";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Localhost } from "../../action/host/HostConnection";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import WorkerProfile from "../../components/workerprofile/WorkerProfile";
import { getSingleWorkerAction } from "../../action/auth_admin/AdminMaintainAction";
import { UserlogoutAction } from "../../action/auth_user/UserAction";
import LogoutIcon from "@mui/icons-material/Logout";
import WorkerServices from "../../components/workerprofile/WorkerServices";
import WorkerBooking from "../../components/workerprofile/WorkerBooking";
import ClientLodder from "../../components/lodder/ClientLodder";
const WorkerDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [menuOpen, setMenuOpen] = useState(true);

  const { singleworker } = useSelector(
    (state) => state.sigleWorkerState
  );
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleWorkerAction(id));
  }, [dispatch, id]);

  ///logout method
  const logoutHandler = () => {
    dispatch(UserlogoutAction());
  };

  return (
    <>
      <Header />
      <div className="min-h-screen overflow-hidden bg-white">
        <div className="flex flex-col max-w-screen-xl py-2 mx-auto md:py-24 md:flex-row ">
          <nav
            className={`flex flex-col mt-20 md:pt-0 bg-white w-full md:w-64 h-auto md:h-screen px-4 text-gray-900 shadow-lg rounded-md md:mt-[20px] ${
              menuOpen ? "block" : "hidden"
            }  md:block `}
          >
            {singleworker?.worker?.avatar ? (
              <div className="flex flex-col items-center justify-center mt-12">
                <img
                  src={
                    Localhost +
                    `/images/avatars/${singleworker?.worker?.avatar}`
                  }
                  className="w-20 h-20 border  mx-auto rounded-full"
                  alt="Client"
                />
                <span className="mt-2 text-xl font-semibold text-white">
                  {singleworker?.worker?.username}
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center mt-12">
                <img
                  src="https://www.pngarts.com/files/3/Avatar-PNG-Download-Image.png"
                  className="w-20 border h-20 mx-auto rounded-full"
                  alt="Client"
                />
                <span className="mt-2 text-xl font-semibold text-green-400">
                  {singleworker?.worker?.username ||
                    singleworker?.worker?.phone_or_email}
                </span>
              </div>
            )}
            <h1 className="text-[32px] font-bold ml-4 text-orange-500">
              Dashboard
            </h1>
            <div className="mt-2 mb-4">
              <ul className="ml-4">
                <li
                  className="flex items-center hover:border border transform px-4 py-2 mb-2 text-blue-400 border-gray-300 rounded-lg cursor-pointer hover:text-black hover:hover:bg-white hover:font-bold"
                  onClick={() => {
                    setActiveTab("profile");
                    setMenuOpen(true);
                  }}
                >
                  <HomeIcon />
                  <Link to={`/profile/worker/my/manpower/${id}`}>
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

                <li
                  className="flex items-center hover:border border transform px-4 py-2 mb-2 text-blue-400 border-gray-300 rounded-lg cursor-pointer hover:text-black hover:hover:bg-white hover:font-bold"
                  onClick={() => {
                    setActiveTab("services");
                    setMenuOpen(false);
                  }}
                >
                  <CleaningServicesIcon />
                  <Link>
                    <span className="ml-2">Services</span>
                  </Link>
                </li>

                <li
                  onClick={() => {
                    setActiveTab("bookings");
                    setMenuOpen(false);
                  }}
                  className="flex items-center hover:border border transform px-4 py-2 mb-2 text-blue-400 border-gray-300 rounded-lg cursor-pointer hover:text-black hover:hover:bg-white hover:font-bold"
                >
                  <AddShoppingCartIcon />
                  <Link>
                    <span className="ml-2">Bookings</span>
                  </Link>
                </li>
                {/* {clientInfo?.user?._id == id && ( */}

                <li className="flex items-center hover:border border transform px-4 py-2 mb-2 text-blue-400 border-gray-300 rounded-lg cursor-pointer hover:text-black hover:hover:bg-white hover:font-bold">
                  <ApprovalIcon />
                  <Link to="/apply/worker/my/manpower">
                    {" "}
                    <span className="ml-2">Apply Worker</span>
                  </Link>
                </li>
                {/* )} */}
                {singleworker?.worker?.user?._id == id && (
                  <li
                    className="flex items-center hover:border border transform px-4 py-2 mb-2 text-blue-400 border-gray-300 rounded-lg cursor-pointer hover:text-black hover:hover:bg-white hover:font-bold"
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
              <>
                <div className={`flex md:mt-0 ${menuOpen ? "-mt-14" : ""}`}>
                  {activeTab === "profile" && (
                    <WorkerProfile workerId={singleworker?.worker?.user?._id} />
                  )}
                </div>
                <div
                  className={`flex mt-16 md:mt-0 ${menuOpen ? "mt-14" : ""}`}
                >
                  {activeTab === "services" && (
                    <WorkerServices
                      setActiveTab={setActiveTab}
                      setMenuOpen={setMenuOpen}
                    />
                  )}
                </div>
                <div
                  className={`flex mt-16 md:mt-0 ${menuOpen ? "mt-14" : ""}`}
                >
                  {activeTab === "bookings" && (
                    <WorkerBooking
                      workerId={singleworker?.worker?.user?._id}
                      setActiveTab={setActiveTab}
                      setMenuOpen={setMenuOpen}
                    />
                  )}
                </div>
              </>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WorkerDashboard;
