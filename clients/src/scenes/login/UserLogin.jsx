import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import UserLoginComponent from "../../components/authUser/UserLogin";
import { UserRefreshAction } from "../../action/auth_user/UserAction";
import Lodder from "../../components/lodder/Lodder";
function LoginUser() {
  const dispatch = useDispatch();
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const { lodding, clientInfo, error, isOtpClient } = useSelector(
    (state) => state.userLoginState
  );
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(UserRefreshAction());
    }
    if (isOtpClient) {
      if (clientInfo) {
        toast.success(clientInfo?.message);
      }
      dispatch(UserRefreshAction());
    }
  }, [error, toast]);
  return (
    <>
      {lodding && <Lodder/>}
      <div className="container__user__login__register bg-gray-400">
        <div className="screen__user__login__register">
          <div className="screen__content">
            <div className="my-1"></div>
            <div className="">
              <UserLoginComponent
                emailOrPhone={emailOrPhone}
                setEmailOrPhone={setEmailOrPhone}
                password={password}
                setPassword={setPassword}
                userType="client"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginUser;
