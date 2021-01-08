/* eslint-disable react/react-in-jsx-scope */
import React from 'react'
import { Route} from "react-router-dom";
import Loading from './Components/Loading/Loading';



const ProtectedRoute = ({ component: Component, currentUser, ...rest  }) => {
    return (
      <Route
       
        render={props =>
          currentUser ? (
            <Component {...props} />
          ) : (
            <Loading />
          )
        }
      />
    );
}
  
  export default ProtectedRoute;