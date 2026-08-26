export default function Home(){
    return (
        <>
            <div className="content">
                <h1>Olá, sou o Conrado</h1>
                <div className="split-container">
                    <div className="half">
                        <p>Estudante de Forense Digital, Segurança Operacional (OpSec) e Inteligência Open source (OSInt). Esse espaço é o lugar onde eu vou juntar meus projetos pessoais, meus interesses e um ambiente para eu comunicar as pessoas no que eu acho interessante, como um cartão de conversas digital.</p>
                        <h3>Links:</h3>
                        <ul>
                            <li>
                                <a href="https://www.linkedin.com/in/conrado-perini-fracacio-b89889211/">💼 Linked-In</a>
                            </li>
                            <li>
                                <a href="https://github.com/Faroferinho">👾 GitHub</a>
                            </li>
                        </ul>
                    </div>

                    <div className="half">
                        <h3>Páginas Concluidas:</h3>
                        <ul>
                            <li>
                                <input type="checkbox" disabled/>
                                <a>Portifólio</a>
                            </li>
                            <li>
                                <input type="checkbox" checked disabled/>
                                <a>Forense Digital</a>
                            </li>
                            <li>
                                <input type="checkbox" disabled/>
                                <a>OPSEC</a>
                            </li>
                            <li>
                                <input type="checkbox" disabled/>
                                <a>Programação</a>
                            </li>
                            <li>
                                <input type="checkbox" disabled/>
                                <a>Docker</a>
                            </li>
                            <li>
                                <input type="checkbox" disabled/>
                                <a>Interesses</a>
                            </li>
                            <li>
                                <input type="checkbox" disabled/>
                                <a>Mitologia</a>
                            </li>
                            <li>
                                <input type="checkbox" disabled/>
                                <a>Paleontologia</a>
                            </li>
                            <li>
                                <input type="checkbox" disabled/>
                                <a>Ocultismo</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}