import { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { ErrorMessage } from "../ErrorMenssage";
import { Forms } from "../Forms";
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

	const listInputRegister = [
		{
			"type": "text",
			"placeholder": "Digite seu usuário...",
			"value": username,
			"setFunction": setUsername,
			"labelName": "Usuário:"
		},
		{
			"type": "text",
			"placeholder": "Digite seu email...",
			"value": email,
			"setFunction": setEmail,
			"labelName": "Email:"
		},
		{
			"type": "text",
			"placeholder": "Digite seu CPF...",
			"value": cpf,
			"setFunction": setCpf,
			"labelName": "CPF:"
		},
		{
			"type": "password",
			"placeholder": "Digite sua senha...",
			"value": password,
			"setFunction": setPassword,
			"labelName": "Senha:"
		},
		{
			"type": "password",
			"placeholder": "Confirme sua senha...",
			"value": confirmationPassword,
			"setFunction": setConfirmationPassword,
			"labelName": "Confirmar senha:"
		}
	]

	return(
		<div>
			<Forms listInput={listInputRegister} method={handleSubmit} title="Cadastrar" textButton="Cadastrar"/>
			<ErrorMessage menssage={errorMenssage} />
		</div>
	)
}