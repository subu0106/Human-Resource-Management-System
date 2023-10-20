const leaves = [
    {
            paygrade_id: 2,
            leave_type_name: "Annual",
            basic_salary: 230000,
            ot_benificts: 12,
            number_of_annual_leaves: 14,
            number_of_casual_leaves: 7,
            number_of_maternity_leaves: 84,
            number_of_no_pay_leaves: 10
        },
        {
            paygrade_id: 3,
            leave_type_name: "Casual",
            basic_salary: 230000,
            ot_benificts: 12,
            number_of_annual_leaves: 14,
            number_of_casual_leaves: 7,
            number_of_maternity_leaves: 84,
            number_of_no_pay_leaves: 10
        },
        {
            paygrade_id: 13,
            leave_type_name: "Maternity",
            basic_salary: 230000,
            ot_benificts: 12,
            number_of_annual_leaves: 14,
            number_of_casual_leaves: 7,
            number_of_maternity_leaves: 84,
            number_of_no_pay_leaves: 10
        },
        {
            paygrade_id: 1,
            leave_type_name: "No Pay",
            basic_salary: 230000,
            ot_benificts: 12,
            number_of_annual_leaves: 14,
            number_of_casual_leaves: 7,
            number_of_maternity_leaves: 84,
            number_of_no_pay_leaves: 10
        },
        {
            paygrade_id: 4,
            leave_type_name: "Annual",
            basic_salary: 230000,
            ot_benificts: 12,
            number_of_annual_leaves: 14,
            number_of_casual_leaves: 7,
            number_of_maternity_leaves: 84,
            number_of_no_pay_leaves: 10
        },
        {
            paygrade_id: 5,
            leave_type_name: "Casual",
            basic_salary: 230000,
            ot_benificts: 12,
            number_of_annual_leaves: 14,
            number_of_casual_leaves: 7,
            number_of_maternity_leaves: 84,
            number_of_no_pay_leaves: 10
        },
        {
            paygrade_id: 6,
            leave_type_name: "Maternity",
            basic_salary: 230000,
            ot_benificts: 12,
            number_of_annual_leaves: 14,
            number_of_casual_leaves: 7,
            number_of_maternity_leaves: 84,
            number_of_no_pay_leaves: 10
        },
        {
            paygrade_id: 7,
            leave_type_name: "No Pay",
            basic_salary: 230000,
            ot_benificts: 12,
            number_of_annual_leaves: 14,
            number_of_casual_leaves: 7,
            number_of_maternity_leaves: 84,
            number_of_no_pay_leaves: 10
        },
        {
            paygrade_id: 8,
            leave_type_name: "Annual",
            basic_salary: 230000,
            ot_benificts: 12,
            number_of_annual_leaves: 14,
            number_of_casual_leaves: 7,
            number_of_maternity_leaves: 84,
            number_of_no_pay_leaves: 10
        },
        {
            paygrade_id: 9,
            leave_type_name: "Casual",
            basic_salary: 230000,
            ot_benificts: 12,
            number_of_annual_leaves: 14,
            number_of_casual_leaves: 7,
            number_of_maternity_leaves: 84,
            number_of_no_pay_leaves: 10
        },
        {
            paygrade_id: 10,
            leave_type_name: "Maternity",
            basic_salary: 230000,
            ot_benificts: 12,
            number_of_annual_leaves: 14,
            number_of_casual_leaves: 7,
            number_of_maternity_leaves: 84,
            number_of_no_pay_leaves: 10
        },
        {
            paygrade_id: 11,
            leave_type_name: "No Pay",
            basic_salary: 230000,
            ot_benificts: 12,
            number_of_annual_leaves: 14,
            number_of_casual_leaves: 7,
            number_of_maternity_leaves: 84,
            number_of_no_pay_leaves: 10
        },
        {
            paygrade_id: 12,
            leave_type_name: "Annual",
            basic_salary: 230000,
            ot_benificts: 12,
            number_of_annual_leaves: 14,
            number_of_casual_leaves: 7,
            number_of_maternity_leaves: 84,
            number_of_no_pay_leaves: 10
        },
        {
            paygrade_id: 14,
            leave_type_name: "Casual",
            basic_salary: 230000,
            ot_benificts: 12,
            number_of_annual_leaves: 14,
            number_of_casual_leaves: 7,
            number_of_maternity_leaves: 84,
            number_of_no_pay_leaves: 10
        },
        {
            paygrade_id: 15,
            leave_type_name: "Maternity",
            basic_salary: 230000,
            ot_benificts: 12,
            number_of_annual_leaves: 14,
            number_of_casual_leaves: 7,
            number_of_maternity_leaves: 84,
            number_of_no_pay_leaves: 10
        }
    ];

    export function getLeaves() {
        return leaves;
    }

    export function getLeave(id) {
        return leaves.find(em => em.leave_id === id);
    }