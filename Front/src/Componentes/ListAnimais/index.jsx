import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import { UserPen } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { Card } from '../Card';
import { Modal } from '../Modal';
import api from '../../Service/api';
import './style.sass'

export function ListAnimais({ type }){
    const [isOpen, setIsOpen] = useState(false);
    const [animalSelecionado, setAnimalSelecionado] = useState(null);
    const [animaisList, setAnimaisList] = useState([]);
    const [token] = useContext(UserContext);

    function handleOpenModal(animal) {
        setAnimalSelecionado(animal);
        setIsOpen(true);
    }

    function handleCloseModal() {
        setAnimalSelecionado(null);
        setIsOpen(false);
    }

    async function delAnimal(id) {
		await api.delete(`/animal/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

        getAnimal()
	}

    async function getAnimal() {
        try{
            const response = await api.get('/animal', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            const listAnimal = response.data;
            setAnimaisList(listAnimal)
        } catch (error) {
            console.error("Erro ao buscar animais: ", error)
        }
    }

    useEffect(() => {
        getAnimal()
    }, [])

    return(
        <>
            {type === "card" ? (
                <div className='containerList'>
                    {animaisList.map((dado, key) => (
                        <Card key={key} dado={dado}>
                            <button onClick={() => delAnimal(dado.id)}>
                                <Trash2 className='trash'/>
                            </button>
                            <button onClick={() => handleOpenModal(dado)}>
                                <UserPen className='userPen'/>
                            </button>
                        </Card >
                    ))}
                </div>
            ) : (
                <div className="containerTable">
                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Raça</th>
                                <th>Cor</th>
                                <th className='icons'>Ações</th>
                            </tr>
                        </thead>
                    {animaisList.map((dado, key) => (
                        <tbody>
                            <tr key={dado.id || key }>
                                <td className='itensTable'>{dado.nome}</td>
                                <td className='itensTable'>{dado.raca}</td>
                                <td className='itensTable'>{dado.cor}</td>
                                <td className='icons'>
                                    <button onClick={() => delAnimal(dado.id)}>
                                        <Trash2 className='trash'/>
                                    </button>
                                    <button onClick={() => handleOpenModal(dado)}>
                                        <UserPen className='userPen'/>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                    </table>
                </div>
            )}

            {isOpen && (
                <Modal
                    isOpen={isOpen}
                    onClose={handleCloseModal}
                    animalSelecionado={animalSelecionado}
                />
            )}
        </>
    )
}