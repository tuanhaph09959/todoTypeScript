import {
  FETCH_DELETE_ERROR,
  FETCH_DELETE_REQUEST,
  FETCH_DELETE_SUCCESS,
  FETCH_GET_ERROR,
  FETCH_GET_REQUEST,
  FETCH_GET_SUCCESS,
  FETCH_POST_ERROR,
  FETCH_POST_REQUEST,
  FETCH_POST_SUCCESS,
  FETCH_PUT_ERROR,
  FETCH_PUT_REQUEST,
  FETCH_PUT_SUCCESS,
} from './Constants';

interface props {
  requesting?: boolean;
  success?: boolean;
  message?: string;
  data?: [];
}
const initialState: props = {
  requesting: false,
  success: false,
  message: '',
  data: [],
};

const Todo = (state = initialState, payload: any) => {
  switch (payload.type) {
    case FETCH_GET_REQUEST:
      return {
        ...state,
        requesting: true,
      };
    case FETCH_GET_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
        data: payload.data,
      };
    case FETCH_GET_ERROR:
      return {
        ...state,
        requesting: false,
        message: payload.message,
      };
    case FETCH_POST_REQUEST:
      return {
        ...state,
        requesting: true,
      };
    case FETCH_POST_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
      };
    case FETCH_POST_ERROR:
      return {
        ...state,
        requesting: false,
        message: payload.message,
      };
    case FETCH_PUT_REQUEST:
      return {
        ...state,
        requesting: true,
      };
    case FETCH_PUT_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
      };
    case FETCH_PUT_ERROR:
      return {
        ...state,
        requesting: false,
        message: payload.message,
      };
    case FETCH_DELETE_REQUEST:
      return {
        ...state,
        requesting: true,
      };
    case FETCH_DELETE_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
      };
    case FETCH_DELETE_ERROR:
      return {
        ...state,
        requesting: false,
        message: payload.message,
      };

    default:
      return state;
  }
};

export default Todo;
