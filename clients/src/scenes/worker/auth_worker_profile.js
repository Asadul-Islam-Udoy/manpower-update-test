import React, { useEffect, useState } from "react";
import { BsBagCheck } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import ClientOrder from "../../components/clientprofile/ClientOrder";
import ApprovalIcon from '@mui/icons-material/Approval';
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import HomeIcon from "@mui/icons-material/Home";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Localhost } from "../../action/host/HostConnection";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import WorkerProfile from "../../components/workerprofile/WorkerProfile";
import { getSingleWorkerAction } from "../../action/auth_admin/AdminMaintainAction";
const WorkerDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [menuOpen, setMenuOpen] = useState(true)

  const { singleworker } = useSelector((state) => state.sigleWorkerState);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleWorkerAction(id));
  }, [dispatch, id]);

  return (
    <>
      <Header />
      <div className="min-h-screen overflow-hidden bg-gray-200">
        <div className="flex flex-col max-w-screen-xl py-2 mx-auto md:py-24 md:flex-row ">
          <nav
            className={`flex flex-col mt-20 md:pt-0 bg-white w-full md:w-64 h-auto md:h-screen px-4 text-gray-900 shadow-lg rounded-md md:mt-[20px] ${
              menuOpen ? "block" : "hidden"
            }  md:block `}
          >
            {singleworker?.worker?.avatar ? (
              <div className="flex flex-col items-center justify-center mt-8">
                <img
                  src={Localhost + `/images/avatars/${singleworker?.worker?.avatar}`}
                  className="w-20 h-20 mx-auto rounded-full"
                  alt="Client"
                />
                <span className="mt-2 text-xl font-semibold text-white">
                  {singleworker?.worker?.username}
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center mt-8">
                <img
                  src="https://www.kaartech.com/wp-content/uploads/2023/05/hw_client-img.png"
                  className="w-20 h-20 mx-auto rounded-full"
                  alt="Client"
                />
                <span className="mt-2 text-xl font-semibold text-green-400">
                  {singleworker?.worker?.username || singleworker?.worker?.phone_or_email}
                </span>
              </div>
            )}

            <div className="mt-10 mb-4">
              <ul className="ml-4">
                <li
                  className="flex items-center px-4 py-4 mb-2 text-gray-400 border-gray-300 rounded-lg cursor-pointer hover:text-black hover:bg-white hover:font-bold"
                  onClick={() => {
                    setActiveTab("profile");
                    setMenuOpen(false);
                  }}
                >
                  <HomeIcon />
                  <Link to="/">
                    <span className="ml-2">Home</span>
                  </Link>
                </li>
                {/* {clientInfo?.user?._id == id && ( */}

                  <li
                    className="flex items-center px-4 py-4 mb-2 text-blue-400 border-gray-300 rounded-lg cursor-pointer hover:text-black hover:hover:bg-white hover:font-bold"
                  >
                    <ApprovalIcon />
                   <Link to='/apply/worker/my/manpower'> <span className="ml-2">Apply Worker</span></Link>
                  </li>
                {/* )} */}
                {singleworker?.worker?.user?._id == id && (
                  <li
                    className="flex items-center px-4 py-4 mb-2 text-blue-400 border-gray-300 rounded-lg cursor-pointer hover:text-black hover:bg-white hover:font-bold"
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

          {/* <button
            className="md:hidden mt-20 fixed bg-[#a2b341]  text-white px-4 py-2 rounded-md  mx-auto"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <IoSettings className="animate-spin" />
            ) : (
              <IoSettings className="animate-spin" />
            )}
          </button> */}

          <div className="flex-1">
      
            <div className={`flex-1 md:mt-0 ${menuOpen ? "-mt-14" : ""}`}>
              {activeTab === "profile" && <WorkerProfile  workerId={singleworker?.worker?.user?._id}/>}
            </div>
            <div className={`flex-1 mt-16 md:mt-0 ${menuOpen ? "mt-14" : ""}`}>
              {/* {activeTab === "order" && <ClientOrder />} */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WorkerDashboard;
