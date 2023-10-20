const employees = [
    {
            employee_id: 1,
            employee_name: 'sdfdfdsfsdfdsf',
            job_title: 'Software Engineer'
        },
        {
            employee_id: 2,
            employee_name: 'Jdfsdfsdfsd',
            job_title: 'Product Manager'
        },
        {
            employee_id: 3,
            employee_name: 'Jdfdsfsdf',
            job_title: 'UX Desffdigner'
        },
        {
            employee_id: 4,
            employee_name: 'Emildfsdvis',
            job_title: 'Datssa Adffnalyst'
        },
        {
            employee_id: 5,
            employee_name: 'Michaefdfdfl Johnson',
            job_title: 'QA ssfTester'
        },
        {
            employee_id: 15,
            employee_name: 'John Dsdsdsoe',
            job_title: 'Softwaresf Efngineer'
        },
        {
            employee_id: 6,
            employee_name: 'Janesdsd Smith',
            job_title: 'Prodssuct ssManager'
        },
        {
            employee_id: 7,
            employee_name: 'Jamddes Bssrown',
            job_title: 'UX Designeddr'
        },
        {
            employee_id: 8,
            employee_name: 'Emily ddDavis',
            job_title: 'Data Andddalyst'
        },
        {
            employee_id: 9,
            employee_name: 'Misdschael Johnson',
            job_title: 'QA Tedssdster'
        },
        {
            employee_id: 10,
            employee_name: 'Johnsdd Doe',
            job_title: 'Software dEngineer'
        },
        {
            employee_id: 11,
            employee_name: 'Jane Sdmith',
            job_title: 'Product Massnager'
        },
        {
            employee_id: 12,
            employee_name: 'Jamesss Brown',
            job_title: 'UX Designser'
        },
        {
            employee_id: 13,
            employee_name: 'Emily sDavis',
            job_title: 'Data Analssyst'
        },
        {
            employee_id: 14,
            employee_name: 'Michael Josshnson',
            job_title: 'QAss Tester'
        }
    ];

    export function getSubordinates() {
        return employees;
    }

    export function getSubordinate(id) {
        return employees.find(em => em.employee_id === id);
    }