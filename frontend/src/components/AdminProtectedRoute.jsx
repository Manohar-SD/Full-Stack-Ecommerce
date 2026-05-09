import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./AuthContext";
const AdminProtectedRoute = ({children})=>{

const {user} = useContext(AuthContext)

  return user && user.role=="admin" ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );

}
export default AdminProtectedRoute