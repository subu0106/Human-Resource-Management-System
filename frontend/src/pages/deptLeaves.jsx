import _ from 'lodash';
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import 'sweetalert2/dist/sweetalert2.js';
import Pagination from '../components/common/pagination.jsx';
import { getEmpLeaves } from '../services/leavesForReports.js';
import { paginate } from '../utils/paginate.js';
import './css/allEmployees.css';

const DeptLeaves = () => {
    const location = useLocation();
    let passingData;
    
    if (location.state) {
        ({passingData} = location.state);
    }

    // Define a state to store the item
    const [storedItem, setStoredItem] = useState(passingData);

    useEffect(() => {
        if (passingData) {
            // If passingData is passed in location state, update setStoredItem
            setStoredItem(passingData);
        }
    }, [passingData]);

    console.log("inside",storedItem);
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const navigate = useNavigate(); // Initialize navigate function

    const reports=true;
    const navigateTo = (leave) => {
        console.log(leave);
        
        navigate(`/dashboard/viewRequest`, { state: {leave,leaves_page:true,reports,storedItem} });
    };

    const [state, setState] = useState({
        leaves: getEmpLeaves(),
        pageSize: 14,
        currentPage: 1,
        sortColumn: { path: 'leave_id', order: 'asc' }
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

    const renderSortIcon = (column) => {
        if (column !== state.sortColumn.path) return null;
        if (state.sortColumn.order === 'asc') return <i className='fa fa-sort-asc'></i>;
        return <i className='fa fa-sort-desc'></i>;
    }

    const { length: count } = state.leaves;
    if (count === 0) return <p className='paragraph'>You have no past leaves</p>;

    const sorted = _.orderBy(state.leaves, [state.sortColumn.path], [state.sortColumn.order]);
    const leavesInPage = paginate(sorted, state.currentPage, state.pageSize);

    return (
        <React.Fragment>
            <Link to="/dashboard/reports/leaves-by-dept">
                <Button>Back</Button>
            </Link>

            <p className='paragraph'>Showing {count} Total Leaves of {storedItem.selectedDept.dept_name} from {storedItem.selectedStart} to {storedItem.selectedEnd}</p>

            <div className='table-container'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th className='clickable' onClick={() => handleSort("leave_id")}>Leave ID {renderSortIcon("leave_id")}</th>
                            <th className='clickable' onClick={() => handleSort("employee_id")}>Employee ID {renderSortIcon("employee_id")}</th>
                            <th className='clickable' onClick={() => handleSort("employee_name")}>Employee Name{renderSortIcon("employee_name")}</th>
                            <th className='clickable' onClick={() => handleSort("leave_type")}>Leave Type{renderSortIcon("leave_type")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leavesInPage.map(leave => (
                            <tr key={leave.leave_id}>
                                <td onClick={() => navigateTo(leave)}>{leave.leave_id}</td>
                                <td onClick={() => navigateTo(leave)}>{leave.employee_id}</td>
                                <td onClick={() => navigateTo(leave)}>{leave.employee_name}</td>
                                <td onClick={() => navigateTo(leave)}>{leave.leave_type}</td>
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
            
        </React.Fragment>
    );
}

export default DeptLeaves;