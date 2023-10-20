import React, { useEffect, useState } from 'react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(true);
  
  const [pageNumber, setPageNumber] = useState(1);
  // Basic Details
  const [fullName, setFullName] = useState('');
  const [nic, setNIC] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [employeeID, setEmployeeID] = useState('');
  const [userName, setUserName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [supervisorID, setSupervisorID] = useState('');
  const [department, setDepartment] = useState('');
  const [employmentStatus, setEmploymentStatus] = useState('');
  const [nationality, setNationality] = useState('');
  const [password, setPassword] = useState('');


  // Custom Fields
  const [addedCustomFields, setAddedCustomFields] = useState([]);

    // Temporary array to store the data
    const [temporaryData, setTemporaryData] = useState({
        fullName: '',
        nic: '',
        gender: '',
        birthday: '',
        maritalStatus: '',
        employeeID: '',
        userName: '',
        jobTitle: '',
        supervisorID: '',
        department: '',
        employmentStatus: '',
        nationality: '',
        password: '',
        customFields: [],
      });



// Iterate and render custom fields in the Basic Details section
  const renderCustomFields = () => {
    return addedCustomFields.map((field, index) => (
      <div key={index} className="row" style={{ marginBottom: '10px' }}>
        <div className="col-md-4">
          <p className="font-weight-bold">{field.label}:</p>
        </div>
        <div className="col-md-8">
          {isEditing ? (
            <div className="d-flex">
              <input
                type="text"
                className="form-control"
                value={field.value}
                onChange={(e) => {
                  const updatedFields = [...addedCustomFields];
                  updatedFields[index].value = e.target.value;
                  setAddedCustomFields(updatedFields);
                }}
              />
            </div>
          ) : (
            <p>{field.value}</p>
          )}
        </div>
      </div>
    ));
  };


  useEffect(() => {
    // Simulate an asynchronous API call with setTimeout
    setTimeout(() => {
      const dataFromBackend = {
        fullName: '',
        nic: '',
        gender: '',
        birthday: '',
        maritalStatus: '',
        employeeID: '',
        userName: '',
        jobTitle: '',
        supervisorID: '',
        department: '',
        employmentStatus: '',
        nationality: '',
        addedCustomFields: [
          { label: 'Custom Field 1', value: '' },
          // Add more custom fields as needed
        ],
        password: '',
        // profilePicture: 'URL_TO_YOUR_PROFILE_PICTURE',
      };

      setFullName(dataFromBackend.fullName);
      setNIC(dataFromBackend.nic);
      setGender(dataFromBackend.gender);
      setBirthday(dataFromBackend.birthday);
      setMaritalStatus(dataFromBackend.maritalStatus);
      setEmployeeID(dataFromBackend.employeeID);
      setUserName(dataFromBackend.userName);
      setJobTitle(dataFromBackend.jobTitle);
      setSupervisorID(dataFromBackend.supervisorID);
      setDepartment(dataFromBackend.department);
      setEmploymentStatus(dataFromBackend.employmentStatus);
      setNationality(dataFromBackend.nationality);
      setAddedCustomFields(dataFromBackend.addedCustomFields);
      setPassword(dataFromBackend.password);
      setPageNumber(1)
      // You can also set the profilePicture URL here
      // setProfilePicture(dataFromBackend.profilePicture);
    }, 1000); // Simulate a 1-second delay for the API call
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);

    setTemporaryData({
      fullName,
      nic,
      gender,
      birthday,
      maritalStatus,
      employeeID,
      userName,
      jobTitle,
      supervisorID,
      department,
      employmentStatus,
      nationality,
      password,
      customFields: addedCustomFields,
    });
  };

  const handleNextClick = () => {
    if (isEditing) {
      // If isEditing is true, display a message
      alert('Still editing');
    } else {
      setPageNumber(2);
      setIsEditing(true);
    }
  };


  const handleBackClick = () => {
    if (isEditing) {
      // If isEditing is true, display a message
      alert('Still editing');
    } else {
      setPageNumber(1);
      setIsEditing(true);
    }
  };

// Function to send data to the backend
const handleDoneClick = () => {
    if (isEditing) {
      alert('Still editing');
    } else {
      // Check if all required fields are filled
      if (
        fullName.trim() === '' ||
        nic.trim() === '' ||
        gender.trim() === '' ||
        birthday.trim() === '' ||
        maritalStatus.trim() === '' ||
        employeeID.trim() === '' ||
        userName.trim() === '' ||
        jobTitle.trim() === '' ||
        supervisorID.trim() === '' ||
        department.trim() === '' ||
        employmentStatus.trim() === '' ||
        nationality.trim() === '' ||
        password.trim() === ''
      ) {
        alert('Please fill all the fields.');
      } else {
        // All required fields are filled, proceed with employee creation
        // Send temporaryData to the backend
        // Example API call:
        alert('Employee created');
      }
    }
  };
  




  return (
<div>
    {pageNumber === 1 && (
          <div className="col-lg-12 d-flex justify-content-center" style={{ marginBlock: '20px' }}>
            <div className="card mb-4">
              <div className="card-body" style={{ width: '800px' }}>


                {/* Basic Details Section */}
                <div className="card mb-4">
                  <div className="card-body">
                    <h3 className="card-title" style={{ marginBottom: '10px' }}>Basic Details</h3>
                    <div className="row" style={{ marginBottom: '10px' }}>
                      <div className="col-md-4">
                        <p className="font-weight-bold">Full Name:</p>
                      </div>
                      <div className="col-md-8">
                        {isEditing ? (
                          <input
                            type="text"
                            className="form-control"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                          />
                        ) : (
                          <p>{fullName}</p>
                        )}
                      </div>
                    </div>
                    <div className="row" style={{ marginBottom: '10px' }}>
                      <div className="col-md-4">
                        <p className="font-weight-bold">NIC:</p>
                      </div>
                      <div className="col-md-8">
                        {isEditing ? (
                          <input
                            type="text"
                            className="form-control"
                            value={nic}
                            onChange={(e) => setNIC(e.target.value)}
                            required
                          />
                        ) : (
                          <p>{nic}</p>
                        )}
                      </div>
                    </div>
                    <div className="row" style={{ marginBottom: '10px' }}>
                      <div className="col-md-4">
                        <p className="font-weight-bold">Gender:</p>
                      </div>
                      <div className="col-md-8">
                        {isEditing ? (
                          <input
                            type="text"
                            className="form-control"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            required
                          />
                        ) : (
                          <p>{gender}</p>
                        )}
                      </div>
                    </div>
                    <div className="row" style={{ marginBottom: '10px' }}>
                      <div className="col-md-4">
                        <p className="font-weight-bold">Birthday:</p>
                      </div>
                      <div className="col-md-8">
                        {isEditing ? (
                          <input
                            type="date"
                            className="form-control"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                            required
                          />
                        ) : (
                          <p>{birthday}</p>
                        )}
                      </div>
                    </div>
                    <div className="row" style={{ marginBottom: '10px' }}>
                      <div className="col-md-4">
                        <p className="font-weight-bold">Marital Status:</p>
                      </div>
                      <div className="col-md-8">
                        {isEditing ? (
                          <input
                            type="text"
                            className="form-control"
                            value={maritalStatus}
                            onChange={(e) => setMaritalStatus(e.target.value)}
                            required
                          />
                        ) : (
                          <p>{maritalStatus}</p>
                        )}
                      </div>
                    </div>
                    <div className="row" style={{ marginBottom: '10px' }}>
                      <div className="col-md-4">
                        <p className="font-weight-bold">Employee ID:</p>
                      </div>
                      <div className="col-md-8">
                        {isEditing ? (
                          <input
                            type="text"
                            className="form-control"
                            value={employeeID}
                            onChange={(e) => setEmployeeID(e.target.value)}
                            required
                          />
                        ) : (
                          <p>{employeeID}</p>
                        )}
                      </div>
                    </div>
                    <div className="row" style={{ marginBottom: '10px' }}>
                      <div className="col-md-4">
                        <p className="font-weight-bold">Job Title:</p>
                      </div>
                      <div className="col-md-8">
                        {isEditing ? (
                          <input
                            type="text"
                            className="form-control"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            required
                          />
                        ) : (
                          <p>{jobTitle}</p>
                        )}
                      </div>
                    </div>
                    <div className="row" style={{ marginBottom: '10px' }}>
                      <div className="col-md-4">
                        <p className="font-weight-bold">Supervisor ID:</p>
                      </div>
                      <div className="col-md-8">
                        {isEditing ? (
                          <input
                            type="text"
                            className="form-control"
                            value={supervisorID}
                            onChange={(e) => setSupervisorID(e.target.value)}
                            required
                          />
                        ) : (
                          <p>{supervisorID}</p>
                        )}
                      </div>
                    </div>
                    <div className="row" style={{ marginBottom: '10px' }}>
                      <div className="col-md-4">
                        <p className="font-weight-bold">Department:</p>
                      </div>
                      <div className="col-md-8">
                        {isEditing ? (
                          <input
                            type="text"
                            className="form-control"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            required
                          />
                        ) : (
                          <p>{department}</p>
                        )}
                      </div>
                    </div>
                    <div className="row" style={{ marginBottom: '10px' }}>
                      <div className="col-md-4">
                        <p className="font-weight-bold">Employment Status:</p>
                      </div>
                      <div className="col-md-8">
                        {isEditing ? (
                          <input
                            type="text"
                            className="form-control"
                            value={employmentStatus}
                            onChange={(e) => setEmploymentStatus(e.target.value)}
                            required
                          />
                        ) : (
                          <p>{employmentStatus}</p>
                        )}
                      </div>
                    </div>
                    <div className="row" style={{ marginBottom: '10px' }}>
                      <div className="col-md-4">
                        <p className="font-weight-bold">Nationality:</p>
                      </div>
                      <div className="col-md-8">
                        {isEditing ? (
                          <input
                            type="text"
                            className="form-control"
                            value={nationality}
                            onChange={(e) => setNationality(e.target.value)}
                            required
                          />
                        ) : (
                          <p>{nationality}</p>
                        )}
                      </div>
                    </div>

                {/* Custom Fields Section */}
                {renderCustomFields()}
                
              </div>
            </div>
            </div>

        {/* Edit Details Button */}
        <div className="row">
  <div className="col-lg-6">
    <div className="d-flex justify-content-left mb-2" style={{ marginLeft: '15px' }}>
      {isEditing ? (
        <button className="btn btn-primary" style={{ width: '150px', height: '40px' }} onClick={handleSaveClick}>
          Save
        </button>
      ) : (
        <button className="btn btn-primary" style={{ width: '150px', height: '40px' }} onClick={handleEditClick}>
          Edit Details
        </button>
      )}
    </div>
  </div>
  <div className="col-lg-6 d-flex justify-content-end">
    <button className="btn btn-primary" style={{ width: '150px', height: '40px', marginRight: '15px' }} onClick={handleNextClick}>Next</button>
  </div>
</div>


</div>
</div>
  )}
{pageNumber === 2 && (

        <div className="col-lg-12 d-flex justify-content-center" style={{ marginBlock: '20px' }}>
        <div className="card mb-4">
          <div className="card-body" style={{width: '800px' }}>

            {/* Basic Details Section */}
            <div className="card mb-4">
              <div className="card-body">
                <h3 className="card-title" style={{ marginBottom: '10px' }}>User Name & Password</h3>
                <div className="row" style={{ marginBottom: '10px' }}>
                  <div className="col-md-4">
                    <p className="font-weight-bold">User Name:</p>
                  </div>
                  <div className="col-md-8">
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                      />
                    ) : (
                      <p>{userName}</p>
                    )}
                  </div>
                </div>
                <div className="row" style={{ marginBottom: '10px' }}>
                  <div className="col-md-4">
                    <p className="font-weight-bold">Password:</p>
                  </div>
                  <div className="col-md-8">
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    ) : (
                      <p>{password}</p>
                    )}
                  </div>
                </div>
                
          </div>
        </div>
        </div>

    {/* Edit Details Button */}
    <div className="row">
    <div className="col-lg-4">
<div className="d-flex justify-content-left mb-2" style={{ marginLeft: '15px' }}>
<button className="btn btn-primary" style={{ width: '150px', height: '40px', marginRight: '15px' }} onClick={handleBackClick}>Back</button>
</div>
</div>
<div className="col-lg-4">
<div className="d-flex justify-content-center mb-2" style={{ marginLeft: '15px' }}>
  {isEditing ? (
    <button className="btn btn-primary" style={{ width: '150px', height: '40px' }} onClick={handleSaveClick}>
      Save
    </button>
  ) : (
    <button className="btn btn-primary" style={{ width: '150px', height: '40px' }} onClick={handleEditClick}>
      Edit Details
    </button>
  )}
</div>
</div>
<div className="col-lg-4 d-flex justify-content-end">
<button className="btn btn-primary" style={{ width: '150px', height: '40px', marginRight: '15px' }} onClick={handleDoneClick}>Done</button>
</div>
</div>


</div>
</div>

)}
</div>
  );
}