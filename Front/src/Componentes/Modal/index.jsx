import './style.sass';
import { Forms } from '../Forms';
import { ErrorMessage } from '../ErrorMenssage';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../Context/UserContext';
import  api  from '../../Service/api';

export function Modal({animalSelecionado, onClose, isOpen}){
    const [nome, setNome] = useState('');
    const [cor, setCor] = useState('');
    const [raca, setRaca] = useState('');
    const [foto, setFoto] = useState('');
    const [errorMenssage, setErrorMenssage] = useState('');
    const [token] = useContext(UserContext)

    console.log(animalSelecionado[0].nome)
    useEffect(() => {
        if(animalSelecionado){
            setNome(animalSelecionado[0].nome);
            setCor(animalSelecionado.cor);
            setRaca(animalSelecionado.raca);
            setFoto(animalSelecionado.foto);
        }
    }, [animalSelecionado]);

    const submitUpdateAnimal = async () => {
        const updateAnimal = {
            nome,
            cor,
            raca,
            foto,
        }
		try{
			const response = await api.put(`/animal/${animalSelecionado.id}`, updateAnimal, {headers: {Authorization: `Bearer ${token}`}});
			console.log("Animal atualizado com sucesso", response.data)

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
            "value": animalSelecionado[0].nome,
            "setFunction": setNome,
            "labelName": "Nome"
        },
        {
            "type": "text",
            "value": animalSelecionado[0].cor || "",
            "setFunction": setCor,
            "labelName": "Cor"
        },
        {
            "type": "text",
            "value": animalSelecionado[0].raca || "",
            "setFunction": setRaca,
            "labelName": "Raça"
        },
        {
            "type": "text",
            "value": animalSelecionado[0].foto || "",
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
                <div className="modalMain">
                    <div className="foms">
                        <Forms listInput={listInputAtualizar} method={handleSubmitUpdate} title="Atualizar" textButton="Atualizar"/>
                        <ErrorMessage menssage={errorMenssage} />
                    </div>
                    <div className="header">
                        <img src={animalSelecionado[0].foto} alt="Fotinha do pet" />
                    </div>
                </div>
            </div>
        </div>
    )
}