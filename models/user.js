import {model, Schema} from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "name is required"]
    },
    email: {
        type: String,
        required: [true, "email is required and must be unique"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        enum: ["ADMIN_ROLE", "USER_ROLE"]
    },
    state: {
        type: Boolean,
        default: true
    },
    createdWithGoogle: {
        type: Boolean,
        default: false
    }
});

const userModel = model("User", userSchema);
export default userModel;
