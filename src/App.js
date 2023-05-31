import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { doc, getDoc, setDoc, getDocs , query, where} from 'firebase/firestore';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Link, BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import ResultPage from './ResultPage';
import CourseOfferedPage from './CourseOfferedPage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import HomePage from './HomePage';



function App() {
    const [student, setStudent] = useState({
        matricNumber: '',
        password: '',
        courses: []

    });



    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
       apiKey: "AIzaSyCd_IpQTRmDUsK2yFyrztsc8J9JA6Cf0hY",
        authDomain: "student-result-app.firebaseapp.com",
        projectId: "student-result-app",
        storageBucket: "student-result-app.appspot.com",
        messagingSenderId: "250630016695",
        appId: "1:250630016695:web:bd61110a08c2add441c732",
        measurementId: "G-GN3G366YNM"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

  
   
    const addCourse = async (course, matricNumber) => {
        try {
            // Get the Firestore instance
            const firestore = getFirestore(app);

            // Define the collection reference
            const coursesCollectionRef = collection(firestore, 'courses');
            // Create a new course document with the provided details
            const newCourse = {
                ...course,
                matricNumber: matricNumber
            };

            // Add the course document to the collection
            await addDoc(coursesCollectionRef, newCourse);

            // Update the student object with the added course
            setStudent({ ...student, courses: [...student.courses, course] });
        } catch (error) {
            console.error('Error adding course:', error);
        }
    };

    const calculateCGPA = () => {
        const totalCreditUnits = student.courses.reduce((total, course) => total + course.creditUnit, 0);
        const totalGradePoints = student.courses.reduce((total, course) => total + course.grade * course.creditUnit, 0);

        if (totalCreditUnits > 0) {
            return (totalGradePoints / totalCreditUnits).toFixed(2);
        } else {
            return 0;
        }
    };
    const navigate = useNavigate();
    const handleSignUp = async (matricNumber, password, setLoginStatus) => {
        try {
            // Get the Firestore instance
            const firestore = getFirestore();

            // Define the collection references
            const studentsCollectionRef = collection(firestore, 'students');
           

            // Get the document reference for the provided matric number
            const docRef = doc(studentsCollectionRef, matricNumber);

            // Check if the document exists
            const docSnapshot = await getDoc(docRef);

            if (docSnapshot.exists()) {
                setLoginStatus('Account with this matric number already exists');
            } else {
                // No document found, create a new document for the student
                const newStudent = {
                    matricNumber: matricNumber,
                    password: password,
                    courses: [],
                };

                // Create a new document with the student's details
                await setDoc(docRef, newStudent);
                setLoginStatus('Account created successfully');

                // Clear the matricNumber and password after creating the document
                setStudent({ matricNumber: '', password: '', courses: [] });
            }
        } catch (error) {
            console.error('Error creating/fetching student document:', error);
        }
    };
    const handleLogin = async (matricNumber, password, setLoginStatus) => {
        try {
            // Get the Firestore instance
            const firestore = getFirestore(app);

            // Define the collection references
            const studentsCollectionRef = collection(firestore, 'students');
            const coursesCollectionRef = collection(firestore, 'courses');

            // Get the document reference for the provided matric number
            const docRef = doc(studentsCollectionRef, matricNumber);

            // Check if the document exists
            const docSnapshot = await getDoc(docRef);
            
                // Login functionality
                if (docSnapshot.exists()) {
                    // A document with the matric number exists, check if the password matches
                    const existingStudent = docSnapshot.data();
                    if (existingStudent.password === password) {
                        console.log('User authenticated');

                        // Get the courses associated with the matric number
                        const coursesQuerySnapshot = await getDocs(
                            query(
                                coursesCollectionRef,
                                where('matricNumber', '==', matricNumber)
                            )
                        );
                        const courses = [];

                        // Iterate over the courses and add them to the courses array
                        coursesQuerySnapshot.forEach((doc) => {
                            courses.push(doc.data());
                        });

                        // Set the student object with the existing data and courses
                        setStudent({ ...existingStudent, courses });

                        // Redirect to Course Offered page
                        navigate('/course-offered');
                    } else {
                        setLoginStatus('Incorrect password');
                    }
                } else {
                    setLoginStatus('Matric number does not exist');
                }
            
        } catch (error) {
            console.error('Error creating/fetching student document:', error);
        }
    };


    const handleLogout = () => {
            // Clear the student data and redirect to the login page
            setStudent({
                matricNumber: '',
                password: '',
                courses: [],
            });
            navigate('/login');
        };  

    return (
        <div>
            <Navbar handleLogout={handleLogout} isLoggedOut={!student.matricNumber} />
            <Routes>
                <Route path="/" element={<HomePage student={student} setStudent={setStudent} />} />
                {student.matricNumber ? (
                    <>
                        <Route
                            path="/course-offered"
                            element={
                                <CourseOfferedPage
                                    addCourse={addCourse}
                                    courses={student.courses}
                                    matricNumber={student.matricNumber}
                                />
                            }
                        />
                        <Route
                            path="/results"
                            element={<ResultPage courses={student.courses} calculateCGPA={calculateCGPA} />}
                        />
                    </>
                ) : (
                    <>
                        <Route path="/login" element={<LoginPage handleLogin={handleLogin} />} />
                        <Route path="/signup" element={<SignupPage handleSignUp={handleSignUp} />} />
                    </>
                )}
            </Routes>

        </div>
    );

}



function Navbar({ handleLogout, isLoggedOut }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const navigate = useNavigate();

    const toggleNavbar = () => {
        setIsExpanded(!isExpanded);
    };

    const handleLogoutClick = () => {
        handleLogout(); // Call the logout function provided by the parent component
        navigate('/login'); // Redirect to the login page after logout
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img className="logo" src="https://portal.mouau.edu.ng/images/logo/mou_logo_c.png" alt="Logo" />
                </Link>
                <button
                    className={`navbar-toggler ${isExpanded ? '' : 'collapsed'}`}
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded={isExpanded ? 'true' : 'false'}
                    aria-label="Toggle navigation"
                    onClick={toggleNavbar}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isExpanded ? 'show' : ''}`} id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/course-offered">
                                Courses Offered
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/results">
                                Results
                            </Link>
                        </li>
                        {!isLoggedOut && (
                            <li className="nav-item">
                                <button className="nav-link btn btn-link" onClick={handleLogoutClick}>
                                    Logout
                                </button>
                            </li>
                        )}
                        {isLoggedOut && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">
                                    Login
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}


function RouterWrapper() {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
}

export default RouterWrapper;
