import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header(){
    const [menuStudyOpen, setMenuStudyOpen] = useState(false);
    const [menuInterestsOpen, setMenuInterestsOpen] = useState(false);
    const [menuPortfolioOpen, setMenuPortfolioOpen] = useState(false);

    return(
        <header className="header">
            <nav className="navbar">
                
                {/* TODO - Put logo here, lol*/}
                <a className="logo">
                    <Link to="/" className="logo">
                        🐙
                    </Link>
                </a>

                <ul className="nav-links">

                    <li className="dropdown"
                        onMouseEnter={() => setMenuStudyOpen(true)}
                        onMouseLeave={() => setMenuStudyOpen(false)}
                    >
                        <Link className="nav-button" to="/portfolio">
                            Estudos
                        </Link>

                        {
                            menuStudyOpen && (
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link to="/forense-digital">Forense Digital</Link>
                                    </li>

                                    <li>
                                        <Link to="/opsec">OPSEC</Link>
                                    </li>

                                    <li>
                                        <Link to="/docker">Docker</Link>
                                    </li>
                                </ul>
                            )
                        }
                    </li>

                    <li className="dropdown"
                        onMouseEnter={() => setMenuPortfolioOpen(true)}
                        onMouseLeave={() => setMenuPortfolioOpen(false)}
                    >
                        <Link className="nav-button" to="/interests">
                            Portfolio
                        </Link>
                        {
                            menuPortfolioOpen && (
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link to="/signature-checker">Magic Number Checker</Link>
                                    </li>
                                </ul>
                            )
                        }
                    </li>

                    <li className="dropdown"
                        onMouseEnter={() => setMenuInterestsOpen(true)}
                        onMouseLeave={() => setMenuInterestsOpen(false)}                        
                    >
                        <Link className="nav-button" to="/interests">
                            Interesses
                        </Link>
                        {
                            menuInterestsOpen && (
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link to="/mitologia">Mitologia</Link>                                        
                                    </li>

                                    <li>
                                        <Link to="/paleontologia">Paleontologia</Link>    
                                    </li>

                                    <li>
                                        <Link to="/ocultismo">Ocultismo</Link>
                                    </li>
                                </ul>
                            )
                        }                        
                    </li>
                    
                </ul>
            </nav>
        </header>
    );
}