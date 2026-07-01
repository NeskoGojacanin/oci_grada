import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
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
            const response = await login(formData);

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("korisnik", JSON.stringify(response.data.korisnik));

            alert(response.data.message);

            navigate("/");
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Greška na serveru.");
            }
        }
    };

    return (
        <div className="row justify-content-center mt-5">
            <div className="col-md-5">
                <div className="card">
                    <div className="card-header">
                        <h3>Login</h3>
                    </div>

                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
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

                            <button className="btn btn-primary w-100">
                                Prijavi se
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;