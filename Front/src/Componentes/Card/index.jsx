import React from "react";
import './style.sass'

export function Card({ dado }) {
    return(
        <div className="card_container">
            <h1>{dado.nome}</h1>
            <img src={dado.img} />
        </div>
    )
}