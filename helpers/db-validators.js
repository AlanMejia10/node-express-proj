import Role from "../models/role.js";
import User from "../models/user.js";

export const isValidRole = async (role = "") => {
    const roleExists = await Role.findOne({role})
    if (!roleExists) throw new Error(`Role ${role} does not exists`)
}

export const emailExists = async (email) => {
    const emailFound = await User.findOne({email});
    if (emailFound) throw new Error(`Email already exists`);
}

export const existsUserById = async (id) => {
    const userFound = await User.findById(id);
    if (!userFound) throw new Error(`User with id ${id} does not exist`);
}
