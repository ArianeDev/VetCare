import { useContext } from "react";
import { UserContext } from "./Context/UserContext";

export function ProtectedRouter() {
	const [token] = useContext(UserContext);
	return token ? <Outlet /> : <Navigate to="/" />;
}