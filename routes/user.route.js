import {Router} from "express"
import {usersDelete, usersGet, usersPost, usersPut} from "../controllers/users.controller.js";
import {check} from "express-validator";
import {fieldValidation} from "../middlewares/field-validator.js";
import {emailExists, existsUserById, isValidRole} from "../helpers/db-validators.js";
import {validateJWT} from "../middlewares/validate-jwt.js";

const router = Router();

/* these routes are defined as root, but they will be expanded with the /api/users route
* because that was set using a middleware in the routes function (Server)  */
router.get("/", usersGet);

/* The second argument is a middleware, in this case we're using the middlewares provided by
* the express validator package. These middlewares validate if the field passed to the body is in the right form */
router.post("/", [
    check("name", "Name should not be empty").notEmpty(),
    check("email", "Not a valid email").isEmail(),
    // validates of the email is already register in the database
    check("email").custom(email => emailExists(email)),
    check("password", "Password should be at least 6 characters long").isLength({min: 6}),
    // we're creating a custom validation in case role does not exist
    // the exception thrown is manage by express validator and is set to the req error object
    check("role").custom(role => isValidRole(role)),
    //check("role", "Must be either USER_ROLE or ADMIN_ROLE").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    // custom middleware for validation
    fieldValidation
], usersPost);

// route variable (param)
router.put("/:id", [
    check("id", "not a valid mongo id").isMongoId(),
    check("id").custom(id => existsUserById(id)),
    check("role").custom(role => isValidRole(role)),
    fieldValidation
], usersPut);

router.delete("/:id", [
    validateJWT,
    check("id", "not a valid mongo id").isMongoId(),
    check("id").custom(id => existsUserById(id)),
    fieldValidation
], usersDelete);

export default router;