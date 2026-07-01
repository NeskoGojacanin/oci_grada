

import { useState } from "react";
import { register } from "../services/authService";

function Register() {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        ime: "",
        prezime: "",
        telefon: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await register(formData);

            alert(response.data.message);

            setFormData({
                username: "",
                email: "",
                password: "",
                ime: "",
                prezime: "",
                telefon: ""
            });

        } catch (error) {

            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Greška na serveru.");
            }

        }
    };

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-6">

                    <div className="card">

                        <div className="card-header">
                            <h3>Registracija</h3>
                        </div>

                        <div className="card-body">

                            <form onSubmit={handleSubmit}>

                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    className="form-control mb-3"
                                    value={formData.username}
                                    onChange={handleChange}
                                />

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    className="form-control mb-3"
                                    value={formData.email}
                                    onChange={handleChange}
                                />

                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className="form-control mb-3"
                                    value={formData.password}
                                    onChange={handleChange}
                                />

                                <input
                                    type="text"
                                    name="ime"
                                    placeholder="Ime"
                                    className="form-control mb-3"
                                    value={formData.ime}
                                    onChange={handleChange}
                                />

                                <input
                                    type="text"
                                    name="prezime"
                                    placeholder="Prezime"
                                    className="form-control mb-3"
                                    value={formData.prezime}
                                    onChange={handleChange}
                                />

                                <input
                                    type="text"
                                    name="telefon"
                                    placeholder="Telefon"
                                    className="form-control mb-3"
                                    value={formData.telefon}
                                    onChange={handleChange}
                                />

                                <button className="btn btn-primary w-100">
                                    Registruj se
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Register;