import models from "../../db/models/index.js";

const { Product, Review, User, Category } = models;

const getAll = async (req, res, next) => {
  try {
    const category = await Category.findAll({
      include: [{ model: Product, through: { attributes: [] } }],
    });
    res.send(category);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).send(category);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getById = async (req, res, next) => {
  try {
    const category = await Category.findOne({
      where: {
        id: req.params.id,
      },
      include: Product,
    });
    res.send(category);
  } catch (error) {
    res.status(400).send(error.message);
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
    res.status(400).send(error.message);
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
        res.status(400).send(error.message); 
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
