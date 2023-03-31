import { Navigate, useLocation } from "react-router";
import { useSelector } from 'react-redux'

function RequireAuth({ children }) {

  const isLoggedIn = useSelector(state => state.isLoggedIn)
  let location = useLocation();

  if (isLoggedIn) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    // return <Navigate to="/auth/login" />;
    return children;

  }

  return <Navigate to="/auth/login" />;
}


export default RequireAuth;