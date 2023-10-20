const employees = [
    {
            employee_id: 1,
            employee_name: 'John Doe',
            job_title: 'Software Engineer'
        },
        {
            employee_id: 2,
            employee_name: 'Jane Smith',
            job_title: 'Product Manager'
        },
        {
            employee_id: 3,
            employee_name: 'James Brown',
            job_title: 'UX Designer'
        },
        {
            employee_id: 4,
            employee_name: 'Emily Davis',
            job_title: 'Data Analyst'
        },
        {
            employee_id: 5,
            employee_name: 'Michael Johnson',
            job_title: 'QA Tester'
        },
        {
            employee_id: 15,
            employee_name: 'John Doe',
            job_title: 'Software Engineer'
        },
        {
            employee_id: 6,
            employee_name: 'Jane Smith',
            job_title: 'Product Manager'
        },
        {
            employee_id: 7,
            employee_name: 'James Brown',
            job_title: 'UX Designer'
        },
        {
            employee_id: 8,
            employee_name: 'Emily Davis',
            job_title: 'Data Analyst'
        },
        {
            employee_id: 9,
            employee_name: 'Michael Johnson',
            job_title: 'QA Tester'
        },
        {
            employee_id: 10,
            employee_name: 'John Doe',
            job_title: 'Software Engineer'
        },
        {
            employee_id: 11,
            employee_name: 'Jane Smith',
            job_title: 'Product Manager'
        },
        {
            employee_id: 12,
            employee_name: 'James Brown',
            job_title: 'UX Designer'
        },
        {
            employee_id: 13,
            employee_name: 'Emily Davis',
            job_title: 'Data Analyst'
        },
        {
            employee_id: 14,
            employee_name: 'Michael Johnson',
            job_title: 'QA Tester'
        }
    ];

    export function getEmployees() {
        return employees;
    }

    export function getEmployee(id) {
        return employees.find(em => em.employee_id === id);
    }