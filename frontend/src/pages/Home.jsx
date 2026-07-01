import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getObjave } from "../services/objavaService";

function Home() {
    const [objave, setObjave] = useState([]);
    const [pretraga, setPretraga] = useState("");

    useEffect(() => {
        ucitajObjave();
    }, []);

    const ucitajObjave = async () => {
        try {
            const response = await getObjave();
            setObjave(response.data);
        } catch {
            alert("Greška pri učitavanju objava.");
        }
    };

    const filtriraneObjave = objave.filter((objava) =>
        objava.lokacija?.toLowerCase().includes(pretraga.toLowerCase())
    );

    return (
        <div>
            <div className="p-5 mb-5 bg-primary text-white rounded-4">
                <h1 className="display-5 fw-bold">Oči Grada</h1>

                <p className="fs-5 mt-3">
                    Aplikacija omogućava građanima da prijave komunalne probleme,
                    prate status prijava i olakšaju komunikaciju sa nadležnim službama.
                </p>

                <div className="mt-4">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Pretraži objave po lokaciji, npr. Podgorica"
                        value={pretraga}
                        onChange={(e) => setPretraga(e.target.value)}
                    />
                </div>
            </div>

            {pretraga && (
                <div className="mb-5">
                    <h3 className="mb-3">Rezultati pretrage</h3>

                    {filtriraneObjave.length === 0 ? (
                        <p>Nema objava za unesenu lokaciju.</p>
                    ) : (
                        <div className="row">
                            {filtriraneObjave.map((objava) => (
                                <div className="col-md-4 mb-4" key={objava.id_objave}>
                                    <div className="card h-100">
                                        {objava.slika && (
                                            <img
                                                src={`http://localhost:5000${objava.slika}`}
                                                className="card-img-top"
                                                alt={objava.naslov}
                                                style={{ height: "180px", objectFit: "cover" }}
                                            />
                                        )}

                                        <div className="card-body">
                                            <h5>{objava.naslov}</h5>
                                            <p>{objava.opis}</p>
                                            <p><b>Lokacija:</b> {objava.lokacija}</p>
                                            <p><b>Status:</b> {objava.status}</p>

                                            <Link
                                                to={`/objave/${objava.id_objave}`}
                                                className="btn btn-primary"
                                            >
                                                Detalji
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            <div className="row">
                <div className="col-md-4 mb-4">
                    <div className="card h-100">
                        <div className="card-body">
                            <h4> Prijavi problem</h4>
                            <p>Dodaj novu objavu sa opisom, lokacijom i fotografijom problema.</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card h-100">
                        <div className="card-body">
                            <h4> Prati prijavu</h4>
                            <p>Nakon slanja prijave možeš pratiti njen trenutni status.</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card h-100">
                        <div className="card-body">
                            <h4> Saradnja sa službama</h4>
                            <p>Koordinatori raspoređuju prijave nadležnim gradskim službama.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;