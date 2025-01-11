import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { UserForgetPasswordRequestAction, UserRefreshAction } from "../../action/auth_user/UserAction";
import { Localhost } from "../../action/host/HostConnection";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
import Lodder from "../../components/lodder/Lodder";
function ForgetPasswordRequest() {
  const navigate = useNavigate();
  const [email_or_phone, setEmailOrPhone] = useState("");
  const dispatch = useDispatch();
  const { lodding, clientInfo, error,isForgetRequst } = useSelector(
    (state) => state.userLoginState
  );

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(UserForgetPasswordRequestAction(email_or_phone))
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if(isForgetRequst){
     toast.success(clientInfo?.message)
     navigate(`/user/forget/password/requiest/validate/${email_or_phone}`)
    }
    dispatch(UserRefreshAction());
  }, [
    dispatch,
    error,
    isForgetRequst,
    email_or_phone,
    clientInfo?.message,
    toast
  ]);
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
                        Forget Password From
                      </h3>
                    </div>

                    <div className="mt-2">
                      <div className="relative flex py-5 items-center">
                        <input
                          name="text"
                          type="text"
                          required
                          value={email_or_phone}
                          className="w-full text-gray-800 font-serif text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                          placeholder="Enter your email or phone number..."
                          onChange={(e) => setEmailOrPhone(e.target.value)}
                        />
                        <img
                          src={`${Localhost}/images/logo/phone-call.png`}
                          alt="phone"
                          className="w-5 right-2 absolute"
                        />
                      </div>
                    </div>
                    <div className="mt-12">
                      <button
                        type="submit"
                        className="w-full font-serif py-2.5 px-4 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                      >
                        Submit
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

export default ForgetPasswordRequest;
