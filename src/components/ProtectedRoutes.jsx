import React, { useEffect, useState } from 'react'

const ProtectedRoutes = () => {

  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = localStorage.getItem('token');

      } catch (error) {
        
      }
    }
  }, [])

  return (
    <div>ProtectedRoutes</div>
  )
}

export default ProtectedRoutes