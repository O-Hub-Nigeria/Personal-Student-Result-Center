import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';


function LoginPage({ handleLogin }) {
    const [matricNumber, setMatricNumber] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(matricNumber, password, setLoginStatus);
    };

    return (
        <div className="container ">
            <div className="row justify-content-center">
                
                    <h1>Login Page</h1>
                    <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Matric Number:</label>
                    <input className="form-control input-field" type="text" value={matricNumber} onChange={(e) => setMatricNumber(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input className="form-control input-field" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                    <div className="button-container text-center">
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                    <div className="form-group">
                        {loginStatus && <p>{loginStatus}</p>}
                        <p>
                            New user?{' '}
                            <Link to="/signup">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                    </form>
                </div>
            </div>
       
    );
}

export default LoginPage