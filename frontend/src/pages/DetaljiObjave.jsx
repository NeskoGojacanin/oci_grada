import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJednaObjava } from "../services/objavaService";
import { getKomentariZaObjavu, dodajKomentar } from "../services/komentarService";
import { dodajPrijavu } from "../services/prijavaService";

function DetaljiObjave() {
    const { id } = useParams();

    const [objava, setObjava] = useState(null);
    const [komentari, setKomentari] = useState([]);
    const [tekst, setTekst] = useState("");

    const token = localStorage.getItem("token");

    const prijaviProblem = async () => {
        if (!token) {
            alert("Morate biti prijavljeni.");
            return;
        }

        try {
            await dodajPrijavu(id, token);
            alert("Problem je uspješno prijavljen.");
        } catch {
            alert("Greška pri prijavi problema.");
        }
    };

    useEffect(() => {
        ucitajObjavu();
        ucitajKomentare();
    }, []);

    const ucitajObjavu = async () => {
        try {
            const response = await getJednaObjava(id);
            setObjava(response.data);
        } catch {
            alert("Greška pri učitavanju objave.");
        }
    };

    const ucitajKomentare = async () => {
        try {
            const response = await getKomentariZaObjavu(id);
            setKomentari(response.data);
        } catch {
            alert("Greška pri učitavanju komentara.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!tekst.trim()) {
            alert("Unesi komentar.");
            return;
        }

        try {
            await dodajKomentar(
                {
                    id_objave: id,
                    tekst
                },
                token
            );

            setTekst("");
            ucitajKomentare();
        } catch {
            alert("Morate biti prijavljeni da komentarišete.");
        }
    };

    if (!objava) {
        return <h3>Učitavanje...</h3>;
    }

    return (
        <div>
            <div className="card mb-4">
                {objava.slika && (
                    <img
                        src={`http://localhost:5000${objava.slika}`}
                        className="card-img-top"
                        alt={objava.naslov}
                        style={{ maxHeight: "400px", objectFit: "cover" }}
                    />
                )}
                <div className="card-body">
                    <h2>{objava.naslov}</h2>
                    <hr />

                    <p><strong>Opis:</strong><br />{objava.opis}</p>
                    <p><strong>Lokacija:</strong> {objava.lokacija}</p>
                    <p><strong>Kategorija:</strong> {objava.kategorija}</p>
                    <p><strong>Status:</strong> {objava.status}</p>
                    <p><strong>Autor:</strong> {objava.autor}</p>
                    
                    
                    <button className="btn btn-danger mt-3" onClick={prijaviProblem}>
                        Prijavi problem
                    </button>
                </div>
            </div>

            <div className="card">
                <div className="card-header">
                    <h4>Komentari</h4>
                </div>

                <div className="card-body">
                    {token && (
                        <form onSubmit={handleSubmit} className="mb-4">
                            <textarea
                                className="form-control mb-2"
                                placeholder="Napiši komentar..."
                                value={tekst}
                                onChange={(e) => setTekst(e.target.value)}
                            />

                            <button className="btn btn-primary">
                                Dodaj komentar
                            </button>
                        </form>
                    )}

                    {!token && (
                        <p className="text-muted">
                            Morate biti prijavljeni da biste komentarisali.
                        </p>
                    )}

                    {komentari.length === 0 ? (
                        <p>Nema komentara.</p>
                    ) : (
                        komentari.map((komentar) => (
                            <div
                                className="border rounded p-3 mb-2"
                                key={komentar.id_komentara}
                            >
                                <strong>{komentar.autor}</strong>
                                <p className="mb-1">{komentar.tekst}</p>
                                <small className="text-muted">
                                    {new Date(komentar.datum).toLocaleString()}
                                </small>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default DetaljiObjave;