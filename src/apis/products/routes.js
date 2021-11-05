//                                        CODE BY EJIROGHENE                              //

import express from "express";
import productsHandler from "./p-handlers.js";
import reviewsHandler from "../reviews/r-handler.js";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary"
import { v2 as cloudinary } from "cloudinary"

const productsRouter = express.Router();


// PRODUCT SECTION
const cloudinaryStorage = new CloudinaryStorage({
    cloudinary, 
    params: {
      folder: "amazon-db",
    },
  })


productsRouter.get("/", productsHandler.getAllByPrice)

// productsRouter.post("/", productsHandler.createProduct);



productsRouter.post('/', multer({ storage: cloudinaryStorage}).single('image'), productsHandler.productImgCloud)
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



export default productsRouter;


//                                        CODE BY EJIROGHENE                              //