import { UserPen } from 'lucide-react';
import { Trash2 } from 'lucide-react';

export function Table({ dado }){
	return(
		<tbody>
			<tr>
				<td className='itensTable'>{dado.nome}</td>
				<td className='itensTable'>{dado.raca}</td>
				<td className='itensTable'>{dado.cor}</td>
				<td className='icons'>
					<Trash2 className='trash'/>
					<UserPen className='userPen'/>
				</td>
			</tr>
		</tbody>
	)
}