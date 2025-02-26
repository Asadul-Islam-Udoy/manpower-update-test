import { useDispatch, useSelector } from "react-redux";
import {
  forgetPasswordConfirmAction,
  refreshAuthAction,
} from "../../action/auth_admin/AdminAction";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LodderFrom from "../../components/lodder/LodderFrom";

function AdminForgetPasswordRequestValidate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [forgetOtp, setForgetOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfrimNewPassword] = useState("");
  const { lodding, error, isForgetPasswordConfirm } = useSelector(
    (state) => state.loginState
  );
  ///reset password confirm handler
  const forgetPasswordOtpHandler = (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      return toast.warn("user confirm password is not match!");
    }
    const myFrom = new FormData();
    myFrom.set("otp", forgetOtp);
    myFrom.set("newPassword", newPassword);
    myFrom.set("confirmPassword", confirmNewPassword);
    dispatch(forgetPasswordConfirmAction(myFrom));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      window.location.reload();
    }
    if (isForgetPasswordConfirm) {
      toast.success("user password reset successfully");
      navigate("/dashboard/login");
    }
    dispatch(refreshAuthAction());
  }, [dispatch, toast, error, isForgetPasswordConfirm]);
  return (
    <>
      <div className="loginBody">
        <div class="login">
          <form onSubmit={forgetPasswordOtpHandler}>
            <h2>Please Enter Your OTP</h2>
            <input
              type="text"
              placeholder="Enter Your Otp ... "
              value={forgetOtp}
              onChange={(e) => setForgetOtp(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Enter Your New Password ... "
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Enter Confirm Password ... "
              value={confirmNewPassword}
              onChange={(e) => setConfrimNewPassword(e.target.value)}
              required
            />
            {lodding ? (
              <LodderFrom text='Reset Password'/>
            ) : (
              <input type="submit"  value="Submit" />
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default AdminForgetPasswordRequestValidate;
