import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../node_modules/sweetalert2/dist/sweetalert2.js';
import './css/LeaveByDept.css';

const RequestNewLeave = () => {
    const navigate = useNavigate()
    const [selectedType, setSelectedType] = useState(null);
    const [selectedDates, setSelectedDates] = useState([]);
    const [Reason, setReason] = useState("");
    const [date, setDate] = useState("");

    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {             //keeping track of date
        const interval = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);
    
        return () => clearInterval(interval);
    }, []);

    const navigateTo = () => {
        console.log("navigate called", selectedType, selectedDates, Reason, currentDate);
        if (!selectedType || !selectedDates || !Reason) {
            Swal.fire({
                title: 'All fields are required!',
                text: `Please fill the required fields.`,
                icon: 'warning',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Select'
            });
            return;
        }
        
        Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to request a leave with given details?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, request!'
        }).then((result) => {
            if (result.isConfirmed) {
                // Call backend to request a leave with given details
                console.log("navigate called", selectedType, selectedDates, Reason, currentDate);
                Swal.fire('Requested!', 'The request has been sent.', 'success');
            }
        });
    }

    const handleDate = (event) => {
        setDate(event.target.value);
    }

    const handleDateChange = () => {
        if (!date) return;
        if (selectedDates.includes(date)) return;
        if (selectedDates.length > 0){
            Swal.fire({
                text: 'You have already selected a date!',
                title: `Do you want change the date?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, change!'
            }).then((result) => {
                if (result.isConfirmed) {
                    let newDates=[date]
                    setSelectedDates(newDates);
                    Swal.fire('Change!', 'Date has been changed.', 'success');
                }
            });
            return;
        }
        let newDates=[date]
        setSelectedDates(newDates);
    }

    const handleItemClick = (item) => {
        setSelectedType(item);
    }

    return(
        <div className='reports-max'>
            <h1 style={{ fontSize: '2em' }} className='paragraph'>Request a new leave</h1>
            <div className='dropdown'>
                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                    {selectedType ? selectedType.item_name : 'Select Type'}
                </button>

                <ul className="dropdown-menu">
                    {groupBy.map(item => (
                        <li key={item.item_id}>
                            <a
                                className="dropdown-item"
                                href="#"
                                onClick={() => handleItemClick(item)}
                            >
                                {item.item_name}
                            </a>
                        </li>
                    ))}
                </ul>
						<div className='reports-min'>
                            <div>
                                <label className="label" htmlFor="end-date"> Selected Date</label>
                            </div>
                            {selectedDates.length === 0
                            ? <div className='paragraph-min' key="0">Please select the date below</div>
                            : selectedDates.map((date) => {
                                return <div key={date} className='paragraph-min'>{date}</div>;
                            })}

						</div>

                <div className="date-input">
                    <input type="date" id="date-input" value={date} onChange={handleDate} required/>

                <div style={{ marginTop: '10px' }}>
                    <button className="btn btn-info" type="button"
                    									onClick={() => {handleDateChange()
                                                        }}
                                                    >
                                                        Add
                    </button>S
                </div>


                <div className="label" htmlFor="end-date">Reason</div>
                <textarea
                        type="text"
                        className='reason-input'
                        name="reason"
                        onChange={(event) => {
                            setReason(event.target.value);
                        }}
                    />

                </div>
                <div>
                    <button className="btn btn-success btn-lg rounded-pill mt-3" type="button" onClick={navigateTo}>Request</button>
                </div>
            </div>
            <Link to="/dashboard/leaves">
            <div style={{ textAlign: 'right' }}>
                <Button>Back</Button>
            </div>
            </Link>
        </div>
    );
}

export default RequestNewLeave;

const groupBy=[
    {
        item_id:1,
        item_name:'Type1'
    },
    {
        item_id:2,
        item_name:'Type2'
    },
    {
        item_id:3,
        item_name:'Type3'
    },
    {
        item_id:4,
        item_name:'Type4'
    }
]