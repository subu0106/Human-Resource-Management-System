import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const requestLeave = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q1 = "SELECT employee_id, job_title_id FROM employee where user_name = ?";
        db.query(q1, [userInfo.user_name], (err, data1) => {
            if (err) return res.status(500).json(err);
            if (data1[0].employee_id != req.body.employee_id) res.status(403).json("You are not authorized to request leave for this employee!");

            const q2 = "SELECT paygrade_id FROM job_title WHERE job_title_id = ?";
            db.query(q2, [data1[0].job_title_id], (err, data2) => {
                if (err) return res.status(500).json(err);

                const leave_types = {
                    "Annual": "number_of_annual_leaves",
                    "Casual": "number_of_casual_leaves",
                    "Maternity": "number_of_maternity_leaves",
                    "No_Pay": "number_of_no_pay_leaves",
                }

                const leaves_taken = {
                    "Annual": "annual_leaves_taken",
                    "Casual": "casual_leaves_taken",
                    "Maternity": "maternity_leaves_taken",
                    "No_Pay": "no_pay_leaves_taken"
                }

                const column_name = leave_types[req.body.leave_type];
                const leave_taken_column = leaves_taken[req.body.leave_type];
                const q3 = `SELECT ${column_name} FROM pay_grades WHERE paygrade_id = ?`;
                db.query(q3, [data2[0].paygrade_id], (err, data3) => {
                    if (err) return res.status(500).json(err);
                    
                    const q4 = `SELECT ${leave_taken_column} FROM leave_record WHERE employee_id = ?`;
                    db.query(q4, [req.body.employee_id], (err, data4) => {
                        if (err) return res.status(500).json(err);

                        if (data4[0][leave_taken_column] >= data3[0][column_name]) return res.status(400).json("Not enough leaves available!");

                        const q5 = "INSERT INTO leave_request (`employee_id`, `date`, `description`, `leave_type`) VALUES (?)";
                        db.query(q5, [[req.body.employee_id, req.body.date, req.body.description, req.body.leave_type]], (err, data5) => {
                            if (err) return res.status(500).json(err);
                            return res.json("Leave requested successfully!");
                        });
                    });
                });
            });
        });
    });
};


export const viewMyRequests = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const user_name = userInfo.user_name;

        const q1 = "SELECT employee_id FROM employee where user_name = ?";
        db.query(q1, [user_name], (err, data1) => {
            if (err) return res.status(500).json(err);

            const q2 = "SELECT * FROM leave_request WHERE employee_id = ?";
            db.query(q2, [data1[0].employee_id], (err, data2) => {
                if (err) return res.status(500).json(err);
                return res.json(data2);
            });
        });
    });
};


export const viewSubRequests = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const employee_id = userInfo.employee_id;
        const permission_level_id = userInfo.permission_level_id;

        if (permission_level_id > '8193600001'){
            const q1 = "SELECT * FROM leave_request WHERE employee_id IN (SELECT employee_id FROM employee WHERE supervisor_id = ?)";
            db.query(q1, [employee_id], (err, data1) => {
                if (err) return res.status(500).json(err);
                return res.json(data1);
            });
        } else{
            return res.status(403).json("You are not authorized to view this data!");
        }
});
}

export const approveLeave = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const permission_level_id = userInfo.permission_level_id;

        if (permission_level_id > '8193600001'){
            const q1 = "UPDATE leave_request SET supervisor_approval = ? WHERE leave_request_id = ?";
            db.query(q1, [req.body.supervisor_approval, req.params.id], (err, data1) => {
                if (err) return res.status(500).json(err);
                return res.json("Leave request approved successfully!");
            });

        } else{
            return res.status(403).json("You are not authorized to view this data!");
        }
});
}