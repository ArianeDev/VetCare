import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";

export function Header(){
	const [token, setToken] = useContext(UserContext);

	const handleLogout = () => {
		setToken(null);
	}
	return(
		<div>
			{token && (<button onClick={handleLogout}>Sair</button>)}
		</div>
	)
}