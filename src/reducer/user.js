import {
    CREATE_USER,
    FETCH_USER,
    FETCH_USER_PENDING,
    UPDATE_USER,
    DELETE_USER,
    ERROR_USER
}
from "../actions/types"

const initialState = [];

function userReducer(users = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_USER:        
        return {pending:false, payload:users.payload,error:[]};

    case FETCH_USER_PENDING:
        return {pending:true,payload:users};

    case FETCH_USER:        
      return {pending:false, payload,error:[]};

    case UPDATE_USER:
      return users.map((user) => {
        if (user.id === payload.id) {
          return {
            ...user,
            ...payload
          };
        } else {
          return user;
        }
      });

    case DELETE_USER:        
        let delUsers =  users.payload.filter(({ id }) => id !== payload.id);
        return {pending:false, payload:delUsers,error:[]};

    case ERROR_USER:        
        return{           
            pending:false,
            error: action.payload
        }
    
    default:
      return users;
  }
};

export const UserError = state =>{
    return{
        error : state.userReducer.error
    }
}

export const UserSuccess = state => {
    return{
        users: state.userReducer.users
    }
}

export default userReducer;