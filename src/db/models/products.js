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
    },
        {
            timestamps: false
        }
)

export default Product