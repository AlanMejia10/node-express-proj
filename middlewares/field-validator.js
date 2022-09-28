import {validationResult} from "express-validator";

export const fieldValidation = (req, res, next) => {
    /* We're checking if there's validation errors in the body of the request, this is done using the middlewares
    * that we set in the route */
    const validationErrors = validationResult(req)
    if(!validationErrors.isEmpty()) return res.status(400).json(validationErrors);

    /* Calling the next function is mandatory when creating a custom middleware */
    next();
}