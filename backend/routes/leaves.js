import express, { request } from "express";
import { requestLeave, viewMyRequests, viewSubRequests, approveLeave } from "../controllers/leaves.js";

const router = express.Router();

router.post("/request", requestLeave);
router.get("/requests/myrequests", viewMyRequests);
router.get("/requests/subordinates", viewSubRequests);
router.put("/requests/subordinates/:id", approveLeave);

export default router;