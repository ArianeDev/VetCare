import React, { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import { UserPen } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import api from '../../Service/api';

export function Table({ dado }){
	const [token] = useContext(UserContext);

	async function deleteAnimal(id) {
		try{
            await api.delete(`/animal/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            console.error("Erro ao excluir o animal: ", error)
        }
	}

	return(
		<tbody>
			<tr>
				<td className='itensTable'>{dado.nome}</td>
				<td className='itensTable'>{dado.raca}</td>
				<td className='itensTable'>{dado.cor}</td>
				<td className='icons'>
					<Trash2 className='trash' onClick={() => deleteAnimal(dado.id)}/>
					<UserPen className='userPen'/>
				</td>
			</tr>
		</tbody>
	)
}