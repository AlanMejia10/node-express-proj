import User from "./../models/user.js"
import bcrypt from "bcryptjs"

export const usersGet = async (req, res) => {
    /* query params are followed by a "?" and we can get them from the req.query
    * ex. /api/users/?name=Alan&age=25 */
    // const {name, age} = req.query;

    const {limit = 5, from = 0} = req.query;
    // we can send a condition to look inside the database, in this case we're getting all the records
    // that have a state: true

    //const users = await User.find({state: true}).skip(Number(from)).limit(Number(limit));
    //const total = await User.countDocuments({state: true});

    // this code allow us to execute both async task at the same time, the previous one waits until the users
    // task finishes to execute the total task
    const [total, users] = await Promise.all([
        User.countDocuments({state: true}),
        User.find({state: true}).skip(Number(from)).limit(Number(limit))
    ]);

    res.json({
        total,
        users
    });
}

export const usersPost = async (req, res) => {

    const {name, email, password, role} = req.body;
    const user = User({name, email, password, role});

    // Encrypting the password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();
    res.json({
        user,
    });
}

export const usersPut = async (req, res) => {
    /* if we want to get the params of a route we need to define a route variable using ":<var name>"
    * ex. /api/user/:id  this way we can get the param*/
    const {id} = req.params;

    // removes the id, password, createdWithGoogle and email and leaves the rest of data inside the rest obj
    const {_id, password, createdWithGoogle, email, ...rest} = req.body;

    // validate with database
    if (password) {
        // Encrypting the password
        const salt = bcrypt.genSaltSync();
        // as rest no longer has a password attribute it adds it and set the new password
        rest.password = bcrypt.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, rest)

    res.json({
        user
    });
}

export const usersDelete = async (req, res) => {
    const {id} = req.params;

    // deletes the user from the database
    //const user = await User.findByIdAndDelete(id);

    // this only changes the state of the user
    const user = await User.findByIdAndUpdate(id, {state: false});

    res.json({
        user
    });
}