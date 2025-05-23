import './style.sass';
import { Forms } from '../Forms';
import { ErrorMessage } from '../ErrorMenssage';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../Context/UserContext';
import { api } from '../../Services/api';

export function Modal({id, dado, onClose, isOpen}){
    const [nome, setNome] = useState("");
    const [cor, setCor] = useState("");
    const [raca, setRaca] = useState("");
    const [foto, setFoto] = useState("");
    const [errorMenssage, setErrorMenssage] = useState("");
    const [token] = useContext(UserContext)

    useEffect(() => {
        if(dado){
            setNome(dado.nome || "");
            setCor(dado.cor || "");
            setRaca(dado.raca || "");
            setFoto(dado.foto || "");
        }
    }, [dado]);

    const submitUpdateAnimal = async () => {
		try{
			const response = await api.put(`/animal/${id}`, {nome, cor, raca, foto}, {headers: {Authorization: `Bearer ${token}`}});
			console.log("Animal cadastrado com sucesso", response.data)

			setNome("")
			setCor("")
			setCor("")
			setRaca("")

		} catch (error) {
			console.error("Erro na requisição:", error);
			setErrorMenssage("Erro ao atualizar. Tente novamente.");
		}
	}

	const handleSubmitUpdate = (e) => {
		e.preventDefault();
        submitUpdateAnimal();
	}

    const listInputAtualizar = [
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

    if(!isOpen){
        return null;
    }

    return(
        <div className="modalBack">
            <div className="modalContainer">
                <div className="modalHeader">
                    <button onClick={onClose}>x</button>
                </div>
                <div className="forms">
                    <Forms listInput={listInputAtualizar} method={handleSubmitUpdate} title="Atualizar animal" textButton="Atualizar"/>
                    <ErrorMessage menssage={errorMenssage} />
                </div>
            </div>
        </div>
    )
}