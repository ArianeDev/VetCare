import React, { useEffect, useState } from 'react';
import { Card } from '../Card';
import api from '../../Service/api';

export function ListAnimais(){
    const [animaisList, setAnimaisList] = useState([]);

    useEffect(() => {
        const infoAPI = async () => {
            let infoAnimal = await api.get_infosAnimais();

            setAnimaisList(infoAnimal);
            console.log(infoAnimal)
        }

        infoAPI();
    })

    return(
        <div>
            {animaisList.map((dado, key) => (
                <Card key={key} dado={dado}/>
            ))}
        </div>
    )
}