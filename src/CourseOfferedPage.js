import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState,useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { getFirestore, collection } from 'firebase/firestore';
import {  getDocs } from 'firebase/firestore';

import './App.css';

function CourseOfferedPage({ addCourse, courses, matricNumber }) {
    const [courseCode, setCourseCode] = useState("");
    const [creditUnit, setCreditUnit] = useState("");
    const [grade, setGrade] = useState("");
    const [courseList, setCourseList] = useState([]);
   
    // Fetch the course codes and credit units from Firestore on component mount
    useEffect(() => {
        const fetchCourseList = async () => {
            try {
                // Get the Firestore instance
                const firestore = getFirestore();

                // Get the collection reference for the course list
                const courseListCollectionRef = collection(firestore, 'courselist');

                // Fetch the documents in the course list collection
                const querySnapshot = await getDocs(courseListCollectionRef);

                // Map the documents to an array of course objects
                const fetchedCourseList = querySnapshot.docs.map((doc) => {
                    return { courseCode: doc.id, creditUnit: doc.data().creditUnit };
                });

                // Set the course list in the state
                setCourseList(fetchedCourseList);
            } catch (error) {
                console.error('Error fetching course list:', error);
            }
        };

        fetchCourseList();
    }, []);


    const handleAddCourse = () => {
        if (courseCode && creditUnit && grade) {
            let gradeValue;
            switch (grade.toUpperCase()) {
                case "A":
                    gradeValue = 5;
                    break;
                case "B":
                    gradeValue = 4;
                    break;
                case "C":
                    gradeValue = 3;
                    break;
                case "D":
                    gradeValue = 2;
                    break;
                case "E":
                    gradeValue = 1;
                    break;
                case "F":
                    gradeValue = 0;
                    break;
                default:
                    gradeValue = 0;
            }

            const course = {
                id: uuidv4(),
                courseCode,
                creditUnit: parseInt(creditUnit),
                grade: gradeValue,
            };

            addCourse(course, matricNumber);
            setCourseCode("");
            setCreditUnit("");
            setGrade("");
        }
    };

    return (
        <div className="container">
            <h2 className="text-center">Add Course</h2>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Course Code:</label>
                        <select
                            className="form-control"
                            value={courseCode}
                            onChange={(e) => {
                                setCourseCode(e.target.value);
                                const selectedCourse = courseList.find(
                                    (course) => course.courseCode === e.target.value
                                );
                                if (selectedCourse) {
                                    setCreditUnit(selectedCourse.creditUnit);
                                } else {
                                    setCreditUnit("");
                                }
                            }}
                        >
                            <option value="">Select Course</option>
                            {courseList.map((course) => (
                                <option key={course.courseCode} value={course.courseCode}>
                                    {course.courseCode}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Credit Unit:</label>
                        <input
                            type="number"
                            className="form-control"
                            value={creditUnit}
                            onChange={(e) => setCreditUnit(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Grade:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={grade}
                            onChange={(e) => setGrade(e.target.value)}
                        />
                    </div>
                    <div className="text-center">
                        <button className="btn btn-primary" onClick={handleAddCourse}>
                            Add Course
                        </button>
                    </div>
                </div>
            </div>

            <h2 className="text-center">Course List</h2>
            {courses && courses.length > 0 ? (
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
                                <td>
                                    {course.grade === 5 ? "A" :
                                        course.grade === 4 ? "B" :
                                            course.grade === 3 ? "C" :
                                                course.grade === 2 ? "D" :
                                                    course.grade === 1 ? "E" :
                                                        "F"}

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No courses added yet.</p>
            )}

            {courses && courses.length > 0 && (
                <div className="button-container text-center">
                    <Link to="/results" className="btn btn-primary">
                        Show Results (CGPA)
                    </Link>
                </div>
            )}
        </div>
    );
}
export default CourseOfferedPage