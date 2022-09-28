import User from "./../models/user.js"
import bcrypt from "bcryptjs"

export const usersGet = (req, res) => {
    /* query params are followed by a "?" and we can get them from the req.query
    * ex. /api/users/?name=Alan&age=25 */
    const {name, age} = req.query;
    res.json({
        message: "get is ok",
        name,
        age
    });
}

export const usersPost = async (req, res) => {

    const {name, email, password, role} = req.body;
    const user = User({name, email, password, role});

    // validating email
    const emailExists = await User.findOne({email});
    if(emailExists) return res.status(400).json({msg: "email already exists"})

    // Encrypting the password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();
    res.json({
        user,
    });
}

export const usersPut = (req, res) => {
    /* if we want to get the params of a route we need to define a route variable using ":<var name>"
    * ex. /api/user/:id  this way we can get the param*/
    const id = req.params.id;
    res.json({
        message: "put is ok",
        id,
    });
}

export const usersDelete = (req, res) => {
    res.json({
        message: "delete is ok",
    });
}