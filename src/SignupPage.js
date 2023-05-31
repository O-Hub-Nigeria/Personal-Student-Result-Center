import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import './App.css';



const SignupPage = ({ handleSignup,  setStudent }) => {
    const [matricNumber, setMatricNumber] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus,setLoginStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSignup(matricNumber, password, setLoginStatus, setStudent);
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
                    <div className="form-group">
                        {loginStatus && <p>{loginStatus}</p>}
                    </div>
                    <div className="button-container text-center" >
                        <button type="submit" className="btn btn-primary text-center">Sign Up</button>
                    </div>
                
            </form>
            </div>
            </div>
    );
};

export default SignupPage;
