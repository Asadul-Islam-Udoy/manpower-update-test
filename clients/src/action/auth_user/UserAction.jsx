import axios from "axios";
import { Localhost } from "../host/HostConnection";
import {
  USER_SING_UP_FAIL,
  USER_SIGN_UP_REQUEST,
  USER_SIGN_UP_SUCCESS,
  USER_SIGN_UP_OTP_REQUEST,
  USER_SIGN_UP_OTP_SUCCESS,
  USER_SIGN_UP_OTP_FAIL,
  USER_SING_IN_FAIL,
  USER_SIGN_IN_REQUEST,
  USER_SIGN_IN_SUCCESS,
  REFRESH_CLIENT_REQUEST,
  USER_LOGOUT_REQUEST_SUCCESS,
  USER_FORGET_PASSWORD_REQUEST_REQUEST,
  USER_FORGET_PASSWORD_REQUEST_SUCCESS,
  USER_FORGET_PASSWORD_REQUEST_FAIL,
  USER_FORGET_PASSWORD_REQUEST_VALIDATE_REQUEST,
  USER_FORGET_PASSWORD_REQUEST_VALIDATE_SUCCESS,
  USER_FORGET_PASSWORD_REQUEST_VALIDATE_FAIL,
  USER_OTP_COUNT_SUCCESS,
  GET_CLIENT_PROFILE_SUCCESS,
  GET_CLIENT_PROFILE_REQUEST,
  GET_CLIENT_PROFILE_FAIL,
  UPDATE_CLIENT_PROFILE_REQUEST,
  UPDATE_CLIENT_PROFILE_SUCCESS,
  UPDATE_CLIENT_PROFILE_FAIL,
  SEND_MESSAGE_CLIENT_TO_ADMIN_REQUEST,
  SEND_MESSAGE_CLIENT_TO_ADMIN_SUCCESS,
  SEND_MESSAGE_CLIENT_TO_ADMIN_FAIL,
  REFRESH_CONTRACT_MESSAGE_REQURST,
  FIND_SERVICE_TO_WORKERS_REQUEST,
  FIND_SERVICE_TO_WORKERS_SUCCESS,
  FIND_SERVICE_TO_WORKERS_FAIL,
  FIND_WORKERS_TO_SERVICES_REQUEST,
  FIND_WORKERS_TO_SERVICES_SUCCESS,
  FIND_WORKERS_TO_SERVICES_FAIL,
  WORKER_APPLY_CREATE_REQUEST,
  WORKER_APPLY_CREATE_SUCCESS,
  WORKER_APPLY_CREATE_FAIL,
  WORKER_APPLY_RESET,
  GET_WORKER_APPLY_ALL_RESUME_REQUEST,
  GET_WORKER_APPLY_ALL_RESUME_SUCCESS,
  GET_WORKER_APPLY_ALL_RESUME_FAIL,
  GET_WORKER_APPLY_SINGLE_RESUME_REQUEST,
  GET_WORKER_APPLY_SINGLE_RESUME_SUCCESS,
  GET_WORKER_APPLY_SINGLE_RESUME_FAIL,
  DELETE_WORKER_RESUME_ESUME_REQUEST,
  DELETE_WORKER_RESUME_ESUME_SUCCESS,
  DELETE_WORKER_RESUME_ESUME_FAIL,
  WORKER_RESUME_ARUP_REQUEST,
  WORKER_RESUME_ARUP_SUCCESS,
  WORKER_RESUME_ARUP_FAIL,
} from "../../constances/UserConstance";

