import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './App.css';


function ResultPage(props) {
    const { courses } = props;

    const calculateCGPA = () => {
        const totalCreditUnits = courses.reduce((total, course) => total + course.creditUnit, 0);
        const totalGradePoints = courses.reduce((total, course) => total + course.grade * course.creditUnit, 0);

        if (totalCreditUnits > 0) {
            return (totalGradePoints / totalCreditUnits).toFixed(2);
        } else {
            return 0;
        }
    };


    return (
        <div className="container">
            <div className="text-center">
                <h2>Results</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Course Code</th>
                            <th>Credit Unit</th>
                            <th>Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course) => (
                            <tr key={course.id}>
                                <td>{course.courseCode}</td>
                                <td>{course.creditUnit}</td>
                                <td> {course.grade === 5 ? "A" :
                                    course.grade === 4 ? "B" :
                                        course.grade === 3 ? "C" :
                                            course.grade === 2 ? "D" :
                                                course.grade === 1 ? "E" :
                                                    "F"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <h2>CGPA: {calculateCGPA()}</h2>
            </div>
        </div>
    );
}


export default ResultPage;