import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dodajObjavu } from "../services/objavaService";
import { getKategorije } from "../services/kategorijaService";

function NovaObjava() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [kategorije, setKategorije] = useState([]);

    const [forma, setForma] = useState({
        id_kategorije: "",
        naslov: "",
        opis: "",
        lokacija: ""
    });

    const [slika, setSlika] = useState(null);

    useEffect(() => {
        ucitajKategorije();
    }, []);

    const ucitajKategorije = async () => {
        try {
            const response = await getKategorije();
            setKategorije(response.data);
        } catch {
            alert("Greška pri učitavanju kategorija.");
        }
    };

    const handleChange = (e) => {
        setForma({
            ...forma,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("id_kategorije", forma.id_kategorije);
        formData.append("naslov", forma.naslov);
        formData.append("opis", forma.opis);
        formData.append("lokacija", forma.lokacija);

        if (slika) {
            formData.append("slika", slika);
        }

        try {
            await dodajObjavu(formData, token);
            alert("Objava uspješno dodata.");
            navigate("/objave");
        } catch {
            alert("Greška pri dodavanju objave.");
        }
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-7">
                <div className="card">
                    <div className="card-header">
                        <h3>Nova objava</h3>
                    </div>

                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <select
                                name="id_kategorije"
                                className="form-select mb-3"
                                value={forma.id_kategorije}
                                onChange={handleChange}
                            >
                                <option value="">Odaberi kategoriju</option>

                                {kategorije.map((kategorija) => (
                                    <option
                                        key={kategorija.id_kategorije}
                                        value={kategorija.id_kategorije}
                                    >
                                        {kategorija.naziv}
                                    </option>
                                ))}
                            </select>

                            <input
                                type="text"
                                name="naslov"
                                placeholder="Naslov"
                                className="form-control mb-3"
                                value={forma.naslov}
                                onChange={handleChange}
                            />

                            <textarea
                                name="opis"
                                placeholder="Opis"
                                className="form-control mb-3"
                                value={forma.opis}
                                onChange={handleChange}
                            />

                            <input
                                type="text"
                                name="lokacija"
                                placeholder="Lokacija"
                                className="form-control mb-3"
                                value={forma.lokacija}
                                onChange={handleChange}
                            />

                            <input
                                type="file"
                                className="form-control mb-3"
                                onChange={(e) => setSlika(e.target.files[0])}
                            />

                            <button className="btn btn-primary w-100">
                                Dodaj objavu
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NovaObjava;