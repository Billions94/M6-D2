import sequelize from "../db.js";
import seq from "sequelize";

const { DataTypes } = seq;

const Review = sequelize.define(
    'reviews', 
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    }
)

export default Review