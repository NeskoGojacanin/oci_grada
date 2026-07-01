import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getObjave } from "../services/objavaService";
import { getKategorije } from "../services/kategorijaService";
import { getSluzbe } from "../services/sluzbaService";

function Objave() {
    const [objave, setObjave] = useState([]);
    const [kategorije, setKategorije] = useState([]);
    const [sluzbe, setSluzbe] = useState([]);

    const [filter, setFilter] = useState({
        kategorija: "",
        status: "",
        sluzba: ""
    });

    useEffect(() => {
        ucitajObjave();
        ucitajKategorije();
        ucitajSluzbe();
    }, []);

    const ucitajObjave = async () => {
        try {
            const response = await getObjave();
            setObjave(response.data);
        } catch {
            alert("Greška pri učitavanju objava.");
        }
    };

    const ucitajKategorije = async () => {
        try {
            const response = await getKategorije();
            setKategorije(response.data);
        } catch {
            alert("Greška pri učitavanju kategorija.");
        }
    };

    const ucitajSluzbe = async () => {
        try {
            const response = await getSluzbe();
            setSluzbe(response.data);
        } catch {
            alert("Greška pri učitavanju službi.");
        }
    };

    const handleFilterChange = (e) => {
        setFilter({
            ...filter,
            [e.target.name]: e.target.value
        });
    };

    const filtriraneObjave = objave.filter((objava) => {
        const kategorijaOK =
            filter.kategorija === "" || objava.kategorija === filter.kategorija;

        const statusOK =
            filter.status === "" || objava.status === filter.status;

        const sluzbaOK =
            filter.sluzba === "" || objava.sluzba === filter.sluzba;

        return kategorijaOK && statusOK && sluzbaOK;
    });

    const resetFilter = () => {
        setFilter({
            kategorija: "",
            status: "",
            sluzba: ""
        });
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Sve objave</h2>
            </div>

            <div className="card mb-4">
                <div className="card-header">
                    <h5 className="mb-0">Detaljna pretraga</h5>
                </div>

                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Kategorija</label>
                            <select
                                name="kategorija"
                                className="form-select"
                                value={filter.kategorija}
                                onChange={handleFilterChange}
                            >
                                <option value="">Sve kategorije</option>

                                {kategorije.map((kat) => (
                                    <option key={kat.id_kategorije} value={kat.naziv}>
                                        {kat.naziv}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-4 mb-3">
                            <label className="form-label">Status</label>
                            <select
                                name="status"
                                className="form-select"
                                value={filter.status}
                                onChange={handleFilterChange}
                            >
                                <option value="">Svi statusi</option>
                                <option value="aktivna">aktivna</option>
                                <option value="zatvorena">zatvorena</option>
                                <option value="arhivirana">arhivirana</option>
                            </select>
                        </div>

                        <div className="col-md-4 mb-3">
                            <label className="form-label">Služba</label>
                            <select
                                name="sluzba"
                                className="form-select"
                                value={filter.sluzba}
                                onChange={handleFilterChange}
                            >
                                <option value="">Sve službe</option>

                                {sluzbe.map((sluzba) => (
                                    <option key={sluzba.id_sluzbe} value={sluzba.naziv}>
                                        {sluzba.naziv}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button className="btn btn-secondary" onClick={resetFilter}>
                        Poništi filtere
                    </button>
                </div>
            </div>

            <div className="row">
                {filtriraneObjave.length === 0 ? (
                    <p>Nema objava za odabrane filtere.</p>
                ) : (
                    filtriraneObjave.map((objava) => (
                        <div className="col-md-4 mb-4" key={objava.id_objave}>
                            <div className="card h-100">
                                {objava.slika && (
                                    <img
                                        src={`http://localhost:5000${objava.slika}`}
                                        className="card-img-top"
                                        alt={objava.naslov}
                                        style={{ height: "200px", objectFit: "cover" }}
                                    />
                                )}

                                <div className="card-body">
                                    <h5 className="card-title">{objava.naslov}</h5>
                                    <p className="card-text">{objava.opis}</p>
                                    <p><b>Lokacija:</b> {objava.lokacija}</p>
                                    <p><b>Kategorija:</b> {objava.kategorija}</p>
                                    <p><b>Status:</b> {objava.status}</p>
                                    <p><b>Služba:</b> {objava.sluzba || "Nije dodijeljena"}</p>

                                    <Link
                                        to={`/objave/${objava.id_objave}`}
                                        className="btn btn-primary"
                                    >
                                        Detalji
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Objave;