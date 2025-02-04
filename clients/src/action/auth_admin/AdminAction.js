import axios from "axios";
import { Localhost } from "../host/HostConnection";
import {
  REGISTER_CREATE_FAIL,
  REGISTER_CREATE_REQUEST,
  REGISTER_CREATE_SUCCESS,
  LOGIN_CREATE_FAIL,
  LOGIN_CREATE_REQUEST,
  LOGIN_CREATE_SUCCESS,
  REFRESH_LODDER_AUTH,
  OTP_SEND_REQUEST,
  OTP_SEND_SUCCESS,
  OTP_SEND_FAIL,
  FORGET_PASSWORD_REQUEST,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_FAIL,
  FORGET_PASSWORD_CONFIRM_REQUEST,
  FORGET_PASSWORD_CONFIRM_SUCCESS,
  FORGET_PASSWORD_CONFIRM_FAIL,
  LOGOUT_REQUEST_SUCCESS,
  USER_TOKEN_REFRESH_REQUEST,
  USER_TOKEN_REFRESH_SUCCESS,
  USER_TOKEN_REFRESH_FAIL,
  UPDATE_ADMIN_PROFILE_REQUEST,
  UPDATE_ADMIN_PROFILE_SUCCESS,
  UPDATE_ADMIN_PROFILE_FAIL,
  UPDATE_ADMIN_EMAIL_REQUEST,
  UPDATE_ADMIN_EMAIL_SUCCESS,
  UPDATE_ADMIN_EMAIL_FAIL,
  DELETE_ADMIN_REQUEST,
  DELETE_ADMIN_SUCCESS,
  DELETE_ADMIN_FAIL,
  UPDATE_ADMIN_EMAIL_OTP_REQUEST,
  UPDATE_ADMIN_EMAIL_OTP_SUCCESS,
  UPDATE_ADMIN_EMAIL_OTP_FAIL,
  UPDATE_ADMIN_PASSWORD_REQUEST,
  UPDATE_ADMIN_PASSWORD_SUCCESS,
  UPDATE_ADMIN_PASSWORD_FAIL,
  GET_ALL_ADMIN_LISTS_REQUEST,
  GET_ALL_ADMIN_LISTS_SUCCESS,
  GET_ALL_ADMIN_LISTS_FAIL,
  GET_ALL_PERMISSION_LISTS_REQUEST,
  GET_ALL_PERMISSION_LISTS_SUCCESS,
  GET_ALL_PERMISSION_LISTS_FAIL,
  CREATE_ADMIN_ROLE_REQUEST,
  CREATE_ADMIN_ROLE_SUCCESS,
  CREATE_ADMIN_ROLE_FAIL,
  GET_ALL_ROLE_LISTS_REQUEST,
  GET_ALL_ROLE_LISTS_SUCCESS,
  GET_ALL_ROLE_LISTS_FAIL,
  GIVEN_ROLE_PERMISSION_TO_ADMIN_REQUEST,
  GIVEN_ROLE_PERMISSION_TO_ADMIN_SUCCESS,
  GIVEN_ROLE_PERMISSION_TO_ADMIN_FAIL,
  UPDATE_ADMIN_ROLE_REQUEST,
  UPDATE_ADMIN_ROLE_SUCCESS,
  UPDATE_ADMIN_ROLE_FAIL,
  DELETE_ADMIN_ROLE_REQUEST,
  DELETE_ADMIN_ROLE_SUCCESS,
  DELETE_ADMIN_ROLE_FAIL
} from "../../constances/AdminConstance";

