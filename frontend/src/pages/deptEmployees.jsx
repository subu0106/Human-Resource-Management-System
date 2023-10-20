import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import '../../node_modules/sweetalert2/dist/sweetalert2.js';
import Pagination from '../components/common/pagination';
import { getEmployees } from '../services/fakeDeptEmployees.js';
import { paginate } from '../utils/paginate';
import './css/allEmployees.css';


const DeptEmployees = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Initialize navigate function
    let item;
    
    if (location.state) {
        ({item} = location.state);
    }

    // Define a state to store the item
    const [storedItem, setStoredItem] = useState(item);

    useEffect(() => {
        if (item) {
            // If item is passed in location state, update setStoredItem
            setStoredItem(item);
        }
    }, [item]);

    console.log("inside",storedItem);

    {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

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

    const path="dashboard/deptEmployees";
    const viewEmployee = (employee, edit) => {
        // navigate(`/dashboard/Employee`, { state: { employee, edit, path } });
    };

    const renderSortIcon = (column) => {
        if (column !== state.sortColumn.path) return null;
        if (state.sortColumn.order === 'asc') return <i className='fa fa-sort-asc'></i>;
        return <i className='fa fa-sort-desc'></i>;
    }

    const { length: count } = state.employees;
    if (count === 0) return <p className='paragraph'>No employees in {storedItem.dept_name} department</p>;

    const sorted = _.orderBy(state.employees, [state.sortColumn.path], [state.sortColumn.order]);
    const employeesInPage = paginate(sorted, state.currentPage, state.pageSize);

    return (
        <React.Fragment>
            <Link to="/dashboard/reports/employees-by-dept">
                <Button>Back</Button>
            </Link>

{/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <p className='paragraph'>Total employees of {storedItem.dept_name} : {count}</p>
            <div className='table-container'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th className='clickable' onClick={() => handleSort("employee_id")}>Employee ID {renderSortIcon("employee_id")}</th>
                            <th className='clickable' onClick={() => handleSort("employee_name")}>Name {renderSortIcon("employee_name")}</th>
                            <th className='clickable' onClick={() => handleSort("job_title")}>Job Title {renderSortIcon("job_title")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employeesInPage.map(employee => (
                            <tr key={employee.employee_id}>
                                <td onClick={() => viewEmployee(employee,false)}>{employee.employee_id}</td>
                                <td onClick={() => viewEmployee(employee,false)}>{employee.employee_name}</td>
                                <td onClick={() => viewEmployee(employee,false)}>{employee.job_title}</td>
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
{/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

        </React.Fragment>
    );
}

export default DeptEmployees;