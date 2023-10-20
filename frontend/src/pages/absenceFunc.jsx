import _ from 'lodash';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { BiSolidEdit } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../node_modules/sweetalert2/dist/sweetalert2.js';
import Pagination from '../components/common/pagination';
import { getLeaves } from '../services/fakeLeaveService';
import { paginate } from '../utils/paginate';
import './css/allEmployees.css';

//todo: all

const AbsenceFunc = () => {
    const navigate = useNavigate(); // Initialize navigate function

    const [state, setState] = useState({
        leaves: getLeaves(),
        pageSize: 14,
        currentPage: 1,
        sortColumn: { path: 'paygrade_id', order: 'asc' }
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

    const editLeave = (leave) => {
        navigate(`/dashboard/leave`, { state: { leave} });
    };

    const deleteLeave = (leave) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to delete ${leave.leave_type_name}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                //call backend to delete leave
                const leaves = state.leaves.filter(e => e.paygrade_id !== leave.paygrade_id);
                setState({ ...state, leaves });
                Swal.fire('Deleted!', 'The employee has been deleted.', 'success');
            }
        });
    };

    const renderSortIcon = (column) => {
        if (column !== state.sortColumn.path) return null;
        if (state.sortColumn.order === 'asc') return <i className='fa fa-sort-asc'></i>;
        return <i className='fa fa-sort-desc'></i>;
    }

    const { length: count } = state.leaves;
    if (count === 0) return <p className='paragraph'>Add new leave types to manage them</p>;

    const sorted = _.orderBy(state.leaves, [state.sortColumn.path], [state.sortColumn.order]);
    const leavesInPage = paginate(sorted, state.currentPage, state.pageSize);

    return (
        <React.Fragment>
            <p className='paragraph'>Total leave types : {count}</p>
            <div className='table-container'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th className='clickable' onClick={() => handleSort("paygrade_id")}>Pay Grade ID {renderSortIcon("paygrade_id")}</th>
                            <th className='clickable' onClick={() => handleSort("leave_type_name")}>Leave Type {renderSortIcon("leave_type_name")}</th>
                            <th className='clickable' onClick={() => handleSort("basic_salary")}>Basic Salary {renderSortIcon("basic_salary")}</th>
                            <th className='clickable' onClick={() => handleSort("ot_benificts")}>OT Benefits {renderSortIcon("ot_benificts")}</th>
                            <th className='clickable' onClick={() => handleSort("number_of_annual_leaves")}>Annual Leaves {renderSortIcon("number_of_annual_leaves")}</th>
                            <th className='clickable' onClick={() => handleSort("number_of_casual_leaves")}>Casual Leaves {renderSortIcon("number_of_casual_leaves")}</th>
                            <th className='clickable' onClick={() => handleSort("number_of_maternity_leaves")}>Maternity Leaves {renderSortIcon("number_of_maternity_leaves")}</th>
                            <th className='clickable' onClick={() => handleSort("number_of_no_pay_leaves")}>No Pay Leaves {renderSortIcon("number_of_no_pay_leaves")}</th>
                            <th />
                            <th/>
                        </tr>
                    </thead>
                    <tbody>
                        {leavesInPage.map(leave => (
                            <tr key={leave.paygrade_id}>
                                <td >{leave.paygrade_id}</td>
                                <td >{leave.leave_type_name}</td>
                                <td >{leave.basic_salary}</td>
                                <td >{leave.ot_benificts}</td>
                                <td >{leave.number_of_annual_leaves}</td>
                                <td >{leave.number_of_casual_leaves}</td>
                                <td >{leave.number_of_maternity_leaves}</td>
                                <td >{leave.number_of_no_pay_leaves}</td>
                                <td>
                                    <Button variant="outline-primary" style={{ width: '70px' }} onClick={() => editLeave(leave)}><BiSolidEdit/></Button>{' '}
                                </td>
                                <td>
                                    <Button variant="outline-danger" style={{ width: '70px' }} onClick={() => deleteLeave(leave)}><RiDeleteBin6Line/></Button>{' '}
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

export default AbsenceFunc;