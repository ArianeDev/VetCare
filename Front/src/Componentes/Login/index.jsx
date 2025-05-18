import { React, useState, useContext } from 'react';
import { ErrorMessage } from '../ErrorMenssage';
import { UserContext } from '../../Context/UserContext';
import { Forms } from '../Forms';

export function Login(){
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errorMenssage, setErrorMenssage] = useState("");
	const [, setToken] = useContext(UserContext); 

	const listInputLogin = [
		{
			"type": "text",
			"placeholder": "Digite seu usuário...",
			"value": username,
			"setFunction": setUsername,
			"labelName": "Usuário"
		},
		{
			"type": "password",
			"placeholder": "Digite sua senha...",
			"value": password,
			"setFunction": setPassword,
			"labelName": "Senha"
		}
	]

	const submitLogin = async () => {
		const requestOptions = {
			method: "POST",
			headers: {"Content-Type": "application/x-www-form-urlencoded"},
			body: JSON.stringify(`grant_type=password&username=${username}&password=${password}&scope=&client_id=string&client_secret=string`)
		}
		try{
			const response = await fetch("http://localhost:8000/api/v1/pessoa/token", requestOptions);
			const data = await response.json();

			if (!response.ok) {
				setErrorMenssage(data.detail);
			} else {
				setToken(data.access_token);
				localStorage.setItem("awesomeLeadsToken", data.access_token);
			}
		} catch (error) {
			console.error("Erro na requisição:", error);
			setErrorMenssage("Erro ao logar. Tente novamente.");
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		submitLogin();
	};

	return(
		<>
			<Forms listInput={listInputLogin} method={handleSubmit} title="Login" textButton="Logar" />
			<ErrorMessage menssage={errorMenssage} />
		</>
	)
}