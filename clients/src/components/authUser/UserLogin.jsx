import React, { useEffect, useState } from "react";
import "./Login_User.css";
import KeyIcon from "@mui/icons-material/Key";
import { useDispatch, useSelector } from "react-redux";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
import {
  UserRefreshAction,
  UserSignInAction,
} from "../../action/auth_user/UserAction";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Localhost } from "../../action/host/HostConnection";
const UserLoginComponent = ({
  emailOrPhone,
  setEmailOrPhone,
  userType,
  password,
  setPassword,
}) => {
  const [passwordShow,setPasswordShow] = useState('password')
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { clientInfo, error, isLogin } = useSelector(
    (state) => state.userLoginState
  );
  const submitHandler = (e) => {
    e.preventDefault();
    const newFrom = new FormData();
    newFrom.set("phone_or_email", emailOrPhone);
    newFrom.set("password", password);
    dispatch(UserSignInAction(newFrom));
  };

  useEffect(() => {
    if (isLogin) {
      dispatch(UserRefreshAction());
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
    }
    dispatch(UserRefreshAction());
  }, [
    navigate,
    toast,
    isLogin,
    clientInfo?.user?.userType,
    clientInfo?.user?._id,
  ]);
  return (
    <>
      <div
        style={{ width: "100%", position: "relative" }}
        className="min-h-screen "
      >
        <div className="flex justify-center bg-blue-200 items-center  font-[sans-serif] h-screen p-4 md: md:pt-8 md:pb-20 pt-20 pb-10">
          <div className="grid justify-center max-w-md mx-auto ">
            <form
              onSubmit={submitHandler}
              className="bg-white rounded-2xl p-6 mt-20 relative min-w-[400px] z-10 shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)]"
            >
              <div className="flex justify-between mb-15">
                <h3 className="font-serif text-3xl text-blue-600">Sign In</h3>

                <button
                  onClick={() => navigate(-1)}
                  className="px-5 text-blue-500 border border-blue-500 rounded-md hover:bg-blue-500 hover:text-white"
                >
                  <KeyboardBackspaceSharpIcon />
                </button>
              </div>

              <div className="mt-6 ">
                <div className="relative flex items-center">
                  <input
                    name="text"
                    type="text"
                    value={emailOrPhone}
                    required
                    className="w-full px-2 py-3 font-serif text-sm text-gray-800 border-b border-gray-300 outline-none focus:border-blue-600"
                    placeholder="Enter email or phone..."
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                  />
                  <img
                    src={`${Localhost}/images/logo/phone-call.png`}
                    alt="phone"
                    className="absolute w-5 right-2 "
                  />
                </div>
                <div className="relative flex items-center py-3">
                  <input
                    name="text"
                    type={passwordShow}
                    value={password}
                    required
                    className="w-full px-2 py-3 font-serif text-sm text-gray-800 border-b border-gray-300 outline-none focus:border-blue-600"
                    placeholder="Enter the password.."
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <img
                    onClick={()=>setPasswordShow((pre)=>pre==='password'?'text':'password')}
                    src="https://as2.ftcdn.net/v2/jpg/08/45/60/73/1000_F_845607357_VHo8FXkc9EzyxNYZHt4Ua8uDSrTGsrG6.jpg"
                    alt="phone"
                    className="absolute w-5 rounded-full right-2 cursor-pointer "
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded shrink-0 focus:ring-blue-500"
                  />
                  <label
                    for="remember-me"
                    className="block ml-3 font-serif text-sm text-gray-800"
                  >
                    Remember me
                  </label>
                </div>
                <div>
                  <KeyIcon
                    style={{
                      color: "black",
                      fontSize: "13px",
                      transform: `rotate(${-45}deg)`,
                      transition: "transform 0.5s",
                    }}
                    className=""
                  />
                  <Link
                    to="/user/forget/password/request"
                    className="font-serif text-sm text-blue-600 border-b border-b-blue-600"
                  >
                    forgot password
                  </Link>
                </div>
              </div>

              <div className="mt-12">
                <button
                  type="submit"
                  className="w-full font-serif py-2.5 px-4 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Sign In
                </button>
              </div>

              <div class="my-4 flex items-center gap-4">
                <hr class="w-full border-gray-300" />
                <p class="text-sm text-gray-800 text-center font-serif">or</p>
                <hr class="w-full border-gray-300" />
              </div>
              <p className="text-black">
                if you don't sing up{" "}
                <Link
                  to={`/register/${userType}`}
                  className="font-serif border-b border-b-cyan-500"
                >
                  click me
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserLoginComponent;
