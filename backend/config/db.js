import mongoose from "mongoose"
const conectarDB = async ()=>{
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true

        })

        const url = `coneecion ${connection.connection.host}:${connection.connection.port}`
        console.log(url)
    } catch (error) {
        console.log(`error:${error.message}`)
        process.exit(1)
    }
}

export default conectarDB