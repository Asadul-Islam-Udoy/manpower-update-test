import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../scenes/global/Sidebar";
import Topbar from "../../scenes/global/Topbar";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import "./NotificationInfo.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { ColorModeContext, tokens } from "../../theme";
import { useTheme } from "@emotion/react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import {
  getSingleUserNotificationAction,
  notificationRefreshAction,
} from "../../action/auth_admin/NotificationAction";
import { toast } from "react-toastify";
import NotificationDeleteModel from "../modal/NotificationDeleteModal";
import NotificationUpdateModel from "../modal/NotificationUpdateModal";
function NotificationInfo() {
  const { id } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [isShowing, setIsShowing] = useState(false);
  const [isSidebar, setIsSidebar] = useState(true);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [notificationText, setNotificationText] = useState("");
  const [description, setDiscription] = useState("");
  const [url, setUrl] = useState("");
  const [end_date, setEnd_Date] = useState("");
  const [notificationId, setNofificationId] = useState("");
  const [userId, setUserId] = useState("");
  const { lodding, error, isDeletleNotiA, isUpdateNoti, singlenotification } =
    useSelector((state) => state.notificationState);
  const { userInfo } = useSelector((state) => state.loginState);

  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (isDeletleNotiA) {
      toast.success("notification delete successfully!");
      setIsShowing(false);
    }
    if (isUpdateNoti) {
      toast.success("notification update successfully!");
      setShowUpdateModal(false);
    }
    dispatch(getSingleUserNotificationAction(id));
    dispatch(notificationRefreshAction());
  }, [dispatch, id, error, toast, isDeletleNotiA, isUpdateNoti]);

  const dataFormateMethod = (data) => {
    return new Date(data).toLocaleDateString();
  };

  const timeFormateMethod = (time) => {
    return new Date(time).toLocaleTimeString();
  };

  ///delete notification
  const deleteNotificationHandler = (id, userid, text) => {
    setNofificationId(id);
    setUserId(userid);
    setNotificationText(text);
    setIsShowing((pre) => !pre);
  };
  const updateNotificationHandler = (
    id,
    userid,
    text,
    description,
    url,
    enddate
  ) => {
    setNofificationId(id);
    setUserId(userid);
    setNotificationText(text);
    setDiscription(description);
    setUrl(url);
    setEnd_Date(enddate);
    setShowUpdateModal((pre) => !pre);
  };

  return (
    <>
      <div className="sidbar__app">
        <Sidebar isSidebar={isSidebar} />
        <div
          className={
            theme.palette.mode === "dark"
              ? "sidbar__content"
              : "sidbar__container__2"
          }
        >
          <Topbar setIsSidebar={setIsSidebar} />
          {isShowing && (
            <NotificationDeleteModel
              isShowing={isShowing}
              userId={userId}
              setIsShowing={setIsShowing}
              notificationId={notificationId}
              notificationText={notificationText}
              lodding={lodding}
            />
          )}
          {showUpdateModal && (
            <NotificationUpdateModel
              notificationId={notificationId}
              userId={userId}
              showUpdateModal={showUpdateModal}
              setShowUpdateModal={setShowUpdateModal}
              setDiscription={setDiscription}
              setUrl={setUrl}
              setEnd_Date={setEnd_Date}
              setNotificationText={setNotificationText}
              notificationText={notificationText}
              details_url={url}
              end_date={end_date}
              description={description}
              lodding={lodding}
            />
          )}
          <div className="notification__container">
            <div className="notification__info__box">
              <h3>Notification Information</h3>
              <div className="notification__info">
                <div className="notification__info__1">
                  <h3
                    style={{
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? " rgb(10, 51, 102)"
                          : "white",
                    }}
                  >
                    Seen Notification
                  </h3>
                  {singlenotification?.seenNotifications?.map((item) => (
                    <div
                      style={{
                        backgroundColor:
                          theme.palette.mode === "dark"
                            ? "rgb(10, 51, 102)"
                            : "white",
                      }}
                      className="notification__info__1__box"
                    >
                      <div>
                        {/* <button>
                          <ModeEditIcon />
                        </button> */}
                        {(userInfo?.user?.permissions?.includes(
                          "client-notification-delete"
                        ) ||
                          userInfo?.user?.userType == "super-admin") && (
                          <button
                            onClick={() =>
                              deleteNotificationHandler(
                                item?._id,
                                item?.user,
                                item?.title
                              )
                            }
                          >
                            <HighlightOffIcon />
                          </button>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span>
                          Send Date :{timeFormateMethod(item.send_date)}-
                          {dataFormateMethod(item.send_date)}
                        </span>
                        <span className=" text-[20px]">{item.title}</span>
                        <p>{item.description}</p>
                        <Link to={item.details_url}>{item.details_url}</Link>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="notification__info__2">
                  <h3
                    style={{
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? "rgb(10, 51, 102)"
                          : "white",
                    }}
                  >
                    New Notification
                  </h3>
                  {singlenotification?.newNotifiactions?.map((item) => (
                    <div
                      style={{
                        backgroundColor:
                          theme.palette.mode === "dark"
                            ? "rgb(10, 51, 102)"
                            : "white",
                      }}
                      className="notification__info__1__box"
                    >
                      <div>
                        {(userInfo?.user?.permissions?.includes(
                          "client-notification-update"
                        ) ||
                          userInfo?.user?.userType == "super-admin") && (
                          <button
                            onClick={() =>
                              updateNotificationHandler(
                                item?._id,
                                item?.user,
                                item?.title,
                                item?.description,
                                item?.details_url,
                                item.end_date
                              )
                            }
                          >
                            <ModeEditIcon />
                          </button>
                        )}
                        {(userInfo?.user?.permissions?.includes(
                          "client-notification-delete"
                        ) ||
                          userInfo?.user?.userType == "super-admin") && (
                          <button
                            onClick={() =>
                              deleteNotificationHandler(
                                item?._id,
                                item?.user,
                                item?.title
                              )
                            }
                          >
                            <HighlightOffIcon />
                          </button>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span>
                          Send Date :{timeFormateMethod(item.send_date)}-
                          {dataFormateMethod(item.send_date)}
                        </span>
                        <span>
                          End Date :{timeFormateMethod(item.send_date)}-
                          {dataFormateMethod(item.end_date)}
                        </span>
                        <br />
                        <span className=" text-[20px]">{item.title}</span>
                        <p>{item.description}</p>
                        <Link to={item.details_url}>{item.details_url}</Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotificationInfo;
