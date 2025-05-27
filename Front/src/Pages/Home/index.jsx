import { useState } from "react";
import { RegisterAnimal } from "../RegisterAnimal";
import { ListAnimais } from "../../Componentes/ListAnimais";
import { Header } from "../../Componentes/Header";
import { Plus } from 'lucide-react';
import { ArrowBigLeft } from 'lucide-react';
import './style.sass';

export function Home(){
	const [isRegisteringHome, setIsRegistering] = useState(false);

	return(
		<>
			<Header />	
			{isRegisteringHome ? (
				<>
					<div className="buttonNavContainer">
						<button onClick={() => setIsRegistering(false)} className="buttonNav">
							<ArrowBigLeft className="iconsArrowBigLeft"/>
							Voltar
						</button>
					</div>
					<RegisterAnimal />
				</>
			) : (
				<>
					<div className="buttonNavContainer">
						<button onClick={() => setIsRegistering(true)} className="buttonNav">
							<Plus className="iconPlus"/>
							Cadastrar
						</button>
					</div>
					<ListAnimais type="tabela"/>
				</>

			)}

			
		</>
	)
}