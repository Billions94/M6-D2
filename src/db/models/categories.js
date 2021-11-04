import sequelize from "../db.js";
import seq from "sequelize"

const { DataTypes } = seq

const Category = sequelize.define(
    'categories', {
        id : {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name : {
            type: DataTypes.STRING,
            allowNull: false
        },
        isMobile : {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        isLaptop : {
            type: DataTypes.BOOLEAN,
            allowNull: true
        }
    }
)

export default Category