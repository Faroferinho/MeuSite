import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header(){
    const [menuPortfolioOpen, setMenuPortfolioOpen] = useState(false);
    const [menuInterestsOpen, setMenuInterestsOpen] = useState(false);

    return(
        <header className="header">
            <nav className="navbar">
                
                {/* TODO - Put logo here, lol*/}
                <a className="logo">
                    <Link to="/">
                        🐙
                    </Link>
                </a>

                <ul className="nav-links">

                    <li className="dropdown"
                        onMouseEnter={() => setMenuPortfolioOpen(true)}
                        onMouseLeave={() => setMenuPortfolioOpen(false)}
                    >
                        <Link className="nav-button" to="/portfolio">
                            Portifólio
                        </Link>

                        {
                            menuPortfolioOpen && (
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link to="/">teste</Link>
                                    </li>

                                    <li>
                                        <Link to="/1">teste1</Link>
                                    </li>

                                    <li>
                                        <Link to="/2">teste2</Link>
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
                                        <Link to="/">teste</Link>                                        
                                    </li>
                                    <li>
                                        <Link to="/1">testeA</Link>    
                                    </li>
                                    <li>
                                        <Link to="/2">testeB</Link>
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