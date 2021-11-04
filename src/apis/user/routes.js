import express from "express";
import userHandler from "./u-handler.js"

const userRouter = express.Router()

userRouter.get("/", userHandler.getAll)

userRouter.post("/", userHandler.creatUser)

userRouter.route("/:id")
.get(userHandler.getById)
.put(userHandler.updateUser)
.delete(userHandler.deleteUser)

export default userRouter