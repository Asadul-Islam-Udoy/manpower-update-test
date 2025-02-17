import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  toast } from "react-toastify";
import {
  GetSingleResumeAction,
  WorkerApplyCreateAction,
  WorkerRefreshAction,
} from "../../action/auth_user/UserAction";
import { Localhost } from "../../action/host/HostConnection";
import LodderFrom from "../../components/lodder/LodderFrom";
import AddTaskIcon from '@mui/icons-material/AddTask';
const WorkerApply = () => {
  const navigate = useNavigate();
  const {lodding, error, isapply, getsingleapplyresume } = useSelector(
    (state) => state.workerResumeApplyState
  );
  const [showPdf, setShowPdf] = useState(false);
  const [name, setName] = useState(getsingleapplyresume?.name);
  const [address, setAddress] = useState(getsingleapplyresume?.address);
  const [description, setDescription] = useState(
    getsingleapplyresume?.description
  );
  const [phone, setPhone] = useState(getsingleapplyresume?.phone);
  const [resume, setResume] = useState("");
  const dispatch = useDispatch();
  const {
    error: userError,
    lodding: userLodding,
    clientInfo,
  } = useSelector((state) => state.userLoginState);

  const handleSubmit = (e) => {
    e.preventDefault();
    const myfrom = new FormData();
    myfrom.set("name", name);
    myfrom.set("phone", phone);
    myfrom.set("address", address);
    myfrom.set("description", description);
    myfrom.set("userId", clientInfo?.user?._id);
    if (resume) {
      myfrom.set("resume", resume);
    }
    dispatch(WorkerApplyCreateAction(myfrom));
  };

  const handleCloseModal = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (isapply) {
      toast.success("apply successfully!");
      navigate(`/profile/worker/my/manpower/${clientInfo?.user?._id}`);
      setName('')
      setAddress('')
      setPhone('')
      setDescription('')
    }
    dispatch(WorkerRefreshAction());
  }, [dispatch, error, alert, isapply, clientInfo?.user?._id]);

  useEffect(() => {
    dispatch(GetSingleResumeAction(clientInfo?.user?._id));
  }, [dispatch, clientInfo?.user?._id]);

  useEffect(() => {
    setName(getsingleapplyresume?.name);
    setDescription(getsingleapplyresume?.description);
    setAddress(getsingleapplyresume?.address);
    setPhone(getsingleapplyresume?.phone);
    setResume(getsingleapplyresume?.resume);
  }, [getsingleapplyresume]);
  return (
    <>
    {!getsingleapplyresume ? 
    <div className="py-10  md:pt-36 md:pb-20 md:mt-0 flex justify-center items-center fixed left-0 top-0 z-[1055] bg-blue-100 bg-opacity-65 h-full w-full overflow-y-auto overflow-x-hidden scrollbar  scrollbar-thumb-gray-500 scrollbar-track-gray-300 outline-none">
      <div className="bg-white shadow-2xl md:mt-0 mt-10 md:overflow-hidden  h-[750px] rounded-xl p-8 w-full md:w-3/4 lg:w-1/2">
        <div className="flex  justify-between items-center">
          <h1 className="text-3xl font-serif font-extrabold text-gray-800 mb-4">
            Application From
          </h1>
          <button onClick={handleCloseModal} className="text-3xl text-red-600">
            <MdClose />
          </button>
        </div>
        <p className="text-gray-500 mb-8">
          Fill out the form below to create your apply.
        </p>
        <form onSubmit={handleSubmit}>
          {/* User Name */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="username">
              Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              required
              id="userName"
              name="username"
              value={name}
              className="w-full p-4 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>
          <div className=" mb-6">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="address">
                Phone Number
              </label>
              <input
                onChange={(e) => setPhone(e.target.value)}
                type="text"
                id="phone"
                required
                name="phone"
                value={phone}
                className="w-full text-black p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your phone"
              />
            </div>
          </div>

          {/* Area and Address */}
          <div className=" mb-6">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="address">
                Address
              </label>
              <input
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                id="address"
                required
                name="address"
                value={address}
                className="w-full text-black p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your address"
              />
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full text-black p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your description"
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="address">
              Resume
            </label>
            <div className=" relative flex">
              <img
                onClick={() => setShowPdf((pre) => !pre)}
                className="h-14 w-14 cursor-pointer"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png"
              />
              <input
                type="file"
                id="resume"
                required
                name="resume"
                onChange={(e) => setResume(e.target.files[0])}
                className="w-full text-black p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your resume"
              />
            </div>
          </div>
          {/* Save Button */}
          <div>
            {lodding ? (
              <LodderFrom text='Sending'/>
            ) : (
              <button
                type="submit"
                className="w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                SEND
              </button>
            )}
          </div>
        </form>
        {showPdf && (
          <div className=" h-[100vh] mt-5 w-full  ">
            {getsingleapplyresume?.resume && (
              <iframe
                src={
                  Localhost +
                  `/images/workerresume/${getsingleapplyresume?.resume}`
                }
                title="PDF Viewer"
                className=" h-[100vh] w-full  "
                style={{ border: "none" }}
              ></iframe>
            )}
          </div>
        )}
      </div>
    </div>
    :
     <div onClick={()=>navigate(-1)} className="h-screen flex items-center justify-center cursor-pointer text-blue-600 w-full bg-white">
        <div className=" flex items-center flex-col justify-center border h-48 md:w-96 border-orange-300 rounded-md shadow-sm w-[90%]">
          <AddTaskIcon style={{color:'tomato'}}/> 
          <h1 className=" border-b border-blue-400 italic">Your resume submitted</h1>
        </div> 
    </div>
  }
  </>
  );
};

export default WorkerApply;
