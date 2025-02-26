///send groups notification
import {
    SEND_GROUP_NOTIFICATION_FAIL,
    SEND_GROUP_NOTIFICATION_REQUEST,
     SEND_GROUP_NOTIFICATION_SUCCESS ,
     REFRESH_NOTIFICATION_REQUEST,
     SEND_SINGLE_NOTIFICATION_REQUEST,
     SEND_SINGLE_NOTIFICATION_SUCCESS,
     SEND_SINGLE_NOTIFICATION_FAIL,
     GET_ALL_NOTIFICATION_REQUEST,
     GET_ALL_NOTIFICATION_SUCCESS,
     GET_ALL_NOTIFICATION_FAIL,
     GET_SINGLE_USER_NOTIFICATION_SUCCESS,
     GET_SINGLE_USER_NOTIFICATION_REQUEST,
     GET_SINGLE_USER_NOTIFICATION_FAIL,
     DLELETE_NOTIFICATION_BY_ADMIN_REQUEST,
     DLELETE_NOTIFICATION_BY_ADMIN_SUCCESS,
     DLELETE_NOTIFICATION_BY_ADMIN_FAIL,
     DLELETE_NOTIFICATION_BY_USER_REQUEST,
     DLELETE_NOTIFICATION_BY_USER_SUCCESS,
     DLELETE_NOTIFICATION_BY_USER_FAIL,
     UPDATE_NOTIFICATION_BY_ADMIN_REQUEST,
     UPDATE_NOTIFICATION_BY_ADMIN_SUCCESS,
     UPDATE_NOTIFICATION_BY_ADMIN_FAIL
} from "../../constances/NotificationConstance";
import { Localhost } from "../host/HostConnection";
import axios from 'axios';
///send notification groups cliets
export const SendGroupNotificationAction = (fromdata) => async (dispatch,getState) => {
    try {
      dispatch({ type: SEND_GROUP_NOTIFICATION_REQUEST });
      const {
        loginState: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: userInfo?.token?.accesstoken,
        },
      }; 
      const { data } = await axios.post(
        Localhost + '/api/notifications/create/groups/notification',fromdata,
        config
      );
      if (data) {
        dispatch({
          type: SEND_GROUP_NOTIFICATION_SUCCESS,
          payload: data
        });
      }
    } catch (error) {
      dispatch({
        type: SEND_GROUP_NOTIFICATION_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  ///send notification single cilent
  export const SendSingleNotificationAction = (id,fromdata) => async (dispatch,getState) => {
    try {
      dispatch({ type: SEND_SINGLE_NOTIFICATION_REQUEST });
      const {
        loginState: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: userInfo?.token?.accesstoken,
        },
      }; 
      const { data } = await axios.post(
        Localhost + `/api/notifications/create/${id}`,fromdata,
        config
      );
      if (data) {
        dispatch({
          type: SEND_SINGLE_NOTIFICATION_SUCCESS,
          payload: data
        });
      }
    } catch (error) {
      dispatch({
        type: SEND_SINGLE_NOTIFICATION_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  ///get all notifications single cilent
  export const getAllNotificationAction = () => async (dispatch,getState) => {
    try {
      dispatch({ type: GET_ALL_NOTIFICATION_REQUEST });
      const {
        loginState: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: userInfo?.token?.accesstoken,
        },
      }; 
      const { data } = await axios.get(
        Localhost + '/api/notifications/get/all/',
        config
      );
      if (data) {
        dispatch({
          type: GET_ALL_NOTIFICATION_SUCCESS,
          payload: data.notifications
        });
      }
    } catch (error) {
      dispatch({
        type: GET_ALL_NOTIFICATION_FAIL,
        payload: error.response.data.message,
      });
    }
  };


  ///send notification single cilent
  export const getSingleUserNotificationAction = (id) => async (dispatch,getState) => {
    try {
      dispatch({ type: GET_SINGLE_USER_NOTIFICATION_REQUEST });
      const {
        loginState: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: userInfo?.token?.accesstoken,
        },
      }; 
      const { data } = await axios.get(
        Localhost + `/api/notifications/get/admin/unique/user/notifications/${id}`,
        config
      );
      if (data) {
        dispatch({
          type: GET_SINGLE_USER_NOTIFICATION_SUCCESS,
          payload: data.notification
        });
      }
    } catch (error) {
      dispatch({
        type: GET_SINGLE_USER_NOTIFICATION_FAIL,
        payload: error.response.data.message,
      });
    }
  };


    ///get all notifications single cilent
    export const getUserAllOwnNotificationAction = () => async (dispatch,getState) => {
      try {
        dispatch({ type: GET_ALL_NOTIFICATION_REQUEST });
        const {
          userLoginState: { clientInfo },
        } = getState();
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: clientInfo?.token?.accesstoken,
          },
        }; 
        const { data } = await axios.get(
          Localhost + '/api/notifications/get/user/all/notifications',
          config
        );
        if (data) {
          dispatch({
            type: GET_ALL_NOTIFICATION_SUCCESS,
            payload: data.notifications
          });
        }
      } catch (error) {
        dispatch({
          type: GET_ALL_NOTIFICATION_FAIL,
          payload: error.response.data.message,
        });
      }
    };

    ///get sinle notifications single cilent
    export const getUserSingleOwnNotificationAction = (id) => async (dispatch,getState) => {
      try {
        dispatch({ type:GET_SINGLE_USER_NOTIFICATION_REQUEST });
        const {
          userLoginState: { clientInfo },
        } = getState();
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: clientInfo?.token?.accesstoken,
          },
        }; 
        const { data } = await axios.get(
          Localhost + `/api/notifications/seen/user/notifications/${id}`,
          config
        );
        if (data) {
          dispatch({
            type:GET_SINGLE_USER_NOTIFICATION_SUCCESS,
            payload: data.notification
          });
        }
      } catch (error) {
        dispatch({
          type:GET_SINGLE_USER_NOTIFICATION_FAIL,
          payload: error.response.data.message,
        });
      }
    };


    ///delete notification by admin
    export const deleteNotificationByAdminAction = (userid,notificationid) => async (dispatch,getState) => {
      try {
        dispatch({ type:DLELETE_NOTIFICATION_BY_ADMIN_REQUEST });
          const {
            loginState: { userInfo },
          } = getState();
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: userInfo?.token?.accesstoken,
            },
          }; 
        const { data } = await axios.delete(
          Localhost + `/api/notifications/delete/notification/admin/${userid}/${notificationid}`,
          config
        );
        if (data) {
          dispatch({
            type:DLELETE_NOTIFICATION_BY_ADMIN_SUCCESS,
            payload: data.notifications
          });
        }
      } catch (error) {
        dispatch({
          type:DLELETE_NOTIFICATION_BY_ADMIN_FAIL,
          payload: error.response.data.message,
        });
      }
    };

     ///delete notification by user
     export const deleteNotificationByUserAction = (userid,notificationid) => async (dispatch,getState) => {
      try {
        dispatch({ type:DLELETE_NOTIFICATION_BY_USER_REQUEST });
        const {
          userLoginState: { clientInfo },
        } = getState();
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: clientInfo?.token?.accesstoken,
          },
        }; 
        const { data } = await axios.delete(
          Localhost + `/api/notifications/delete/notification/user/${userid}/${notificationid}/`,
          config
        );
        if (data) {
          dispatch({
            type:DLELETE_NOTIFICATION_BY_USER_SUCCESS,
            payload: data.notifications
          });
        }
      } catch (error) {
        dispatch({
          type:DLELETE_NOTIFICATION_BY_USER_FAIL,
          payload: error.response.data.message,
        });
      }
    };


       ///update notification by admin
       export const updateNotificationByAdminAction = (userid,notificationid,title, description, details_url, end_date) => async (dispatch,getState) => {
        try {
          console.log(userid,notificationid,title, description, details_url, end_date)
          dispatch({ type:UPDATE_NOTIFICATION_BY_ADMIN_REQUEST });
            const {
              loginState: { userInfo },
            } = getState();
            const config = {
              headers: {
                "Content-Type": "application/json",
                Authorization: userInfo?.token?.accesstoken,
              },
            }; 
          const { data } = await axios.put(
            Localhost + `/api/notifications/update/notification/${userid}/${notificationid}/`,{title, description, details_url, end_date},
            config
          );
          if (data) {
            dispatch({
              type:UPDATE_NOTIFICATION_BY_ADMIN_SUCCESS,
              payload: data.notifications
            });
          }
        } catch (error) {
          dispatch({
            type:UPDATE_NOTIFICATION_BY_ADMIN_FAIL,
            payload: error.response.data.message,
          });
        }
      };


  export const notificationRefreshAction=()=>(dispatch)=>{
    dispatch({type:REFRESH_NOTIFICATION_REQUEST});
  }