import express from "express";
import createHttpError from "http-errors";
import productsHandler from "./p-handlers.js";
import reviewsHandler from "../reviews/r-handler.js";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary"
import { v2 as cloudinary } from "cloudinary"

const productsRouter = express.Router();


// PRODUCT SECTION
const cloudinaryStorage = new CloudinaryStorage({
    cloudinary, // CREDENTIALS, 
    params: {
      folder: "amazon-db",
    },
  })

productsRouter.get("/", productsHandler.getAll);

productsRouter.post("/", productsHandler.createProduct);

productsRouter.post('/uploadCover', multer({ storage: cloudinaryStorage}).single('picture'))
// productsRouter
//   .route("/:id/productCover")
//   .put(
//     multer({ storage: cloudinaryStorage }).single("picture"),
//     productsHandler.addProductImage
//   );

productsRouter
  .route("/:id")
  .get(productsHandler.getById)
  .put(productsHandler.updateProductById)
  .delete(productsHandler.deleteproductsById);

// REVIEWS SECTION

productsRouter
  .route("/:id/reviews")
  .get(reviewsHandler.getById)
  .post(reviewsHandler.createReview);

productsRouter
  .route("/")
  .post(reviewsHandler.createReview);

  
productsRouter
  .route("/:id/reviews/:reviewId")
  .put(reviewsHandler.updateReviewById)
  .delete(reviewsHandler.deleteReviewById);

export default productsRouter;
