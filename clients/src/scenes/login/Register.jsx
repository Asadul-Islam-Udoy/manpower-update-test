import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Localhost } from "../../action/host/HostConnection";
import {
  UserRefreshAction,
  UserSignUpAction,
} from "../../action/auth_user/UserAction";
import Lodder from "../../components/lodder/Lodder";
function Register_User() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userType } = useParams();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confrimPassword, setConfirmPassword] = useState("");
  const { lodding, error, isRegister, clientInfo } = useSelector(
    (state) => state.userLoginState
  );
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confrimPassword) {
      return toast.warn("confirm password is not match!");
    }
    if (phone == "" && email == "") {
      return toast.warn("at list you hove to be a give email or phone");
    }
    const newFrom = new FormData();
    newFrom.set("username", username);
    newFrom.set("phone", phone);
    newFrom.set("email", email);
    newFrom.set("password", password);
    newFrom.set("userType", userType);
    dispatch(UserSignUpAction(newFrom));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (isRegister) {
      toast.success(clientInfo?.message);
      navigate(`/register/user/otp/${email || phone}`);
    }
    dispatch(UserRefreshAction());
  }, [dispatch, navigate, error, isRegister, toast, clientInfo?.message]);

  return (
    <>
      {lodding && <Lodder />}
      <div
        style={{ width: "100%", position: "relative" }}
        className="min-h-screen"
      >
        <div className="flex justify-center bg-blue-200 items-center  font-[sans-serif] h-screen p-4 md: md:pt-8 md:pb-20 pt-20 pb-10">
          <div className="grid justify-center max-w-md mx-auto ">
            <form
              onSubmit={submitHandler}
              className="bg-white rounded-2xl p-6  relative min-w-[400px] z-10 shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)]"
            >
              <div className="mb-15">
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
                <h3 className="text-3xl font-serif text-blue-600">Sign Up</h3>
              </div>

              <div className="mt-6">
                <div className="relative flex py-2 items-center">
                  <input
                    name="username"
                    type="text"
                    value={username}
                    required
                    className="w-full font-serif text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                    placeholder="Enter the full name..."
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="relative flex py-2 items-center">
                  <input
                    name="text"
                    type="text"
                    value={phone}
                    className="w-full font-serif text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                    placeholder="Enter your phone number..."
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <img
                    src={`${Localhost}/images/logo/phone-call.png`}
                    alt="phone"
                    className="w-5 right-2 absolute "
                  />
                </div>
                <div className="relative flex py-2 items-center">
                  <input
                    name="text"
                    type="text"
                    value={email}
                    className="w-full font-serif text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                    placeholder="Enter your email address ..."
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <img
                    src='https://media.istockphoto.com/id/1125279178/vector/mail-line-icon.jpg?s=612x612&w=0&k=20&c=NASq4hMg0b6UP9V0ru4kxL2-J114O3TaakI467Pzjzw='
                    alt="phone"
                    className="w-5 right-2 rounded-full absolute border border-black "
                  />
                </div>
                <div className="relative flex py-2 items-center">
                  <input
                    name="text"
                    type="password"
                    value={password}
                    required
                    className="w-full font-serif text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                    placeholder="Enter the password.."
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="relative flex py-2 items-center">
                  <input
                    name="text"
                    type="password"
                    value={confrimPassword}
                    required
                    className="w-full font-serif text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                    placeholder="Enter the confirm password.."
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-12">
                <button
                  type="submit"
                  className="w-full font-serif py-2.5 px-4 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Sign Up
                </button>
              </div>

              <div class="my-4 flex items-center gap-4">
                <hr class="w-full border-gray-300" />
                <p class="text-sm text-gray-800 text-center font-serif">or</p>
                <hr class="w-full border-gray-300" />
              </div>
              <div>
                <p className="text-black">
                  if you all ready sing up{" "}
                  <Link
                    to={`${userType == "worker" ? "/login/worker" : "/login"}`}
                    className=" border-b border-b-cyan-500 font-serif"
                  >
                    click me
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register_User;
