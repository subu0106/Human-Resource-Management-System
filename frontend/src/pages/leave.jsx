import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const Leave = () => {
    const location = useLocation();
    let leave;
    
    if (location.state) {
        ({ leave} = location.state);
    }

    // Define a state to store the leave
    const [storedLeave, setStoredLeave] = useState(leave);

    useEffect(() => {
        if (leave) {
            // If leave is passed in location state, update setStoredLeave
            setStoredLeave(leave);
        }
    }, [leave]);

    return (
        <React.Fragment>
            <div style={{ color: "#fff" }}>
                <h1>Editing {storedLeave.paygrade_id}</h1>
            </div>
            <Link to="/dashboard/abs-func">
                <Button>Back</Button>
            </Link>
        </React.Fragment>
    );
}

export default Leave;