///sign up action
export const AdminRegisterAction = (fromData) => async (dispatch,getState) => {
  try {
    const {
      loginState: { userInfo },
    } = getState();
    dispatch({ type: REGISTER_CREATE_REQUEST });
    const { data } = await axios.post(Localhost + "/api/admins/create/sign-up/",fromData,{
      headers: {
        "Content-Type": "application/json",
        Authorization: userInfo?.token?.accesstoken,
      }
    });
    if (data) {
      dispatch({
        type: REGISTER_CREATE_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: REGISTER_CREATE_FAIL,
      payload: error.response.data.message,
    });
  }
};

///otp action
export const registerOtpAction = (otp) => async (dispatch,getState) => {
  try {
    dispatch({ type: OTP_SEND_REQUEST });
    const {
      loginState: { userInfo },
    } = getState();
    const { data } = await axios.put(
      Localhost + `/api/admins/is_verified/phone/otp/${otp}/`,{},
      { headers: {
        "Content-Type": "application/json",
        Authorization: userInfo?.token?.accesstoken,
      }}
    );
    if (data) {
      dispatch({
        type: OTP_SEND_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({ type: OTP_SEND_FAIL, payload: error.response.data.message });
  }
};

//signin action
export const loginAction = (fromData) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_CREATE_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      Localhost + "/api/admins/signin",
      fromData,
      config
    );
    dispatch({
      type: LOGIN_CREATE_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: LOGIN_CREATE_FAIL, payload: error.response.data.message });
  }
};

//forget password action send otp phone
export const forgetPasswordAction = (oldEmail) => async (dispatch) => {
  try {
    dispatch({ type: FORGET_PASSWORD_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      Localhost + "/api/admins/admin/password/reset/",
      { oldEmail },
      config
    );
    dispatch({
      type: FORGET_PASSWORD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FORGET_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

//forget password confirm action
export const forgetPasswordConfirmAction = (fromData) => async (dispatch) => {
  try {
    dispatch({ type: FORGET_PASSWORD_CONFIRM_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      Localhost + "/api/admins/admin/password/reset/verified/",
      fromData,
      config
    );
    dispatch({
      type: FORGET_PASSWORD_CONFIRM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FORGET_PASSWORD_CONFIRM_FAIL,
      payload: error.response.data.message,
    });
  }
};

//user token refresh action
export const userTokenRefreshAction = () => async (dispatch, getState) => {
  try {
    const {
      loginState: { userInfo },
    } = getState();
    dispatch({ type: USER_TOKEN_REFRESH_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: userInfo?.token?.refreshtoken,
      },
    };

    const { data } = await axios.post(
      Localhost + "/api/admins/refresh/token/",
      {},
      config
    );
    dispatch({
      type: USER_TOKEN_REFRESH_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_TOKEN_REFRESH_FAIL,
      payload: error.response.data.message,
    });
  }
};

/// admin logout
export const logoutAction = () => async (dispatch) => {
  dispatch({
    type: LOGOUT_REQUEST_SUCCESS,
  });
  localStorage.removeItem("userInfo");
};

///refresh user reducers action
export const refreshAuthAction = () => async (dispatch) => {
  dispatch({ type: REFRESH_LODDER_AUTH });
};

//update admin profile
export const updateAdminProfileAction =
  (id, fromdata) => async (dispatch, getState) => {
    try {
      const {
        loginState: { userInfo },
      } = getState();
      dispatch({ type: UPDATE_ADMIN_PROFILE_REQUEST });
      const { data } = await axios.put(
        Localhost + `/api/admins/update/admin/profile/${id}/`,
        fromdata,
        {
          headers: {
            Authorization: userInfo?.token?.accesstoken,
          },
        }
      );
      if (data) {
        dispatch({
          type: UPDATE_ADMIN_PROFILE_SUCCESS,
          payload: data,
        });
        localStorage.setItem("userInfo", JSON.stringify(data));
      }
    } catch (error) {
      dispatch({
        type: UPDATE_ADMIN_PROFILE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//update admin email
export const updateAdminEmailAction =
  (dataFrom) => async (dispatch, getState) => {
    try {
      const {
        loginState: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: userInfo?.token?.accesstoken,
        },
      };
      dispatch({ type: UPDATE_ADMIN_EMAIL_REQUEST });
      const { data } = await axios.put(
        Localhost + "/api/admins/update/admin/email/address/",
        dataFrom,
        config
      );
      if (data) {
        dispatch({
          type: UPDATE_ADMIN_EMAIL_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: UPDATE_ADMIN_EMAIL_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//update admin verified email
export const updateAdminEmailVerifiedAction =
  (otp) => async (dispatch, getState) => {
    try {
      const {
        loginState: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: userInfo?.token?.accesstoken,
        },
      };
      dispatch({ type: UPDATE_ADMIN_EMAIL_OTP_REQUEST });
      const { data } = await axios.put(
        Localhost + `/api/admins/update/admin/verified/email/`,
        { otp },
        config
      );
      if (data) {
        dispatch({
          type: UPDATE_ADMIN_EMAIL_OTP_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: UPDATE_ADMIN_EMAIL_OTP_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//update admin password
export const updateAdminPasswordAction =
  (fromData) => async (dispatch, getState) => {
    try {
      const {
        loginState: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: userInfo?.token?.accesstoken,
        },
      };
      dispatch({ type: UPDATE_ADMIN_PASSWORD_REQUEST });
      const { data } = await axios.put(
        Localhost + "/api/admins/update/admin/password/",
        fromData,
        config
      );
      if (data) {
        dispatch({
          type: UPDATE_ADMIN_PASSWORD_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: UPDATE_ADMIN_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  ///get all admin lists
  export const getAllAdminListsAction =
  () => async (dispatch, getState) => {
    try {
      const {
        loginState: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: userInfo?.token?.accesstoken,
        },
      };
      dispatch({ type: GET_ALL_ADMIN_LISTS_REQUEST });
      const { data } = await axios.get(
        Localhost + "/api/admins/get/all/admins",
        config
      );
      if (data) {
        dispatch({
          type: GET_ALL_ADMIN_LISTS_SUCCESS,
          payload: data.admins,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_ALL_ADMIN_LISTS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

    ///delete admin
    export const delteAdminAction =
    (id) => async (dispatch, getState) => {
      console.log('id',id)
      try {
        const {
          loginState: { userInfo },
        } = getState();
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: userInfo?.token?.accesstoken,
          },
        };
        dispatch({ type: DELETE_ADMIN_REQUEST });
        const { data } = await axios.delete(
          Localhost + `/api/admins/delete/admin/${id}/`,
          config
        );
        if (data) {
          dispatch({
            type: DELETE_ADMIN_SUCCESS,
            payload: data.admins,
          });
        }
      } catch (error) {
        dispatch({
          type: DELETE_ADMIN_FAIL,
          payload: error.response.data.message,
        });
      }
    };


  ///get all permission lists
  export const getAllPermissionListsAction =
  () => async (dispatch, getState) => {
    try {
      const {
        loginState: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: userInfo?.token?.accesstoken,
        },
      };
      dispatch({ type: GET_ALL_PERMISSION_LISTS_REQUEST });
      const { data } = await axios.get(
        Localhost + "/api/roles/permissions/get/all/permissions/",
        config
      );
      if (data) {
        dispatch({
          type: GET_ALL_PERMISSION_LISTS_SUCCESS,
          payload: data.permissions,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_ALL_PERMISSION_LISTS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  ///create role
  export const createRoleAction =
  (roleName,permissions) => async (dispatch, getState) => {
    try {
      const {
        loginState: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: userInfo?.token?.accesstoken,
        },
      };
      dispatch({ type:CREATE_ADMIN_ROLE_REQUEST });
      const { data } = await axios.post(
        Localhost + "/api/roles/permissions/create/role/",{roleName,permissions},
        config
      );
      if (data) {
        dispatch({
          type:CREATE_ADMIN_ROLE_SUCCESS,
          payload: data.admins,
        });
      }
    } catch (error) {
      dispatch({
        type:CREATE_ADMIN_ROLE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  ///get all roles lists
  export const getAllRoleListsAction =
  () => async (dispatch, getState) => {
    try {
      const {
        loginState: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: userInfo?.token?.accesstoken,
        },
      };
      dispatch({ type:GET_ALL_ROLE_LISTS_REQUEST });
      const { data } = await axios.get(
        Localhost + "/api/roles/permissions/all/roles",
        config
      );
      if (data) {
        dispatch({
          type:GET_ALL_ROLE_LISTS_SUCCESS,
          payload: data.roles,
        });
      }
    } catch (error) {
      dispatch({
        type:GET_ALL_ROLE_LISTS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

   ///give role permission to admin
   export const givenRolePermissionAction =
   (id,roles) => async (dispatch, getState) => {
     try {
       const {
         loginState: { userInfo },
       } = getState();
       const config = {
         headers: {
           "Content-Type": "application/json",
           Authorization: userInfo?.token?.accesstoken,
         },
       };
       dispatch({ type:GIVEN_ROLE_PERMISSION_TO_ADMIN_REQUEST });
       const { data } = await axios.put(
         Localhost + `/api/roles/permissions/given/admin/role/permission/${id}/`,{roles},
         config
       );
       if (data) {
         dispatch({
           type:GIVEN_ROLE_PERMISSION_TO_ADMIN_SUCCESS,
           payload: data.roles,
         });
       }
     } catch (error) {
       dispatch({
         type:GIVEN_ROLE_PERMISSION_TO_ADMIN_FAIL,
         payload: error.response.data.message,
       });
     }
   };


  ///update role
  export const updateRoleAction =
   (id,roleName,permissions) => async (dispatch, getState) => {
     try {
       const {
         loginState: { userInfo },
       } = getState();
       const config = {
         headers: {
           "Content-Type": "application/json",
           Authorization: userInfo?.token?.accesstoken,
         },
       };
       dispatch({ type:UPDATE_ADMIN_ROLE_REQUEST });
       const { data } = await axios.put(
         Localhost + `/api/roles/permissions/update/role/${id}/`,{roleName,permissions},
         config
       );
       if (data) {
         dispatch({
           type:UPDATE_ADMIN_ROLE_SUCCESS,
           payload: data,
         });
       }
     } catch (error) {
       dispatch({
         type:UPDATE_ADMIN_ROLE_FAIL,
         payload: error.response.data.message,
       });
     }
   };

   ///delete role
   export const deleteRoleAction =
   (id) => async (dispatch, getState) => {
     try {
       const {
         loginState: { userInfo },
       } = getState();
       const config = {
         headers: {
           "Content-Type": "application/json",
           Authorization: userInfo?.token?.accesstoken,
         },
       };
       dispatch({ type:DELETE_ADMIN_ROLE_REQUEST });
       const { data } = await axios.delete(
         Localhost + `/api/roles/permissions/delete/role/${id}/`,config);
       if (data) {
         dispatch({
           type:DELETE_ADMIN_ROLE_SUCCESS,
           payload: data,
         });
       }
     } catch (error) {
       dispatch({
         type:DELETE_ADMIN_ROLE_FAIL,
         payload: error.response.data.message,
       });
     }
   };