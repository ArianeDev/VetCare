import { React, createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = (props) => {
	const [token, setToken] = useState(localStorage.getItem("awesomeLeadsToken"));
	
	useEffect(() => {
		const fetchUser = async () => {
			const requestOptions = {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + token,
				},
			};
			try {
				const response = await fetch("http://localhost:8000/api/v1/pessoa/user", requestOptions);
				if (!response.ok) {
					console.error("Token inválido");
					setToken(null);
					localStorage.removeItem("awesomeLeadsToken");
				}
			} catch (err) {
				console.error("Erro na requisição:", err);
			}
		};
		fetchUser();
	}, [token]);

	return(
		<UserContext.Provider value={[token, setToken]}>
			{props.children}
		</UserContext.Provider>
	)
};