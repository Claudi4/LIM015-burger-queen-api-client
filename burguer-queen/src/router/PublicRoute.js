import { Route, Redirect } from "react-router-dom";
import useAuth from "../services/auth/useAuth";

export default function PublicRoute({ component: Component, ...rest }) {
  const auth = useAuth();
 // TODO: Agregar redireccionamiento a paginas
  return (
    <Route {...rest}>
      {!auth.isLogged() ? (
        <Component />
      ) : (
        <Redirect to="/admin"/>
      )}
    </Route>
  );
}