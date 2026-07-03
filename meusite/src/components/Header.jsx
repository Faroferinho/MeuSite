import { Link } from "react-router-dom";

export default function Header(){
    return(
        <header className="header">
            <nav className="menu">
                <Link className="item" to="/">
                    Home
                </Link>
                <Link className="item" to="/portfolio">
                    Portifólio
                </Link>
                <Link className="item" to="/interests">
                    Interesses
                </Link>
            </nav>
        </header>
    );
}