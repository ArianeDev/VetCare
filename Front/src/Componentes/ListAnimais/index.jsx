import React, { useEffect, useState } from 'react';
import { Card } from '../Card';
import api from '../../Service/api';

export function ListAnimais(){
    const [animaisList, setAnimaisList] = useState([]);

    // useEffect(() => {
    //     const infoAPI = async () => {
    //         let infoAnimal = await api.get_infosAnimais();

    //         setAnimaisList(infoAnimal);
    //         console.log(infoAnimal)
    //     }

    //     infoAPI();
    // })

    const dado = [
        {
            "nome": "Ariane",
            "img": "https://thaka.bing.com/th/id/OIP.EU4rGtqFQAtuj4azJqkkvQHaFD?w=302&h=206&c=8&rs=1&qlt=90&r=0&o=6&pid=3.1&rm=2"
        }
    ]

    return(
        <div>
            {dado.map((dado, key) => (
                <Card key={key} dado={dado}/>
            ))}
        </div>
    )
}