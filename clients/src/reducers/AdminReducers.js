import {
  UPDATE_ADMIN_PROFILE_REQUEST,
  UPDATE_ADMIN_PROFILE_SUCCESS,
  UPDATE_ADMIN_PROFILE_FAIL,
  REFRESH_LODDER_AUTH,
  REGISTER_CREATE_FAIL,
  REGISTER_CREATE_REQUEST,
  REGISTER_CREATE_SUCCESS,
  LOGIN_CREATE_FAIL,
  LOGIN_CREATE_REQUEST,
  LOGIN_CREATE_SUCCESS,
  OTP_SEND_REQUEST,
  OTP_SEND_SUCCESS,
  OTP_SEND_FAIL,
  DELETE_ADMIN_REQUEST,
  DELETE_ADMIN_SUCCESS,
  DELETE_ADMIN_FAIL,
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
  UPDATE_ADMIN_EMAIL_REQUEST,
  UPDATE_ADMIN_EMAIL_SUCCESS,
  UPDATE_ADMIN_EMAIL_FAIL,
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
  DELETE_ADMIN_ROLE_FAIL,
} from "../constances/AdminConstance";

// signup reducers
export const registerReducers = (
  state = {
    userRegisterInfo: {},
    allAdminLists: [],
    allPermissionLists: [],
    allRoleLists: [],
  },
  action
) => {
  switch (action.type) {
    case REGISTER_CREATE_REQUEST:
    case OTP_SEND_REQUEST:
    case GET_ALL_ADMIN_LISTS_REQUEST:
    case GET_ALL_PERMISSION_LISTS_REQUEST:
    case CREATE_ADMIN_ROLE_REQUEST:
    case DELETE_ADMIN_REQUEST:
    case GET_ALL_ROLE_LISTS_REQUEST:
    case GIVEN_ROLE_PERMISSION_TO_ADMIN_REQUEST:
    case UPDATE_ADMIN_ROLE_REQUEST:
    case DELETE_ADMIN_ROLE_REQUEST:
      return {
        ...state,
        lodding: true,
        isRegister: false,
        isUserOtp: false,
        isAdminDelete: false,
        isRoleCreate: false,
        isRolePermission: false,
        isRoleUpdate:false,
        isRoleDelete:false
      };
    case GET_ALL_ADMIN_LISTS_SUCCESS:
      return {
        ...state,
        lodding: false,
        allAdminLists: action.payload,
      };
    case REGISTER_CREATE_SUCCESS:
      return {
        ...state,
        lodding: false,
        isRegister: true,
        userRegisterInfo: action.payload,
      };
    case OTP_SEND_SUCCESS:
      return {
        ...state,
        lodding: false,
        isUserOtp: true,
        userRegisterInfo: null,
      };
    case GET_ALL_PERMISSION_LISTS_SUCCESS:
      return {
        ...state,
        lodding: false,
        allPermissionLists: action.payload,
      };
    case CREATE_ADMIN_ROLE_SUCCESS:
      return {
        ...state,
        lodding: false,
        isRoleCreate: true,
      };
    case DELETE_ADMIN_SUCCESS:
      return {
        ...state,
        lodding: false,
        isAdminDelete: true,
        allAdminLists: action.payload,
      };
    case GET_ALL_ROLE_LISTS_SUCCESS:
      return {
        ...state,
        lodding: false,
        allRoleLists: action.payload,
      };
    case GIVEN_ROLE_PERMISSION_TO_ADMIN_SUCCESS:
      return {
        ...state,
        lodding: false,
        isRolePermission: true,
      };
    case UPDATE_ADMIN_ROLE_SUCCESS:
      return {
        ...state,
        lodding: false,
        isRoleUpdate: true,
      };
    case DELETE_ADMIN_ROLE_SUCCESS:
      return {
        ...state,
        lodding: false,
        isRoleDelete: true,
      };
    case REGISTER_CREATE_FAIL:
    case OTP_SEND_FAIL:
    case GET_ALL_ADMIN_LISTS_FAIL:
    case GET_ALL_PERMISSION_LISTS_FAIL:
    case CREATE_ADMIN_ROLE_FAIL:
    case DELETE_ADMIN_FAIL:
    case GET_ALL_ROLE_LISTS_FAIL:
    case GIVEN_ROLE_PERMISSION_TO_ADMIN_FAIL:
    case UPDATE_ADMIN_ROLE_FAIL:
    case DELETE_ADMIN_ROLE_FAIL:
      return {
        ...state,
        lodding: false,
        isRegister: false,
        isRoleCreate: false,
        userRegister: null,
        isUserOtp: false,
        isRolePermission: false,
        isRoleUpdate:false,
        isRoleDelete:false,
        error: action.payload,
      };
    case REFRESH_LODDER_AUTH:
      return {
        ...state,
        lodding: false,
        isRegister: false,
        userRegister: null,
        isUserOtp: false,
        isAdminDelete: false,
        isRoleCreate: false,
        isRolePermission: false,
        isRoleUpdate:false,
        isRoleDelete:false,
        error: null,
      };
    default:
      return state;
  }
};

