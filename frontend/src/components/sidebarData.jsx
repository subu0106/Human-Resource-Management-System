import React from 'react';
import { BiLogOut, BiSolidReport } from 'react-icons/bi';
import { BsFiles, BsPeopleFill } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { FaEnvelopeOpenText, FaRegHandPointRight } from 'react-icons/fa';
import { IoIosPaper } from 'react-icons/io';
import { MdOutlineDashboardCustomize, MdPeople, MdPeopleAlt, MdPeopleOutline } from 'react-icons/md';
import { RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri';

export const SidebarData = [
    {
        title: 'Profile',
        path: '/dashboard/profile',
        icon: <CgProfile />
    },

    {
        title: 'Leave Requests',
        path: '/dashboard/leave-requests',
        icon: <FaRegHandPointRight/>
    },

    {
        title: 'Leaves',
        path: '/dashboard/leaves',
        icon: <FaEnvelopeOpenText />
    },

    {
        title: 'Employee details',
        icon: <BsPeopleFill />,
        iconClosed: <RiArrowDownSFill />,
        iconOpened: <RiArrowUpSFill />,

        subNav: [
            {
                title: 'View all employees',
                path: '/dashboard/employee-details/view-all-employees',
                icon: <MdPeopleAlt />,
                cName: 'sub-nav'
            },
            {
                title: 'View subordinates',
                path: '/dashboard/employee-details/view-subordinates',
                icon: <MdPeople />,
                cName: 'sub-nav'
            },
            {
                title: 'Add new employee',
                path: '/dashboard/employee-details/add-new-employee',
                icon: <MdPeopleOutline />
            }
        ]
    },

    {
        title: 'Absence functions',
        path: '/dashboard/abs-func',
        icon: <BsFiles />
    },

    {
        title:'Custom attributes',
        path: '/dashboard/custom-attributes',
        icon: <MdOutlineDashboardCustomize />
    },

    {
        title: 'Reports',
        icon: <IoIosPaper />,
        iconClosed: <RiArrowDownSFill />,
        iconOpened: <RiArrowUpSFill />,

        subNav: [
            {
                title: 'Employees by department',
                path: '/dashboard/reports/employees-by-dept',
                icon: <BiSolidReport />,
                cName: 'sub-nav'
            },
            {
                title: 'Leaves by department',
                path: '/dashboard/reports/leaves-by-dept',
                icon: <BiSolidReport />,
                cName: 'sub-nav'
            },
            {
                title: 'Employee reports',
                path: '/dashboard/reports/employee-reports',
                icon: <BiSolidReport />
            },
            {
                title: 'Custom report',
                path: '/dashboard/reports/custom-report',
                icon: <BiSolidReport />
            }
        ]
    },

    {
        title: 'Log out',   //todo //handle logout
        path: '/dashboard/logout',
        icon: <BiLogOut />
    }
];