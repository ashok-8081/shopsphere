import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function AdminRoute({ children }) {
  const { userInfo } = useSelector((state) => state.auth)

  if (!userInfo) {
    return <Navigate to="/login" />
  }

  if (!userInfo.isAdmin) {
    return <Navigate to="/" />
  }

  return children
}

export default AdminRoute