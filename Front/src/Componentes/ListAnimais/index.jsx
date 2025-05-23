import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import { Card } from '../Card';
import { Table } from '../Table';
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
                        <Card key={key} dado={dado} />
                    ))}
                </div>
            ) : (
                <div className="containerTable">
                    <table>
                        <thead>
                            <th>Nome</th>
                            <th>Raça</th>
                            <th>Cor</th>
                            <th>Ações</th>
                        </thead>
                    {animaisList.map((dado, key) => (
                        <Table key={key} dado={dado} delAnimal={delAnimal} onEdit={handleOpenModal}/>
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