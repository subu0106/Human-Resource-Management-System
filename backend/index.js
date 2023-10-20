import cookieParser from "cookie-parser";
import express from "express";
import authRoutes from "./routes/auth.js";
import reportRoutes from "./routes/reports.js";
import leaveRoutes from "./routes/leaves.js";
import customs from "./routes/custom.js"
import users from "./routes/users.js"

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/custom", customs);
app.use("/api/addEmployee", users);


app.listen(8800, () => {
  console.log("Connected!");
});
