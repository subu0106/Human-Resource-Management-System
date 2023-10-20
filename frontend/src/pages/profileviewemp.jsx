import React, { useEffect, useState } from 'react';

export default function Profileview(props) {
  const [isEditing, setIsEditing] = useState(props.isEditing);

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

  // Work Details
  const [personalAddress, setPersonalAddress] = useState('');
  const [primaryPhoneNumber, setPrimaryPhoneNumber] = useState('');
  const [secondaryPhoneNumber, setSecondaryPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [emergencyContact1, setEmergencyContact1] = useState({ name: '', phoneNumber: '', relation: '' });
  const [emergencyContact2, setEmergencyContact2] = useState({ name: '', phoneNumber: '', relation: '' });

  // Define profilePicture and handleProfilePictureChange
  const [profilePicture, setProfilePicture] = useState(
    'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp'
  );

  // Custom Fields
  const [addedCustomFields, setAddedCustomFields] = useState([]);



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
        fullName: 'Johnatan Smith',
        nic: '12345-6789012-3',
        gender: 'Male',
        birthday: 'January 1, 1990',
        maritalStatus: 'Married',
        employeeID: '12345',
        userName: 'jsmith',
        jobTitle: 'Full Stack Developer',
        supervisorID: '9876',
        department: 'Engineering',
        employmentStatus: 'Full-time',
        nationality: 'USA',
        personalAddress: '123 Main St, San Francisco, CA',
        primaryPhoneNumber: '123-456-7890',
        secondaryPhoneNumber: '987-654-3210',
        emailAddress: 'jsmith@example.com',
        emergencyContact1: { name: 'Emergency Contact 1', phoneNumber: '111-111-1111', relation: 'Spouse' },
        emergencyContact2: { name: 'Emergency Contact 2', phoneNumber: '222-222-2222', relation: 'Sibling' },
        addedCustomFields: [
          { label: 'Custom Field 1', value: 'Custom Value 1' },
          { label: 'Custom Field 2', value: 'Custom Value 2' },
          // Add more custom fields as needed
        ],
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
      setPersonalAddress(dataFromBackend.personalAddress);
      setPrimaryPhoneNumber(dataFromBackend.primaryPhoneNumber);
      setSecondaryPhoneNumber(dataFromBackend.secondaryPhoneNumber);
      setEmailAddress(dataFromBackend.emailAddress);
      setEmergencyContact1(dataFromBackend.emergencyContact1);
      setEmergencyContact2(dataFromBackend.emergencyContact2);
      setAddedCustomFields(dataFromBackend.addedCustomFields);
      // You can also set the profilePicture URL here
      // setProfilePicture(dataFromBackend.profilePicture);
    }, 1000); // Simulate a 1-second delay for the API call
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);

  };



  return (
    
        <div className="row" style={{ marginLeft: '10px', marginRight: '10px', marginTop: '10px' }}>
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                <img
                  src={profilePicture}
                  alt="avatar"
                  className="rounded-circle mb-3"
                  style={{ width: '150px', height: '150px' }} // Set fixed width and height
                />
                <h5 className="mb-1">{fullName}</h5>
                <p className="mb-1">{jobTitle}</p>
                <p className="mb-1">Employee ID: {employeeID}</p>
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                <h2 className="mb-4">User Profile</h2>

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
                            type="text"
                            className="form-control"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
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
                          />
                        ) : (
                          <p>{employeeID}</p>
                        )}
                      </div>
                    </div>
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
                          />
                        ) : (
                          <p>{userName}</p>
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


                {/* Contact Details Section */}
                <div className="card mb-4">
                  <div className="card-body">
                    <h3 className="card-title" style={{ marginBottom: '10px' }}>Contact Details</h3>
                    <div className="row" style={{ marginBottom: '10px' }}>
                      <div className="col-md-4">
                        <p className="font-weight-bold">Personal Address:</p>
                      </div>
                      <div className="col-md-8">
                        {isEditing ? (
                          <input
                            type="text"
                            className="form-control"
                            value={personalAddress}
                            onChange={(e) => setPersonalAddress(e.target.value)}
                          />
                        ) : (
                          <p>{personalAddress}</p>
                        )}
                      </div>
                    </div>
                    <div className="row" style={{ marginBottom: '10px' }}>
                      <div className="col-md-4">
                        <p className="font-weight-bold">Primary Phone Number:</p>
                      </div>
                      <div className="col-md-8">
                        {isEditing ? (
                          <input
                            type="text"
                            className="form-control"
                            value={primaryPhoneNumber}
                            onChange={(e) => setPrimaryPhoneNumber(e.target.value)}
                          />
                        ) : (
                          <p>{primaryPhoneNumber}</p>
                        )}
                      </div>
                    </div>
                    <div className="row" style={{ marginBottom: '10px' }}>
                      <div className="col-md-4">
                        <p className="font-weight-bold">Secondary Phone Number:</p>
                      </div>
                      <div className="col-md-8">
                        {isEditing ? (
                          <input
                            type="text"
                            className="form-control"
                            value={secondaryPhoneNumber}
                            onChange={(e) => setSecondaryPhoneNumber(e.target.value)}
                          />
                        ) : (
                          <p>{secondaryPhoneNumber}</p>
                        )}
                      </div>
                    </div>
                    <div className="row" style={{ marginBottom: '10px' }}>
                      <div className="col-md-4">
                        <p className="font-weight-bold">Email Address:</p>
                      </div>
                      <div className="col-md-8">
                        {isEditing ? (
                          <input
                            type="text"
                            className="form-control"
                            value={emailAddress}
                            onChange={(e) => setEmailAddress(e.target.value)}
                          />
                        ) : (
                          <p>{emailAddress}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Emergency Contacts Section */}
                <div className="card">
                  <div className="card-body">
                    <h3 className="card-title" style={{ marginBottom: '10px' }}>Emergency Contacts</h3>
                    <div className="row">
  <div className="col-md-6">
    <p className="font-weight-bold">Emergency Contact 1:</p>
    {isEditing ? (
      <div>
        <div className="form-group" style={{ marginBottom: '10px' }}>
          <label><strong>Name:</strong></label>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={emergencyContact1.name}
            onChange={(e) => setEmergencyContact1({ ...emergencyContact1, name: e.target.value })}
          />
        </div>
        <div className="form-group" style={{ marginBottom: '10px' }}>
          <label><strong>Phone Number:</strong></label>
          <input
            type="text"
            className="form-control"
            placeholder="Phone Number"
            value={emergencyContact1.phoneNumber}
            onChange={(e) => setEmergencyContact1({ ...emergencyContact1, phoneNumber: e.target.value })}
          />
        </div>
        <div className="form-group" style={{ marginBottom: '10px' }}>
          <label><strong>Relation:</strong></label>
          <input
            type="text"
            className="form-control"
            placeholder="Relation"
            value={emergencyContact1.relation}
            onChange={(e) => setEmergencyContact1({ ...emergencyContact1, relation: e.target.value })}
          />
        </div>
      </div>
    ) : (
      <div>
        <div className="form-group" style={{ marginBottom: '10px' }}>
          <label><strong>Name:</strong> {emergencyContact1.name}</label>
        </div>
        <div className="form-group" style={{ marginBottom: '10px' }}>
          <label><strong>Phone Number:</strong> {emergencyContact1.phoneNumber}</label>
        </div>
        <div className="form-group" style={{ marginBottom: '10px' }}>
          <label><strong>Relation:</strong> {emergencyContact1.relation}</label>
        </div>
      </div>
    )}
  </div>
  <div className="col-md-6">
    <p className="font-weight-bold">Emergency Contact 2:</p>
    {isEditing ? (
      <div>
        <div className="form-group" style={{ marginBottom: '10px' }}>
          <label><strong>Name:</strong></label>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={emergencyContact2.name}
            onChange={(e) => setEmergencyContact2({ ...emergencyContact2, name: e.target.value })}
          />
        </div>
        <div className="form-group" style={{ marginBottom: '10px' }}>
          <label><strong>Phone Number:</strong></label>
          <input
            type="text"
            className="form-control"
            placeholder="Phone Number"
            value={emergencyContact2.phoneNumber}
            onChange={(e) => setEmergencyContact2({ ...emergencyContact2, phoneNumber: e.target.value })}
          />
        </div>
        <div className="form-group" style={{ marginBottom: '10px' }}>
          <label><strong>Relation:</strong></label>
          <input
            type="text"
            className="form-control"
            placeholder="Relation"
            value={emergencyContact2.relation}
            onChange={(e) => setEmergencyContact2({ ...emergencyContact2, relation: e.target.value })}
          />
        </div>
      </div>
    ) : (
      <div>
        <div className="form-group" style={{ marginBottom: '10px' }}>
          <label><strong>Name:</strong> {emergencyContact2.name}</label>
        </div>
        <div className="form-group" style={{ marginBottom: '10px' }}>
          <label><strong>Phone Number:</strong> {emergencyContact2.phoneNumber}</label>
        </div>
        <div className="form-group" style={{ marginBottom: '10px' }}>
          <label><strong>Relation:</strong> {emergencyContact2.relation}</label>
        </div>
      </div>
    )}
  </div>
</div>





                  </div>
                </div>
              </div>

        {/* Edit Details Button */}
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
</div>
</div>

  );
}