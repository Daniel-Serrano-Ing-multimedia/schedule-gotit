import {
  USER_SIGN_UP,
  SER_SIGN_UP_SUCCESS,
  USER_SIGN_UP_ERROR,  
  USER_LOGIN,         
  USER_LOGIN_SUCESS,  
  USER_LOGIN_ERROR,   
  USER_AUTH,   
  USER_GET_PROJECTS,  
  USER_ERROR,   
} from '../types';
// react
import { useReducer } from 'react';
// api calls
import { scheduleApi } from '../../config/axios';
//context
import UserContext , { initialstate } from '../user.context';
// reducer 
import userReducer from '../reducers/user.reducer';

const UserWrapper = ({ children }) =>{
  const [ state, dispatch ] = useReducer( userReducer, initialstate );
  // *****************************************
  // **************  User Login  *************
  // *****************************************
  const userLogin = async ( data ) =>{
    try {
      dispatch({
        type : USER_LOGIN,
        payload: {
          loading:true,
        }
      });
      result = await scheduleApi.post('/users/login', data ).data;
      return dispatch({
        type : USER_LOGIN_SUCESS,
        payload: {
          loading:false,
          token : result.token
        }
      });
    } catch (error) {
      console.log(' DESDE LOGIN ', error.response)
      return dispatch({
        type : USER_LOGIN_ERROR,
        payload: {
          loading:false,
          authError:true,
          //message : error,
        }
      });
    }
  }
  return( 
    <UserContext.Provider value = {{
      state : state,
      userLogin : userLogin
    }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserWrapper;