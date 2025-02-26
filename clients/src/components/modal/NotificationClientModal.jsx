import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
export default function NotificationClientModal({
  newNotifications,
  seenNotications,
}) {
  const [isShowing, setIsShowing] = useState(true);

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
              <div
                ref={wrapperRef}
                className="flex max-h-[90vh] md:w-[50%] w-[90%]  flex-col gap-4 overflow-hidden rounded bg-white p-6 text-slate-500 shadow-xl shadow-slate-700/10"
                id="modal"
                role="document"
              >
                {/*        <!-- Modal header --> */}
                <header id="header-4a" className="flex items-center">
                  <h3 className="flex-1 text-lg font-medium text-slate-700">
                    Welcome back!
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

                {/* notification section */}
                <ul className="divide-y divide-slate-100 z-20 overflow-auto h-auto py-10 md:h-96">
                  {newNotifications?.length < 0 ||
                    (seenNotications?.length < 0 && (
                      <h1 className="text-blue-500 w-full h-full flex items-center justify-center italic font-serif ">
                        <WarningAmberIcon
                          style={{
                            color: "red",
                            fontSize: "16px",
                            paddingLeft: "3px",
                            marginRight: "5px",
                          }}
                        />
                        No Notification
                      </h1>
                    ))}
                  {newNotifications?.map((item) => (
                    <Link to={`/user/client/notification/${item._id}`}>
                      <li className="flex m-1 items-start gap-4 relative px-4 border  py-3">
                        <span className=" absolute bg-red-600 rounded-full -mt-2 text-[9px] text-white flex -translate-x-full justify-center h-3 w-3">
                          1
                        </span>
                        <div className="flex min-h-[2rem] flex-col items-start justify-center gap-0">
                          <h4 className="text-base text-slate-700 ">
                            {item.title}
                          </h4>
                          <p>{item.description.substring(0, 50)}....</p>
                        </div>
                      </li>
                    </Link>
                  ))}
                  {seenNotications?.map((item) => (
                    <Link to={`/user/client/notification/${item._id}`}>
                      <li className="flex m-1 items-start gap-4 px-4 border hover:text-blue-500 hover:bg-slate-200  py-3">
                        <div className="flex min-h-[2rem] flex-col items-start justify-center gap-0">
                          <h4 className="text-base text-slate-700 ">
                            {item.title}
                          </h4>
                          <p>{item.description.substring(0, 50)}....</p>
                        </div>
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
