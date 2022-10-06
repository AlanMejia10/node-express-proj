import User from "../models/user.js";
import bcrypt from "bcryptjs"
import {generateJWT} from "../helpers/generate-jwt.js";

export const login = async (req, res) => {
    const {email, password} = req.body;

    try {
        // verify if the user exists
        const user = await User.findOne({email});
        if (!user) return res.status(400).json({message: "invalid email or password - email"})

        // verify if user is active
        if (!user.state) return res.status(400).json({message: "invalid email or password - state: false"})

        // validate password
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) return res.status(400).json({message: "invalid email or password - password"})

        //generate json web token
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "talk to the server administrator"
        });
    }
}