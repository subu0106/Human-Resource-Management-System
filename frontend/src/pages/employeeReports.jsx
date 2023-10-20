import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../node_modules/sweetalert2/dist/sweetalert2.js';
import { getDepts } from '../services/fakeDeptService';
import { getJobTitles } from '../services/jobTitles';

const EmployeeReports = () => {
    const navigate = useNavigate()
    const [selectedDept, setSelectedDept] = useState(null);
    const [selectedJob, setSelectedJob] = useState(null);
    const [selectedGender, setSelectedGender] = useState(null);

    const Job_titles=getJobTitles();
    const depts =  getDepts();

    const handleItemClick = (item) => {
        setSelectedDept(item);
    }

    const navigateTo = () => {
        if (!selectedDept && !selectedJob && !selectedGender) {
            Swal.fire({
                title: 'No options selected',
                text: `Select at least one option to generate the report`,
                icon: 'warning',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Close'
            })
            console.log("No elements in selectedOptions");
            return;
        }

        let passingData={selectedDept, selectedJob, selectedGender};
        console.log("navigate called", selectedDept, selectedJob, selectedGender);
        navigate(`/dashboard/viewEmpReports`, { state: { passingData } });
    }

    return (
        <div className='reports'>
            <h1 className='paragraph'>Group Employee Reports</h1>
            <ul>
                <li>
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
                </li>
                <li>
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                            {selectedJob ? selectedJob.job_title_name : 'Select Job Title'}
                    </button>
                
                    <ul className="dropdown-menu">
                        {Job_titles.map(item => (
                            <li key={item.job_title_id}>
                                <a
                                    className="dropdown-item"
                                    href="#"
                                    onClick={() => setSelectedJob(item)}
                                >
                                    {item.job_title_name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </li>

                <li>
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                            {selectedGender ? selectedGender.item_name : 'Select Gender'}
                    </button>
            
                    <ul className="dropdown-menu">
                        {Gender.map(item => (
                            <li key={item.item_id}>
                                <a
                                    className="dropdown-item"
                                    href="#"
                                    onClick={() => setSelectedGender(item)}
                                >
                                    {item.item_name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </li>
            </ul>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <button className="btn btn-primary" type="button" onClick={navigateTo}>Generate</button>
            </div>
        </div>
    );
}

export default EmployeeReports;

const Gender=[
    {
        item_id:1,
        item_name:'Male'
    },
    {
        item_id:2,
        item_name:'Female'
    }
]