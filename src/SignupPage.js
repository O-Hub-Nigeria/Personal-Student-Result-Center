import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import './App.css';



const SignupPage = ({ handleLogin, setLoginStatus }) => {
    const [matricNumber, setMatricNumber] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(matricNumber, password, setLoginStatus, true);
    };

    return (
        <div className="container ">
            <div className="row justify-content-center">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Matric Number:</label>
                    <input
                            className="form-control input-field"
                        type="text"
                        value={matricNumber}
                        onChange={(e) => setMatricNumber(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                            className="form-control input-field"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                    <button type="submit" className="btn btn-primary text-center">Sign Up</button>
            </form>
            </div>
            </div>
    );
};

export default SignupPage;
