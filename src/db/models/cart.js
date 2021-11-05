import sequelize from "../db.js";
import seq from "sequelize"

const { DataTypes } = seq

const Cart = sequelize.define(
    'cart', 
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
    },
)

export default Cart