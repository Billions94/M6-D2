import models from "../../db/models/index.js"

const { Product, Review, User } = models

const getAll = async (req, res, next) => {
    try {
        const users = await User.findAll(req.body)
        res.send(users)
    } catch (error) {
        console.error(error)
        next(error)
    }
}

const creatUser = async (req, res, next) => {
    try {
        const newUser = await User.create(req.body)
        res.status(201).send(newUser)
    } catch (error) {
        console.error(error)
        next(error)
    }
}

const getById = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { id: req.params.id}
        })
        res.send(user)
    } catch (error) {
        console.error(error)
        next(error)  
    }
}

const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.update(
            { ...req.body },
            {
              where: {
                id: req.params.id,
              },
              returning: true,
            }      
        )
        res.status(203).send(updatedUser)
    } catch (error) {
        console.error(error)
        next(error)  
    }
}

const deleteUser = async (req, res) => {
    try {
        const row = await User.destroy({
            where: { id: req.params.id }
        })
        res.status(204).send({ row })
    } catch (error) {
        console.error(error)
        next(error) 
    }
}

const userHandler = {
    getAll,
    creatUser,
    getById,
    updateUser,
    deleteUser
}

export default userHandler