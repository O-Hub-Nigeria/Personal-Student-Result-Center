import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './App.css';
import './HomePage.css';

function HomePage({ student, setStudent }) {
    return (
        <div className="home-page">
            <h1 className="home-page__title">Welcome to Persona Student Result Center </h1>
            {student.matricNumber ? (
                <div className="home-page__logged-in">
                    <p className="home-page__logged-in-text">
                        You are logged in as <span className="home-page__matric-number">{student.matricNumber}</span>
                    </p>
                </div>
            ) : (
                <div className="home-page__logged-out">
                    <p className="home-page__logged-out-text">Please log in to access the course offered page.</p>
                </div>
            )}
            <div className="home-page__banner">
                <img src="https://leadschool.in/wp-content/uploads/2023/04/banner-2.png" alt="Banner" className="home-page__banner-image" />
            </div>
        </div>
    );
}

export default HomePage;
