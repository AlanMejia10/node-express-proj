import {Router} from "express"
import {usersDelete, usersGet, usersPost, usersPut} from "../controllers/users.controller.js";
import {check, validationResult} from "express-validator";
import {fieldValidation} from "../middlewares/field-validator.js";
import Role from "../models/role.js";

export const router = Router();

/* these routes are defined as root, but they will be expanded with the /api/users route
* because that was set using a middleware in the routes function (Server)  */
router.get("/", usersGet);

/* The second argument is a middleware, in this case we're using the middlewares provided by
* the express validator package. These middlewares validate if the field passed to the body is in the right form */
router.post("/", [
    check("name", "Name should not be empty").notEmpty(),
    check("email", "Not a valid email").isEmail(),
    check("password", "Password should be at least 6 characters long").isLength({min: 6}),
    // we're creating a custom validation in case role does not exist
    // the exception thrown is manage by express validator and is set to the req error object
    check("role").custom(async (role = "") => {
        const roleExists = await Role.findOne({role})
        if(!roleExists) throw new Error(`Role ${role} does not exists`)
    }),
    //check("role", "Must be either USER_ROLE or ADMIN_ROLE").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    // custom middleware for validation
    fieldValidation
], usersPost);

// route variable (param)
router.put("/:id", usersPut);

router.delete("/", usersDelete);