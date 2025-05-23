import { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { Register } from "../../Componentes/Register";
import { Login } from "../../Componentes/Login";
import { Home } from "../Home";

export function PageStart(){
	const [token,] = useContext(UserContext);
	const [isRegistering, setIsRegistering] = useState(false);

	if (token) return <Home />;

	return(
		<div>
			{isRegistering ? (
				<>
					<div className="containerRegister">
						<h1>Cadastro</h1>
						<Register />
						<p>Já tem uma conta? <button onClick={() => setIsRegistering(false)}>Fazer login</button></p>
					</div>
				</>
			) : (
				<>
					<div className="containerLogin">
						<h1>Login</h1>
						<Login />
						<p>Não tem uma conta? <button onClick={() => setIsRegistering(true)}>Cadastrar-se</button></p>
					</div>
				</>
			)} 
		</div>
	)
}