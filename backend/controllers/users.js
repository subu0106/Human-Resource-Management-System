import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const register = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");
  jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");

      const permission_level_id = userInfo.permission_level_id;

      if (permission_level_id > '8193600002'){

        const q = "SELECT * FROM user WHERE user_name = ?";

        db.query(q, [req.body.user_name], (err, data) => {
          // return res.json(data);
          if (err) return res.status(500).json(err);
          if (data.length) return res.status(409).json("User already exists!");
      
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(req.body.password, salt);
      
          const q =
            "INSERT INTO user(`user_name`, `password`, `permission_level_id`) VALUES (?)";
          const values = [req.body.user_name, hash, req.body.permission_level_id];
      
          db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("User has been created!");
          });
        });
      } else{
          return res.status(403).json("You are not authorized to view this data!");
      }
});
}