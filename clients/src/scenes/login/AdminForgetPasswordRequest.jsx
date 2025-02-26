import { useDispatch, useSelector } from "react-redux";
import { forgetPasswordAction, refreshAuthAction } from "../../action/auth_admin/AdminAction";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LodderFrom from "../../components/lodder/LodderFrom";

function AdminForgetPasswordRequest() {
const [oldEmail, setOldEmail] = useState(""); 
const dispatch = useDispatch();
const navigate = useNavigate();
const {
    lodding,
    error,
    isForgetPassword,
  } = useSelector((state) => state.loginState);  
///reset password send otp user email handler
  const forgetHandler = (e) => {
    e.preventDefault();
    dispatch(forgetPasswordAction(oldEmail));
  };
    useEffect(() => {
      if (error) {
        toast.error(error);
        window.location.reload();
      }
      if (isForgetPassword) {
        toast.success("send otp your email..!");
        navigate('/admin/forget/password/request/validate')
      }
      dispatch(refreshAuthAction());
    }, [
      dispatch,
      toast,
      navigate,
      error,
      isForgetPassword,
    ]);
  return (
    <>
      <div className="loginBody">
        <div class="login">
          <form onSubmit={forgetHandler}>
            <h2>Forget Password</h2>
            <p>Please provide your information</p>
            <input
              type="text"
              placeholder="Enter Your Email ... "
              value={oldEmail}
              onChange={(e) => setOldEmail(e.target.value)}
              required
            />
            {lodding ? (
              <LodderFrom text="Sending" />
            ) : (
              <input type="submit"  value="Submit" />
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default AdminForgetPasswordRequest;