//signin reducers
export const loginReducers = (state = { userInfo: {} }, action) => {
  switch (action.type) {
    case LOGIN_CREATE_REQUEST:
    case FORGET_PASSWORD_REQUEST:
    case FORGET_PASSWORD_CONFIRM_REQUEST:
    case USER_TOKEN_REFRESH_REQUEST:
    case UPDATE_ADMIN_PROFILE_REQUEST:
    case UPDATE_ADMIN_EMAIL_REQUEST:
    case UPDATE_ADMIN_EMAIL_OTP_REQUEST:
    case UPDATE_ADMIN_PASSWORD_REQUEST:
      return {
        ...state,
        lodding: true,
        isLogin: false,
        isForgetPassword: false,
        isForgetPasswordConfirm: false,
        isProfileUpdate: false,
        isPasswordUpdate: false,
        isEmailUpdate: false,
        isEmailUpdateConfirm: false,
      };
    case LOGIN_CREATE_SUCCESS:
      return {
        ...state,
        lodding: false,
        isLogin: true,
        userInfo: action.payload,
      };
    case UPDATE_ADMIN_PROFILE_SUCCESS:
      return {
        ...state,
        lodding: false,
        isProfileUpdate: true,
        userInfo: action.payload,
      };
    case USER_TOKEN_REFRESH_SUCCESS:
      return {
        ...state,
        lodding: false,
        userInfo: action.payload,
      };
    case UPDATE_ADMIN_EMAIL_SUCCESS:
      return {
        ...state,
        lodding: false,
        isEmailUpdate: true,
      };
    case UPDATE_ADMIN_EMAIL_OTP_SUCCESS:
      return {
        ...state,
        lodding: false,
        isEmailUpdateConfirm: true,
      };
    case UPDATE_ADMIN_PASSWORD_SUCCESS:
      return {
        ...state,
        lodding: false,
        isPasswordUpdate: true,
      };
    case FORGET_PASSWORD_SUCCESS:
      return {
        ...state,
        lodding: false,
        isForgetPassword: true,
      };
    case FORGET_PASSWORD_CONFIRM_SUCCESS:
      return {
        ...state,
        lodding: false,
        isForgetPasswordConfirm: true,
      };
    case LOGOUT_REQUEST_SUCCESS:
      return {
        lodding: false,
        isLogin: false,
        isForgetPassword: false,
        isLogout: true,
        isForgetPasswordConfirm: false,
        error: null,
        userInfo: null,
      };
    case LOGIN_CREATE_FAIL:
    case FORGET_PASSWORD_FAIL:
    case FORGET_PASSWORD_CONFIRM_FAIL:
    case USER_TOKEN_REFRESH_FAIL:
    case UPDATE_ADMIN_PROFILE_FAIL:
    case UPDATE_ADMIN_EMAIL_FAIL:
    case UPDATE_ADMIN_EMAIL_OTP_FAIL:
    case UPDATE_ADMIN_PASSWORD_FAIL:
      return {
        ...state,
        lodding: false,
        isLogin: false,
        error: action.payload,
        isForgetPassword: false,
        isForgetPasswordConfirm: false,
        isProfileUpdate: false,
        isPasswordUpdate: false,
        isEmailUpdate: false,
        isEmailUpdateConfirm: false,
      };
    case REFRESH_LODDER_AUTH:
      return {
        ...state,
        lodding: false,
        isLogin: false,
        isForgetPassword: false,
        isForgetPasswordConfirm: false,
        isLogout: false,
        isProfileUpdate: false,
        isPasswordUpdate: false,
        isEmailUpdate: false,
        isEmailUpdateConfirm: false,
        error: null,
      };
    default:
      return state;
  }
};
