import { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { ErrorMessage } from "../ErrorMenssage";
import { Header } from "../Header";

export function Register(){
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [cpf, setCpf] = useState("");
	const [endereco, setEndereco] = useState("");
	const [password, setPassword] = useState("");
	const [confirmationPassword, setConfirmationPassword] = useState("");
	const [errorMenssage, setErrorMenssage] = useState("");
	const [, setToken] = useContext(UserContext);

	const submitRegistration = async () => {
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({"username": username, "email": email, "cpf": cpf, "endereco": endereco, "password": password}),
		};
		try {
			const response = await fetch("http://localhost:8000/api/v1/pessoa/register", requestOptions);
			const data = await response.json();

			if (!response.ok) {
				setErrorMenssage(data.detail);
			} else {
				setToken(data.access_token);
				localStorage.setItem("awesomeLeadsToken", data.access_token);
			}
		} catch (error) {
			console.error("Erro na requisição:", error);
			setErrorMenssage("Erro ao registrar. Tente novamente.");
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password === confirmationPassword && password.length > 2) {
			submitRegistration();
		} else {
			setErrorMenssage("Senha diferentes")
		}
	}

	return(
		<div>
			<h1>Cadastrar</h1>
			<form action="" onSubmit={handleSubmit}>
				<label>Username</label>
				<input 
					type="text" 
					placeholder="username" 
					value={username} 
					onChange={(e) => setUsername(e.target.value) }
					required
				/>
				<label>Email</label>
				<input 
					type="email" 
					placeholder="email" 
					value={email} 
					onChange={(e) => setEmail(e.target.value) }
					required
				/>
				<label>CPF</label>
				<input 
					type="text" 
					placeholder="cpf" 
					value={cpf} 
					onChange={(e) => setCpf(e.target.value) }
					required
				/>
				<label>Endereço</label>
				<input 
					type="text" 
					placeholder="endereço" 
					value={endereco} 
					onChange={(e) => setEndereco(e.target.value) }
					required
				/>
				<label>Senha</label>
				<input 
					type="password" 
					placeholder="password" 
					value={password} 
					onChange={(e) => setPassword(e.target.value) }
					required
				/>
				<label>Confirmar senha</label>
				<input 
					type="password" 
					placeholder="confirm password" 
					value={confirmationPassword} 
					onChange={(e) => setConfirmationPassword(e.target.value) }
					required
				/>
				<br />
				<ErrorMessage menssage={errorMenssage} />
				<input type="submit" value="Enviar" />
			</form>
		</div>
	)
}