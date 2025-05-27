import { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { Register } from "../../Componentes/Register";
import { Login } from "../../Componentes/Login";
import { Squirrel } from 'lucide-react';
import { Home } from "../Home";
import './style.sass';

export function PageStart(){
	const [token,] = useContext(UserContext);
	const [isRegistering, setIsRegistering] = useState(false);

	if (token) return <Home />;

	return(
		<div className="containerPageStart">
			{isRegistering ? (
				<>
					<div className="containerRegister">
						<div className="information">
							<div className="logo">
								<h1>VetCare</h1>
								<Squirrel className="squirrel"/>
							</div>
							<div className="text">
								<h1>Bem vindos</h1>
								<p>Faça seu cadastro!</p>
							</div>
						</div>
						<div className="forms">
							<Register />
							<p>Já tem uma conta? <button onClick={() => setIsRegistering(false)} className="buttonLogin">Fazer login</button></p>
						</div>
					</div>
				</>
			) : (
				<>
					<div className="containerLogin">
						<div className="information">
							<div className="logo">
								<h1>VetCare</h1>
								<Squirrel className="squirrel"/>
							</div>
							<div className="text">
								<h1>Bem vindos</h1>
								<p>Entre com seu login!</p>
							</div>
						</div>
						<div className="forms">
							<Login />
							<p>Não tem uma conta? <button onClick={() => setIsRegistering(true)} className="buttonLogin">Cadastrar-se</button></p>
						</div>
					</div>
				</>
			)} 
		</div>
	)
}