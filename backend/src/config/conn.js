import mongoose from "mongoose"

const connectDB = async ()=>{
    try {
        mongoose.set("strictQuery", false);
        const  conn = await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
        console.log(`Mongodb Connected ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error:${error.message}`)
        process.exit(1)
    }
}
export default connectDB 