import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import '../../node_modules/sweetalert2/dist/sweetalert2.js';

const ViewRequest = () => {
    const navigate = useNavigate()
    const location = useLocation();
    let leave,leaves_page = false;
    let storedItem;
    let reports = false;
    
    if (location.state) {
        ({ leave,leaves_page,reports,storedItem} = location.state);
    }
    const passingData=storedItem;
    console.log("insferfreide",passingData);

    const navigateTo = () => {
      navigate(`/dashboard/deptLeaves`, { state: { passingData } });
    }

    const goBack = () => {
      navigate(`/dashboard/leave-requests`);
    }

    // Define a state to store the leave
    const [storedLeave, setStoredLeave] = useState(leave);
    console.log("data",storedLeave);

    useEffect(() => {
        if (leave) {
            // If leave is passed in location state, update setStoredLeave
            setStoredLeave(leave);
        }
    }, [leave]);

    let path = leaves_page ? "/dashboard/leaves" : "/dashboard/leave-requests";
    path = reports ? "/dashboard/viewEmpReports" : path;

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
              storedLeave.status = "Approved";
              goBack();
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
              storedLeave.status = "Declined";
              goBack();
          }
      }
      );
  };

    return (
        <React.Fragment>
  <div className="col-lg-12">
    <div className="card mb-4" style={{ marginLeft: '30%', marginRight: '30%', marginTop: '30px', backgroundColor: 'rgba(0, 0, 0, 0.3)', border: '2px solid white' }}>
      <div className="card-body" style={{ color: 'white', fontWeight: 'bold' }}>
        <h3 className="card-title" style={{ marginBottom: '30px' }}>Request Details</h3>
        <div className="row" style={{ marginBottom: '10px' }}>
          <div className="col-md-4">
            <p className="font-weight-bold">Employee ID:</p>
          </div>
          <div className="col-md-8">
            <p>{storedLeave.employee_id}</p>
          </div>
        </div>
        <div className="row" style={{ marginBottom: '10px' }}>
          <div className="col-md-4">
            <p className="font-weight-bold">Request ID:</p>
          </div>
          <div className="col-md-8">
            <p>{storedLeave.request_id}</p>
          </div>
        </div>
        <div className="row" style={{ marginBottom: '10px' }}>
          <div className="col-md-4">
            <p className="font-weight-bold">Leave Type:</p>
          </div>
          <div className="col-md-8">
            <p>{storedLeave.leave_type}</p>
          </div>
        </div>
        <div className="row" style={{ marginBottom: '10px' }}>
          <div className="col-md-4">
            <p className="font-weight-bold">Request Date:</p>
          </div>
          <div className="col-md-8">
            <p>{storedLeave.requested_date}</p>
          </div>
        </div>
        <div className="row" style={{ marginBottom: '10px' }}>
          <div className="col-md-4">
            <p className="font-weight-bold">Leave Date(s):</p>
          </div>
          <div className="col-md-8">
            <ul>
              {storedLeave.dates.map((date, index) => (
                <li key={index}>{date}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="row" style={{ marginBottom: '10px' }}>
          <div className="col-md-4">
            <p className="font-weight-bold">Reason:</p>
          </div>
          <div className="col-md-8">
            <p>{storedLeave.reason}</p>
          </div>
        </div>

        {/* Conditionally render "Reports" button */}
        {!reports && (
        <div className="row" style={{ marginBottom: '10px' }}>
          <div className="col-md-4">
            <p className="font-weight-bold">Status:</p>
          </div>
          <div className="col-md-8">
            <p>{storedLeave.status}</p>
          </div>
        </div>
        )}

        {/* Conditionally render "Approve" and "Decline" buttons */}
        {!leaves_page && (
          <div className="row" style={{ marginBottom: '10px' }}>
            <div className="col-md-4">
              <p className="font-weight-bold">Actions:</p>
            </div>
            <div className="col-md-8">
              <Button onClick={() => approve(leave)} variant="success" style={{ marginRight: '10px' }}>
                Approve
              </Button>
              <Button onClick={() => decline(leave)} variant="danger">
                Decline
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
    {reports && (
    <Button onClick={navigateTo} style={{ marginLeft: '10px' }}>Back</Button>
    )}
    {!reports && (
    <Link to={path}>
      <Button style={{ marginLeft: '10px' }}>Back</Button>
    </Link>
    )}
  </div>
</React.Fragment>

    )
}

export default ViewRequest;