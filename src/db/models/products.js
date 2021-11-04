import sequelize from "../db.js";
import seq from "sequelize";

const { DataTypes } = seq;

const Product = sequelize.define(
    'products', 
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    }
)

export default Product