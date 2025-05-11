import { React, useState } from 'react';
import { ErrorMessage } from '../ErrorMenssage';

export function Forms(){
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	return(
		<form method="POST">
			<label>Userame</label>
			<input type="text" />
			<label>Password</label>
			<input type="password" />
		</form>
	)
}