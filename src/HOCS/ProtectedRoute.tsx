import React, { useContext, useEffect } from 'react'
import { Route, useHistory, useLocation } from 'react-router-dom'
import { handleFirstPageAfterLogin } from '../containers/PageRoute/handlePagesView';
import { UserContext } from '../Context/authContext';

const ProtectedRoute = (props: any) => {
    const history = useHistory();
    const {user} = useContext<any>(UserContext);
    const location = useLocation();
    useEffect(() => {
        var retrievedUser = JSON.parse(localStorage.getItem('user') || '{}');
        if (retrievedUser?.isAuth) {
            if (location.pathname.includes("auth") || location.pathname == '/') {
                const route = handleFirstPageAfterLogin(retrievedUser.content);
                history.push(route || "/page/home")
            }
        }
        if (!retrievedUser?.isAuth) {
          if (location.pathname.includes("page") || location.pathname == '/') {
              history.push("/auth");
          }
        }
      
    }, [user, location])
    return (
           <>
           {props.children}
           </>
    )
}

export default ProtectedRoute
