import express from "express"
import { addToCart, create, deleteUser, getAll, getAllCart, getOne, removeFromCart, update, updateQuantity } from "../controller/todoController.js";
import validateFileAndUpload from "../middleware/uploadMiddleware.js";
import { validateToken } from "./userRoutes.js";

const route = express.Router();

route.use(validateToken)
route.post("/create",validateFileAndUpload, create)
route.get("/getall", getAll)
route.get("/getone/:id", getOne)
route.put("/update/:id",validateFileAndUpload, update)
route.delete("/delete/:id", deleteUser)
route.get("/get-cart",getAllCart)
route.post("/add-to-cart", addToCart );
route.post("/remove-from-cart",removeFromCart );
route.post("/update-quantity", updateQuantity);


export default route;