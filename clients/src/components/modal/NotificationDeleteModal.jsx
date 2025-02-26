import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import {
  deleteNotificationByAdminAction,
  deleteNotificationByUserAction,
} from "../../action/auth_admin/NotificationAction";
import LodderFrom from "../lodder/LodderFrom";
function NotificationDeleteModel({
  isShowing,
  setIsShowing,
  userId,
  notificationId,
  notificationText,
  checkUser = null,
  lodding
}) {
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsShowing(false);
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

  const deleteHandler = (userid, notiid, checkUser) => {
    if (checkUser == "client") {
      dispatch(deleteNotificationByUserAction(userid, notiid));
    } else {
      dispatch(deleteNotificationByAdminAction(userid, notiid));
    }
  };

  return (
    <>
      {isShowing && typeof document !== "undefined"
        ? ReactDOM.createPortal(
            <div
              className="fixed top-0 left-0 z-20 flex items-center justify-center w-screen h-screen bg-slate-300/20 backdrop-blur-sm"
              aria-labelledby="header-1a content-1a"
              aria-modal="true"
              tabindex="-1"
              role="dialog"
            >
              {/*    <!-- Modal --> */}
              <div
                className="flex max-h-[90vh] w-11/12 max-w-2xl flex-col gap-6 overflow-hidden rounded bg-white p-6 text-slate-500 shadow-xl shadow-slate-700/10"
                ref={wrapperRef}
                id="modal"
                role="document"
              >
                {/*        <!-- Modal header --> */}
                <header id="header-1a" className="flex items-center gap-4">
                  <h3 className="flex-1 text-xl font-medium text-slate-700">
                    are you sure, you want to delete this notification!
                  </h3>
                  <button
                    onClick={() => setIsShowing(false)}
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
                        <desc id="desc-79"></desc>
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
                <div id="content-1a" className="flex-1 overflow-auto">
                  <p>{notificationText}</p>
                </div>
                {/*        <!-- Modal actions --> */}
                <div className="flex justify-start gap-2">
                  {lodding ? (
                    <LodderFrom text="Deleting" />
                  ) : (
                    <button
                      onClick={() =>
                        deleteHandler(userId, notificationId, checkUser)
                      }
                      className="inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded whitespace-nowrap bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
                    >
                      <span>Delete</span>
                    </button>
                  )}
                  <button
                    onClick={() => setIsShowing(false)}
                    className="inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide transition duration-300 rounded justify-self-center whitespace-nowrap text-emerald-500 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-emerald-300 disabled:shadow-none disabled:hover:bg-transparent"
                  >
                    <span>Decline</span>
                  </button>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}

export default NotificationDeleteModel;
