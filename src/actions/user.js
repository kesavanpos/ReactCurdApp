import {
    CREATE_USER,
    FETCH_USER,
    FETCH_USER_PENDING,
    UPDATE_USER,
    DELETE_USER,
    ERROR_USER
} from "./types"

import UserDataService from "../services/user.service";

export const createUser = ({firstname, lastname,picture}) => async (dispatch) => {
    try {     
      
      const res = await UserDataService.create({ name:{first:firstname,last:lastname},picture });
  
      dispatch({
        type: CREATE_USER,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      dispatch({
        type: ERROR_USER,
        payload: err
      });
    }
  };


  export const fetchUser = () => async (dispatch) => {
    try {
      
      dispatch({
        type:FETCH_USER_PENDING
      }) 
      const res = await UserDataService.getAll();      
      
      dispatch({
        type: FETCH_USER,
        payload: res.data,
      });
     
    } catch (err) {
      console.log(err);
      dispatch({
        type: ERROR_USER,
        payload: err
      });
    }
  };


  export const updateUser = (id, {firstname, lastname,picture}) => async (dispatch) => {    
    try {
      const res = await UserDataService.update(id, { name:{first:firstname,last:lastname},picture });
  
      dispatch({
        type: UPDATE_USER,
        payload: {firstname, lastname,picture},
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      dispatch({
        type: ERROR_USER,
        payload: err
      });
    }
  };

  export const deleteUser = (id) => async (dispatch) => {
    try {      
      await UserDataService.delete(id);
      
      dispatch({
        type: DELETE_USER,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: ERROR_USER,
        payload: err
      });
    }
  };