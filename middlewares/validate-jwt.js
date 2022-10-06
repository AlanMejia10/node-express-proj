import jwt from "jsonwebtoken"

export const validateJWT = (req, res, next) => {
    // access tokens generally comes in the headers
    const token = req.header("x-token");
    if (!token) return res.status(401).json({message: "no token provided"})

    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        // we're creating a new property inside the req obj. params in js are passed by reference
        // so the property will be kept
        req.uid = uid;
        next();
    } catch (e) {
        console.log(e);
        res.status(401).json({message: "invalid token"})

    }

}