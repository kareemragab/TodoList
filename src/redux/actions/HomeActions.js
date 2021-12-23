import {getSavedTodos} from '../../localStorage/AsyncStorage';
import {
  HOME_GET_DATA_ATTEMPT,
  HOME_GET_DATA_SUCCESS,
  HOME_GET_DATA_FAILED,
  HOME_CLEAR_DATA_ARRAY,
  HOME_CLEAR_DATA,
} from '../types';

import {getHomeData} from './../../services/APIs';

export const HomeGetData = type => {
  return async (dispatch, getState) => {
    await dispatch({type: HOME_CLEAR_DATA_ARRAY});
    await dispatch({type: HOME_GET_DATA_ATTEMPT, payload: {Type: type}});
    let savedTodos = [];
    getSavedTodos(todos => {
      savedTodos = [...todos];
    });
    getHomeData(async response => {
      if (response.data) {
        if (response.data.length == 0) {
          await dispatch({
            type: HOME_GET_DATA_SUCCESS,
            payload: {
              CompletedTasks: [],
              UnCompletedTasks: [...savedTodos],
            },
          });
        } else {
          let completedArr = [];
          let unCompletedArr = [...savedTodos];
          for (let i = 0; i < response.data.length; i++) {
            const item = response.data[i];
            item.completed
              ? completedArr.push(item)
              : unCompletedArr.push(item);
            if (i == response.data.length - 1) {
              await dispatch({
                type: HOME_GET_DATA_SUCCESS,
                payload: {
                  CompletedTasks: completedArr,
                  UnCompletedTasks: unCompletedArr,
                },
              });
            }
          }
        }
      } else {
        if (response.error) {
          if (response.error?.response?.data?.message) {
            await dispatch({
              type: HOME_GET_DATA_FAILED,
              payload: {Error: response.error.response.data.message},
            });
          } else {
            await dispatch({
              type: HOME_GET_DATA_FAILED,
              payload: {Error: 'Something went wrong'},
            });
          }
        }
      }
    });
  };
};

export const HomeClearData = () => {
  return async dispatch => {
    await dispatch({type: HOME_CLEAR_DATA});
  };
};
