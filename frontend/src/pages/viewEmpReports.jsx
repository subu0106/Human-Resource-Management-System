import _ from 'lodash';
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import '../../node_modules/sweetalert2/dist/sweetalert2.js';
import Pagination from '../components/common/pagination';
import { getEmployees } from '../services/fakeEmployeesOfselectedField.js';
import { paginate } from '../utils/paginate';
import './css/allEmployees.css';

const RepEmployees = () => {
    const location = useLocation();
    let passingData;
    
    if (location.state) {
        ({passingData} = location.state);
    }

    // Define a state to store the item
    const [storedItem, setStoredItem] = useState(passingData);

    useEffect(() => {
        if (passingData) {
            // If item is passed in location state, update setStoredItem
            setStoredItem(passingData);
        }
    }, [passingData]);

    console.log("inside",storedItem);
    //calling backend/////////////////////////////////////////////////////////////////////////////////////////////////////
    if (storedItem.selectedDept !== null) {
        const { dept_id, dept_name } = storedItem.selectedDept;
    } else {
        const dept_id=-1; //indicates it is not selected
    }

    if (storedItem.selectedJob !== null) {
        const { job_title_id, job_title_name } = storedItem.selectedJob;
    } else {
        const job_title_id=-1; //indicates it is not selected
    }

    if (storedItem.selectedGender !== null) {
        const { item_id, item_name } = storedItem.selectedGender;
    } else {
        const item_id=-1; //indicates it is not selected
    }
    //calling backend/////////////////////////////////////////////////////////////////////////////////////////////////////

    {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
    const navigate = useNavigate(); // Initialize navigate function

    const [state, setState] = useState({
        employees: getEmployees(),
        pageSize: 14,
        currentPage: 1,
        sortColumn: { path: 'employee_id', order: 'asc' }
    });

    const handlePageChange = (page) => {
        setState({ ...state, currentPage: page });
    }

    const handleSort = (path) => {
        const sortColumn = { ...state.sortColumn };
        if (sortColumn.path === path)
            sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';
        else {
            sortColumn.path = path;
            sortColumn.order = 'asc';
        }
        setState({ ...state, sortColumn });
    }
/////////////////////////////////////////////////////
    const page=3;

    const viewEmployee = (employee, edit) => {
        navigate(`/dashboard/Employee`, { state: { employee, edit, page, storedItem} });
    };

    const renderSortIcon = (column) => {
        if (column !== state.sortColumn.path) return null;
        if (state.sortColumn.order === 'asc') return <i className='fa fa-sort-asc'></i>;
        return <i className='fa fa-sort-desc'></i>;
    }

    const { length: count } = state.employees;
    if (count === 0) return <p className='paragraph'>No such reports</p>;

    const sorted = _.orderBy(state.employees, [state.sortColumn.path], [state.sortColumn.order]);
    const employeesInPage = paginate(sorted, state.currentPage, state.pageSize);

    return (
        <React.Fragment>
            <Link to="/dashboard/reports/employee-reports">
                <Button>Back</Button>
            </Link>

            {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <p className='paragraph'>Total Reports : {count}</p>
            <div className='table-container'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th className='clickable' onClick={() => handleSort("employee_id")}>Employee ID {renderSortIcon("employee_id")}</th>
                            <th className='clickable' onClick={() => handleSort("employee_name")}>Name {renderSortIcon("employee_name")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employeesInPage.map(employee => (
                            <tr key={employee.employee_id}>
                                <td onClick={() => viewEmployee(employee,false)}>{employee.employee_id}</td>
                                <td onClick={() => viewEmployee(employee,false)}>{employee.employee_name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination className='pagination'
                itemsCount={count}
                pageChange={handlePageChange}
                pageSize={state.pageSize}
                currentPage={state.currentPage}
            />
            {/* ////////////////////////////////////////////////////////////////////////////////////////////////////// //////////////*/}
        </React.Fragment>
    );
}

export default RepEmployees;