import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const korisnik = JSON.parse(localStorage.getItem("korisnik"));
    const token = localStorage.getItem("token");

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("korisnik");
        navigate("/login");
        window.location.reload();
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    Oči Grada
                </Link>

                <div className="navbar-nav ms-auto">
                    <Link className="nav-link" to="/">Početna</Link>
                    <Link className="nav-link" to="/objave">Objave</Link>

                    {!token && (
                        <>
                            <Link className="nav-link" to="/login">Login</Link>
                            <Link className="nav-link" to="/register">Registracija</Link>
                            <Link className="nav-link" to="/admin-login">Admin login</Link>
                        </>
                    )}

                    {token && korisnik?.uloga === "korisnik" && (
                        <>
                            <Link className="nav-link" to="/nova-objava">Nova objava</Link>
                            <Link className="nav-link" to="/moje-prijave">Moje prijave</Link>
                        </>
                    )}

                    {token && korisnik?.uloga === "koordinator" && (
                        <Link className="nav-link" to="/koordinator">
                            Koordinator
                        </Link>
                    )}

                    {token && korisnik?.uloga === "admin" && (
                        <Link className="nav-link" to="/admin">
                            Admin
                        </Link>
                    )}

                    {token && (
                        <>
                            <span className="navbar-text text-light ms-3">
                                {korisnik?.username}
                            </span>

                            <button
                                className="btn btn-outline-light btn-sm ms-3"
                                onClick={logout}
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;