import { UserPen } from 'lucide-react';
import { Trash2 } from 'lucide-react';

export function Table({ key, dado, delAnimal, onEdit }){
	return(
		<tbody>
			<tr key={dado.id || key }>
				<td className='itensTable'>{dado.nome}</td>
				<td className='itensTable'>{dado.raca}</td>
				<td className='itensTable'>{dado.cor}</td>
				<td className='icons'>
					<button onClick={() => delAnimal(dado.id)}>
						<Trash2 className='trash'/>
					</button>
					<button onClick={() => onEdit(dado.id)}>
						<UserPen className='userPen'/>
					</button>
				</td>
			</tr>
		</tbody>
	)
}