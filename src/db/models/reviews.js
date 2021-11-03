import sequelize from "../db.js";
import seq from "sequelize";

const { DataTypes } = seq;

const Review = sequelize.define(
    'reviews', 
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        username: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    }
)

export default Review