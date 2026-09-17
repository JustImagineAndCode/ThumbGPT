import mongoose from 'mongoose';

const connectDb = async ()=>{
    try {
        mongoose.connection.on('connected' , ()=> console.log("MongoDb connected"))
        await mongoose.connect(process.env.MONGODB_URI as string)
    } catch (error) {
        console.error(' Error connecting database : ' , error )
    }

}

export default connectDb;