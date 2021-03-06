import models from "../../db/models/index.js";
import sequelize from "sequelize";

const { Op } = sequelize;

const { Product, Review, ProductCategory, Category } = models;

const getAll = async (req, res, next) => {
  try {
    console.log("i am req . query", req.query.page);
    const products = await Product.findAndCountAll({
      where: req.query.name
        ? { name: { [Op.iLike]: `%${req.query.name}%` } }
        : {},
      include: {
        model: Category,
        where: req.query.category ? { name: req.query.category } : {},
      },
      order: [["createdAt", "DESC"]],
      attributes: { exclude: ["updatedAt", "categoryId"] },

      ...(req.query.size &&
        req.query.page && {
          limit: req.query.size,
          offset: parseInt(req.query.size * req.query.page),
        }),
    });

    res.send({
      data: products.rows,
      ...(req.query.size &&
        req.query.page && {
          total: products.count,
          pages: Math.ceil(products.count * req.query.page),
        }),
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.send(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const productImgCloud = async (req, res, next) => {
  try {
    const cloudImg = req.file.path;

    const data = await Product.create({ ...req.body, image: cloudImg });
    await ProductCategory.create({
      productId: data.id,
      categoryId: req.body.categoryId,
    });

    res.send(data);
  } catch (error) {
    console.error(error);
    next(error);
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
    console.error(error);
    next(error);
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
    console.error(error);
    next(error);
  }
};

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
    console.error(error);
    next(error);
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
//     await ProductCategory.update({...req.body}, { where: { categoryId: req.body.categoryId}})
//     res.send(updatedProduct);
//   } catch (error) {
//     console.error(error)
//     next(error)
//   }
// };

const deleteproductsById = async (req, res, next) => {
  try {
    const product = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send({ product });
  } catch (error) {
    console.error(error);
    next(error);
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
  addCategoryToProduct,
  deleteProductCategory,
};

export default productsHandler;
