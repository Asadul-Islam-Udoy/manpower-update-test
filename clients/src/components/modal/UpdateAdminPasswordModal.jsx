import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logoutAction, refreshAuthAction, updateAdminPasswordAction } from "../../action/auth_admin/AdminAction";
import LodderFrom from "../lodder/LodderFrom";
import { useNavigate } from "react-router-dom";
function UpdateAdminPasswordModal({ setShowPasswordUpdate }) {
  const [isShowing, setIsShowing] = useState(true);
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wrapperRef = useRef(null);
  const { error, lodding, userInfo, isPasswordUpdate } = useSelector(
    (state) => state.loginState
  );
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsShowing(false);
        setShowPasswordUpdate(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  useEffect(() => {
    let html = document.querySelector("html");

    if (html) {
      if (isShowing && html) {
        html.style.overflowY = "hidden";

        const focusableElements =
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

        const modal = document.querySelector("#modal"); // select the modal by it's id

        const firstFocusableElement =
          modal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal

        const focusableContent = modal.querySelectorAll(focusableElements);

        const lastFocusableElement =
          focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal

        document.addEventListener("keydown", function (e) {
          if (e.keyCode === 27) {
            setIsShowing(false);
            setShowPasswordUpdate(false);
          }

          let isTabPressed = e.key === "Tab" || e.keyCode === 9;

          if (!isTabPressed) {
            return;
          }

          if (e.shiftKey) {
            // if shift key pressed for shift + tab combination
            if (document.activeElement === firstFocusableElement) {
              lastFocusableElement.focus(); // add focus for the last focusable element
              e.preventDefault();
            }
          } else {
            // if tab key is pressed
            if (document.activeElement === lastFocusableElement) {
              // if focused has reached to last focusable element then focus first focusable element after pressing tab
              firstFocusableElement.focus(); // add focus for the first focusable element
              e.preventDefault();
            }
          }
        });

        firstFocusableElement.focus();
      } else {
        html.style.overflowY = "visible";
      }
    }
  }, [isShowing]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      navigate(`/dashboard/admin/profile/${userInfo?.user?._id}`);
    }
    if (isPasswordUpdate) {
      toast.success("password update successfully!");
      setShowPasswordUpdate(false);
      dispatch(logoutAction());
    }
    dispatch(refreshAuthAction());
  }, [error, isPasswordUpdate, toast, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return toast.warn("confirm password is not match!");
    }
    const myform = new FormData();
    myform.set("oldPassword", oldPassword);
    myform.set("newPassword", newPassword);
    dispatch(updateAdminPasswordAction(myform));
  };
  return (
    <>
      {isShowing && typeof document !== "undefined"
        ? ReactDOM.createPortal(
            <div
              className="fixed top-0 left-0 z-20 flex items-center justify-center w-screen h-screen bg-slate-300/20 backdrop-blur-sm"
              aria-labelledby="header-4a content-4a"
              aria-modal="true"
              tabindex="-1"
              role="dialog"
            >
              {/*    <!-- Modal --> */}
              <form onSubmit={submitHandler}>
                <div
                  ref={wrapperRef}
                  className="flex max-h-[90vh] max-w-sm flex-col gap-4 overflow-hidden rounded bg-white p-6 text-slate-500 shadow-xl shadow-slate-700/10"
                  id="modal"
                  role="document"
                >
                  {/*        <!-- Modal header --> */}
                  <header id="header-4a" className="flex items-center">
                    <h3 className="flex-1 text-lg font-medium text-slate-700">
                      Welcome back edit your password !
                    </h3>
                    <button
                      onClick={() => [
                        setIsShowing(false),
                        setShowPasswordUpdate(false),
                      ]}
                      className="inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide transition duration-300 rounded-full justify-self-center whitespace-nowrap text-emerald-500 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-emerald-300 disabled:shadow-none disabled:hover:bg-transparent"
                      aria-label="close dialog"
                    >
                      <span className="relative only:-mx-5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          role="graphics-symbol"
                          aria-labelledby="title-79 desc-79"
                        >
                          <title id="title-79">Icon title</title>
                          <desc id="desc-79">
                            A more detailed description of the icon
                          </desc>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </span>
                    </button>
                  </header>
                  {/*        <!-- Modal body --> */}
                  <div id="content-4a" className="flex-1">
                    <div className="flex flex-col gap-6">
                      {/*                <!-- Input field --> */}
                      <div className="relative">
                        <input
                          id="id-b13"
                          type={isShowPassword ? "password" : "text"}
                          name="id-b13"
                          value={oldPassword}
                          required
                          onChange={(e) => setOldPassword(e.target.value)}
                          placeholder="your before password"
                          className="relative w-full h-10 px-4 pr-12 text-sm placeholder-transparent transition-all border rounded outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                        />
                        <label
                          htmlFor="id-b13"
                          className="absolute -top-2 left-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:left-0 before:top-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                        >
                          Your Before password
                        </label>
                        <svg
                          onClick={() => setIsShowPassword((pre) => !pre)}
                          xmlns="http://www.w3.org/2000/svg"
                          className="absolute z-10 right-4 top-2.5 h-5 w-5 cursor-pointer stroke-slate-400 peer-disabled:cursor-not-allowed"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                        <small className="absolute flex justify-between w-full px-4 py-1 text-xs transition text-slate-400 peer-invalid:text-pink-500">
                          <span>Type your password</span>
                        </small>
                      </div>
                      {/*                <!-- Input field --> */}
                      <div className="relative my-6">
                        <input
                          id="id-b13"
                          type={isShowPassword ? "password" : "text"}
                          name="id-b13"
                          value={newPassword}
                          required
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="your new password"
                          className="relative w-full h-10 px-4 pr-12 text-sm placeholder-transparent transition-all border rounded outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                        />
                        <label
                          htmlFor="id-b13"
                          className="absolute -top-2 left-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:left-0 before:top-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                        >
                          Your new password
                        </label>
                        <svg
                          onClick={() => setIsShowPassword((pre) => !pre)}
                          xmlns="http://www.w3.org/2000/svg"
                          className="absolute z-10 right-4 top-2.5 h-5 w-5 cursor-pointer stroke-slate-400 peer-disabled:cursor-not-allowed"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                        <small className="absolute flex justify-between w-full px-4 py-1 text-xs transition text-slate-400 peer-invalid:text-pink-500">
                          <span>Type your password</span>
                        </small>
                      </div>
                      <div className="relative my-6">
                        <input
                          id="id-b13"
                          type={isShowPassword ? "password" : "text"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                          name="id-b13"
                          placeholder="your new confirm password"
                          className="relative w-full h-10 px-4 pr-12 text-sm placeholder-transparent transition-all border rounded outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                        />
                        <label
                          htmlFor="id-b13"
                          className="absolute -top-2 left-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:left-0 before:top-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                        >
                          Your new configm password
                        </label>
                        <svg
                          onClick={() => setIsShowPassword((pre) => !pre)}
                          xmlns="http://www.w3.org/2000/svg"
                          className="absolute z-10 right-4 top-2.5 h-5 w-5 cursor-pointer stroke-slate-400 peer-disabled:cursor-not-allowed"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                        <small className="absolute flex justify-between w-full px-4 py-1 text-xs transition text-slate-400 peer-invalid:text-pink-500">
                          <span>Type your password</span>
                        </small>
                      </div>
                    </div>
                  </div>
                  {/*        <!-- Modal actions --> */}
                  <div className="flex justify-center gap-2">
                    {lodding ? (
                      <LodderFrom text='Updating'/>
                    ) : (
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center w-full h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded whitespace-nowrap bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
                      >
                        <span>Submit</span>
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>,
            document.body
          )
        : null}
    </>
  );
}

export default UpdateAdminPasswordModal;
