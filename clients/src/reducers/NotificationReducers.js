import {
  SEND_GROUP_NOTIFICATION_FAIL,
  SEND_GROUP_NOTIFICATION_REQUEST,
  SEND_GROUP_NOTIFICATION_SUCCESS,
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
  UPDATE_NOTIFICATION_BY_ADMIN_FAIL,
} from "../constances/NotificationConstance";

export const NotificationReducers = (
  state = { allnotification: [], singlenotification: {} },
  action
) => {
  switch (action.type) {
    case SEND_GROUP_NOTIFICATION_REQUEST:
    case SEND_SINGLE_NOTIFICATION_REQUEST:
    case GET_ALL_NOTIFICATION_REQUEST:
    case GET_SINGLE_USER_NOTIFICATION_REQUEST:
    case DLELETE_NOTIFICATION_BY_ADMIN_REQUEST:
    case DLELETE_NOTIFICATION_BY_USER_REQUEST:
    case UPDATE_NOTIFICATION_BY_ADMIN_REQUEST:
      return {
        ...state,
        lodding: true,
        isSingleNoti: false,
        isGroupNoti: false,
        isDeletleNotiA: false,
        isDeletleNotiU: false,
        isUpdateNoti: false,
      };
    case GET_ALL_NOTIFICATION_SUCCESS:
      return {
        ...state,
        lodding: false,
        allnotification: action.payload,
      };
    case SEND_GROUP_NOTIFICATION_SUCCESS:
      return {
        ...state,
        lodding: false,
        allnotification: action.payload,
        isGroupNoti: true,
      };
    case SEND_SINGLE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        lodding: false,
        allnotification: action.payload,
        isSingleNoti: true,
      };
    case GET_SINGLE_USER_NOTIFICATION_SUCCESS:
      return {
        ...state,
        lodding: false,
        singlenotification: action.payload,
      };
    case DLELETE_NOTIFICATION_BY_ADMIN_SUCCESS:
      return {
        ...state,
        lodding: false,
        isDeletleNotiA: true,
        singlenotification: action.payload,
      };
    case DLELETE_NOTIFICATION_BY_USER_SUCCESS:
      return {
        ...state,
        lodding: false,
        isDeletleNotiU: true,
        singlenotification: action.payload,
      };
    case UPDATE_NOTIFICATION_BY_ADMIN_SUCCESS:
      return {
        ...state,
        lodding: false,
        isUpdateNoti: true,
        singlenotification: action.payload,
      };
    case SEND_GROUP_NOTIFICATION_FAIL:
    case SEND_SINGLE_NOTIFICATION_FAIL:
    case GET_ALL_NOTIFICATION_FAIL:
    case GET_SINGLE_USER_NOTIFICATION_FAIL:
    case DLELETE_NOTIFICATION_BY_ADMIN_FAIL:
    case DLELETE_NOTIFICATION_BY_USER_FAIL:
    case UPDATE_NOTIFICATION_BY_ADMIN_FAIL:
      return {
        ...state,
        lodding: false,
        error: action.payload,
        isGroupNoti: false,
        isSingleNoti: false,
        isDeletleNotiU: false,
        isDeletleNotiA: false,
        isUpdateNoti: false,
      };
    case REFRESH_NOTIFICATION_REQUEST:
      return {
        ...state,
        lodding: false,
        isGroupNoti: false,
        isSingleNoti: false,
        isDeletleNotiU: false,
        isDeletleNotiA: false,
        isUpdateNoti: false,
        error: null,
      };
    default:
      return state;
  }
};
