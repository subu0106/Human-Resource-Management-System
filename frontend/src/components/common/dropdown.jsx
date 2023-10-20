import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../../node_modules/sweetalert2/dist/sweetalert2.js';
import './dropdown.css';

const DropdownMenu = (props) => {
    const navigate = useNavigate(); // Initialize navigate function
    const { items,path } = props;
    const [selectedDept, setSelectedDept] = useState(null);

    const handleItemClick = (item) => {
        setSelectedDept(item);
    }
    
    const navigateTo = (item) => {
        if (!item) {
            Swal.fire({
                title: 'No options selected',
                text: `Select the department to generate the list`,
                icon: 'warning',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Close'
            })
            console.log("No options selected");
            return;
        }
        ////////////////////calling backend api////////////////////////
        //call the backend api
        console.log("navigate called",item);
        navigate(path, { state: { item } });
    }
    
    return (
        <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {selectedDept ? selectedDept.dept_name : 'Select Department'}
            </button>
            <ul className="dropdown-menu">
                {items.map(item => (
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
                <button className="btn btn-primary" type="button" onClick={() => {props.onSelect(selectedDept); navigateTo(selectedDept);}}>Generate</button>
            </div>
        </div>
    );
}

export default DropdownMenu;