import { useState } from "react";
import { RegisterAnimal } from "../RegisterAnimal";
import { ListAnimais } from "../../Componentes/ListAnimais";
import { Header } from "../../Componentes/Header";
import './style.sass';

export function Home(){
	const [isRegisteringHome, setIsRegistering] = useState(false);

	return(
		<>
			{isRegisteringHome ? (
				<>
					<div className="buttonNavContainer">
						<button onClick={() => setIsRegistering(false)} className="buttonNav">Voltar</button>
					</div>
					<RegisterAnimal />
				</>
			) : (
				<>
					<div className="buttonNavContainer">
						<button onClick={() => setIsRegistering(true)} className="buttonNav">Cadastrar</button>
					</div>
					<ListAnimais type="tabela"/>
				</>

			)}

			{/* <Header /> */}
			
		</>
	)
}