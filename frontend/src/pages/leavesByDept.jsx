import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../node_modules/sweetalert2/dist/sweetalert2.js';
import { getDepts } from '../services/fakeDeptService';
import './css/LeaveByDept.css';

const LeavesByDept = () => {
    const navigate = useNavigate()
    const [selectedDept, setSelectedDept] = useState(null);
    const [selectedStart, setSelectedStart] = useState('');
    const [selectedEnd, setSelectedEnd] = useState('');

    const depts = getDepts();

    const handleItemClick = (item) => {
        setSelectedDept(item);
    }

    const handleStartDateChange = (event) => {
        setSelectedStart(event.target.value);
    }

    const handleEndDateChange = (event) => {
        setSelectedEnd(event.target.value);
    }

    const navigateTo = () => {
        if (!selectedDept || !selectedStart || !selectedEnd) {
            Swal.fire({
                title: 'Select required options',
                text: `All options are required to generate the report`,
                icon: 'warning',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Close'
            })
            console.log("No elements in selectedOptions");
            return;
        }
            
        let passingData={selectedDept, selectedStart, selectedEnd};
        console.log("navigate called", selectedDept, selectedStart, selectedEnd);
        navigate(`/dashboard/deptLeaves`, { state: { passingData } });
    }

    return (
        <div className='reports'>
            <h1 className='paragraph'>View Leaves By Department</h1>
            <div className='dropdown'>
                <div className="date-input">
                    <label className="label" htmlFor="start-date">Start Date:</label>
                    <input type="date" id="start-date" value={selectedStart} onChange={handleStartDateChange} required/>
                </div>
                <div className="date-input">
                    <label className="label" htmlFor="end-date">End Date:</label>
                    <input type="date" id="end-date" value={selectedEnd} onChange={handleEndDateChange} required/>
                </div>
                
                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                    {selectedDept ? selectedDept.dept_name : 'Select Department'}
                </button>
                <ul className="dropdown-menu">
                    {depts.map(item => (
                        <li key={item.dept_id}>
                            <a
                                className="dropdown-item"
                                href="#"
                                onClick={() => handleItemClick(item)}
                            >
                                {item.dept_name}
                            </a>
                        </li>
                    ))}
                </ul>
                <div>
                    <button className="btn btn-primary" type="button" onClick={navigateTo}>Generate</button>
                </div>
            </div>
        </div>
    );
}

export default LeavesByDept;