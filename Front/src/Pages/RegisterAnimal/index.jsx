import { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { ErrorMessage } from "../../Componentes/ErrorMenssage";
import { Forms } from "../../Componentes/Forms";
import api from "../../Service/api";

export function RegisterAnimal(){
	const [nome, setNome] = useState("");
	const [cor, setCor] = useState("");
	const [raca, setRaca] = useState("");
	const [foto, setFoto] = useState("");
	const [errorMenssage, setErrorMenssage] = useState("");
	const [token] = useContext(UserContext)

	const listInputCadastro = [
		{
			"type": "text",
			"placeholder": "Digite nome...",
			"value": nome,
			"setFunction": setNome,
			"labelName": "Nome"
		},
		{
			"type": "text",
			"placeholder": "Digite a cor...",
			"value": cor,
			"setFunction": setCor,
			"labelName": "Cor"
		},
		{
			"type": "text",
			"placeholder": "Digite a raça...",
			"value": raca,
			"setFunction": setRaca,
			"labelName": "Raça"
		},
		{
			"type": "text",
			"placeholder": "Coloque a url da foto...",
			"value": foto,
			"setFunction": setFoto,
			"labelName": "Foto"
		}
	]

	const submitRegistrationAnimal = async () => {
		try{
			const response = await api.post('/animal', {nome, cor, raca, foto}, {headers: {Authorization: `Bearer ${token}`}});
			console.log("Animal cadastrado com sucesso", response.data)

			setNome("")
			setCor("")
			setCor("")
			setRaca("")
			setFoto("")

		} catch (error) {
			console.error("Erro na requisição:", error);
			setErrorMenssage("Erro ao registrar. Tente novamente.");
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		if (nome) {
			submitRegistrationAnimal();
		} else {
			setErrorMenssage("Preencha o nome")
		}
	}

	return(
		<div>
			<Forms listInput={listInputCadastro} method={handleSubmit} title="Cadastro animal" textButton="Cadastrar" />
			<ErrorMessage menssage={errorMenssage} />
		</div>
	)
}