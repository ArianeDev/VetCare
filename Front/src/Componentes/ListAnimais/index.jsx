import React, { useEffect, useState } from 'react';
import { Card } from '../Card';
import { Table } from '../Table';
import api from '../../Service/api';
import './style.sass'

export function ListAnimais({ type }){
    const [animaisList, setAnimaisList] = useState([]);

    async function getAnimal() {
        const animalsAPI = await api.get('/animal')
        const listAnimal = Object.values(animalsAPI.data);
        setAnimaisList(listAnimal);
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
                        <tr>
                            <td>Nome</td>
                            <td>Raça</td>
                            <td>Cor</td>
                        </tr>
                    </table>
                    {animaisList.map((dado, key) => (
                        <Table key={key} dado={dado} />
                    ))}
                </div>
            )}
        </>
    )
}