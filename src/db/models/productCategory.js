import sequelize from "../db.js";
import seq from "sequelize";

const { DataTypes } = seq;

const ProductCategory = sequelize.define(
    'productCategories', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        }
    }, )

export default ProductCategory    