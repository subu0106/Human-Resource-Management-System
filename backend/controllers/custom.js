import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const viewCustomFields = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const permission_level_id = userInfo.permission_level_id;

        if (permission_level_id > '8193600002'){
            const q1 = "SELECT attribute_name FROM custum_attributes"
            db.query(q1, (err, data1) => {
                if (err) return res.status(500).json(err);
                return res.json(data1);
            });

        } else{
            return res.status(403).json("You are not authorized to view this data!");
        }
});
}

export const viewCustomFieldsEmployees = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const permission_level_id = userInfo.permission_level_id;

        if (permission_level_id > '8193600002'){
            const q1 = "SELECT attribute_name FROM custum_attributes"
            db.query(q1, (err, data1) => {
                if (err) return res.status(500).json(err);
                
                const attribute_names = data1.map((item) => item.attribute_name);
                const q2 = "SELECT employee_id," + attribute_names.join(", ") + " FROM employee";
                db.query(q2, (err, data2) => {
                    if (err) return res.status(500).json(err);
                    return res.json(data2);
                });
            });

        } else{
            return res.status(403).json("You are not authorized to view this data!");
        }
});
}

export const addCustomFields = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const permission_level_id = userInfo.permission_level_id;

        if (permission_level_id > '8193600002'){
            const q1 = "INSERT INTO custum_attributes(attribute_name) VALUES (?)"
            const values = [req.body.attribute_name];
            db.query(q1, [values], (err, data1) => {
                if (err) return res.status(500).json(err);
                const q2 = "ALTER TABLE employee ADD " + req.body.attribute_name + " VARCHAR(255)";
                db.query(q2, (err, data2) => {
                    if (err) return res.status(500).json(err);
                    return res.json("Attribute added successfully!");
                });
            });
        } else{
            return res.status(403).json("You are not authorized to view this data!");
        }
});
}