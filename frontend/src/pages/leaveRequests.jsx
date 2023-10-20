import _ from 'lodash';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FcApproval, FcDisapprove } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../node_modules/sweetalert2/dist/sweetalert2.js';
import Pagination from '../components/common/pagination';
import { getRequests } from '../services/fakeLeaveRequestService';
import { paginate } from '../utils/paginate';
import './css/allEmployees.css';

const LeaveRequests = () => {
    const navigate = useNavigate(); // Initialize navigate function

    const [state, setState] = useState({
        leaves: getRequests(),
        pageSize: 14,
        currentPage: 1,
        sortColumn: { path: 'request_id', order: 'desc' }
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

    const viewRequest = (leave) => {
        console.log('dsd',leave)
        navigate(`/dashboard/viewRequest`, { state: { leave,leaves_page:false} });
    };

    const approve = (leave) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to approve this leave?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText:'No',
            confirmButtonText: 'Yes, approve it!'
        }).then((result) => {
            if (result.isConfirmed) {
                //call backend to approve leave
                Swal.fire('Approved!', 'The leave has been approved.', 'success');
                setState({ ...state, leaves: state.leaves.filter(l => l.request_id !== leave.request_id) });
            }
        }
        );
    };

    const decline = (leave) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to decline this leave?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText:'No',
            confirmButtonText: 'Yes, decline it!'
        }).then((result) => {
            if (result.isConfirmed) {
                //call backend to decline leave
                Swal.fire('Declined!', 'The leave has been declined.', 'success');
                setState({ ...state, leaves: state.leaves.filter(l => l.request_id !== leave.request_id) });
            }
        }
        );
    };

    const renderSortIcon = (column) => {
        if (column !== state.sortColumn.path) return null;
        if (state.sortColumn.order === 'asc') return <i className='fa fa-sort-asc'></i>;
        return <i className='fa fa-sort-desc'></i>;
    }

    const { length: count } = state.leaves;
    if (count === 0) return <p className='paragraph'>No pending leaves</p>;

    const sorted = _.orderBy(state.leaves, [state.sortColumn.path], [state.sortColumn.order]);
    const leavesInPage = paginate(sorted, state.currentPage, state.pageSize);

    return (
        <React.Fragment>
            <p className='paragraph'>Total pending leaves : {count}</p>
            <div className='table-container'>
                <table className='table'>
                    <colgroup>
                        <col style={{width: '10%'}} /> {/* Define the width for the first column */}
                        <col style={{width: '10%'}} /> {/* Define the width for the second column */}
                        <col style={{width: '15%'}} /> {/* Define the width for the third column */}
                        <col style={{width: '15%'}} /> {/* Define the width for the fourth column */}
                        <col style={{width: '40%'}} /> {/* Define the width for the fourth column */}
                        <col style={{width: '5%'}} /> {/* Define the width for the fourth column */}
                        <col style={{width: '5%'}} /> {/* Define the width for the fourth column */}
                    </colgroup>
                    <thead>
                        <tr>
                            <th className='clickable' onClick={() => handleSort("request_id")}>Request ID {renderSortIcon("request_id")}</th>
                            <th className='clickable' onClick={() => handleSort("employee_id")}>Requester's ID {renderSortIcon("employee_id")}</th>
                            <th className='clickable' onClick={() => handleSort("requester_name")}>Name {renderSortIcon("requester_name")}</th>
                            <th className='clickable' onClick={() => handleSort("request_date")}>Date {renderSortIcon("request_date")}</th>
                            <th className='clickable' onClick={() => handleSort("description")}>Reason {renderSortIcon("description")}</th>
                            <th />
                            <th/>
                        </tr>
                    </thead>
                    <tbody>
                        {leavesInPage.map(leave => (
                            <tr key={leave.request_id}>
                                <td onClick={() => viewRequest(leave)}>{leave.request_id}</td>
                                <td onClick={() => viewRequest(leave)}>{leave.employee_id}</td>
                                <td onClick={() => viewRequest(leave)}>{leave.requester_name}</td>
                                <td onClick={() => viewRequest(leave)}>{leave.request_date}</td>
                                <td onClick={() => viewRequest(leave)}>{leave.description}</td>
                                <td>
                                <Button
                                    variant="success" 
                                    style={{ 
                                        width: '120px', 
                                        fontWeight: 'bold', 
                                        fontSize: '16px', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center' 
                                    }} 
                                    onClick={() => approve(leave)}
                                    >
                                    <FcApproval style={{ marginRight: '5px' }} />
                                    Approve
                                    </Button>{' '}
                                </td>
                                <td>
                                    <Button 
                                        variant="danger" 
                                        style={{ 
                                            width: '120px', 
                                            fontWeight: 'bold', 
                                            fontSize: '16px', 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            justifyContent: 'center' 
                                        }} 
                                        onClick={() => decline(leave)}
                                        >
                                        <FcDisapprove style={{ marginRight: '5px' }} />
                                        Decline
                                    </Button>{' '}
                                </td>
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

export default LeaveRequests;