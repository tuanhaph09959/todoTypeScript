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
import axiosClient from '../../config';

export const GetDATA = () => async (dispatch: any) => {
  try {
    dispatch({type: FETCH_GET_REQUEST});
    const url = '/users';
    const response = await axiosClient.get(url);

    dispatch({
      type: FETCH_GET_SUCCESS,
      data: response,
    });
  } catch (error) {
    dispatch({
      type: FETCH_GET_ERROR,
      message: 'loi roi ',
    });
  }
};
export const PostDATA =
  (createdAt: string, title: string, content: string) =>
  async (dispatch: any) => {
    try {
      dispatch({type: FETCH_POST_REQUEST});
      const url = '/users';
      const data = JSON.stringify({
        createdAt,
        title,
        content,
      });
      const response = await axiosClient.post(url, data);
      console.log(response);
      dispatch({
        type: FETCH_POST_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: FETCH_POST_ERROR,
        message: 'loi roi ',
      });
    }
  };
export const PutDATA =
  (createdAt: string, title: string, content: string, id: string) =>
  async (dispatch: any) => {
    try {
      dispatch({type: FETCH_PUT_REQUEST});
      const url = `/users/${id}`;
      const data = JSON.stringify({
        createdAt,
        title,
        content,
      });
      const response = await axiosClient.put(url, data);
      console.log(response);
      dispatch({
        type: FETCH_PUT_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: FETCH_PUT_ERROR,
        message: 'loi roi ',
      });
    }
  };
export const DeleteDATA = (id: string) => async (dispatch: any) => {
  try {
    dispatch({type: FETCH_DELETE_REQUEST});
    const url = `/users/${id}`;

    const response = await axiosClient.delete(url);
    console.log(response);
    dispatch({
      type: FETCH_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: FETCH_DELETE_ERROR,
      message: 'loi roi ',
    });
  }
};
