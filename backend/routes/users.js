import express from "express";
import {
  register
} from "../controllers/users.js";

const router = express.Router();

router.get("/", register);

export default router;
