import React, { useState } from "react";

export default function FileMagicNumbers({ data }){
    if (!data)
        return null

    return(
        <>
            <p><b>Arquivo:</b></p>
            <p>{data.fileName}</p>

            <p><b>Assinaturas Esperadas:</b></p>
            <ul>
                {
                    data.expectedSignatures.map(
                        (sig, index) => (
                            <li key={index}>{sig}</li>
                        )
                    )
                }
            </ul>

            <p><b>Assinatura do Arquivo:</b></p>
            <p>{data.actualSignature}</p>
            
            <p><b>Combina?</b></p>
            {
                data.matchSignature
                ? <p className="match">Sim! 👍</p>
                : <p className="!match">Não! 👎</p>
            }
        </>
    );
}