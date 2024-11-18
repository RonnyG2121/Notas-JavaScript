import { Router } from "express";
import { cancel, createSession, success } from "../controllers/payments.controllers.js";

export  const router = Router();

//router.get("/", home);

router.post("/create-checkout-session", createSession);

router.get("/success", success);

router.get("/cancel", cancel);


