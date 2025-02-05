import React from 'react'
import { Navigate } from 'react-router-dom';
function AdminPermission({isAdmin,children}) {
  if (!isAdmin){
    return  <Navigate to='/dashboard' replace/>
  }
  return children ;
}

export default AdminPermission;