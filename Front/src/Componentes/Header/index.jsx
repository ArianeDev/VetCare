import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { Squirrel } from 'lucide-react';
import './style.sass';

export function Header(){
	const [token, setToken] = useContext(UserContext);

	const handleLogout = () => {
		setToken(null);
	}
	return(
		<header>
			<div className="logo">
				<h1>VetCare</h1>
				<Squirrel className="squirrel"/>
			</div>
			<div className="buttonLogOut">
				{token && (<button onClick={handleLogout} className="button">Sair</button>)}
			</div>
		</header>
	)
}