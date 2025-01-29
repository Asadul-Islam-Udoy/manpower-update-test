import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import ReplyIcon from "@mui/icons-material/Reply";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  UserSignUpOtpAction,
  UserRefreshAction,
  OtpCountSecurityAction,
  UserForgetPasswordRequestAction,
} from "../../action/auth_user/UserAction";
import { Localhost } from "../../action/host/HostConnection";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
import Lodder from "../../components/lodder/Lodder";
function UserOtp() {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const { emailorphone } = useParams();
  const dispatch = useDispatch();
  const { lodding, clientInfo, error, isOtp, otp_store, isForgetRequst} = useSelector(
    (state) => state.userLoginState
  );
  const [otpStore, setOtpStore] = useState(otp_store?.otp || 0);
  const [expriesTime,setExpriesTime] = useState(otp_store?.expiresTime)
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(UserSignUpOtpAction(otp));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(UserRefreshAction());
    }
    if (isForgetRequst) {
      toast.success(clientInfo?.message);
    }
    if (isOtp) {
      if (location.state?.from) {
        navigate(location.state.from);
      } else {
        if (clientInfo?.user?.userType == "client") {
          navigate(`/user/profile/${clientInfo?.user?._id}`);
        }
        if (clientInfo?.user?.userType == "worker") {
          navigate(`/profile/worker/my/manpower/${clientInfo?.user?._id}`);
        }
      }
      dispatch(UserRefreshAction());
    }
  }, [
    error,
    navigate,
    toast,
    isOtp,
    isForgetRequst,
    clientInfo?.user?.userType,
    clientInfo?.user?._id,
  ]);


  useEffect(()=>{
    setExpriesTime(otp_store?.expiresTime);
  },[otp_store?.expiresTime]);


  const currenTime = new Date();
  currenTime.setMinutes(currenTime.getMinutes())
  useEffect(()=>{
    if( currenTime.toLocaleTimeString()>otp_store?.expiresTime){
      dispatch(OtpCountSecurityAction(0 , null));
      setExpriesTime(null);
      window.location.reload()
    }
  },[otp_store?.expiresTime,currenTime.toLocaleTimeString()]);


  const resendOtpHandler = (emailorphone, otpStore , expries) => {
    setOtpStore((pre) => pre + 1);
    if (otpStore >= 10) {
      if(expriesTime==null){
      const currentTime = new Date();
      const futureTime = new Date();
      futureTime.setMinutes(currentTime.getMinutes() + 30);
      dispatch(OtpCountSecurityAction(otpStore , futureTime.toLocaleTimeString()));
      setExpriesTime(futureTime.toLocaleTimeString())
      }
      return toast.warn(
        "you otp send limitation exist so you can send otp after the 30 minutes"
      );
    } else {
      setExpriesTime(null);
      dispatch(OtpCountSecurityAction(otpStore , expries));
      dispatch(UserForgetPasswordRequestAction(emailorphone));
    }
  };
  return (
    <>
      {lodding && <Lodder/>}
      <div className="container__user__login__register bg-blue-200 min-h-screen">
        <div className="screen__user__login__register">
          <div className="screen__content ">
            <div
              style={{ width: "100%", position: "relative" }}
              className="min-h-screen"
            >
              <div className="flex justify-center bg-blue-200 items-center  font-[sans-serif] h-screen p-4 md: md:pt-8 md:pb-20 pt-20 pb-10">
                <div className="grid justify-center max-w-md mx-auto ">
                  <div>
                    {/* <img
                      src="./images/worker.avif"
                      className="w-full object-cover rounded-2xl"
                      alt="login-image"
                    /> */}
                  </div>

                  <form
                    onSubmit={submitHandler}
                    className="bg-white min-w-[400px] rounded-2xl p-6 mt-24 relative z-10 shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)]"
                  >
                    <div className="mb-12">
                      <div className=" my-5 -mt-3 w-10  h-5 ml-1 rounded-full ">
                        <button
                          onClick={() => navigate(-1)}
                          className="pl-2 w-10 h-10 border  pr-2 rounded-md text-black hover:text-black hover:border-blue-500"
                        >
                          <KeyboardBackspaceSharpIcon
                            style={{ color: "blue", fontSize: "14px" }}
                          />
                        </button>
                      </div>
                      <h3 className="text-3xl font-serif font-extrabold text-blue-600">
                        Validation From
                      </h3>
                    </div>

                    <div className="mt-6">
                      <div className="relative flex items-center">
                        <input
                          name="text"
                          type="text"
                          required
                          value={otp}
                          className="w-full text-gray-800 font-serif text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                          placeholder="Enter your otp"
                          onChange={(e) => setOtp(e.target.value)}
                        />
                        <img
                          src={`${Localhost}/images/logo/phone-call.png`}
                          alt="phone"
                          className="w-5 right-2 absolute"
                        />
                      </div>
                    </div>

                    <div className="mt-12">
                      <div className="text-green-400 italic  m-3 pointer">
                        <span
                          onClick={() => resendOtpHandler(emailorphone, otpStore,expriesTime)}
                          className="border-b hover:cursor-pointer font-serif"
                        >
                          <ReplyIcon />
                          resend otp
                        </span>
                      </div>
                      <button
                        type="submit"
                        className="w-full font-serif py-2.5 px-4 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                      >
                        Confirm
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="screen__background">
            <span className="screen__background__shape screen__background__shape4"></span>
            <span className="screen__background__shape screen__background__shape3"></span>
            <span className="screen__background__shape screen__background__shape2"></span>
            <span className="screen__background__shape screen__background__shape1"></span>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserOtp;
