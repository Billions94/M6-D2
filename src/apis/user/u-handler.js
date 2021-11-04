import models from "../../db/models/index.js"

const { Product, Review, User } = models

const getAll = async (req, res, next) => {
    try {
        const users = await User.findAll(req.body)
        res.send(users)
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const creatUser = async (req, res, next) => {
    try {
        const newUser = await User.create(req.body)
        res.status(201).send(newUser)
    } catch (error) {
        res.status(400).send(error.message); 
    }
}

const getById = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { id: req.params.id}
        })
        res.send(user)
    } catch (error) {
        res.status(400).send(error.message);  
    }
}

const updateUser = async (req, res, next) => {
    
}

const userHandler = {
    getAll,
    creatUser,
    getById,
}

export default userHandler