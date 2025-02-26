import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useEffect, useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getSingleUserNotificationAction,
  getUserSingleOwnNotificationAction,
  notificationRefreshAction,
} from "../../action/auth_admin/NotificationAction";
import NotificationDeleteModel from "../../components/modal/NotificationDeleteModal";
import { toast } from "react-toastify";
function ClientNotification() {
  const navigate = useNavigate();
  const [notificationId, setNofificationId] = useState("");
  const [isShowing, setIsShowing] = useState(false);
  const [notificationText, setNotificationText] = useState("");
  const { clientInfo } = useSelector((state) => state.userLoginState);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { lodding, error, singlenotification, isDeletleNotiU } = useSelector(
    (state) => state.notificationState
  );
  useEffect(() => {
    dispatch(getUserSingleOwnNotificationAction(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (isDeletleNotiU) {
      toast.success("notification delete successfully!");
      setIsShowing(false);
      navigate(-1);
    }
    dispatch(getSingleUserNotificationAction(id));
    dispatch(getUserSingleOwnNotificationAction(id));
    dispatch(notificationRefreshAction());
  }, [dispatch, id, error, toast, isDeletleNotiU, navigate]);

  const date_convart = (time) => {
    return new Date(time).toLocaleDateString();
  };

  ///delete notification
  const deleteNotificationHandler = (id, text) => {
    setNofificationId(id);
    setNotificationText(text);
    setIsShowing((pre) => !pre);
  };

  return (
    <>
      {isShowing && (
        <NotificationDeleteModel
          isShowing={isShowing}
          userId={clientInfo?.user?._id}
          setIsShowing={setIsShowing}
          notificationId={notificationId}
          notificationText={notificationText}
          checkUser="client"
        />
      )}
      <div className="min-h-screen bg-white w-full bg-green">
        <div
          onClick={() => navigate(-1)}
          className="h-11 ml-1 w-11 cursor-pointer hover:text-blue-500 text-black flex justify-center items-center bg-slate-300 mt-1 rounded-full"
        >
          <KeyboardArrowLeftIcon />
        </div>
        <div className="w-full flex items-center justify-center">
          <div
            className="relative md:min-h-[620px] min-h-[800px] mt-3 flex md:w-[60%] w-[100%] max-w-full flex-col  gap-4 overflow-hidden rounded bg-emerald-500 px-4 py-3 text-sm text-white shadow shadow-emerald-400/20 ring-1 ring-inset ring-emerald-600"
            role="status"
          >
            {/*  <!-- Text --> */}
            <div className="flex w-full justify-between">
              <p className=" text-[20px]">{singlenotification?.title}</p>
              <div className=" flex  flex-col justify-center items-baseline">
                <button
                  className=""
                  onClick={() =>
                    deleteNotificationHandler(
                      singlenotification?._id,
                      singlenotification?.title
                    )
                  }
                >
                  <HighlightOffIcon />
                </button>
                <p className=" font-serif text-[12px]">
                  Date :{date_convart(singlenotification?.send_date)}{" "}
                </p>
              </div>
            </div>
            {/*  <!-- Close button --> */}
            <div className=" border py-2 min-h-[550px]">
              <div className=" text-[12px]">
                <p className=" font-serif text-gray-700 italic">
                  {singlenotification?.description}
                </p>
              </div>
              <div className=" text-blue-800 ml-2 text-[12px] w-auto ">
                {singlenotification?.details_url && (
                  <Link
                    to={singlenotification?.details_url}
                    className="border-b border-blue-500"
                  >
                    {singlenotification?.details_url}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClientNotification;
