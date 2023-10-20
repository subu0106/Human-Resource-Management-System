import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FaBars } from 'react-icons/fa';
import { GiLoincloth } from 'react-icons/gi';
import { IconContext } from 'react-icons/lib';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../context/authContext';
import Employee from '../pages/Employee';
import AbsenceFunc from '../pages/absenceFunc';
import AllEmployees from '../pages/allEmployees';
import CustomAttributes from '../pages/customAttributes';
import CustomReport from '../pages/customReport';
import DeptEmployees from '../pages/deptEmployees';
import DeptLeaves from '../pages/deptLeaves';
import EmployeeByDept from '../pages/employeeByDept';
import EmployeeReports from '../pages/employeeReports';
import Leave from '../pages/leave';
import LeaveRequests from '../pages/leaveRequests';
import Leaves from '../pages/leaves';
import LeavesByDept from '../pages/leavesByDept';
import NewEmployee from '../pages/newEmployee';
import Profile from '../pages/profile';
import RequestNewLeave from '../pages/requestNewLeave';
import Subordinates from '../pages/subordinates';
import CusRepEmp from '../pages/viewCustomReports';
import RepEmployees from '../pages/viewEmpReports';
import ViewRequest from '../pages/viewRequest';
import { SidebarData } from './sidebarData';
import SubMenu from './subMenu';

const Nav = styled.div`
    background: #333;
    height: 80px;
    width: 100vw;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: fixed;
    top: 0;
`;

const Content = styled.div`
    transition: margin-left 350ms;
    margin-left: ${({ $sidebar }) => ($sidebar ? '300px' : '0')};
    margin-top: 80px; /* Add this line to create space below the fixed nav bar */
    height: calc(100vh - 80px); /* Adjust the height to fill the remaining space */
    overflow-y: auto; /* Add this line to enable scrolling if content overflows */
    align-items: center;
    justify-content: center;
`;


const NavIcon = styled(Link)`
    margin-left: 2rem;
    font-size: 2rem;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const SidebarNav = styled.nav`
    background: #333;
    width: 300px;
    height: 100%;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: ${({ $sidebar }) => ($sidebar ? '0' : '-300px')}; /* Adjust the value based on your sidebar width */
    transition: 350ms;
    z-index: 10;
    border-right: 1px solid #ccc; /* Add border style here */
`;

const SidebarWrap = styled.div`
    width: 100%;
    height: 100%; /* Set the height to 100% to fill the sidebar */
    overflow-y: auto; /* Enable vertical scrolling */
    padding-bottom: 50px; /* Adjust as needed to leave space for the scrollbar */
`;

const Sidebar = () => {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);     // This is the function that will be called when the sidebar is clicked

    return (
        <React.Fragment>
            <IconContext.Provider value={{ color: '#fff' }}>
                <Nav>
                    <NavIcon to='#'>
                        {sidebar ? <AiOutlineClose onClick={showSidebar} /> : <FaBars onClick={showSidebar} />}
                    </NavIcon>
                    <div style={{marginLeft: 'auto', marginRight: '10vw'}}>
                        <h1 className='subtitle'>JUPITER APPARELS <GiLoincloth style={{ marginLeft: '20px' }} /></h1>
                        {/* <NotificationBell/> need to pass notifications by props */}
                    </div>
                </Nav>

                <SidebarNav $sidebar={sidebar}>
                    <SidebarWrap>
                        <NavIcon to='#'>
                            <AiOutlineClose onClick={showSidebar} />
                        </NavIcon>
                        {SidebarData.map((item, index) => {
                            return <SubMenu item={item} key={index}/>;
                        })}
                    </SidebarWrap>
                </SidebarNav>
            </IconContext.Provider>

            <Content $sidebar={sidebar} onClick={()=>setSidebar(false)}>
                <Routes>
                    {/* Routes of the Navigation Sidebar */}

                    <Route path='/profile' element={<Profile/>} />
                    <Route path='/reports/employees-by-dept' element={<EmployeeByDept/>} />
                    <Route path='/reports/leaves-by-dept' element={<LeavesByDept/>} />
                    <Route path='/reports/employee-reports' element={<EmployeeReports/>} />
                    <Route path='/reports/custom-report' element={<CustomReport/>} />
                    <Route path='/custom-attributes' element={<CustomAttributes/>} />
                    <Route path='/leave-requests' element={<LeaveRequests/>} />

                    <Route path='/employee-details/view-subordinates' element={<Subordinates/>} />
                    <Route path='/employee-details/view-all-employees' element={<AllEmployees/>} />
                    <Route path='/employee-details/add-new-employee' element={<NewEmployee/>} />
                    <Route path='/deptEmployees' element={<DeptEmployees/>} />
                    <Route path='/viewEmpReports' element={<RepEmployees/>} />
                    <Route path='/viewCustomReports' element={<CusRepEmp/>} />
                    <Route path='/viewRequest' element={<ViewRequest/>} />
                    <Route path='/deptLeaves' element={<DeptLeaves/>} />
                    <Route path="/Employee" element={<Employee/>} />

                    <Route path='/abs-func' element={<AbsenceFunc/>} />
					<Route path="/leave/new" element={<RequestNewLeave />} />
                    <Route path='/leaves' element={<Leaves/>} />
                    <Route path='/leave' element={<Leave/>} />
                    <Route path="/logout" element={<Logout />} />

                    <Route path="/" element={<Navigate to="/dashboard/profile"/>} />
                    <Route path="*" element={<h1>Page Not Found</h1>}/>
                </Routes>
            </Content>
        </React.Fragment>
    );
};

export default Sidebar;

const Logout = () => {
    const { logout: logoutFunc } = useContext(AuthContext);

    useEffect(() => {
        logoutFunc();
    }, [logoutFunc]);

    return <Navigate to="/login" />;
}