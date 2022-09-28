import mongoose from "mongoose"

export const dbConnection = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_CONN);
        console.log("database online");
    }catch (e) {
        console.log(e);
        throw new Error("cannot connect to database")
    }
}