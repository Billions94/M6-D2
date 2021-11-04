import express from "express";
import cors from "cors";
import { connectDB, testConnection } from "./db/db.js"
import listEndpoints from "express-list-endpoints";
import productsRouter from "./apis/products/routes.js";
import categoryRouter from "./apis/category/routes.js";
import userRouter from "./apis/user/routes.js";
import reviewsRouter from "./apis/reviews/routes.js";
import {
  badRequest,
  unAuthorized,
  notFound,
  genericError,
} from "./errorHandlers.js";



const server = express();


server.use(cors());

server.use(express.json());
server.use("/products", productsRouter);
server.use("/categories", categoryRouter);
server.use("/users", userRouter)
server.use("/reviews", reviewsRouter)


server.use(badRequest);
server.use(unAuthorized);
server.use(notFound);
server.use(genericError);
console.table(listEndpoints(server));


const { PORT } = process.env;

server.listen(PORT, async () => {
  console.log(`😁 Server is running on port ${PORT}`);

  await testConnection()
  await connectDB()
});

server.on("error", (error) =>
  console.log(`Server is not running due to : ${error}`)
);
