import { useState } from "react";
import {
    dodajKategoriju,
    dodajSluzbu,
    postaviKoordinatora
} from "../services/adminService";

function AdminPanel() {
    const token = localStorage.getItem("token");

    const [kategorija, setKategorija] = useState({
        naziv: "",
        opis: ""
    });

    const [sluzba, setSluzba] = useState({
        naziv: "",
        telefon: "",
        email: ""
    });

    const [idKorisnika, setIdKorisnika] = useState("");

    const handleKategorijaSubmit = async (e) => {
        e.preventDefault();

        try {
            await dodajKategoriju(kategorija, token);
            alert("Kategorija dodata.");

            setKategorija({
                naziv: "",
                opis: ""
            });
        } catch {
            alert("Greška pri dodavanju kategorije.");
        }
    };

    const handleSluzbaSubmit = async (e) => {
        e.preventDefault();

        try {
            await dodajSluzbu(sluzba, token);
            alert("Služba dodata.");

            setSluzba({
                naziv: "",
                telefon: "",
                email: ""
            });
        } catch {
            alert("Greška pri dodavanju službe.");
        }
    };

    const handleKoordinatorSubmit = async (e) => {
        e.preventDefault();

        try {
            await postaviKoordinatora(idKorisnika, token);
            alert("Korisnik je postavljen za koordinatora.");
            setIdKorisnika("");
        } catch {
            alert("Greška pri promjeni uloge.");
        }
    };

    return (
        <div>
            <h2 className="mb-4">Admin panel</h2>

            <div className="row">
                <div className="col-md-4 mb-4">
                    <div className="card">
                        <div className="card-header">
                            <h5>Dodaj kategoriju</h5>
                        </div>

                        <div className="card-body">
                            <form onSubmit={handleKategorijaSubmit}>
                                <input
                                    type="text"
                                    className="form-control mb-3"
                                    placeholder="Naziv kategorije"
                                    value={kategorija.naziv}
                                    onChange={(e) =>
                                        setKategorija({
                                            ...kategorija,
                                            naziv: e.target.value
                                        })
                                    }
                                />

                                <textarea
                                    className="form-control mb-3"
                                    placeholder="Opis"
                                    value={kategorija.opis}
                                    onChange={(e) =>
                                        setKategorija({
                                            ...kategorija,
                                            opis: e.target.value
                                        })
                                    }
                                />

                                <button className="btn btn-primary w-100">
                                    Dodaj kategoriju
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card">
                        <div className="card-header">
                            <h5>Dodaj službu</h5>
                        </div>

                        <div className="card-body">
                            <form onSubmit={handleSluzbaSubmit}>
                                <input
                                    type="text"
                                    className="form-control mb-3"
                                    placeholder="Naziv službe"
                                    value={sluzba.naziv}
                                    onChange={(e) =>
                                        setSluzba({
                                            ...sluzba,
                                            naziv: e.target.value
                                        })
                                    }
                                />

                                <input
                                    type="text"
                                    className="form-control mb-3"
                                    placeholder="Telefon"
                                    value={sluzba.telefon}
                                    onChange={(e) =>
                                        setSluzba({
                                            ...sluzba,
                                            telefon: e.target.value
                                        })
                                    }
                                />

                                <input
                                    type="email"
                                    className="form-control mb-3"
                                    placeholder="Email"
                                    value={sluzba.email}
                                    onChange={(e) =>
                                        setSluzba({
                                            ...sluzba,
                                            email: e.target.value
                                        })
                                    }
                                />

                                <button className="btn btn-success w-100">
                                    Dodaj službu
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card">
                        <div className="card-header">
                            <h5>Postavi koordinatora</h5>
                        </div>

                        <div className="card-body">
                            <form onSubmit={handleKoordinatorSubmit}>
                                <input
                                    type="number"
                                    className="form-control mb-3"
                                    placeholder="ID korisnika"
                                    value={idKorisnika}
                                    onChange={(e) => setIdKorisnika(e.target.value)}
                                />

                                <button className="btn btn-warning w-100">
                                    Postavi za koordinatora
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminPanel;