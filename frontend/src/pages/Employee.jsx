import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Profileview from './profileviewemp';

const Employee = () => {
    const navigate = useNavigate();
    const location = useLocation();
    let employee, edit, page,storedItem;
    
    if (location.state) {
        ({ employee, edit, page,storedItem } = location.state);
    }

    // Define a state to store the employee
    console.log("inside",page);
    const [storedEmployee, setStoredEmployee] = useState(employee);
    const [editEmployee, setEditEmployee] = useState(edit);

    useEffect(() => {
        if (employee) {
            // If employee is passed in location state, update storedEmployee and editEmployee
            setStoredEmployee(employee);
            setEditEmployee(edit);
        }
    }, [employee, edit]);

    const handleClicked = () => {
        console.log("handleClicked",page);
        if (page===1) {
            navigate(`/dashboard/employee-details/view-all-employees`);}
        else if (page===2) {
            navigate(`/dashboard/employee-details/view-subordinates`);}
        else if (page===3) {
            let passingData=storedItem;
            navigate(`/dashboard/viewEmpReports`, { state: { passingData} });}
        else if (page===4) {
            let passingData=storedItem;
            navigate(`/dashboard/viewCustomReports`, { state: { passingData} });}
        else return;
        }

    return (
        <React.Fragment>
            <Button onClick={handleClicked} style={{ marginLeft: '20px', marginRight: '10px', marginTop: '10px' }}>Back</Button>
            <div style={{ color: "#fff" }}>
                <Profileview isEditing={editEmployee} employee={storedEmployee}/>
            </div>

        </React.Fragment>
    );
}

export default Employee;