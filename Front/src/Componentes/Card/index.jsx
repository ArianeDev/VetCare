import React from "react";

export function Card({ dado }) {
    return(
        <div className="card_container">
            <h1>{dado.nome}</h1>
        </div>
    )
}