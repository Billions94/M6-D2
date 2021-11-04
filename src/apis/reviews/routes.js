import express from "express";
import reviewsHandler from "./r-handler.js";

const reviewsRouter = express.Router()

reviewsRouter.get("/", reviewsHandler.getAll)

reviewsRouter.post("/", reviewsHandler.createReview)

reviewsRouter.post("/:productId/:userId", reviewsHandler.createReview)

reviewsRouter.route("/:id")
.get(reviewsHandler.getById)
.put(reviewsHandler.updateReviewById)
.delete(reviewsHandler.deleteReviewById)

export default reviewsRouter;