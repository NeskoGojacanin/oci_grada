import { useEffect, useState } from "react";
import { mojePrijave } from "../services/prijavaService";

function MojePrijave() {
    const [prijave, setPrijave] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        ucitajPrijave();
    }, []);

    const ucitajPrijave = async () => {
        try {
            const response = await mojePrijave(token);
            setPrijave(response.data);
        } catch {
            alert("Greška pri učitavanju prijava.");
        }
    };

    return (
        <div>
            <h2 className="mb-4">Moje prijave</h2>

            {prijave.length === 0 ? (
                <p>Nemate prijava.</p>
            ) : (
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Naslov objave</th>
                            <th>Lokacija</th>
                            <th>Status</th>
                            <th>Datum</th>
                        </tr>
                    </thead>

                    <tbody>
                        {prijave.map((prijava) => (
                            <tr key={prijava.id_prijave}>
                                <td>{prijava.naslov}</td>
                                <td>{prijava.lokacija}</td>
                                <td>{prijava.status}</td>
                                <td>{new Date(prijava.datum_prijave).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default MojePrijave;