//user sign up action
export const UserSignUpAction =
  (fromdata) => async (dispatch) => {
    try {
      dispatch({ type: USER_SIGN_UP_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        Localhost + "/api/users/user/sign-up",
        fromdata,
        config
      );
      if (data) {
        dispatch({
          type:  USER_SIGN_UP_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: USER_SING_UP_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//user sign up verified to the email
export const UserSignUpOtpAction = (otp) => async (dispatch) => {
  try {
    dispatch({ type: USER_SIGN_UP_OTP_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      Localhost + "/api/users/signup/phone_email/verified",
      { otp },
      config
    );
    if (data) {
      dispatch({
        type: USER_SIGN_UP_OTP_SUCCESS,
        payload: data,
      });
      localStorage.setItem("clientInfo", JSON.stringify(data));
    }
  } catch (error) {
    dispatch({
      type: USER_SIGN_UP_OTP_FAIL,
      payload: error.response.data.message,
    });
  }
};

//user sign in action
export const UserSignInAction =
  (fromdata) => async (dispatch) => {
    try {
      dispatch({ type: USER_SIGN_IN_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        Localhost + "/api/users/user/sign-in",
        fromdata,
        config
      );
      if (data) {
        dispatch({
          type:  USER_SIGN_IN_SUCCESS,
          payload: data,
        });
        localStorage.setItem("clientInfo", JSON.stringify(data));
      }
    } catch (error) {
      dispatch({
        type: USER_SING_IN_FAIL,
        payload: error.response.data.message,
      });
    }
  };



/// user logout
export const UserlogoutAction = () => async (dispatch) => {
  dispatch({
    type: USER_LOGOUT_REQUEST_SUCCESS,
  });
  localStorage.removeItem("clientInfo");
};


//user forget password request action
export const UserForgetPasswordRequestAction =
  (phone_or_email) => async (dispatch) => {
    console.log('phone_or_email',phone_or_email)
    try {
      dispatch({ type: USER_FORGET_PASSWORD_REQUEST_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        Localhost + "/api/users/user/forget/password/request/",
        {phone_or_email},
        config
      );
      if (data) {
        dispatch({
          type:  USER_FORGET_PASSWORD_REQUEST_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: USER_FORGET_PASSWORD_REQUEST_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  //user forget password request action
  export const UserForgetPasswordRequestValidateAction =
  (otp,newPassword) => async (dispatch) => {
    try {
      dispatch({ type: USER_FORGET_PASSWORD_REQUEST_VALIDATE_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        Localhost + "/api/users/user/forget/password/request/confirm",
        {otp,newPassword},
        config
      );
      if (data) {
        dispatch({
          type:  USER_FORGET_PASSWORD_REQUEST_VALIDATE_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: USER_FORGET_PASSWORD_REQUEST_VALIDATE_FAIL,
        payload: error.response.data.message,
      });
    }
  };


//worker create confrim
export const GetClientProfileAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_CLIENT_PROFILE_REQUEST });
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
      Localhost + `/api/clients/get/unique/client/profile/${id}/`,
      config
    );
    console.log("data", data);
    if (data) {
      dispatch({
        type: GET_CLIENT_PROFILE_SUCCESS,
        payload: data.client,
      });
    }
  } catch (error) {
    console.log("er", error);
    dispatch({
      type: GET_CLIENT_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//update client profile
export const UpdateClientProfileAction =
  (id, fromdata) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_CLIENT_PROFILE_REQUEST });
      const {
        userLoginState: { clientInfo },
      } = getState();
      const { data } = await axios.put(
        Localhost + `/api/clients/update/client/profile/${id}/`,
        fromdata,
        {
          headers: {
            Authorization: clientInfo?.token?.accesstoken,
          },
        }
      );
      if (data) {
        dispatch({
          type: UPDATE_CLIENT_PROFILE_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: UPDATE_CLIENT_PROFILE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//update client profile
export const SendMessageClientToAdminAction =
  (id, fromdata) => async (dispatch, getState) => {
    try {
      dispatch({ type: SEND_MESSAGE_CLIENT_TO_ADMIN_REQUEST });
      const {
        userLoginState: { clientInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: clientInfo?.token?.accesstoken,
        },
      };
      const { data } = await axios.post(
        Localhost + `/api/contracts/client/send/${id}`,
        fromdata,
        config
      );
      if (data) {
        dispatch({
          type: SEND_MESSAGE_CLIENT_TO_ADMIN_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: SEND_MESSAGE_CLIENT_TO_ADMIN_FAIL,
        payload: error.response.data.message,
      });
    }
  };



//find service to workers
export const FindServiceToWorkersAction = (serviceId) => async (dispatch) => {
  try {
   
    dispatch({ type: FIND_SERVICE_TO_WORKERS_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(Localhost + `/api/workers/find/services/workers/${serviceId}/`,config
    );
    if (data) {
      dispatch({
        type: FIND_SERVICE_TO_WORKERS_SUCCESS,
        payload: data.workerLists,
      });
    }
  } catch (error) {
    dispatch({
      type: FIND_SERVICE_TO_WORKERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

///find workers to services
export const FindWorkersToServiceAction =
  (workerProfileId) => async (dispatch) => {
    try {
      dispatch({ type: FIND_WORKERS_TO_SERVICES_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get(
        Localhost + `/api/workers/find/workers/services/${workerProfileId}`,
        config
      );
      if (data) {
        dispatch({
          type: FIND_WORKERS_TO_SERVICES_SUCCESS,
          payload: data.servicesLists,
        });
      }
    } catch (error) {
      dispatch({
        type: FIND_WORKERS_TO_SERVICES_FAIL,
        payload: error.response.data.message,
      });
    }
  };

///worker apply create action
export const WorkerApplyCreateAction =
  (datafrom) => async (dispatch, getState) => {
    try {
      const {
        userLoginState: { clientInfo },
      } = getState();
      dispatch({ type: WORKER_APPLY_CREATE_REQUEST });
      const { data } = await axios.post(
        Localhost + "/api/workers/apply/worker/",
        datafrom,
        {
          headers: {
            Authorization: clientInfo?.token?.accesstoken,
          },
        }
      );
      if (data) {
        dispatch({
          type: WORKER_APPLY_CREATE_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: WORKER_APPLY_CREATE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

///get all worker resumes
export const GetAllResumeAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_WORKER_APPLY_ALL_RESUME_REQUEST });
    const{loginState:{userInfo}}  = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: userInfo?.token?.accesstoken,
      },
    };
    const { data } = await axios.get(
      Localhost + "/api/workers/get/all/resumes",
      config
    );
    if (data) {
      dispatch({
        type: GET_WORKER_APPLY_ALL_RESUME_SUCCESS,
        payload: data.resumes,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_WORKER_APPLY_ALL_RESUME_FAIL,
      payload: error.response.data.message,
    });
  }
};

///get single worker resume
export const GetSingleResumeAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_WORKER_APPLY_SINGLE_RESUME_REQUEST });
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
      Localhost + `/api/workers/get/single/resume/${id}/`,
      config
    );
    if (data) {
      dispatch({
        type: GET_WORKER_APPLY_SINGLE_RESUME_SUCCESS,
        payload: data.resume,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_WORKER_APPLY_SINGLE_RESUME_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const ArupResumeAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: WORKER_RESUME_ARUP_REQUEST });
    const{loginState:{userInfo}}  = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: userInfo?.token?.accesstoken,
      },
    };
    const { data } = await axios.put(
      Localhost + `/api/workers/resume/arup/${id}/`,{},
      config
    );
    if (data) {
      dispatch({
        type: WORKER_RESUME_ARUP_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: WORKER_RESUME_ARUP_FAIL,
      payload: error.response.data.message,
    });
  }
};

///delete worker resumes
export const DeleteResumeAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_WORKER_RESUME_ESUME_REQUEST });
    const{loginState:{userInfo}}  = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: userInfo?.token?.accesstoken,
      },
    };
    const { data } = await axios.delete(
      Localhost + `/api/workers/delete/resume/${id}`,
      config
    );
    if (data) {
      dispatch({
        type: DELETE_WORKER_RESUME_ESUME_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: DELETE_WORKER_RESUME_ESUME_FAIL,
      payload: error.response.data.message,
    });
  }
};

///worker apply reset
export const WorkerRefreshAction = () => async (dispatch) => {
  dispatch({ type: WORKER_APPLY_RESET });
};

///contract reducers action
export const ContractRefreshAction = () => async (dispatch) => {
  dispatch({ type: REFRESH_CONTRACT_MESSAGE_REQURST });
};

///refresh user reducers action
export const UserRefreshAction = () => async (dispatch) => {
  dispatch({ type: REFRESH_CLIENT_REQUEST });
};


///refresh user reducers action
export const OtpCountSecurityAction = (otp=0,expiresTime=null) => async (dispatch) => {
  dispatch({ type: USER_OTP_COUNT_SUCCESS });
  const data={
    otp,
    expiresTime
  }
  localStorage.setItem('otp_store',JSON.stringify(data))
};
