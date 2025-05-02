export function Table({ dado }){
	return(
		<table>
			<tr>
				<td>{dado.nome}</td>
				<td>{dado.raca}</td>
				<td>{dado.cor}</td>
			</tr>
		</table>
	)
}