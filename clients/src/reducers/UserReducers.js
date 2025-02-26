import {
  USER_SIGN_UP_OTP_REQUEST,
  USER_SIGN_UP_OTP_SUCCESS,
  USER_SIGN_UP_OTP_FAIL,
  USER_SING_UP_FAIL,
  USER_SIGN_UP_REQUEST,
  USER_SIGN_UP_SUCCESS,
  USER_SING_IN_FAIL,
  USER_SIGN_IN_REQUEST,
  USER_SIGN_IN_SUCCESS,
  REFRESH_CLIENT_REQUEST,
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
  USER_LOGOUT_REQUEST_SUCCESS,
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

} from "../constances/UserConstance";

export const UserReducers = (
  state = { clientInfo: {}, clientProfile: {}, otp_store: {} },
  action
) => {
  switch (action.type) {
    case USER_SIGN_UP_REQUEST:
    case USER_SIGN_UP_OTP_REQUEST:
    case GET_CLIENT_PROFILE_REQUEST:
    case UPDATE_CLIENT_PROFILE_REQUEST:
    case USER_SIGN_IN_REQUEST:
    case USER_FORGET_PASSWORD_REQUEST_REQUEST:
    case USER_FORGET_PASSWORD_REQUEST_VALIDATE_REQUEST:
      return {
        ...state,
        lodding: true,
        isUpdateClient: false,
        isRegister: false,
        isOtp: false,
        isLogout: false,
        isLogin: false,
        isForgetRequst: false,
        isForgetValidate: false,
      };
    case USER_SIGN_UP_SUCCESS:
      return {
        ...state,
        lodding: false,
        isRegister: true,
        clientInfo: action.payload,
      };
    case USER_SIGN_UP_OTP_SUCCESS:
      return {
        ...state,
        lodding: false,
        isOtp: true,
        clientInfo: action.payload,
      };
    case UPDATE_CLIENT_PROFILE_SUCCESS:
      return {
        ...state,
        lodding: false,
        isUpdateClient: true,
      };
    case GET_CLIENT_PROFILE_SUCCESS:
      return {
        ...state,
        lodding: false,
        clientProfile: action.payload,
      };
    case USER_SIGN_IN_SUCCESS:
      return {
        ...state,
        lodding: false,
        isLogin: true,
        clientInfo: action.payload,
      };
    case USER_FORGET_PASSWORD_REQUEST_SUCCESS:
      return {
        ...state,
        lodding: false,
        isForgetRequst: true,
        clientInfo: action.payload,
      };
    case USER_FORGET_PASSWORD_REQUEST_VALIDATE_SUCCESS:
      return {
        ...state,
        lodding: false,
        isForgetValidate: true,
        clientInfo: action.payload,
      };
    case USER_LOGOUT_REQUEST_SUCCESS:
      return {
        lodding: false,
        isUpdateClient: false,
        isConfirmClient: false,
        isRegister: false,
        error: null,
        clientInfo: null,
        isLogout: true,
      };
    case USER_OTP_COUNT_SUCCESS:
      return {
        ...state,
        lodding: false,
        otp_store: action.payload,
      };
    case USER_SING_UP_FAIL:
    case USER_SIGN_UP_OTP_FAIL:
    case GET_CLIENT_PROFILE_FAIL:
    case UPDATE_CLIENT_PROFILE_FAIL:
    case USER_SING_IN_FAIL:
    case USER_FORGET_PASSWORD_REQUEST_FAIL:
    case USER_FORGET_PASSWORD_REQUEST_VALIDATE_FAIL:
      return {
        ...state,
        lodding: false,
        isUpdateClient: false,
        isOtp: false,
        isRegister: false,
        isLogin: false,
        isForgetRequst: false,
        isForgetValidate: false,
        error: action.payload,
      };
    case REFRESH_CLIENT_REQUEST:
      return {
        ...state,
        lodding: false,
        error: null,
        isUpdateClient: false,
        isConfirmClient: false,
        isRegister: false,
        isLogout: false,
        isLogin: false,
        isOtp: false,
        isForgetRequst: false,
        isForgetValidate: false,
      };
    default:
      return state;
  }
};

