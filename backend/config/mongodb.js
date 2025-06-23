const mongoose=require('mongoose');

const MONGO_URI = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_ENDPOINT}/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;

const mongoConnection=async()=>{
    try{
        await mongoose.connect(MONGO_URI);
        console.log("succesfully connected to mangodb")
    }catch(error){
        console.error('mongodb connection error:',error.message);
        process.exit(1);
    }
}
module.exports=mongoConnection;