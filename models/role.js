import {model, Schema} from "mongoose";

const roleSchema = new Schema({
    role: {
        type: String,
        required: [true, "role is required"]
    }
})

const roleModel = model("Role", roleSchema);
export default roleModel;