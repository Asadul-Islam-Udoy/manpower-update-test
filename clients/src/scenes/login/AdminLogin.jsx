import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import StartIcon from "@mui/icons-material/Start";
import { toast } from "react-toastify";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { useDispatch, useSelector } from "react-redux";
import {
  loginAction,
  refreshAuthAction,
} from "../../action/auth_admin/AdminAction";
import LodderFrom from "../../components/lodder/LodderFrom";
function AdminLogin() {
  const navigate = useNavigate();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { lodding, error, isLogin, userInfo } = useSelector(
    (state) => state.loginState
  );
  const dispatch = useDispatch();

  //login section handler
  const loginHandler = (e) => {
    e.preventDefault();
    setButtonDisabled(true);
    const myFrom = new FormData();
    myFrom.set("email", email);
    myFrom.set("password", password);
    dispatch(loginAction(myFrom));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      setButtonDisabled(false);
      window.location.reload();
    }
    if (isLogin) {
      // toast.success("admin login successfully!");
      if (userInfo?.user.userType === "admin" || userInfo?.user.userType === "super-admin") {
        navigate("/dashboard");
        setButtonDisabled(false);
      } else {
        setButtonDisabled(false);
        navigate("/");
      }
    }
    dispatch(refreshAuthAction());
  }, [dispatch, toast, error, isLogin]);
  return (
    <>
      <div className="loginBody">
        <div class="login">
          <form onSubmit={loginHandler}>
            <h2>Welcome, Rdtl User!</h2>
            <p>Please log in</p>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {lodding ? (
              <LodderFrom text="Login" />
            ) : (
              <input
                type="submit"
                disabled={buttonDisabled}
                value="Log In Now"
              />
            )}
          </form>
          <div class="links">
            <Link to="/admin/forget/password/request">Forgot password</Link>
            {/* {isForgetShow === true ? <a href="#" onClick={()=>[setIsFrogetShow((pre)=>!pre),setForgetPasswordOtpShow(false)]}>Resend OTP</a> : <h5>else</h5>} */}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
