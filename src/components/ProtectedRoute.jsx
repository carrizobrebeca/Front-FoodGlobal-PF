
import { Navigate, Outlet } from 'react-router-dom';

//{ children, allowedRoles }
const ProtectedRoute = ({isAllowed, children}) => {

  if(!isAllowed) {
    return <Navigate to="/"/>
  }
  // const { status, user } = useSelector((state) => state.login);
  // const location = useLocation();


  // // Si el usuario no está autenticado
  // if (status === 'idle' || !user) {
  //   return alert(`Acceso denegado`);
  // }

  // // Si el rol del usuario no está permitido para esta ruta
  // if (!allowedRoles.includes(user.rol)) {
  //   // Simplemente renderiza un mensaje de acceso denegado o mantén la misma ruta
  //   return  alert(`Acceso denegado`);
  // }

  // // Si todo está bien, renderiza el contenido protegido
  return children ? children : <Outlet/>;
};

export default ProtectedRoute;
