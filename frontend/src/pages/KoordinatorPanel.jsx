import { useEffect, useState } from "react";
import { svePrijave, promijeniStatus } from "../services/prijavaService";
import { getSluzbe } from "../services/sluzbaService";

function KoordinatorPanel() {
    const token = localStorage.getItem("token");
    const [prijave, setPrijave] = useState([]);
    const [sluzbe, setSluzbe] = useState([]);
    const [odabraneSluzbe, setOdabraneSluzbe] = useState({});

    useEffect(() => {
        ucitajPrijave();
        ucitajSluzbe();
    }, []);
    
    const ucitajSluzbe = async () => {
        try {
            const response = await getSluzbe();
            setSluzbe(response.data);
        } catch {
            alert("Greška pri učitavanju službi.");
        }
    };
    const ucitajPrijave = async () => {
        try {
            const response = await svePrijave(token);
            setPrijave(response.data);
        } catch {
            alert("Greška pri učitavanju prijava.");
        }
    };

    const promijeni = async (id_prijave, noviStatus) => {
        try {
            await promijeniStatus(
                id_prijave,
                {
                    status: noviStatus,
                    id_sluzbe: odabraneSluzbe[id_prijave] || null
                },
                token
            );

            alert("Prijava ažurirana.");
            ucitajPrijave();
        } catch {
            alert("Greška pri promjeni prijave.");
        }
    };


    return (
        <div>
            <h2 className="mb-4">Koordinator panel</h2>

            {prijave.length === 0 ? (
                <p>Nema prijava.</p>
            ) : (
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Objava</th>
                            <th>Lokacija</th>
                            <th>Korisnik</th>
                            <th>Status</th>
                            <th>Promijeni status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {prijave.map((prijava) => (
                            <tr key={prijava.id_prijave}>
                                <td>{prijava.id_prijave}</td>
                                <td>{prijava.naslov}</td>
                                <td>{prijava.lokacija}</td>
                                <td>{prijava.korisnik}</td>
                                <td>{prijava.sluzba}</td>
                                <td>
                                    <select
                                        className="form-select"
                                        value={odabraneSluzbe[prijava.id_prijave] || ""}
                                        onChange={(e) =>
                                            setOdabraneSluzbe({
                                                ...odabraneSluzbe,
                                                [prijava.id_prijave]: e.target.value
                                            })
                                        }
                                    >
                                        <option value="">Odaberi službu</option>
                                        {sluzbe.map((sluzba) => (
                                            <option key={sluzba.id_sluzbe} value={sluzba.id_sluzbe}>
                                                {sluzba.naziv}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td>{prijava.status}</td>
                                <td>
                                    <select
                                        className="form-select"
                                        value={prijava.status}
                                        onChange={(e) =>
                                            promijeni(prijava.id_prijave, e.target.value)
                                        }
                                    >
                                        <option value="predana">predana</option>
                                        <option value="u_obradi">u_obradi</option>
                                        <option value="proslijedjena">proslijedjena</option>
                                        <option value="zavrsena">zavrsena</option>
                                        <option value="odbijena">odbijena</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default KoordinatorPanel;