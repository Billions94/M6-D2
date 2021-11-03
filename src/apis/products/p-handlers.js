import models from "../../db/models/index.js";

const { Product, Review } = models;

const getAll = async (req, res, next) => {
  try {
    const products = await Product.findAll({ include: Review });
    res.send(products);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const productImgCloud = async (req, res, _next) => {
  try {
    const cloudImg = req.file.path;

    const { name, category, image, price } = req.body

    const products = await Product.create(req.body, 
        { image: cloudImg },
        {field : ['name', 'category', 'image', 'price']});

    res.send(products);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getById = async (req, res, next) => {
  try {
    const products = await Product.findByPk(req.params.id);

    res.send(products);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const products = await Product.create(req.body);
    res.send(products);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateProductById = async (req, res, next) => {
  try {
    const updatedProduct = await Product.update(
      { ...req.body },
      {
        where: {
          id: req.params.id,
        },
        returning: true,
      }
    );
    res.send(updatedProduct);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//   const addProductImage = async (req, res, next) => {
//     try {
//       const cover = req.file.path;

//       const products = await pool.query(
//         "UPDATE products SET image_url=$1 WHERE id=$2 RETURNING *;",
//         [cover, req.params.id]
//       );

//       res.send(products);
//     } catch (error) {
//       next(error);
//       console.log(error);
//     }
//   };

const deleteproductsById = async (req, res, next) => {
  try {
    const product = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send({ product });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const productsHandler = {
  getAll,
  getById,
  createProduct,
  updateProductById,
  productImgCloud,
  // addProductImage,
  deleteproductsById,
};

export default productsHandler;
