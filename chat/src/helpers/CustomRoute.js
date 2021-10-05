import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const CustomRoute = ({ secured, children, ...rest }) => {

    const { isAuthenticated } = useSelector(state => state.users)

    if ((secured && isAuthenticated) || !secured) {
        return <Route {...rest}>{children}</Route>
    }

    return <Redirect to={{ pathname: '/login' }} />
}

export default CustomRoute