import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getReport = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "SELECT employee_id, nic, full_name, gender, user_name, supervisor_id, job_title_id, department_id, employment_status, birth_day, marital_status FROM employee where user_name = ?";

    db.query(q, [userInfo.user_name], (err, data) => {
      if (err) return res.status(500).json(err);
      
      const q1 = "SELECT attribute_name FROM custum_attributes"
            db.query(q1, (err, data1) => {
                if (err) return res.status(500).json(err);
                
                const attribute_names = data1.map((item) => item.attribute_name);
                const q2 = "SELECT " + attribute_names.join(", ") + " FROM employee where user_name = ?";
                db.query(q2, [userInfo.user_name], (err, data2) => {
                    if (err) return res.status(500).json(err);

                    const q3 = "SELECT * FROM contact_details where employee_id = ?"
                    db.query(q3, [data[0].employee_id], (err, data3) => {
                        if (err) return res.status(500).json(err);
                        const reportData = {data, data2, data3}
                        return res.json(reportData);
                    });
                });
            });
    });
  });
};

export const getSub = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q1 = "SELECT employee_id FROM employee where user_name = ?";

    console.log(userInfo.user_name);

    db.query(q1, [userInfo.user_name], (err, data1) => {
      console.log("Hello");
      if (err) return res.status(500).json(err);

      const q2 =
        "SELECT employee_id, Full_name, job_title_id FROM employee where supervisor_id = ?";

      db.query(q2, [data1[0].employee_id], (err, data2) => {
        if (err) return res.status(500).json(err);
        return res.json(data2);
      });
    });
  });
};

export const subDetails = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q1 = "SELECT supervisor_id FROM employee where employee_id = ?";

    db.query(q1, [req.params.id], (err, data1) => {
      console.log("Hello");
      if (err) return res.status(500).json(err);

      const q2 = "SELECT user_name FROM employee where employee_id = ?";

      db.query(q2, [data1[0].supervisor_id], (err, data2) => {
        if (err) return res.status(500).json(err);
        if (data2[0].user_name === userInfo.user_name) {
          const q3 = "SELECT * FROM employee where Employee_id = ?";
          // return res.json(data2);
          db.query(q3, [req.params.id], (err, data3) => {
            if (err) return res.status(500).json(err);
            return res.json(data3);
          });
        } else
          return res
            .status(403)
            .json("You are not authorized to view this page!");
      });
    });
  });
};

export const editEmp = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q1 = "SELECT supervisor_id FROM employee where employee_id = ?";

    db.query(q1, [req.params.id], (err, data1) => {
      console.log("Hello");
      if (err) return res.status(500).json(err);
      // console.log(data1);
      const q2 = "SELECT user_name FROM employee where employee_id = ?";

      db.query(q2, [data1[0].supervisor_id], (err, data2) => {
        if (err) return res.status(500).json(err);
        if (data2[0].user_name === userInfo.user_name) {
          const q3 =
            "UPDATE `Employee`  SET `NIC`=?,`Full_Name`=?,`Gender`=?,`user_name`=?,`supervisor_id`=?,`job_title_id`=?,`department_id`=?,`employment_status`=?,`birth_day`=?,`marital_status`=? where Employee_id=?";
          const values = [
            req.body.NIC,
            req.body.Full_Name,
            req.body.Gender,
            req.body.user_name,
            req.body.supervisor_id,
            req.body.job_title_id,
            req.body.department_id,
            req.body.employment_status,
            req.body.birth_day,
            req.body.marital_status,
            req.params.id,
          ];
          db.query(q3, [...values], (err, data3) => {
            if (err) return res.status(500).json(err);
            return res.json("Post has been updated!");
          });
        } else
          return res
            .status(403)
            .json("You are not authorized to view this page!");
      });
    });
  });
};
