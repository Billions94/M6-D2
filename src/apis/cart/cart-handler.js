import sequelize from "sequelize";
import models from "../../db/models/index.js";
import Category from "../../db/models/category.js";

const { Cart, Product } = models

const getAll = async (req, res, next) => {
    try {
        const cart = await Cart.findAll({
            where: {
                userId: req.params.userId,
            },
            include: { model: Product, include: Category },
            attributes: [
                'productId',
                [sequelize.fn('COUNT', 'productId'), 'qty'],
                [sequelize.fn('SUM', sequelize.col('product.price')), 'unitary_price'],
            ],

            group: ["productId", "product.id", "product.category.id"]
        })

        const totalQty = await Cart.count({
            where: {
              userId: req.params.userId,
            },
          })

          const totalPrice = await Cart.sum("product.price", {
            include: { model: Product, attributes: [] },
          });

          res.send({ cart, totalQty, totalPrice });
    } catch (error) {
        console.error(error)
        next(error)
    }
}

const createCart = async (req, res, next) => {
    try {

        const { userId, productId } = req.params

        const cart = await Cart.create({ userId, productId })
        res.status(201).send(cart)
    } catch (error) {
        console.error(error)
        next(error)
    }
}

const deleteCart =  async (req, res, next) => {
    try {
        const { userId, productId } = req.params

        const row = await Cart.destroy({ where: { userId, productId }})
        res.status(204).send({ row })
    } catch (error) {
        console.error(error)
        next(error)
    }
}


const cartHandler = {
    getAll,
    createCart,
    deleteCart
}

export default cartHandler