import express from "express";
import {Register, VerifyEmail} from "../controllers/Auth.controller.js";

const AuthRoutes = express.Router();

AuthRoutes.post('/register', Register);
AuthRoutes.post("/verifyemail", VerifyEmail)


export default AuthRoutes;