export const contractReducers = (state = {}, action) => {
  switch (action.type) {
    case SEND_MESSAGE_CLIENT_TO_ADMIN_REQUEST:
      return {
        ...state,
        lodding: true,
        iClientSend: false,
      };
    case SEND_MESSAGE_CLIENT_TO_ADMIN_SUCCESS:
      return {
        ...state,
        lodding: false,
        iClientSend: true,
      };
    case SEND_MESSAGE_CLIENT_TO_ADMIN_FAIL:
      return {
        ...state,
        lodding: false,
        iClientSend: false,
        error: action.payload,
      };
    case REFRESH_CONTRACT_MESSAGE_REQURST:
      return {
        ...state,
        lodding: false,
        iClientSend: false,
        error: null,
      };
    default:
      return state;
  }
};

export const ServicesWrokersReducers = (
  state = { ServiceWorkers: [], WorkerServices: [] },
  action
) => {
  switch (action.type) {
    case FIND_SERVICE_TO_WORKERS_REQUEST:
    case FIND_WORKERS_TO_SERVICES_REQUEST:
      return {
        ...state,
        lodding: true,
      };
    case FIND_SERVICE_TO_WORKERS_SUCCESS:
      return {
        ...state,
        lodding: false,
        ServiceWorkers: action.payload,
      };
    case FIND_WORKERS_TO_SERVICES_SUCCESS:
      return {
        ...state,
        lodding: false,
        WorkerServices: action.payload,
      };
    case FIND_SERVICE_TO_WORKERS_FAIL:
    case FIND_WORKERS_TO_SERVICES_FAIL:
      return {
        ...state,
        lodding: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const WorkerApplyReducers = (
  state = { getallapplyresume: [], getsingleapplyresume: {} },
  action
) => {
  switch (action.type) {
    case WORKER_APPLY_CREATE_REQUEST:
    case GET_WORKER_APPLY_SINGLE_RESUME_REQUEST:
    case GET_WORKER_APPLY_ALL_RESUME_REQUEST:
    case DELETE_WORKER_RESUME_ESUME_REQUEST:
    case WORKER_RESUME_ARUP_REQUEST:
      return {
        ...state,
        lodding: true,
        isapply: false,
        isArupResume:false,
        isapplyDelete: false,
      };
    case WORKER_APPLY_CREATE_SUCCESS:
      return {
        ...state,
        lodding: false,
        isapply: true,
      };
    case GET_WORKER_APPLY_SINGLE_RESUME_SUCCESS:
      return {
        ...state,
        lodding: false,
        getsingleapplyresume: action.payload,
      };
    case GET_WORKER_APPLY_ALL_RESUME_SUCCESS:
      return {
        ...state,
        lodding: false,
        getallapplyresume: action.payload,
      };
    case WORKER_RESUME_ARUP_SUCCESS:
      return{
          ...state,
          lodding: false,
          isArupResume: true,
      }
    case DELETE_WORKER_RESUME_ESUME_SUCCESS:
      return {
        ...state,
        lodding: false,
        isapplyDelete: true,
      };
    case WORKER_APPLY_CREATE_FAIL:
    case GET_WORKER_APPLY_SINGLE_RESUME_FAIL:
    case GET_WORKER_APPLY_ALL_RESUME_FAIL:
    case DELETE_WORKER_RESUME_ESUME_FAIL:
      case WORKER_RESUME_ARUP_FAIL:
      return {
        ...state,
        lodding: false,
        isapply: false,
        isArupResume:false,
        isapplyDelete: false,
        error: action.payload,
      };
    case WORKER_APPLY_RESET:
      return {
        ...state,
        lodding: false,
        isapply: false,
        isapplyDelete: false,
        isArupResume:false,
        error: null,
      };
    default:
      return state;
  }
};
