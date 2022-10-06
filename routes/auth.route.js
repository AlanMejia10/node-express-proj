import {Router} from "express";
import {check} from "express-validator"
import {login} from "../controllers/auth.controller.js";
import {fieldValidation} from "../middlewares/field-validator.js";

const router = Router();

router.post("/login", [
    check("email", "email is required").isEmail(),
    check("password", "password is required").notEmpty(),
    fieldValidation
], login);

export default router;