import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../services/authService";

function AdminLogin() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
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
            const response = await adminLogin(formData);

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("korisnik", JSON.stringify(response.data.admin));

            alert(response.data.message);
            navigate("/admin");
            window.location.reload();
        } catch {
            alert("Pogrešan admin username ili password.");
        }
    };

    return (
        <div className="row justify-content-center mt-5">
            <div className="col-md-5">
                <div className="card">
                    <div className="card-header">
                        <h3>Admin login</h3>
                    </div>

                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="username"
                                placeholder="Admin username"
                                className="form-control mb-3"
                                value={formData.username}
                                onChange={handleChange}
                            />

                            <input
                                type="password"
                                name="password"
                                placeholder="Admin password"
                                className="form-control mb-3"
                                value={formData.password}
                                onChange={handleChange}
                            />

                            <button className="btn btn-dark w-100">
                                Prijavi se kao admin
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;