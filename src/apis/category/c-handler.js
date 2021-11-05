import models from "../../db/models/index.js";

const { Product, Review, User, Category } = models;

const getAll = async (req, res, next) => {
  try {
    const category = await Category.findAll(); 
    res.send(category);
  } catch (error) {
    console.error(error)
    next(error)
  }
};

const createCategory = async (req, res, next) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).send(category);
  } catch (error) {
    console.error(error)
    next(error)
  }
};

const getById = async (req, res, next) => {
  try {
    const category = await Category.findOne({
      where: req.params.id ? {
        id: req.params.id
      } : {},
      include: Product,
    });
    res.send(category);
  } catch (error) {
    console.error(error)
    next(error)
  }
};

const updateCategoryById = async(req, res, next) => {
  try {
    const category = await Category.update(
      { ...req.body },
      {
        where: {
          id: req.params.id,
        },
        returning: true,
      }
    );
    res.status(203).send(category)
  } catch (error) {
    console.error(error)
    next(error)
  }
};

const deleteCategory = async(req, res, next) => {
    try {
        const row = await Category.destroy({
            where: { 
                id: req.params.id,
            }
        })
        res.status(204).send({ row })
    } catch (error) {
      console.error(error)
      next(error)
    }
}

const categoryHandler = {
  getAll,
  createCategory,
  getById,
  updateCategoryById,
  deleteCategory
};

export default categoryHandler;
