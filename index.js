import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors"
import route from "./routes/productRoutes.js";
import userroute from "./routes/userRoutes.js";


const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 3000
const URL = process.env.MONGOURL

mongoose.connect(URL).then(() => {
    console.log("DB connected succesfully")
    app.listen(PORT , () => {
        console.log(`server is running on port: ${PORT}`)
    })

}).catch(error => console.log(error))

app.use("/cart", route)
app.use("/users", userroute)
