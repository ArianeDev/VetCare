import { ListAnimais } from "../../Componentes/ListAnimais"
import { Header } from "../../Componentes/Header"
import { RegisterAnimal } from "../RegisterAnimal"

export function Home(){
	return(
		<>
			<Header />
			<ListAnimais type="card"/>
			<ListAnimais type="tabela"/>
		</>
	)
}