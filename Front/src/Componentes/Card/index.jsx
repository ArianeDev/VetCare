import React from "react";
import './style.sass'

export function Card({ dado, children }) {
    return(
        <div className="card_container">
            <div className="header_card">
                <h2>{dado.nome}</h2>
                <div className="icons-header">
                    {children}
                </div>
            </div>
            <div className="content_card">
                <div className="text_card">
                    <p>Cor: {dado.cor}</p>
                    <p>Especie: {dado.raca}</p>
                </div>
                <div className="img_card">
                    <img src={dado.foto} alt={dado.nome}/>
                </div>
            </div>
        </div>
    )
}