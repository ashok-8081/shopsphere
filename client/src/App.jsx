import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Navbar from './components/Navbar'
import Toast from './components/Toast'
import socket from './utils/socket'

function App() {
  const { userInfo } = useSelector((state) => state.auth)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    if (userInfo) {
      socket.connect()
      socket.emit('joinRoom', userInfo._id)

      socket.on('orderDelivered', (data) => {
        setToast(data.message)
      })
    } else {
      socket.disconnect()
    }

    return () => {
      socket.off('orderDelivered')
    }
  }, [userInfo])

  return (
    <div>
      <Navbar />
      {toast && (
        <Toast
          message={toast}
          onClose={() => setToast(null)}
        />
      )}
      <Outlet />
    </div>
  )
}

export default App