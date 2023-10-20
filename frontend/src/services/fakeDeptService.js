const depts = [
    {
            dept_id: 1,
            dept_name: 'CSE'
            },
            {
            dept_id: 2,
            dept_name: 'ENTC'
            },
            {
            dept_id: 3,
            dept_name: 'uhue'
            },
            {
            dept_id: 4,
            dept_name: 'ddd'
            }
    ];

    export function getDepts() {
        return depts;
    }

    export function getDept(id) {
        return depts.find(dp => dp.dept_id === id);
    }