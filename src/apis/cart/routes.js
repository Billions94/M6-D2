import express from "express";
import cartHandler from "./cart-handler.js";


const cartRouter = express.Router()

cartRouter.get("/:userId", cartHandler.getAll)

cartRouter.route("/:userId/:productId") 
.post(cartHandler.createCart)
.delete(cartHandler.deleteCart)

export default cartRouter