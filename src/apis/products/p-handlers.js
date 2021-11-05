import models from "../../db/models/index.js";
import sequelize from "sequelize";
const { Op } = sequelize;

const { Product, Review, ProductCategory, Category } = models;

const getAllByPrice = async (req, res, next) => {
  try {
    const products = await Product.findAndCountAll({
      include: [
        {
          model: Category,
          where: {
            ...(req.query.category && {
              name: req.query.category,
            }),
          },
        },
        Review,
      ],
      order: [["createdAt", "ASC"]],
      limit: req.query.size,
      offset: parseInt(req.query.size * req.query.page),
    });
    res.send({
      data: products.rows,
      ...(req.query.size && req.query.page && {
        total: products.count,
      pages: Math.ceil(products.count / req.query.size),
      })
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const productImgCloud = async (req, res, _next) => {
  try {
    const cloudImg = req.file.path;

    const data = await Product.create({ ...req.body, image: cloudImg });
    await ProductCategory.create({
      productId: data.id,
      categoryId: req.body.categoryId,
    });

    res.send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const addCategoryToProduct = async (req, res, next) => {
  try {
    const { categoryId, productId } = req.body;

    const data = await ProductCategory.create({
      productId: productId,
      categoryId: categoryId,
    });
    const product = await Product.findOne({
      where: { id: productId },
    });
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteProductCategory = async (req, res, next) => {
  try {
    const { categoryId, productId } = req.body;

    const data = await ProductCategory.destroy({
      where: {
        productId: productId,
        categoryId: categoryId,
      },
    });
    res.send({ data });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// const createProduct = async (req, res, next) => {
//   try {
//     const product = await Product.create(req.body);
//     res.send(product);
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// };

const getById = async (req, res, next) => {
  try {
    const products = await Product.findOne({
      where: {
        id: req.params.id,
      },
      include: Review,
    });

    res.send(products);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// const updateProductById = async (req, res, next) => {
//   try {
//     const updatedProduct = await Product.update(
//       { ...req.body },
//       {
//         where: {
//           id: req.params.id,
//         },
//         returning: true,
//       }
//     );
//     res.send(updatedProduct);
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// };

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
    await ProductCategory.update(
      { ...req.body },
      { where: { categoryId: req.body.categoryId } }
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
  //   getAll,
  getAllByPrice,
  getById,
  // createProduct,
  updateProductById,
  productImgCloud,
  // addProductImage,
  deleteproductsById,
  addCategoryToProduct,
  deleteProductCategory,
};

export default productsHandler;
