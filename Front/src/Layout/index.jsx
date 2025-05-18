import { Outlet, useLocation } from "react-router-dom";
import './style.sass'

const GlobalLayout = () => {
	const location = useLocation();

	return(
		<div className="globalLayout">
			<Outlet />
		</div>
	)
}
export default GlobalLayout;