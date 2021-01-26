import { useContext } from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import { AuthContext } from '../App'

function PrivateRoute(props: RouteProps) {
  const { isLoggedIn } = useContext(AuthContext)

  return isLoggedIn() ? <Route {...props} /> : <Redirect to='/' />
}
export default PrivateRoute
