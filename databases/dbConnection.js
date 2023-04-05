import mongoose from "mongoose";

export default async () => {
    try {
        // mongoose.set("strictQuery",true);
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useUnifiedTopology: true,
            // useNewUrlParser: true,
            // useFindAndModify: false,
            useNewUrlParser: true
        });
        console.log(`Connection on ${conn.connection.host} has been made.`)
    } catch (error) {
        console.log(`The database has not been connected. with error ${error}`)
    }
}