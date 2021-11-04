import express from "express";
import categoryHandler from "./c-handler.js";

const categoryRouter = express.Router();

categoryRouter.get("/", categoryHandler.getAll)

categoryRouter.post("/", categoryHandler.createCategory)



categoryRouter.route("/:id")
.get(categoryHandler.getById)
.put(categoryHandler.updateCategoryById)
.delete(categoryHandler.deleteCategory)


export default categoryRouter